# Dancehop (nom provisoire)

## Mission

Aider un danseur en région parisienne à construire son planning de danse hebdomadaire selon des studios de référence connu, sans avoir à éplucher tous les studios (professeurs, horaires, styles, niveau).

## Ce que fait le produit

- Tu indiques les styles qui t'intéressent, ton niveau et tes disponibilités.
- Tu obtiens la liste des cours compatibles dans trois studios reconnus (Lax Studio, Juste Debout School, Ambassadeur d'Espérance), jour par jour, avec le prof, le lieu, le métro et le prix.
- Tu ajoutes les cours qui te tentent à ton planning, puis tu l'exportes dans ton agenda.

Les studios sont choisis pour leur qualité d'enseignement. La liste des studios intégrés est vouée à évoluer.

## État actuel

16/10/2026 — Phase de cadrage terminée : décisions, périmètre, modèle de données et audit des studios sont écrits dans `docs/`. Pas encore de code.

## Construit avec

React pour l'interface, Supabase pour la base de données et les comptes, Vercel pour l'hébergement, PostHog pour mesurer l'usage.

## Comment le style arrive à l'écran

Chaque outil intervient à un moment différent : `design.md` décide des valeurs, Tailwind les rend utilisables dans le code, shadcn fournit les composants de base, React assemble les écrans.

```
docs/design.md  ──npm run tokens──▶  src/styles/tokens.css  ──▶  classes Tailwind
 (les valeurs)                        (variables CSS)               (bg-…, text-…, p-…)
                                                                          │
                                                                          ▼
                                     src/components/ui/  ◀── shadcn (composants copiés)
                                                                          │
                                                                          ▼
                                                                  écrans React
```

1. **`docs/design.md`, la source.** Un document, pas du code. Son en-tête YAML contient toutes les valeurs (couleurs, polices, tailles, espacements, rayons) ; la prose dessous dit comment s'en servir. Le navigateur ne le lit jamais. Changer une couleur, c'est ici et nulle part ailleurs.
2. **`npm run tokens`, la traduction.** Raccourci déclaré dans `package.json` qui lance l'outil `designmd` (paquet `@google/design.md`) : il lit le YAML et écrit `src/styles/tokens.css`, des variables CSS que Tailwind sait lire. À lancer à la main après chaque changement de valeur dans `design.md`. Le fichier est généré, jamais édité à la main. La CI le régénère et échoue s'il diffère du fichier commité : un oubli ne passe pas.
3. **Tailwind, les valeurs deviennent des classes.** À partir de ces variables, Tailwind fabrique des classes qu'on écrit dans le code : `bg-bg-neutral-default`, `text-text-neutral-subtle-default`, `p-150`. Le double préfixe est voulu : la classe garde le nom complet du token. La palette Tailwind par défaut est coupée (`src/styles/theme-reset.css`) : seules nos valeurs existent, une couleur hors charte ne compile pas.
4. **shadcn, les composants de base.** Pas une librairie installée, mais un catalogue de composants React (bouton, case à cocher, champ, feuille…) dont on copie le code dans `src/components/ui/`. Ils gèrent déjà l'accessibilité, le clavier et le focus. Leur style est en classes Tailwind avec des noms génériques (`--primary`, `--destructive`, `--ring`) ; `src/index.css` relie ces noms à nos tokens. Un composant shadcn prend donc notre charte sans qu'on réécrive son code.
5. **React, l'assemblage.** Les écrans combinent les composants shadcn, des éléments simples stylés avec nos classes et les données de Supabase. C'est la seule couche qui tourne chez l'utilisateur.

| Moment | Qui agit |
|---|---|
| On décide d'une valeur | `design.md` |
| `npm run tokens` | `design.md` devient `tokens.css` |
| On écrit un écran | React, composants shadcn, classes Tailwind |
| `npm run build` | Tailwind ne garde que les classes utilisées, dans un seul fichier CSS |
| L'utilisateur ouvre l'app | seuls React et ce CSS final sont chargés |

**Et Paper ?** Le fichier Paper « Design System » est une copie visuelle des fondations, synchronisée depuis `design.md` pour dessiner et montrer. Le code ne le lit jamais ; en cas d'écart, `design.md` a raison.

Exemple : changer `blue-300` dans `design.md` puis lancer `npm run tokens` recolore tous les boutons principaux, ceux de shadcn comme les nôtres, sans toucher à un composant.
