import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { fetchProfile, saveProfile, useStyles } from './api'
import { AvailabilityGrid, Chip, InfoMessage, LevelSelector, QuestionLayout } from './components'
import {
  LEVELS,
  LEVEL_LABELS,
  SHORTCUTS,
  emptyAvailability,
  hasAnyAvailability,
  levelsForStyles,
  matchingShortcut,
  type Availability,
  type Level,
  type StyleLevels,
} from './model'

const STEP_COUNT = 3

const LEVEL_DESCRIPTIONS: Record<Level, string> = {
  beginner: 'Je découvre ce style (bases et pas fondamentaux)',
  intermediate: 'Je connais les bases et je peux suivre une chorégraphie.',
  advanced: "Je danse ce style depuis longtemps et je cherche de l'exigence.",
}

/**
 * Les trois questions de l'onboarding (D62) : styles, niveau par style, disponibilités.
 * Les réponses restent en mémoire entre les étapes et ne sont enregistrées qu'à la fin.
 */
export function OnboardingFlow() {
  const navigate = useNavigate()
  const styles = useStyles()
  const [step, setStep] = useState(1)
  const [styleIds, setStyleIds] = useState<string[]>([])
  const [styleLevels, setStyleLevels] = useState<StyleLevels>({})
  const [availability, setAvailability] = useState<Availability>(emptyAvailability)
  // « Personnalisé » choisi au clic, avant la première case cochée.
  const [customStarted, setCustomStarted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [failed, setFailed] = useState(false)

  // Modifier ses choix plus tard : mêmes écrans, préremplis (D62).
  useEffect(() => {
    fetchProfile()
      .then((profile) => {
        if (!profile) return
        setStyleIds(Object.keys(profile.style_levels))
        setStyleLevels(profile.style_levels)
        setAvailability({ ...emptyAvailability(), ...profile.availability })
      })
      .catch(() => {})
  }, [])

  const orderedChosen = (styles.data ?? []).filter((s) => styleIds.includes(s.id))

  function toggleStyle(id: string) {
    setStyleIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))
  }

  function goToLevels() {
    setStyleLevels((previous) => levelsForStyles(styleIds, previous))
    setStep(2)
  }

  async function finish() {
    setSaving(true)
    setFailed(false)
    try {
      await saveProfile(levelsForStyles(styleIds, styleLevels), availability)
      navigate('/cours', { replace: true })
    } catch {
      setFailed(true)
      setSaving(false)
    }
  }

  const back = () => (step === 1 ? navigate('/') : setStep(step - 1))

  // Une grille remplie qui ne correspond à aucun raccourci est « Personnalisé » (D62 révisé).
  const shortcut = matchingShortcut(availability)
  const custom = shortcut === null && (customStarted || hasAnyAvailability(availability))

  function startCustom() {
    if (custom) return
    setAvailability(emptyAvailability())
    setCustomStarted(true)
  }

  if (step === 1) {
    return (
      <QuestionLayout
        step={1}
        stepCount={STEP_COUNT}
        title="Quels styles te font bouger ?"
        subtitle="Plusieurs choix possibles."
        onBack={back}
        action={
          <Button onClick={goToLevels} disabled={styleIds.length === 0}>
            Continuer
          </Button>
        }
      >
        <InfoMessage>Tu pourras changer tes choix à tout moment depuis la liste des cours.</InfoMessage>
        <div className="flex flex-wrap gap-150">
          {(styles.data ?? []).map((style) => (
            <Chip key={style.id} selected={styleIds.includes(style.id)} onToggle={() => toggleStyle(style.id)}>
              {style.label}
            </Chip>
          ))}
        </div>
        {styles.isError && (
          <p role="alert" className="type-body text-text-error-default">
            Les styles n'ont pas pu être chargés. Vérifie ta connexion et réessaie.
          </p>
        )}
      </QuestionLayout>
    )
  }

  if (step === 2) {
    return (
      <QuestionLayout
        step={2}
        stepCount={STEP_COUNT}
        title="Et ton niveau, style par style ?"
        subtitle="Beaucoup de cours sont ouverts à tous les niveaux."
        onBack={back}
        action={<Button onClick={() => setStep(3)}>Continuer</Button>}
      >
        <dl className="flex flex-col gap-150 rounded-lg bg-bg-neutral-strong-default p-200">
          {LEVELS.map((level) => (
            <div key={level} className="flex flex-col gap-050">
              <dt className="type-label text-text-neutral-strong-default">{LEVEL_LABELS[level]}</dt>
              <dd className="type-body-small text-text-neutral-subtle-default">{LEVEL_DESCRIPTIONS[level]}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-col gap-200">
          {orderedChosen.map((style) => (
            <LevelSelector
              key={style.id}
              styleLabel={style.label}
              value={styleLevels[style.id]}
              onChange={(level) => setStyleLevels((levels) => ({ ...levels, [style.id]: level }))}
            />
          ))}
        </div>
      </QuestionLayout>
    )
  }

  return (
    <QuestionLayout
      step={3}
      stepCount={STEP_COUNT}
      title="Quand es-tu libre pour danser ?"
      onBack={back}
      action={
        <div className="flex flex-col gap-100">
          {failed && (
            <p role="alert" className="type-body text-text-error-default">
              Tes choix n'ont pas pu être enregistrés. Vérifie ta connexion et réessaie.
            </p>
          )}
          <Button onClick={finish} disabled={!hasAnyAvailability(availability) || saving}>
            Voir mes cours
          </Button>
        </div>
      }
    >
      <div className="flex flex-wrap gap-150">
        {SHORTCUTS.map((s) => (
          <Chip
            key={s.id}
            selected={shortcut === s.id}
            onToggle={() => {
              setAvailability(s.availability)
              setCustomStarted(false)
            }}
          >
            {s.label}
          </Chip>
        ))}
        <Chip selected={custom} onToggle={startCustom}>
          Personnalisé
        </Chip>
      </div>
      <AvailabilityGrid
        value={availability}
        onToggle={(day, slot) =>
          setAvailability((a) => ({ ...a, [day]: { ...a[day], [slot]: !a[day][slot] } }))
        }
      />
    </QuestionLayout>
  )
}
