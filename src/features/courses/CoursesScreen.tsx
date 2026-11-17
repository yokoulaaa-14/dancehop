import { useEffect, useMemo, useRef, useState } from 'react'
import { Atmosphere } from '@/components/Atmosphere'
import { Button } from '@/components/ui/button'
import { SHORTCUTS, matchingShortcut } from '@/features/onboarding/model'
import { TAB_BAR_CLEARANCE } from '@/features/shell/TabBar'
import { useCourses, usePreferences, useStudios, useStyles } from './api'
import { CourseRow } from './CourseRow'
import { FilterPanel, type Panel } from './FilterPanels'
import { countCourses, filtersFromPreferences, nextDays, schedule, type DaySchedule, type Filters } from './filter'
import { COURSE_TYPE_LABELS, formatStartTime, type Studio } from './model'

// Écran Cours (D64, D69, D70, D71) : maquettes « Ready to dev » de la page Cours sur Paper.
const ATMOSPHERE_HEIGHT = 380
const HOUR_COLUMN_WIDTH_PX = 64
const DAY_CIRCLE_PX = 36
const TODAY_RING_WIDTH_PX = 1.5
const CLEAR_ICON_PX = 16
const CLEAR_ICON_STROKE = 1.4

const weekdayShort = new Intl.DateTimeFormat('fr-FR', { weekday: 'short' })
const dayMonth = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' })
const weekdayLong = new Intl.DateTimeFormat('fr-FR', { weekday: 'long' })

/** « Aujourd'hui, jeu. 12 nov. », puis « Vendredi 13 nov. » (D64). */
function dayTitle(date: Date, isToday: boolean): string {
  if (isToday) return `Aujourd'hui, ${weekdayShort.format(date)} ${dayMonth.format(date)}`
  const weekday = weekdayLong.format(date)
  return `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)} ${dayMonth.format(date)}`
}

/** Sans préférences (pas d'onboarding terminé), la liste affiche tout. */
const SHOW_EVERYTHING: Filters = {
  ...filtersFromPreferences({ styleLevels: {}, availability: SHORTCUTS[SHORTCUTS.length - 1].availability }),
  showAll: true,
}

function plural(count: number, one: string, many: string) {
  return count === 1 ? `1 ${one}` : `${count} ${many}`
}

/** Libellé et état de chaque puce de filtre (D64, D67 : « 3 styles », sans compteur de cours). */
function chipStates(filters: Filters, studios: readonly Studio[]) {
  const off = filters.showAll
  const shortcut = matchingShortcut(filters.availability)
  const studioName = (id: string) => studios.find((s) => s.id === id)?.name ?? ''
  return [
    { panel: 'styles', label: filters.styleIds.length ? plural(filters.styleIds.length, 'style', 'styles') : 'Styles', active: !off && filters.styleIds.length > 0 },
    { panel: 'levels', label: 'Niveau', active: !off && Object.keys(filters.styleLevels).length > 0 },
    {
      panel: 'slots',
      label: SHORTCUTS.find((s) => s.id === shortcut)?.label ?? 'Créneaux',
      active: !off && shortcut !== 'all-the-time',
    },
    {
      panel: 'types',
      label:
        filters.courseTypes.length === 1
          ? COURSE_TYPE_LABELS[filters.courseTypes[0]]
          : filters.courseTypes.length > 1
            ? `${filters.courseTypes.length} types`
            : 'Type',
      active: !off && filters.courseTypes.length > 0,
    },
    {
      panel: 'studios',
      label:
        filters.studioIds.length === 1
          ? studioName(filters.studioIds[0])
          : filters.studioIds.length > 1
            ? `${filters.studioIds.length} studios`
            : 'Studio',
      active: !off && filters.studioIds.length > 0,
    },
  ] satisfies { panel: Panel; label: string; active: boolean }[]
}

