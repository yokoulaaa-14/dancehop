// Réponses d'onboarding et règles associées (D28, D62). Aucune valeur magique dans les écrans :
// les jours, plages, niveaux et raccourcis viennent d'ici.

export const LEVELS = ['beginner', 'intermediate', 'advanced'] as const
export type Level = (typeof LEVELS)[number]

/** Niveau proposé pour chaque style choisi (D62 révisé). */
export const DEFAULT_LEVEL: Level = 'intermediate'

export const LEVEL_LABELS: Record<Level, string> = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
}

/** Jours ISO 8601 : 1 = lundi … 7 = dimanche (data-model.md). */
export const WEEKDAYS = [1, 2, 3, 4, 5, 6, 7] as const
export type Weekday = (typeof WEEKDAYS)[number]

export const WEEKDAY_LABELS: Record<Weekday, string> = {
  1: 'Lundi',
  2: 'Mardi',
  3: 'Mercredi',
  4: 'Jeudi',
  5: 'Vendredi',
  6: 'Samedi',
  7: 'Dimanche',
}

const WORKDAYS: readonly Weekday[] = [1, 2, 3, 4, 5]
const WEEKEND: readonly Weekday[] = [6, 7]

/** Plages de D28 : la soirée commence à 18 h. */
export const SLOTS = ['day', 'evening'] as const
export type Slot = (typeof SLOTS)[number]

export type DayAvailability = Record<Slot, boolean>
/** Forme de `profile.availability` : `{"1": {"day": false, "evening": true}, …}`. */
export type Availability = Record<`${Weekday}`, DayAvailability>

/** Style choisi → niveau (forme de `profile.style_levels`). */
export type StyleLevels = Record<string, Level>

export function emptyAvailability(): Availability {
  return Object.fromEntries(WEEKDAYS.map((d) => [d, { day: false, evening: false }])) as Availability
}

function availabilityFrom(pick: (day: Weekday) => DayAvailability): Availability {
  return Object.fromEntries(WEEKDAYS.map((d) => [d, pick(d)])) as Availability
}

export const SHORTCUTS = [
  {
    id: 'every-evening',
    label: 'Tous les soirs',
    availability: availabilityFrom(() => ({ day: false, evening: true })),
  },
  {
    id: 'weekends',
    label: 'Les week-ends',
    availability: availabilityFrom((d) => ({ day: WEEKEND.includes(d), evening: WEEKEND.includes(d) })),
  },
  {
    id: 'weekday-evenings-and-weekends',
    label: 'Soirs de semaine + week-ends',
    availability: availabilityFrom((d) =>
      WORKDAYS.includes(d) ? { day: false, evening: true } : { day: true, evening: true },
    ),
  },
  {
    id: 'all-the-time',
    label: 'Tout le temps',
    availability: availabilityFrom(() => ({ day: true, evening: true })),
  },
] as const

export type ShortcutId = (typeof SHORTCUTS)[number]['id']

/** Raccourci dont la grille est exactement celle-ci, s'il y en a un. */
export function matchingShortcut(availability: Availability): ShortcutId | null {
  return SHORTCUTS.find((s) => sameAvailability(availability, s.availability))?.id ?? null
}

export function sameAvailability(a: Availability, b: Availability): boolean {
  return WEEKDAYS.every((d) => SLOTS.every((s) => a[d][s] === b[d][s]))
}

export function hasAnyAvailability(availability: Availability): boolean {
  return WEEKDAYS.some((d) => SLOTS.some((s) => availability[d][s]))
}

/** Garde les niveaux des styles encore choisis, donne le niveau par défaut aux nouveaux. */
export function levelsForStyles(styleIds: readonly string[], previous: StyleLevels): StyleLevels {
  return Object.fromEntries(styleIds.map((id) => [id, previous[id] ?? DEFAULT_LEVEL]))
}
