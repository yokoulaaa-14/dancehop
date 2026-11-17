import { Outlet } from 'react-router'
import { Atmosphere } from '@/components/Atmosphere'
import { TabBar } from './TabBar'

const ATMOSPHERE_HEIGHT_PLACEHOLDER = 420

/** Coque des écrans après l'onboarding : le contenu de l'onglet, et la barre d'onglets qui flotte dessus (D66, D70). */
export function AppShell() {
  return (
    <div className="relative min-h-dvh bg-bg-neutral-default">
      <Outlet />
      <TabBar />
    </div>
  )
}

/** Écran d'attente des parcours pas encore construits (écran d'atmosphère, design.md). */
export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="relative flex h-dvh flex-col justify-center overflow-hidden bg-bg-neutral-default px-300">
      <Atmosphere height={ATMOSPHERE_HEIGHT_PLACEHOLDER} />
      <p className="relative type-display glow-display text-text-neutral-strong-default">{title}</p>
    </div>
  )
}
