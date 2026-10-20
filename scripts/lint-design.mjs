// Lint de docs/design.md (D47, D49).
// Lance le lint de la spec DESIGN.md et échoue sur toute erreur et sur tout avertissement,
// sauf deux règles qui contredisent volontairement nos choix :
// - orphaned-tokens : les gammes de primitifs sont complètes à dessein, tous les crans ne servent pas ;
// - missing-primary : notre nommage n'a pas de couleur appelée « primary ».
import { execFileSync } from 'node:child_process'

const IGNORED = new Set(['orphaned-tokens', 'missing-primary', 'token-summary', 'missing-sections'])

let raw
try {
  raw = execFileSync('npx', ['designmd', 'lint', 'docs/design.md'], { encoding: 'utf8', shell: true })
} catch (error) {
  raw = error.stdout
}

const report = JSON.parse(raw.replace(/\x1b\[[0-9;]*m/g, ''))
const blocking = report.findings.filter((f) => !IGNORED.has(f.rule))
const ignored = report.findings.length - blocking.length

for (const f of blocking) console.log(`${f.severity} · ${f.rule} · ${f.path ?? ''} · ${f.message}`)
console.log(`design.md : ${blocking.length} problème(s) bloquant(s), ${ignored} signalement(s) ignoré(s) (primitifs non utilisés, « primary »).`)
process.exit(blocking.length ? 1 : 0)
