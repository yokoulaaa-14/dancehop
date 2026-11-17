// Moteur de filtrage de la liste des cours (D05, D20, D28, D31, D58, D62, D64).
// Fonctions pures, testées avec Vitest (D19).
import type { Availability, StyleLevels, Weekday } from '@/features/onboarding/model'
import { EVENING_START, type Course, type CourseType } from './model'

/**
 * Filtres de la liste. Ils partent des préférences de l'onboarding et ne les modifient jamais (D64).
 * Une liste vide de types ou de studios veut dire « tous ».
 */
export type Filters = {
  /** La croix : tous les cours, compatibles ou non (D64). */
  showAll: boolean
  styleIds: string[]
  styleLevels: StyleLevels
  availability: Availability
  courseTypes: CourseType[]
  studioIds: string[]
}

export type Preferences = { styleLevels: StyleLevels; availability: Availability }

/** Filtres par défaut : les préférences de l'onboarding (D64). */
export function filtersFromPreferences(preferences: Preferences): Filters {
  return {
    showAll: false,
    styleIds: Object.keys(preferences.styleLevels),
    styleLevels: preferences.styleLevels,
    availability: preferences.availability,
    courseTypes: [],
    studioIds: [],
  }
}

export function isEvening(course: Course): boolean {
  return course.startTime >= EVENING_START
}

/** Un cours passe-t-il les filtres, jour de la semaine compris ? (data-model.md, Comportement) */
export function matchesFilters(course: Course, filters: Filters): boolean {
  if (filters.showAll) return true
  const style = course.style
  // Style non précisé : visible par tous, et il passe le filtre de niveau (D58).
  if (style && !filters.styleIds.includes(style.id)) return false
  if (style && course.levels.length > 0) {
    const level = filters.styleLevels[style.id]
    if (level && !course.levels.includes(level)) return false
  }
  const day = filters.availability[String(course.weekday) as `${Weekday}`]
  if (!day || !day[isEvening(course) ? 'evening' : 'day']) return false
  // Type non précisé : jamais exclu (D31).
  if (filters.courseTypes.length > 0 && course.courseType && !filters.courseTypes.includes(course.courseType)) return false
  if (filters.studioIds.length > 0 && !filters.studioIds.includes(course.studio.id)) return false
  return true
}

/** Le cours a-t-il lieu à cette date ? (validité de la grille, D27) */
export function isValidOn(course: Course, isoDate: string): boolean {
  if (course.validFrom && isoDate < course.validFrom) return false
  return isoDate <= course.validUntil
}

export type Day = { isoDate: string; weekday: Weekday; date: Date }

const DAYS_SHOWN = 7

/** ISO 8601 : lundi = 1 … dimanche = 7, alors que `Date.getDay()` donne dimanche = 0. */
function isoWeekday(date: Date): Weekday {
  return (((date.getDay() + 6) % 7) + 1) as Weekday
}

function toIsoDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

/** Les 7 prochains jours, à partir d'aujourd'hui (D64). */
export function nextDays(today: Date): Day[] {
  return Array.from({ length: DAYS_SHOWN }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)
    return { isoDate: toIsoDate(date), weekday: isoWeekday(date), date }
  })
}

export type TimeGroup = { startTime: string; courses: Course[] }
export type DaySchedule = { day: Day; groups: TimeGroup[] }

/**
 * Les cours de chaque jour, filtrés, triés par heure et groupés par heure de début (D69).
 * Deux cours qui se chevauchent sans commencer à la même heure restent deux groupes (D20).
 */
export function schedule(courses: readonly Course[], days: readonly Day[], filters: Filters): DaySchedule[] {
  return days.map((day) => {
    const ofDay = courses
      .filter((c) => c.weekday === day.weekday && isValidOn(c, day.isoDate) && matchesFilters(c, filters))
      .sort((a, b) => a.startTime.localeCompare(b.startTime) || a.studio.name.localeCompare(b.studio.name))
    const groups: TimeGroup[] = []
    for (const course of ofDay) {
      const last = groups.at(-1)
      if (last && last.startTime === course.startTime) last.courses.push(course)
      else groups.push({ startTime: course.startTime, courses: [course] })
    }
    return { day, groups }
  })
}

/** Nombre de cours sur les 7 jours : libellé « Afficher N cours » des panneaux. */
export function countCourses(daySchedules: readonly DaySchedule[]): number {
  return daySchedules.reduce((total, d) => total + d.groups.reduce((n, g) => n + g.courses.length, 0), 0)
}
