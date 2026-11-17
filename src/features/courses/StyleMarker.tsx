import type { ReactNode } from 'react'
import type { StyleFamily } from './model'

// Repère de style (D71) : une forme et une couleur par famille, 8 px, après le nom du style.
// Formes dessinées dans un carré de 8 (design.md, Colors).
const MARKER_SIZE_PX = 8
const RING_STROKE = 1.7

// Classes écrites en entier pour que Tailwind émette les tokens icon-style-{famille}-default.
const SHAPES: Record<StyleFamily, ReactNode> = {
  hiphop: <rect x="0.5" y="0.5" width="7" height="7" rx="1" className="fill-icon-style-hiphop-default" />,
  funk: <path d="M4 0.4 L7.9 7.6 L0.1 7.6 Z" className="fill-icon-style-funk-default" />,
  club: <path d="M4 0 L8 4 L4 8 L0 4 Z" className="fill-icon-style-club-default" />,
  ballroom: <circle cx="4" cy="4" r="4" className="fill-icon-style-ballroom-default" />,
  afro: <path d="M0 7.2 C0 1.2 8 1.2 8 7.2 Z" className="fill-icon-style-afro-default" />,
  studio: (
    <circle cx="4" cy="4" r="3.15" fill="none" strokeWidth={RING_STROKE} className="stroke-icon-style-studio-default" />
  ),
}

/** Décoratif : le nom du style est toujours écrit à côté, la couleur ne porte rien seule. */
export function StyleMarker({ family }: { family: StyleFamily }) {
  return (
    <svg aria-hidden width={MARKER_SIZE_PX} height={MARKER_SIZE_PX} viewBox="0 0 8 8" className="shrink-0">
      {SHAPES[family]}
    </svg>
  )
}
