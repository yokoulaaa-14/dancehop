import type { ReactNode } from 'react'
import { ArrowLeft, Check, Info, Moon, Sun } from 'lucide-react'
import { Atmosphere } from '@/components/Atmosphere'
import { Button } from '@/components/ui/button'
import {
  LEVELS,
  LEVEL_LABELS,
  SLOTS,
  WEEKDAYS,
  WEEKDAY_LABELS,
  type Availability,
  type Level,
  type Slot,
  type Weekday,
} from './model'

const ATMOSPHERE_HEIGHT_QUESTION = 380
const ICON_SIZE = 20

/** Gabarit d'une question : retour, progression, question en serif, contenu qui défile, bouton fixé en bas. */
export function QuestionLayout({
  step,
  stepCount,
  title,
  subtitle,
  onBack,
  action,
  children,
}: {
  step: number
  stepCount: number
  title: string
  subtitle?: string
  onBack: () => void
  action: ReactNode
  children: ReactNode
}) {
  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-bg-neutral-default">
      <Atmosphere height={ATMOSPHERE_HEIGHT_QUESTION} />
      <header className="relative flex items-center gap-200 pt-200 pr-300 pl-150">
        <Button variant="ghost" size="icon" onClick={onBack} aria-label="Retour">
          <ArrowLeft size={ICON_SIZE} />
        </Button>
        <Progress step={step} stepCount={stepCount} />
      </header>
      <main className="relative flex flex-1 flex-col gap-300 overflow-y-auto px-300 pt-400 pb-300">
        <div className="flex flex-col gap-100 pb-300">
          <h1 className="type-display glow-display text-text-neutral-strong-default">{title}</h1>
          {subtitle && <p className="type-body text-text-neutral-subtle-default">{subtitle}</p>}
        </div>
        {children}
      </main>
      <footer className="relative p-300">{action}</footer>
    </div>
  )
}

function Progress({ step, stepCount }: { step: number; stepCount: number }) {
  return (
    <div
      className="flex flex-1 gap-050"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={stepCount}
      aria-valuenow={step}
      aria-label={`Étape ${step} sur ${stepCount}`}
    >
      {Array.from({ length: stepCount }, (_, i) => (
        <div
          key={i}
          className={`h-050 flex-1 rounded-full ${i < step ? 'bg-bg-accent-default' : 'bg-border-neutral-strong-default'}`}
        />
      ))}
    </div>
  )
}

export function InfoMessage({ children }: { children: ReactNode }) {
  return (
    <div
      role="note"
      className="flex items-start gap-150 rounded-md border border-border-info-default bg-bg-info-subtle-default px-200 py-150"
    >
      <Info size={ICON_SIZE} className="shrink-0 text-icon-info-default" aria-hidden />
      <p className="type-body text-text-info-default">{children}</p>
    </div>
  )
}

/** Puce à cocher (styles, raccourcis) : elle s'allume quand elle est choisie (D46). */
export function Chip({ selected, onToggle, children }: { selected: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={`flex h-550 items-center rounded-full px-200 ${
        selected
          ? 'lit type-body-strong'
          : 'border border-border-neutral-default bg-bg-neutral-strong-default type-body text-text-neutral-default active:bg-bg-neutral-strong-pressed'
      }`}
    >
      {children}
    </button>
  )
}

/** Sélecteur à trois positions du niveau d'un style (D62). */
export function LevelSelector({
  styleLabel,
  value,
  onChange,
}: {
  styleLabel: string
  value: Level
  onChange: (level: Level) => void
}) {
  return (
    <fieldset className="flex flex-col gap-100">
      <legend className="type-body-strong mb-100 text-text-neutral-default">{styleLabel}</legend>
      <div className="flex gap-050 rounded-full bg-bg-neutral-strong-default p-050">
        {LEVELS.map((level) => (
          <button
            key={level}
            type="button"
            aria-pressed={value === level}
            onClick={() => onChange(level)}
            className={`flex h-550 flex-1 items-center justify-center rounded-full ${
              value === level ? 'lit type-body-strong' : 'type-body text-text-neutral-default'
            }`}
          >
            {LEVEL_LABELS[level]}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

const SLOT_HEADERS: Record<Slot, { label: string; hint: string; icon: typeof Sun }> = {
  day: { label: 'Journée', hint: 'avant 18 h', icon: Sun },
  evening: { label: 'Soirée', hint: 'dès 18 h', icon: Moon },
}

/** Grille 7 jours × 2 plages (D28), dans une carte. */
export function AvailabilityGrid({
  value,
  onToggle,
}: {
  value: Availability
  onToggle: (day: Weekday, slot: Slot) => void
}) {
  return (
    <div className="grid grid-cols-[auto_1fr_1fr] items-center gap-x-200 gap-y-100 rounded-md border border-border-neutral-default bg-bg-neutral-strong-default p-300">
      <span />
      {SLOTS.map((slot) => {
        const { label, hint, icon: Icon } = SLOT_HEADERS[slot]
        return (
          <div key={slot} className="flex flex-col items-center gap-050">
            <Icon size={ICON_SIZE} className="text-icon-neutral-subtle-default" aria-hidden />
            <span className="type-body-small text-text-neutral-default">{label}</span>
            <span className="type-body-small text-text-neutral-subtle-default">{hint}</span>
          </div>
        )
      })}
      {WEEKDAYS.map((day) => (
        <div key={day} className="contents">
          <span className="type-body-strong text-text-neutral-default">{WEEKDAY_LABELS[day]}</span>
          {SLOTS.map((slot) => {
            const checked = value[day][slot]
            return (
              <button
                key={slot}
                type="button"
                role="checkbox"
                aria-checked={checked}
                aria-label={`${WEEKDAY_LABELS[day]}, ${SLOT_HEADERS[slot].label.toLowerCase()}`}
                onClick={() => onToggle(day, slot)}
                className={`flex h-550 items-center justify-center rounded-sm ${
                  checked ? 'lit' : 'border border-border-neutral-strong-default bg-bg-neutral-strong-default'
                }`}
              >
                {checked && <Check size={ICON_SIZE} strokeWidth={2.5} aria-hidden />}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
