import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { Atmosphere } from '@/components/Atmosphere'
import { OnboardingFlow } from '@/features/onboarding/OnboardingFlow'
import { Welcome } from '@/features/onboarding/Welcome'

const ATMOSPHERE_HEIGHT_PLACEHOLDER = 420

/** Écran d'attente des parcours pas encore construits (liste des cours, connexion). */
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="relative flex h-dvh flex-col justify-center overflow-hidden bg-bg-neutral-default px-300">
      <Atmosphere height={ATMOSPHERE_HEIGHT_PLACEHOLDER} />
      <p className="relative type-display glow-display text-text-neutral-strong-default">{title}</p>
    </div>
  )
}

const router = createBrowserRouter([
  { path: '/', element: <Welcome /> },
  { path: '/onboarding', element: <OnboardingFlow /> },
  { path: '/cours', element: <ComingSoon title="Ta liste de cours arrive bientôt." /> },
  { path: '/connexion', element: <ComingSoon title="La connexion arrive bientôt." /> },
])

export default function App() {
  return <RouterProvider router={router} />
}
