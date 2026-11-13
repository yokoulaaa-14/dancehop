import type { ReactNode } from 'react'
import { NavLink } from 'react-router'
import { cn } from 'cn'

// Barre d'onglets en capsule de verre (D66, D70), maquette « Ready to dev » de la page Cours.
// Dimensions de composant, sans token (design.md, Layout) : 64 px de haut, 28 px au-dessus de la zone sûre.
export const TAB_BAR_HEIGHT_PX = 64
export const TAB_BAR_BOTTOM_OFFSET_PX = 28
/** Marge à laisser sous le dernier contenu d'un écran pour qu'il passe au-dessus de la barre. */
export const TAB_BAR_CLEARANCE = `calc(${TAB_BAR_HEIGHT_PX + TAB_BAR_BOTTOM_OFFSET_PX}px + env(safe-area-inset-bottom))`

const ICON_SIZE_PX = 22
const ICON_STROKE = 1.8

function TabIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden
      width={ICON_SIZE_PX}
      height={ICON_SIZE_PX}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={ICON_STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      {children}
    </svg>
  )
}

const TABS = [
  { to: '/cours', label: 'Cours', icon: <path d="M4 6h16M4 12h16M4 18h10" /> },
  {
    to: '/mes-cours',
    label: 'Mes cours',
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <path d="M8.5 12.2l2.4 2.4 4.6-5" />
      </>
    ),
  },
  {
    to: '/profil',
    label: 'Profil',
    icon: (
      <>
        <circle cx="12" cy="8.5" r="3.8" />
        <path d="M4.8 20c.9-3.6 3.8-5.6 7.2-5.6s6.3 2 7.2 5.6" />
      </>
    ),
  },
] as const

export function TabBar() {
  return (
    <nav
      aria-label="Navigation principale"
      className="glass fixed inset-x-200 z-10 flex gap-050 rounded-full p-075"
      style={{
        height: TAB_BAR_HEIGHT_PX,
        bottom: `calc(${TAB_BAR_BOTTOM_OFFSET_PX}px + env(safe-area-inset-bottom))`,
      }}
    >
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            cn(
              'flex flex-1 flex-col items-center justify-center gap-025 rounded-full type-body-small transition-colors',
              isActive
                ? 'lit [font-weight:var(--font-weight-body-strong)]'
                : 'text-text-neutral-default active:bg-bg-neutral-strong-pressed',
            )
          }
        >
          <TabIcon>{tab.icon}</TabIcon>
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}
