// Modèle de la liste des cours (D64, D69, D71). Libellés et formats affichés : aucune valeur
// magique dans les écrans.
import type { Level } from '@/features/onboarding/model'

/** Familles de styles (D71, D74) : mêmes noms que les tokens icon-style-{famille}-default. */
export const STYLE_FAMILIES = ['hiphop', 'funk', 'club', 'ballroom', 'afro', 'studio'] as const
export type StyleFamily = (typeof STYLE_FAMILIES)[number]

export const COURSE_TYPES = ['freestyle', 'choreography', 'technique'] as const
export type CourseType = (typeof COURSE_TYPES)[number]

export const COURSE_TYPE_LABELS: Record<CourseType, string> = {
  freestyle: 'Freestyle',
  choreography: 'Chorégraphie',
  technique: 'Technique',
}

export type Style = { id: string; label: string; family: StyleFamily }
export type Studio = { id: string; name: string }

/** Un cours tel que la liste l'utilise (table `course` et ses jointures, data-model.md). */
export type Course = {
  id: string
  weekday: number
  /** Heure locale `HH:MM:SS`. */
  startTime: string
  durationMin: number
  levels: Level[]
  courseType: CourseType | null
  everyOtherWeek: boolean
  title: string | null
  styleRaw: string
  style: Style | null
  teacher: { name: string; isGuest: boolean }
  studio: Studio
  validFrom: string | null
  /** Fin de validité, déjà résolue : `valid_until`, sinon fin de saison du studio, sinon 30 juin (D27). */
  validUntil: string
}

/** Soirée = cours commençant à 18h00 ou après (D28). */
export const EVENING_START = '18:00:00'

const MINUTES_PER_HOUR = 60

/** « 1h30 », « 2h00 » : format fixe des durées (maquette Ready to dev). */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / MINUTES_PER_HOUR)
  const rest = minutes % MINUTES_PER_HOUR
  return `${hours}h${String(rest).padStart(2, '0')}`
}

/** « 19:00 » depuis `19:00:00`. */
export function formatStartTime(startTime: string): string {
  return startTime.slice(0, 5)
}

/** Nom affiché d'un cours : le style, sinon le type, sinon l'étiquette du studio (D58, D64). */
export function courseName(course: Course): string {
  if (course.style) return course.style.label
  if (course.courseType) return COURSE_TYPE_LABELS[course.courseType]
  return course.styleRaw
}

const LEVEL_BADGES: Record<Level, string> = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
}
const ALL_LEVELS_BADGE = 'Tous niveaux'
const LEVEL_COUNT = 3

/**
 * Badges d'une ligne, dans l'ordre de D64 : niveaux, type, une semaine sur deux, prof variable,
 * et « Style non précisé » quand le studio ne le donne pas (D58).
 */
export function courseBadges(course: Course): string[] {
  const badges: string[] = []
  if (course.levels.length === 0 || course.levels.length === LEVEL_COUNT) badges.push(ALL_LEVELS_BADGE)
  else badges.push(...course.levels.map((level) => LEVEL_BADGES[level]))
  if (course.courseType && course.style) badges.push(COURSE_TYPE_LABELS[course.courseType])
  if (!course.style) badges.push('Style non précisé')
  if (course.everyOtherWeek) badges.push('1 sem. sur 2')
  if (course.teacher.isGuest) badges.push('Prof variable')
  return badges
}
