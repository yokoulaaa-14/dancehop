import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { fetchProfile } from '@/features/onboarding/api'
import type { Level } from '@/features/onboarding/model'
import type { Preferences } from './filter'
import type { Course, CourseType, Studio, Style, StyleFamily } from './model'

/** Fin de saison par défaut quand ni le cours ni le studio n'en donnent une : le 30 juin (D27). */
const DEFAULT_SEASON_END_MONTH_DAY = '06-30'
/** Mois à partir duquel la saison en cours finit l'année suivante (septembre, rentrée). */
const SEASON_START_MONTH = 9

function defaultSeasonEnd(today: Date): string {
  const year = today.getMonth() + 1 >= SEASON_START_MONTH ? today.getFullYear() + 1 : today.getFullYear()
  return `${year}-${DEFAULT_SEASON_END_MONTH_DAY}`
}

type CourseRow = {
  id: string
  weekday: number
  start_time: string
  duration_min: number
  levels: Level[]
  course_type: CourseType | null
  every_other_week: boolean
  title: string | null
  style_raw: string
  valid_from: string | null
  valid_until: string | null
  style: { id: string; label: string; family: StyleFamily } | null
  teacher: { name: string; is_guest: boolean }
  studio: { id: string; name: string; season_end_date: string | null }
}

const COURSE_COLUMNS = `
  id, weekday, start_time, duration_min, levels, course_type, every_other_week, title, style_raw,
  valid_from, valid_until,
  style:style_id ( id, label, family ),
  teacher:teacher_id ( name, is_guest ),
  studio:studio_id ( id, name, season_end_date )
`

/** Les cours actifs (data-model.md : seuls les cours `is_active`). Lecture publique (RLS). */
export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async (): Promise<Course[]> => {
      const { data, error } = await supabase.from('course').select(COURSE_COLUMNS).eq('is_active', true)
      if (error) throw error
      const seasonEnd = defaultSeasonEnd(new Date())
      return (data as unknown as CourseRow[]).map((row) => ({
        id: row.id,
        weekday: row.weekday,
        startTime: row.start_time,
        durationMin: row.duration_min,
        levels: row.levels,
        courseType: row.course_type,
        everyOtherWeek: row.every_other_week,
        title: row.title,
        styleRaw: row.style_raw,
        style: row.style,
        teacher: { name: row.teacher.name, isGuest: row.teacher.is_guest },
        studio: { id: row.studio.id, name: row.studio.name },
        validFrom: row.valid_from,
        validUntil: row.valid_until ?? row.studio.season_end_date ?? seasonEnd,
      }))
    },
  })
}

/** Les 14 styles et leur famille (D71, D74), dans l'ordre de l'onboarding. */
export function useStyles() {
  return useQuery({
    queryKey: ['styles', 'with-family'],
    queryFn: async (): Promise<Style[]> => {
      const { data, error } = await supabase.from('style').select('id, label, family').order('sort_order')
      if (error) throw error
      return data
    },
  })
}

export function useStudios() {
  return useQuery({
    queryKey: ['studios'],
    queryFn: async (): Promise<Studio[]> => {
      const { data, error } = await supabase.from('studio').select('id, name').order('name')
      if (error) throw error
      return data
    },
  })
}

/** Préférences de l'onboarding ; `null` sans profil terminé (la liste affiche alors tout). */
export function usePreferences() {
  return useQuery({
    queryKey: ['preferences'],
    queryFn: async (): Promise<Preferences | null> => {
      const profile = await fetchProfile()
      if (!profile?.onboarding_completed_at) return null
      return { styleLevels: profile.style_levels, availability: profile.availability }
    },
  })
}
