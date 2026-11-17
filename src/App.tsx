import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { CoursesScreen } from '@/features/courses/CoursesScreen'
import { OnboardingFlow } from '@/features/onboarding/OnboardingFlow'
import { Welcome } from '@/features/onboarding/Welcome'
import { AppShell, ComingSoon } from '@/features/shell/AppShell'

const router = createBrowserRouter([
  { path: '/', element: <Welcome /> },
  // L'onboarding n'a pas de barre d'onglets (D66).
  { path: '/onboarding', element: <OnboardingFlow /> },
  {
    element: <AppShell />,
    children: [
      { path: '/cours', element: <CoursesScreen /> },
      { path: '/mes-cours', element: <ComingSoon title="Tes cours choisis arrivent bientôt." /> },
      { path: '/profil', element: <ComingSoon title="Ton profil arrive bientôt." /> },
    ],
  },
  { path: '/connexion', element: <ComingSoon title="La connexion arrive bientôt." /> },
])

export default function App() {
  return <RouterProvider router={router} />
}