export function CoursesScreen() {
  const courses = useCourses()
  const preferences = usePreferences()
  const styles = useStyles()
  const studios = useStudios()
  // Les 7 jours sont fixés à l'ouverture de l'écran.
  const [days] = useState(() => nextDays(new Date()))
  // Les filtres repartent des préférences à chaque ouverture de la liste (D64).
  const [changed, setChanged] = useState<Filters | null>(null)
  const [panel, setPanel] = useState<Panel | null>(null)

  const filters = changed ?? (preferences.data ? filtersFromPreferences(preferences.data) : SHOW_EVERYTHING)
  const daySchedules = useMemo(() => schedule(courses.data ?? [], days, filters), [courses.data, days, filters])
  const loading = courses.isPending || preferences.isPending
  const failed = courses.isError || preferences.isError

  return (
    <div className="relative" style={{ paddingBottom: TAB_BAR_CLEARANCE }}>
      <Atmosphere height={ATMOSPHERE_HEIGHT} />
      <header className="relative px-250 py-200">
        <h1 className="type-display-large text-text-neutral-strong-default">Liste des cours</h1>
      </header>

      <StickyFilters
        daySchedules={daySchedules}
        chips={chipStates(filters, studios.data ?? [])}
        showAll={filters.showAll}
        onShowAll={() => setChanged({ ...filters, showAll: !filters.showAll })}
        onOpen={setPanel}
      />

      {loading && <p className="relative px-250 pt-300 type-body text-text-neutral-subtle-default">Chargement des cours…</p>}
      {failed && (
        <p role="alert" className="relative px-250 pt-300 type-body text-text-error-default">
          Les cours n'ont pas pu être chargés. Vérifie ta connexion et réessaie.
        </p>
      )}
      {!loading && !failed && countCourses(daySchedules) === 0 && (
        <div className="relative flex flex-col gap-300 px-300 pt-500">
          <p className="type-display text-text-neutral-strong-default">Aucun cours ne correspond à tes filtres.</p>
          <Button onClick={() => setChanged({ ...filters, showAll: true })}>Effacer les filtres</Button>
        </div>
      )}
      {!loading && !failed && <CourseList daySchedules={daySchedules} />}

      <FilterPanel
        panel={panel}
        filters={filters}
        preferences={preferences.data ?? null}
        courses={courses.data ?? []}
        days={days}
        styles={styles.data ?? []}
        studios={studios.data ?? []}
        onApply={(next) => {
          setChanged(next)
          setPanel(null)
        }}
        onClose={() => setPanel(null)}
      />
    </div>
  )
}

