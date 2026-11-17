import type { ReactNode } from 'react'
import { StyleMarker } from './StyleMarker'
import { courseBadges, courseName, formatDuration, type Course } from './model'

// Ligne de cours (D64 révisé, D69) : nom et repère, durée en haut à droite, prof et studio, badges.
const SMALL_ICON_PX = 14
const ICON_PX = 16
const ICON_STROKE = 1.4
/** Largeur fixe de la durée, pour aligner les « 1h30 » d'une ligne à l'autre (design.md, Layout). */
const DURATION_WIDTH_PX = 30

function Icon({ size, children }: { size: number; children: ReactNode }) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      strokeWidth={ICON_STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 stroke-icon-neutral-subtle-default"
    >
      {children}
    </svg>
  )
}

function Meta({ icon, label, children }: { icon: ReactNode; label: string; children: string }) {
  return (
    <span className="flex items-center gap-075">
      <Icon size={ICON_PX}>{icon}</Icon>
      <span className="sr-only">{label} : </span>
      <span className="type-body text-text-neutral-default">{children}</span>
    </span>
  )
}

export function CourseRow({ course }: { course: Course }) {
  return (
    <article className="flex min-w-0 flex-col gap-050">
      <div className="flex items-baseline justify-between gap-150">
        <h3 className="flex min-w-0 items-center gap-075">
          <span className="type-body-large [font-weight:var(--font-weight-body-strong)] text-text-neutral-strong-default">
            {courseName(course)}
          </span>
          {course.style && <StyleMarker family={course.style.family} />}
        </h3>
        <span className="flex shrink-0 items-center gap-050">
          <Icon size={SMALL_ICON_PX}>
            <circle cx="8" cy="8" r="5.8" />
            <path d="M8 5v3.2l2 1.4" />
          </Icon>
          <span className="sr-only">Durée : </span>
          <span
            className="type-body-small text-text-neutral-subtle-default tabular-nums"
            style={{ width: DURATION_WIDTH_PX }}
          >
            {formatDuration(course.durationMin)}
          </span>
        </span>
      </div>
      <div className="flex flex-wrap gap-x-150 gap-y-025">
        <Meta
          label="Prof"
          icon={
            <>
              <circle cx="8" cy="5.6" r="2.6" />
              <path d="M3 13.5c.6-2.4 2.6-3.7 5-3.7s4.4 1.3 5 3.7" />
            </>
          }
        >
          {course.teacher.name}
        </Meta>
        <Meta
          label="Studio"
          icon={
            <>
              <path d="M8 14s4.5-4 4.5-7.6A4.5 4.5 0 0 0 3.5 6.4C3.5 10 8 14 8 14z" />
              <circle cx="8" cy="6.4" r="1.6" />
            </>
          }
        >
          {course.studio.name}
        </Meta>
      </div>
      <ul className="flex flex-wrap gap-075 pt-050">
        {courseBadges(course).map((badge) => (
          <li
            key={badge}
            className="rounded-sm bg-bg-neutral-strong-default px-100 py-025 type-body-small text-text-neutral-default"
          >
            {badge}
          </li>
        ))}
      </ul>
    </article>
  )
}
