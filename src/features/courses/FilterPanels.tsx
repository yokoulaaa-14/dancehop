import { useState, type ReactNode } from 'react'
import { BottomSheet } from '@/components/BottomSheet'
import { Button } from '@/components/ui/button'
import { AvailabilityGrid, Chip, LevelSelector } from '@/features/onboarding/components'
import {
  DEFAULT_LEVEL,
  SHORTCUTS,
  emptyAvailability,
  levelsForStyles,
  matchingShortcut,
} from '@/features/onboarding/model'
import { StyleMarker } from './StyleMarker'
import { countCourses, schedule, type Day, type Filters, type Preferences } from './filter'
import { COURSE_TYPES, COURSE_TYPE_LABELS, type Course, type CourseType, type Studio, type Style } from './model'

// Un panneau par puce de filtre (D64 révisé le 12/11) : on modifie un brouillon, « Afficher N cours »
// l'applique, la croix l'abandonne. Les réponses de l'onboarding ne changent jamais d'ici.
export type Panel = 'styles' | 'levels' | 'slots' | 'types' | 'studios'

const PANEL_TITLES: Record<Panel, string> = {
  styles: 'Styles',
  levels: 'Niveau',
  slots: 'Créneaux',
  types: 'Type',
  studios: 'Studio',
}

/** « trois studios » plutôt que « 3 studios » dans la phrase du panneau Studio (maquette). */
const NUMBER_WORDS: Record<number, string> = { 2: 'deux', 3: 'trois', 4: 'quatre', 5: 'cinq', 6: 'six' }

function toggle<T>(list: readonly T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item]
}

function ChipList({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-100">{children}</div>
}

function Note({ children }: { children: ReactNode }) {
  return <p className="type-body text-text-neutral-subtle-default">{children}</p>
}

export function FilterPanel({
  panel,
  filters,
  preferences,
  courses,
  days,
  styles,
  studios,
  onApply,
  onClose,
}: {
  panel: Panel | null
  filters: Filters
  preferences: Preferences | null
  courses: readonly Course[]
  days: readonly Day[]
  styles: readonly Style[]
  studios: readonly Studio[]
  onApply: (filters: Filters) => void
  onClose: () => void
}) {
  return (
    <BottomSheet
      open={panel !== null}
      onClose={onClose}
      title={panel ? PANEL_TITLES[panel] : ''}
    >
      {panel && (
        <PanelBody
          // Un nouveau brouillon à chaque ouverture.
          key={panel}
          panel={panel}
          filters={filters}
          preferences={preferences}
          courses={courses}
          days={days}
          styles={styles}
          studios={studios}
          onApply={onApply}
        />
      )}
    </BottomSheet>
  )
}

function PanelBody({
  panel,
  filters,
  preferences,
  courses,
  days,
  styles,
  studios,
  onApply,
}: {
  panel: Panel
  filters: Filters
  preferences: Preferences | null
  courses: readonly Course[]
  days: readonly Day[]
  styles: readonly Style[]
  studios: readonly Studio[]
  onApply: (filters: Filters) => void
}) {
  // Ouvrir un panneau depuis « tout afficher » repart des filtres, sans la croix.
  const [draft, setDraft] = useState<Filters>({ ...filters, showAll: false })
  const count = countCourses(schedule(courses, days, draft))
  const update = (patch: Partial<Filters>) => setDraft((d) => ({ ...d, ...patch }))

  const resetToPreferences = () => {
    if (!preferences) return
    if (panel === 'slots') update({ availability: preferences.availability })
    else update({ styleIds: Object.keys(preferences.styleLevels), styleLevels: preferences.styleLevels })
  }
  const secondary =
    panel === 'types' || panel === 'studios' ? (
      <Button variant="link" size="inline" onClick={() => update(panel === 'types' ? { courseTypes: [] } : { studioIds: [] })}>
        Effacer
      </Button>
    ) : preferences ? (
      <Button variant="link" size="inline" onClick={resetToPreferences}>
        Mes préférences
      </Button>
    ) : null

  return (
    <>
      {panel === 'styles' && (
        <ChipList>
          {styles.map((style) => (
            <Chip
              key={style.id}
              selected={draft.styleIds.includes(style.id)}
              onToggle={() => {
                const styleIds = toggle(draft.styleIds, style.id)
                update({ styleIds, styleLevels: levelsForStyles(styleIds, draft.styleLevels) })
              }}
            >
              <span className="flex items-center gap-075">
                {style.label}
                <StyleMarker family={style.family} />
              </span>
            </Chip>
          ))}
        </ChipList>
      )}

      {panel === 'levels' && (
        <div className="flex flex-col gap-200">
          {styles
            .filter((style) => draft.styleIds.includes(style.id))
            .map((style) => (
              <LevelSelector
                key={style.id}
                styleLabel={style.label}
                value={draft.styleLevels[style.id] ?? DEFAULT_LEVEL}
                onChange={(level) => update({ styleLevels: { ...draft.styleLevels, [style.id]: level } })}
              />
            ))}
        </div>
      )}

      {panel === 'slots' && (
        <div className="flex flex-col gap-250">
          <ChipList>
            {SHORTCUTS.map((shortcut) => (
              <Chip
                key={shortcut.id}
                selected={matchingShortcut(draft.availability) === shortcut.id}
                onToggle={() => update({ availability: shortcut.availability })}
              >
                {shortcut.label}
              </Chip>
            ))}
            <Chip
              selected={matchingShortcut(draft.availability) === null}
              onToggle={() => update({ availability: emptyAvailability() })}
            >
              Personnalisé
            </Chip>
          </ChipList>
          <AvailabilityGrid
            value={draft.availability}
            onToggle={(day, slot) =>
              update({
                availability: {
                  ...draft.availability,
                  [day]: { ...draft.availability[day], [slot]: !draft.availability[day][slot] },
                },
              })
            }
          />
        </div>
      )}

      {panel === 'types' && (
        <div className="flex flex-col gap-200">
          <ChipList>
            {COURSE_TYPES.map((type: CourseType) => (
              <Chip
                key={type}
                selected={draft.courseTypes.includes(type)}
                onToggle={() => update({ courseTypes: toggle(draft.courseTypes, type) })}
              >
                {COURSE_TYPE_LABELS[type]}
              </Chip>
            ))}
          </ChipList>
          <Note>Les cours dont le studio ne précise pas le type restent affichés.</Note>
        </div>
      )}

      {panel === 'studios' && (
        <div className="flex flex-col gap-200">
          <ChipList>
            {studios.map((studio) => (
              <Chip
                key={studio.id}
                selected={draft.studioIds.includes(studio.id)}
                onToggle={() => update({ studioIds: toggle(draft.studioIds, studio.id) })}
              >
                {studio.name}
              </Chip>
            ))}
          </ChipList>
          <Note>Sans choix, les {NUMBER_WORDS[studios.length] ?? studios.length} studios s'affichent.</Note>
        </div>
      )}

      <div className="flex items-center gap-300 pt-100">
        {secondary}
        <Button className="flex-1" disabled={count === 0} onClick={() => onApply(draft)}>
          {count === 0 ? 'Aucun cours ne correspond' : `Afficher ${count} cours`}
        </Button>
      </div>
    </>
  )
}
