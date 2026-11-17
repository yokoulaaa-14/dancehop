import { describe, expect, it } from 'vitest'
import { emptyAvailability, SHORTCUTS, type Availability } from '@/features/onboarding/model'
import { countCourses, filtersFromPreferences, isValidOn, matchesFilters, nextDays, schedule, type Filters } from './filter'
import { courseBadges, courseName, formatDuration, type Course } from './model'

const HIPHOP = { id: 'hiphop-id', label: 'Hip-hop', family: 'hiphop' as const }
const HOUSE = { id: 'house-id', label: 'House', family: 'club' as const }
const JDS = { id: 'jds', name: 'Juste Debout School' }
const LAX = { id: 'lax', name: 'Lax Studio' }

function course(overrides: Partial<Course> = {}): Course {
  return {
    id: 'c1',
    weekday: 4,
    startTime: '19:00:00',
    durationMin: 90,
    levels: ['beginner', 'intermediate', 'advanced'],
    courseType: null,
    everyOtherWeek: false,
    title: null,
    styleRaw: 'Hip Hop',
    style: HIPHOP,
    teacher: { name: 'Tevin', isGuest: false },
    studio: JDS,
    validFrom: null,
    validUntil: '2027-06-30',
    ...overrides,
  }
}

const EVERY_EVENING: Availability = SHORTCUTS[0].availability

function filters(overrides: Partial<Filters> = {}): Filters {
  return {
    ...filtersFromPreferences({ styleLevels: { [HIPHOP.id]: 'intermediate' }, availability: EVERY_EVENING }),
    ...overrides,
  }
}

describe('matchesFilters', () => {
  it('garde un cours du style choisi, au bon niveau, sur une plage libre', () => {
    expect(matchesFilters(course(), filters())).toBe(true)
  })

  it('écarte un style non choisi', () => {
    expect(matchesFilters(course({ style: HOUSE }), filters())).toBe(false)
  })

  it('garde un cours sans style, visible par tous et sans filtre de niveau (D58)', () => {
    expect(matchesFilters(course({ style: null, levels: ['advanced'] }), filters())).toBe(true)
  })

  it('écarte un cours qui ne propose pas le niveau donné pour son style (D62)', () => {
    expect(matchesFilters(course({ levels: ['advanced'] }), filters())).toBe(false)
  })

  it("garde un style choisi depuis la liste sans niveau d'onboarding", () => {
    expect(matchesFilters(course({ style: HOUSE, levels: ['advanced'] }), filters({ styleIds: [HIPHOP.id, HOUSE.id] }))).toBe(true)
  })

  it('range 18h00 en soirée et 17h59 en journée (D28)', () => {
    expect(matchesFilters(course({ startTime: '18:00:00' }), filters())).toBe(true)
    expect(matchesFilters(course({ startTime: '17:59:00' }), filters())).toBe(false)
  })

  it('écarte un jour sans disponibilité', () => {
    expect(matchesFilters(course(), filters({ availability: emptyAvailability() }))).toBe(false)
  })

  it('filtre le type sans jamais écarter un type non précisé (D31)', () => {
    const onlyFreestyle = filters({ courseTypes: ['freestyle'] })
    expect(matchesFilters(course({ courseType: 'choreography' }), onlyFreestyle)).toBe(false)
    expect(matchesFilters(course({ courseType: 'freestyle' }), onlyFreestyle)).toBe(true)
    expect(matchesFilters(course({ courseType: null }), onlyFreestyle)).toBe(true)
  })

  it('filtre le studio quand on en choisit, et les garde tous sinon', () => {
    expect(matchesFilters(course({ studio: LAX }), filters({ studioIds: [JDS.id] }))).toBe(false)
    expect(matchesFilters(course({ studio: LAX }), filters())).toBe(true)
  })

  it('la croix affiche tout, compatible ou non (D64)', () => {
    expect(matchesFilters(course({ style: HOUSE, startTime: '10:00:00' }), filters({ showAll: true }))).toBe(true)
  })
})

describe('isValidOn', () => {
  it("respecte le début et la fin de validité de la grille (D27)", () => {
    const c = course({ validFrom: '2026-11-20', validUntil: '2026-12-20' })
    expect(isValidOn(c, '2026-11-19')).toBe(false)
    expect(isValidOn(c, '2026-11-20')).toBe(true)
    expect(isValidOn(c, '2026-12-21')).toBe(false)
  })
})

describe('nextDays', () => {
  it("donne 7 jours à partir d'aujourd'hui, numérotés ISO (lundi = 1)", () => {
    const days = nextDays(new Date(2026, 10, 12))
    expect(days).toHaveLength(7)
    expect(days[0]).toMatchObject({ isoDate: '2026-11-12', weekday: 4 })
    expect(days[3]).toMatchObject({ isoDate: '2026-11-15', weekday: 7 })
    expect(days[4]).toMatchObject({ isoDate: '2026-11-16', weekday: 1 })
  })
})

describe('schedule', () => {
  const days = nextDays(new Date(2026, 10, 12))

  it('groupe les cours du jour par heure de début et les trie (D69)', () => {
    const courses = [
      course({ id: 'b', startTime: '20:30:00' }),
      course({ id: 'a2', studio: LAX }),
      course({ id: 'a1' }),
      course({ id: 'other-day', weekday: 5 }),
    ]
    const [thursday, friday] = schedule(courses, days, filters())
    expect(thursday.groups.map((g) => [g.startTime, g.courses.map((c) => c.id)])).toEqual([
      ['19:00:00', ['a1', 'a2']],
      ['20:30:00', ['b']],
    ])
    expect(friday.groups.map((g) => g.courses.map((c) => c.id))).toEqual([['other-day']])
    expect(countCourses(schedule(courses, days, filters()))).toBe(4)
  })

  it('garde deux cours qui se chevauchent sans commencer ensemble dans deux groupes (D20)', () => {
    const [thursday] = schedule([course({ id: 'a' }), course({ id: 'b', startTime: '19:30:00' })], days, filters())
    expect(thursday.groups).toHaveLength(2)
  })
})

describe('affichage', () => {
  it('formate les durées sur un format fixe', () => {
    expect(formatDuration(90)).toBe('1h30')
    expect(formatDuration(120)).toBe('2h00')
    expect(formatDuration(60)).toBe('1h00')
  })

  it('nomme un cours par son style, sinon son type, sinon l’étiquette du studio (D58)', () => {
    expect(courseName(course())).toBe('Hip-hop')
    expect(courseName(course({ style: null, courseType: 'choreography' }))).toBe('Chorégraphie')
    expect(courseName(course({ style: null, styleRaw: 'Atelier' }))).toBe('Atelier')
  })

  it('ordonne les badges : niveaux, type, une semaine sur deux, prof variable (D64)', () => {
    expect(
      courseBadges(
        course({
          levels: ['beginner', 'intermediate'],
          courseType: 'choreography',
          everyOtherWeek: true,
          teacher: { name: 'Guest', isGuest: true },
        }),
      ),
    ).toEqual(['Débutant', 'Intermédiaire', 'Chorégraphie', '1 sem. sur 2', 'Prof variable'])
    expect(courseBadges(course({ style: null, courseType: 'choreography', levels: ['intermediate'] }))).toEqual([
      'Intermédiaire',
      'Style non précisé',
    ])
  })
})
