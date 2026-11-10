// Calque de lumière des écrans d'atmosphère (D45, D46) : trois halos flous derrière l'en-tête,
// fondus dans le fond. Décoratif, donc caché aux lecteurs d'écran.
const HALOS = [
  'left-[-90px] top-[40px] size-[300px] bg-blue-300',
  'left-[180px] top-[-50px] size-[320px] bg-light-blue',
  'left-[80px] top-[160px] size-[260px] bg-light-violet',
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
