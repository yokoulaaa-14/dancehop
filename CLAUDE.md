# CLAUDE.md

Contexte permanent du projet, lu au début de chaque session. S'il y a besoin de plus de détails, regarde les décisions détaillées dans `docs/arbitrage.md`.

## Projet

Une web-app mobile-first qui aide un danseur à construire son planning hebdomadaire de cours de danse urbaine à Paris, à partir d'une liste filtrée des cours de quatre studios curés. Nom de code provisoire : Dancehop. Le détail du problème, des utilisateurs, du périmètre et des écrans sont dans `docs/product.md`.

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
  design.md             lire avant de générer ou modifier tout écran, composant ou texte d'interface
  data-model.md         lire avant toute migration, requête ou saisie ; mettre à jour à chaque migration
  audit-studios.md      lire lors de la saisie d'un studio ; archive, pas de mise à jour
```

Règles contre les doublons :
- `TODO.md` doit rappeler la question ouverte
- Une particularité d'un seul studio reste dans `audit-studios.md`. Une règle valable pour tous va dans `data-model.md`. 
- Anti-références : celles du produit dans `product.md`, les visuelles dans `design.md`.

## Conventions

- Commits en français, à l'impératif, courts. Un changement par PR.
- Tables et colonnes en anglais, `snake_case` ; composants React en `PascalCase`. Pas de valeur magique : constantes nommées.
- Une migration par changement de schéma, jamais modifiée après application.
- Commandes build / test : à renseigner ici après le scaffold.
