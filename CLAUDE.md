# CLAUDE.md

Contexte permanent du projet, lu au début de chaque session. S'il y a besoin de plus de détails, regarde les décisions détaillées dans `docs/arbitrage.md`.

## Projet

Une web-app mobile-first qui aide un danseur à construire son planning hebdomadaire de cours de danse urbaine à Paris, à partir d'une liste filtrée des cours de trois studios curés. Nom de code provisoire : Dancehop. Le détail du problème, des utilisateurs, du périmètre et des écrans sont dans `docs/product.md`.

Il s'agit d'un projet personnel qui n'est pas voué à être commercialisé pour l'instant. 

## Stack

- Front : React + Vite + TypeScript (strict)
- UI : Tailwind + shadcn/ui ; aucune autre librairie de composants
- Base et auth : Supabase (Postgres, lien magique, RLS sur toutes les tables ; aucun backend custom)
- Hébergement : Vercel
- Analytics : PostHog
- Emails : Resend
- Déjà arbitrées (D19) : React Router, TanStack Query, react-hook-form + zod, Vitest (moteur de filtrage et export .ics seulement), GitHub Actions
- Aucune nouvelle dépendance sans arbitrage consigné.

## Règles dures

1. Rien n'est codé sans arbitrage consigné dans `docs/arbitrage.md`
2. Le journal est la source de vérité. Une demande qui le contredit se signale (« ça contredit D05 [nom de la décision]»), elle ne s'implémente pas en silence.

## Protocole de démarrage

1. Lis `TODO.md` et rappelle moi les 3 prochaines tâches à faire.
3. Lis les documents liés à la tâche (règles d'usage ci-dessous).

## Structure du repo

```
CLAUDE.md               ce fichier
TODO.md                 lire en début de session ; Toujours demander une validation avant de cocher une tâche en "done"
README.md               mettre à jour quand l'état ou le périmètre change. Toujours demander une validation 
docs/
  arbitrage.md          écrire la décision avant de coder
  product.md            lire avant les décisions importants de l'évolution du produit (fonctionnalités, objectifs), de créer ou modifier un écran ; mettre à jour si le périmètre change en demandant la validation
  design.md             lire avant de générer ou modifier tout écran, composant ou texte d'interface ; format DESIGN.md (D47) : l'en-tête YAML est la source de vérité des tokens, `npm run tokens` après chaque changement
  data-model.md         lire avant toute migration, requête ou saisie ; mettre à jour à chaque migration
  audit-studios.md      lire lors de la saisie d'un studio ; archive, pas de mise à jour
src/
  components/ui/        composants shadcn copiés ; restylables, jamais réécrits à la main
  lib/supabase.ts       client Supabase (variables dans .env, modèle dans .env.example)
  styles/tokens.css     GÉNÉRÉ par `npm run tokens` depuis docs/design.md ; jamais édité à la main
supabase/
  migrations/           une migration par changement de schéma, jamais modifiée après application
  seed.sql              données de référence rejouables (les 13 styles)
```

Règles contre les doublons :
- `TODO.md` doit rappeler la question ouverte
- Une particularité d'un seul studio reste dans `audit-studios.md`. Une règle valable pour tous va dans `data-model.md`. 
- Anti-références : celles du produit dans `product.md`, les visuelles dans `design.md`.

## Conventions

- Commits en français, à l'impératif, courts. Un changement par PR.
- Tables et colonnes en anglais, `snake_case` ; composants React en `PascalCase`. Pas de valeur magique : constantes nommées.
- Une migration par changement de schéma, jamais modifiée après application.
- Commandes : `npm run dev` (serveur local), `npm run build` (typecheck + build), `npm run lint` (oxlint), `npm run lint:design` (structure, références et contraste AA de `docs/design.md`), `npm run tokens` (régénère `src/styles/tokens.css`), `npm test` (Vitest), `npx supabase migration new <nom>` (nouvelle migration).
- Migrations : le projet Supabase est relié au repo GitHub ; un push sur `main` applique automatiquement les nouveaux fichiers de `supabase/migrations/` à la base de production. Donc : jamais de changement de schéma dans l'interface Supabase, jamais de fichier de migration modifié après son push, et relire chaque migration avant de pousser (une erreur casse la base en production).
