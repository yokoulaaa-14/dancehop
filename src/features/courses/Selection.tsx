import type { KeyboardEvent } from 'react'
import { CourseRow } from './CourseRow'
import type { Course } from './model'

// Mode sélection (D73) : bouton « Sélectionner », croix à gauche, « Ajouter N cours » à droite,
// une case ronde centrée à droite de chaque ligne. Maquettes « Ready to dev » de la page Cours.
const CHECKBOX_PX = 22
const CHECK_ICON_PX = 14
const ICON_STROKE = 1.4
const CLOSE_ICON_PX = 16

export function SelectButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="glass-button flex h-550 items-center rounded-full px-200 type-body-strong text-text-neutral-strong-default"
    >
      Sélectionner
    </button>
  )
}

export function CloseSelectionButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Quitter la sélection"
      className="glass-button flex size-550 items-center justify-center rounded-full text-icon-neutral-default"
    >
      <svg aria-hidden width={CLOSE_ICON_PX} height={CLOSE_ICON_PX} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={ICON_STROKE} strokeLinecap="round">
        <path d="M4 4l8 8M12 4l-8 8" />
      </svg>
    </button>
  )
}

/** « Ajouter », inactif tant que rien n'est choisi, puis « Ajouter N cours » (D73 révisé). */
export function AddButton({ count, pending, onClick }: { count: number; pending: boolean; onClick: () => void }) {
  const disabled = count === 0 || pending
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex h-550 items-center rounded-full px-200 type-body-strong ${
        count === 0 ? 'bg-bg-accent-disabled text-text-accent-inverted-disabled' : 'lit'
      }`}
    >
      {count === 0 ? 'Ajouter' : pending ? 'Ajout…' : `Ajouter ${count} cours`}
    </button>
  )
}

/** Ligne de cours qu'on coche : toute la ligne se touche, la case est centrée à droite. */
export function SelectableCourse({ course, checked, onToggle }: { course: Course; checked: boolean; onToggle: () => void }) {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      onToggle()
    }
  }
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={onKeyDown}
      className={`relative cursor-pointer rounded-md p-150 pr-600 ${checked ? 'bg-bg-accent-inverted-selected' : ''}`}
    >
      <CourseRow course={course} />
      <span
        aria-hidden
        className={`absolute top-1/2 right-150 flex -translate-y-1/2 items-center justify-center rounded-full ${
          checked ? 'lit' : 'border-[1.5px] border-border-neutral-strong-default'
        }`}
        style={{ width: CHECKBOX_PX, height: CHECKBOX_PX }}
      >
        {checked && (
          <svg width={CHECK_ICON_PX} height={CHECK_ICON_PX} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={ICON_STROKE} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 8.2l3 3 6-6.4" />
          </svg>
        )}
      </span>
    </div>
  )
}