function StickyFilters({
  daySchedules,
  chips,
  showAll,
  onShowAll,
  onOpen,
}: {
  daySchedules: DaySchedule[]
  chips: ReturnType<typeof chipStates>
  showAll: boolean
  onShowAll: () => void
  onOpen: (panel: Panel) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [stuck, setStuck] = useState(false)
  const [activeDay, setActiveDay] = useState(daySchedules[0]?.day.isoDate)

  // Le bandeau reste collé en haut ; le jour actif suit la liste (D64).
  useEffect(() => {
    const onScroll = () => {
      const bar = ref.current
      if (!bar) return
      const barBottom = bar.getBoundingClientRect().bottom
      setStuck(bar.getBoundingClientRect().top <= 0 && window.scrollY > 0)
      let current = daySchedules[0]?.day.isoDate
      for (const { day } of daySchedules) {
        const section = document.getElementById(`jour-${day.isoDate}`)
        if (section && section.getBoundingClientRect().top <= barBottom + 1) current = day.isoDate
      }
      setActiveDay(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [daySchedules])

  const scrollToDay = (isoDate: string) => {
    const section = document.getElementById(`jour-${isoDate}`)
    const barHeight = ref.current?.getBoundingClientRect().height ?? 0
    if (section) window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top - barHeight, behavior: 'smooth' })
  }

  return (
    <div ref={ref} className={`sticky top-0 z-[1] ${stuck ? 'bg-bg-neutral-default' : ''}`}>
      <nav aria-label="Jours" className="relative flex justify-between px-250 pt-100 pb-150">
        {daySchedules.map(({ day, groups }, i) => {
          const isToday = i === 0
          const selected = day.isoDate === activeDay
          const empty = groups.length === 0
          return (
            <button
              key={day.isoDate}
              type="button"
              disabled={empty}
              aria-current={selected ? 'date' : undefined}
              aria-label={dayTitle(day.date, isToday)}
              onClick={() => scrollToDay(day.isoDate)}
              className="flex w-550 flex-col items-center gap-075"
            >
              <span
                className={`type-body-small ${
                  empty
                    ? 'text-text-neutral-disabled'
                    : isToday && !selected
                      ? 'text-text-accent-default'
                      : selected
                        ? 'text-text-neutral-default'
                        : 'text-text-neutral-subtle-default'
                }`}
              >
                {weekdayShort.format(day.date)}
              </span>
              <span
                className={`flex items-center justify-center rounded-full ${
                  empty
                    ? 'type-body text-text-neutral-disabled'
                    : selected
                      ? 'lit type-body-strong'
                      : isToday
                        ? 'type-body-strong border-border-accent-selected text-text-accent-default'
                        : 'type-body-strong text-text-neutral-default'
                }`}
                style={{
                  width: DAY_CIRCLE_PX,
                  height: DAY_CIRCLE_PX,
                  borderWidth: isToday && !selected ? TODAY_RING_WIDTH_PX : 0,
                  borderStyle: 'solid',
                }}
              >
                {day.date.getDate()}
              </span>
            </button>
          )
        })}
      </nav>
      <div className="relative flex gap-100 overflow-x-auto pb-150 pl-250 [scrollbar-width:none]">
        <button
          type="button"
          aria-label="Tout afficher"
          aria-pressed={showAll}
          onClick={onShowAll}
          className={`flex size-550 shrink-0 items-center justify-center rounded-full border ${
            showAll ? 'lit border-transparent' : 'border-border-neutral-default bg-bg-neutral-strong-default text-icon-neutral-default'
          }`}
        >
          <svg aria-hidden width={CLEAR_ICON_PX} height={CLEAR_ICON_PX} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={CLEAR_ICON_STROKE} strokeLinecap="round">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
        {chips.map((chip) => (
          <button
            key={chip.panel}
            type="button"
            onClick={() => onOpen(chip.panel)}
            className={`flex h-550 shrink-0 items-center rounded-full border px-200 whitespace-nowrap ${
              chip.active
                ? 'border-border-accent-selected bg-bg-accent-subtle-default type-body-strong text-text-accent-default'
                : 'border-border-neutral-default bg-bg-neutral-strong-default type-body text-text-neutral-default'
            }`}
          >
            {chip.label}
          </button>
        ))}
        <span aria-hidden className="w-100 shrink-0" />
      </div>
    </div>
  )
}

function CourseList({ daySchedules }: { daySchedules: DaySchedule[] }) {
  return (
    <div className="relative">
      {daySchedules.map(({ day, groups }, i) =>
        groups.length === 0 ? null : (
          <section key={day.isoDate} id={`jour-${day.isoDate}`} aria-labelledby={`titre-${day.isoDate}`}>
            <h2 id={`titre-${day.isoDate}`} className="px-250 pt-300 pb-150 type-heading-small text-text-neutral-strong-default">
              {dayTitle(day.date, i === 0)}
            </h2>
            <div className="flex flex-col gap-300 px-250 pt-300">
              {groups.map((group) => (
                <div key={group.startTime} className="flex gap-200">
                  <div className="flex shrink-0 flex-col items-center gap-300" style={{ width: HOUR_COLUMN_WIDTH_PX }}>
                    <span className="type-display-small text-text-neutral-strong-default">{formatStartTime(group.startTime)}</span>
                    <span aria-hidden className="w-px flex-1 bg-border-neutral-default" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-300 px-250">
                    {group.courses.map((course) => (
                      <CourseRow key={course.id} course={course} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ),
      )}
    </div>
  )
}
