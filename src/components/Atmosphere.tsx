// Calque de lumière des écrans d'atmosphère (D45, D46) : trois halos flous derrière l'en-tête,
// fondus dans le fond. Décoratif, donc caché aux lecteurs d'écran. Couleurs par leurs sémantiques
// bg-atmosphere-1/2/3 (D72), jamais par les primitifs.
const HALOS = [
  'left-[-90px] top-[40px] size-[300px] bg-bg-atmosphere-1',
  'left-[180px] top-[-50px] size-[320px] bg-bg-atmosphere-2',
  'left-[80px] top-[160px] size-[260px] bg-bg-atmosphere-3',
] as const

export function Atmosphere({ height }: { height: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden" style={{ height }}>
      {HALOS.map((halo) => (
        <div key={halo} className={`atmosphere-halo ${halo}`} />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-b from-transparent to-bg-neutral-default" />
    </div>
  )
}
