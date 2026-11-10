import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Atmosphere } from '@/components/Atmosphere'
import { Button, buttonVariants } from '@/components/ui/button'
import { ensureSession, fetchProfile } from './api'

const ATMOSPHERE_HEIGHT_WELCOME = 560

/** Accueil : promesse, « Commencer » (crée la session anonyme, D61), « J'ai déjà un compte ». */
export function Welcome() {
  const navigate = useNavigate()
  const [starting, setStarting] = useState(false)
  const [failed, setFailed] = useState(false)

  // Quelqu'un qui a déjà fait l'onboarding sur ce téléphone va directement à la liste.
  useEffect(() => {
    fetchProfile()
      .then((profile) => {
        if (profile?.onboarding_completed_at) navigate('/cours', { replace: true })
      })
      .catch(() => {})
  }, [navigate])

  async function start() {
    setStarting(true)
    setFailed(false)
    try {
      await ensureSession()
      navigate('/onboarding')
    } catch {
      setFailed(true)
      setStarting(false)
    }
  }

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-bg-neutral-default">
      <Atmosphere height={ATMOSPHERE_HEIGHT_WELCOME} />
      <main className="relative flex flex-1 flex-col justify-end gap-200 px-300">
        <h1 className="type-display glow-display text-text-neutral-strong-default">
          Dancehop, ton planning de danse centralisé
        </h1>
        <p className="type-body-large text-text-neutral-subtle-default">
          Retrouve l'ensemble des cours qui te permettent de progresser, selon tes envies, ton niveau et tes
          disponibilités.
        </p>
      </main>
      <footer className="relative flex flex-col gap-100 px-300 pt-400 pb-400">
        {failed && (
          <p role="alert" className="type-body text-text-error-default">
            Impossible de démarrer pour l'instant. Vérifie ta connexion et réessaie.
          </p>
        )}
        <Button onClick={start} disabled={starting}>
          Commencer
        </Button>
        <Link to="/connexion" className={buttonVariants({ variant: 'link', size: 'inline' })}>
          J'ai déjà un compte
        </Link>
      </footer>
    </div>
  )
}
