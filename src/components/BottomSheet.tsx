import type { ReactNode } from 'react'
import { Dialog } from '@base-ui/react/dialog'

// Panneau qui monte du bas (D64), sur la boîte de dialogue de Base UI : focus piégé, Échap, voile.
// Voile du fond à 75 % et poignée de 36 × 4 px : maquette « Ready to dev » de la page Cours.
const HANDLE_WIDTH_PX = 36
const MAX_HEIGHT = '92dvh'
const CLOSE_ICON_PX = 18
const CLOSE_ICON_STROKE = 1.6

export function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  /** Contenu du panneau, actions comprises. */
  children: ReactNode
}) {
  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-20 bg-[color-mix(in_oklab,var(--color-bg-neutral-default)_75%,transparent)]" />
        <Dialog.Popup
          className="fixed inset-x-0 bottom-0 z-30 flex flex-col gap-250 overflow-y-auto rounded-t-lg border-t border-border-neutral-default bg-bg-neutral-strong-default px-250 pt-150"
          style={{ maxHeight: MAX_HEIGHT, paddingBottom: 'calc(var(--spacing-300) + env(safe-area-inset-bottom))' }}
        >
          <div aria-hidden className="mx-auto h-050 shrink-0 rounded-full bg-border-neutral-strong-default" style={{ width: HANDLE_WIDTH_PX }} />
          <div className="flex items-center justify-between">
            <Dialog.Title className="type-heading-small text-text-neutral-strong-default">{title}</Dialog.Title>
            <Dialog.Close
              aria-label="Fermer"
              className="flex size-550 items-center justify-end text-icon-neutral-default"
            >
              <svg aria-hidden width={CLOSE_ICON_PX} height={CLOSE_ICON_PX} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={CLOSE_ICON_STROKE} strokeLinecap="round">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
