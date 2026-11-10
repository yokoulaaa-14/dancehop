// Complète src/styles/tokens.css avec les interlignes de docs/design.md (D63).
// Le CLI DESIGN.md n'exporte pas `lineHeight` ; on lit le bloc `typography:` de l'en-tête YAML
// et on écrit `--text-{niveau}--line-height`, la variable que Tailwind v4 associe à `text-{niveau}`.
import { readFileSync } from 'node:fs'

const DESIGN_FILE = 'docs/design.md'

const source = readFileSync(DESIGN_FILE, 'utf8')
const typography = /^typography:\n([\s\S]*?)^\S/m.exec(source)
if (!typography) throw new Error(`${DESIGN_FILE} : bloc typography introuvable`)

const lines = []
let level = null
for (const line of typography[1].split('\n')) {
  const levelMatch = /^ {2}([a-z-]+):\s*$/.exec(line)
  if (levelMatch) level = levelMatch[1]
  const heightMatch = /^ {4}lineHeight:\s*([\d.]+)\s*$/.exec(line)
  if (heightMatch && level) lines.push(`  --text-${level}--line-height: ${heightMatch[1]};`)
}
if (lines.length === 0) throw new Error(`${DESIGN_FILE} : aucun lineHeight trouvé`)

process.stdout.write(`\n/* Interlignes, ajoutés par scripts/tokens-line-height.mjs (D63). */\n@theme {\n${lines.join('\n')}\n}\n`)
