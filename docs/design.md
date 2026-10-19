---
version: alpha
name: Dancehop
description: Direction artistique de Dancehop, planning de cours de danse urbaine à Paris. Palette Nuit, trois polices à rôle fixe, atmosphère éthérée sur les écrans sans donnée.
colors:
  surface: "#0c1320"
  on-surface: "#e9e5dc"
  on-surface-muted: "#a7a6a4"
  on-surface-faint: "#868787"
  outline: "#3d4149"
  surface-container: "#1c222d"
  primary: "#9fd6ff"
  on-primary: "#0b1016"
  primary-bright: "#e6f5ff"
  light-blue: "#4f7fd9"
  light-violet: "#6b5cff"
typography:
  display:
    fontFamily: Instrument Serif
    fontSize: 40px
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: -0.005em
  title-day:
    fontFamily: Sofia Sans Extra Condensed
    fontSize: 32px
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: 0.02em
  title-section:
    fontFamily: Sofia Sans Extra Condensed
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.02em
  label:
    fontFamily: Sofia Sans Extra Condensed
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.06em
  body:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
  body-strong:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.45
  time:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.45
    fontFeature: "\"tnum\" 1"
  caption:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
  button:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1
  input:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.4
rounded:
  none: 0px
  sm: 8px
  md: 10px
  lg: 14px
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  gutter: 20px
  gutter-atmosphere: 24px
  chip-gap: 10px
  row-padding: 12px
  target: 44px
components:
  chip:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    height: 44px
    padding: 0 14px
  chip-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.full}"
    height: 44px
    padding: 0 14px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    height: 48px
    padding: 0 22px
  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    height: 48px
    padding: 0 8px
  input:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    typography: "{typography.input}"
    rounded: "{rounded.lg}"
    height: 48px
    padding: 0 16px
  level-card:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 14px 16px
  availability-cell:
    backgroundColor: "{colors.surface-container}"
    rounded: "{rounded.sm}"
    height: 36px
  course-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: 12px 0
  day-header:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.title-day}"
  planning-bar:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: 12px 20px 22px
  glass-surface:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
  course-level-note:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-faint}"
    typography: "{typography.caption}"
  light-halo-ice:
    backgroundColor: "{colors.primary}"
  light-halo-blue:
    backgroundColor: "{colors.light-blue}"
  light-halo-violet:
    backgroundColor: "{colors.light-violet}"
---

# design.md

À lire avant de générer ou modifier tout écran, composant ou texte d'interface. L'en-tête YAML est la source de vérité des tokens (D47) : `src/styles/tokens.css` en est généré par `npm run tokens`, jamais édité à la main. La prose suit l'ordre de la spécification DESIGN.md ; les titres de section restent en anglais pour l'outil, le contenu est en français. Direction artistique tranchée le 19/10 (D44 à D47) à partir de l'atelier FigJam (https://www.figma.com/board/7bPq3e7G7zt1cwsrBXBDC9), du comparateur de la liste des cours (https://claude.ai/artifact/YFU216pNndZPd5Cft8SX9v), de l'essai d'onboarding (https://claude.ai/artifact/83SmoVw6crnSo8K4T96rTQ) et de sa v2 à leviers réglables (https://claude.ai/artifact/28aYM26Qr5fnC1Dw2abCSF).

## Overview

**Personnalité.** Mots-clés : mouvements, sobre, aérien, sérénité, délicatesse, éthéré.

- *Aérienne et froide.* Bleu nuit, blanc cassé, accent glace, et beaucoup d'espace vide. L'interface respire ; elle ne réchauffe rien et ne cherche pas à être amicale.
- *Sobre, pas austère.* L'interface se tait pour laisser la place aux cours. Une seule chose parle fort par écran : le titre.
- *Délicate, pas fragile.* Typographie fine et condensée, mais jamais au prix de la lisibilité : graisses et contrastes minimaux fixés plus bas.
- *En mouvement.* Le mouvement du moodboard (pose longue, flou, traînées) se retrouve dans les transitions entre écrans et dans la lumière qui dérive, pas dans des éléments d'interface qui bougent.
- *Éthérée.* Sur les écrans où il n'y a rien à lire (accueil, onboarding, états vides, confirmations), l'app a son moment d'atmosphère : un titre en serif italique posé sur un calque de lumière. Sur les écrans de donnée, rien de tout ça (D45).

**Références.**

- Moodboard de l'atelier (planche 4) : pose longue, traînées de lumière, chrome liquide, eau, portraits flous, affiches « The Art of Movement » et JUOS.
- Le courant « ethereal » (délicatesse, apesanteur, brume et lumière, serif italique minimal), en particulier l'affiche bleue de la planche 4 : silhouette floue dans la foule, bleu nuit, titre serif italique. On en prend l'atmosphère, la lumière et le titre ; on n'en prend ni le bas contraste du texte ni les corps (D45).
- Position sur les axes : raffiné, froid, aéré, sérieux, entre institutionnel et street.
- Terrain (planche 2) : ce que les trois studios font déjà. Lax en noir et blanc minimaliste, JDS en stickers et textures, Ambassadeur en saturé et dégradés. On ne copie aucun des trois ; on se place à côté, plus calme, avec la même condensation typographique mais en minuscules.

Anti-références produit : dans `product.md`. Mobile-first, la cible utilise un téléphone plus qu'un PC (D11, D20). Fond sombre par défaut, pas de thème clair en MVP.

## Colors

Palette « Nuit », règle 60 / 30 / 10 (D44) : `surface` est le fond (60 %), `on-surface` le texte (30 %), `primary` l'accent (10 %). Trois couleurs, aucune autre en interface : `on-surface-muted`, `on-surface-faint`, `outline` et `surface-container` sont des teintes du texte sur le fond (70 %, 55 %, 22 %, 7 %), figées en hex pour que le lint calcule le contraste. `primary` n'apparaît que sur une action (ajouter, exporter, filtre actif) ou un état actif ; `primary-bright` ne sert qu'à la fin du dégradé des sélections. `light-blue` et `light-violet` sont des couleurs de lumière, pour le calque d'atmosphère seulement, jamais pour un élément d'interface.

Contrastes : texte / fond 14:1, secondaire 7,3:1, mention 4,9:1 (la limite basse, réservée aux métadonnées), accent / fond 11:1, libellé noir sur accent 13:1. L'effet « bas contraste » du style éthéré se joue sur les secondaires et les filets, jamais sur le texte principal.

Pas de couleur d'erreur (D47) : une erreur se dit en `on-surface`, avec le champ cerclé en `primary` et une icône devant le message. Si un rouge froid devient nécessaire, ce sera un token de plus, arbitré.

## Typography

Trois polices à rôle fixe (D44, D45), toutes sur Google Fonts, aucune autre :

- *Structure* : Sofia Sans Extra Condensed (`title-day`, `title-section`, `label`), variable. Titres de jour à 700, jamais sous 500 sur fond sombre ; casse normale (« Mardi ») sauf `label`, en capitales (« ÉTAPE 1 SUR 3 ») ; léger interlettrage positif. Jamais sur un nom de prof ni de studio.
- *Texte* : Hanken Grotesk (`body`, `body-strong`, `time`, `caption`, `button`, `input`), graisses 400 à 600, jamais en dessous de 400 sur fond sombre. Base 14 px. `time` porte les chiffres tabulaires pour les horaires. `caption` (12 px) ne sert qu'aux métadonnées (« 1h30 », « 2 cours »), en `on-surface-muted` au minimum. `input` reste à 16 px, sinon iOS zoome au focus.
- *Atmosphère* : Instrument Serif italique (`display`), 40 px sur mobile, réservé à la question de chaque étape d'onboarding, à l'accueil, aux états vides et aux confirmations. Jamais dans la liste des cours ni sur une donnée. Il porte une lueur de l'accent (ombres portées 18 px à 45 % et 44 px à 30 %), sans animation d'arrivée (D46).

## Layout

Le vide fait partie du dessin : marges généreuses, listes aérées, une information par ligne ; on préfère faire défiler plutôt que tasser. Unité de 4 px. Gouttière de 20 px sur les écrans de donnée, 24 px sur les écrans d'atmosphère. Liste, pas grille : les cours se lisent par jour, triés par heure ; les chevauchements sont des lignes voisines (D20). Chaque ligne de cours : heure en `time`, style en `body-strong`, prof et studio en `body` secondaire, mention de niveau en `caption`, action à droite. Toute cible tactile fait au moins `target` (44 px), même quand le texte fait 14 px.

## Elevation & Depth

Deux régimes.

- *Écrans de donnée* (liste des cours, fiche cours, mon planning) : plat. La hiérarchie vient des filets (`outline`) et des surfaces (`surface-container`), sans ombre ni flou. Rien derrière la donnée.
- *Écrans d'atmosphère* (connexion, onboarding, états vides, confirmation d'export) : un **calque de lumière** derrière l'en-tête (D45, D46) : trois halos flous (`primary`, `light-blue`, `light-violet` à 0,5), flou 42 px, brume à 1, grain à 0,8 en `soft-light`. La lumière dérive lentement (aller-retour de 20 s), seule chose qui bouge au repos ; coupée par `prefers-reduced-motion`. Pas de traînées animées, pas de seconde source. Le texte posé dessus garde le contraste AA ; un libellé secondaire qui passerait sous 4,5:1 sur la brume repasse en pleine opacité. Les surfaces y sont en **verre dépoli** (`glass-surface` : flou d'arrière-plan 12 px, liseré clair de 1 px en haut) ; le verre s'applique aussi à la barre « Mon planning », nulle part ailleurs.

Une sélection s'allume (D46) : `chip-selected`, la case de disponibilité cochée et le bouton principal portent un dégradé de `primary` vers `primary-bright` et une lueur extérieure de 16 px de `primary` à 45 %, libellé en `on-primary`.

## Shapes

Arrondi doux sur ce qui se touche, rien sur ce qui se lit. `full` pour les chips, `lg` (14 px) pour les boutons, cartes, champs et la barre du planning, `sm` (8 px) pour les cases de disponibilité, `md` (10 px) pour les petits boutons. Les lignes de liste et les en-têtes de jour n'ont aucun rayon.

## Components

Les composants partent de shadcn/ui, restylés avec les tokens ci-dessus, jamais laissés en style par défaut ; aucune autre librairie. Un composant existant se réutilise avant d'en créer un.

- `chip` / `chip-selected` : styles dans l'onboarding et les filtres de la liste. 44 px de haut, texte en `body`, sélection en `body-strong`.
- `button-primary` / `button-ghost` : une seule action principale par écran. Le ghost n'a ni fond ni bordure visibles.
- `input` : 16 px, 48 px de haut, cerclé en `primary` au focus et en cas d'erreur.
- `level-card` : les trois niveaux de l'onboarding, titre en `title-section`, description en `body` secondaire ; cochée, bordure en `primary`.
- `availability-cell` : la grille 7 jours × 2 plages ; cochée, remplie en `primary`.
- `course-row` et `day-header` : la liste des cours, plats, séparés par un filet `outline`.
- `planning-bar` : barre basse « Mon planning · n », compteur en `title-section`, action d'export à droite ; en verre.
- `glass-surface` : la surface des écrans d'atmosphère. Le token donne la couleur opaque de repli (`surface-container`) ; en CSS, la surface réelle est `on-surface` à 7 % avec un flou d'arrière-plan de 12 px.
- `course-level-note` : la mention « niveau non précisé par le studio » sous une ligne de cours, en `caption` et `on-surface-faint`.
- `light-halo-ice` / `light-halo-blue` / `light-halo-violet` : les trois halos du calque de lumière, décrits dans Elevation & Depth. Ce ne sont pas des composants d'interface ; ils sont là pour que les couleurs de lumière aient un usage déclaré.

## Do's and Don'ts

- Contraste AA sur tout texte et toute icône porteuse de sens ; 44 px de cible minimum ; focus visible en `primary` ; une information n'est jamais portée uniquement par la couleur (styles, studios, cours dans le planning : texte, forme ou position en plus).
- `primary` sur une action ou un état actif, jamais en décoration.
- Le serif italique n'apparaît jamais sur une donnée ni dans la liste ; Sofia n'apparaît jamais sur un nom de prof ni de studio.
- Aucune police, couleur ou librairie de composants en dehors de celles consignées.
- Pas de photo de prof (D08). Les fonds évoquent la lumière et la matière (traînées, chrome, eau, brume), jamais des silhouettes de danseurs. Pas de photos de personnes.
- Le prix est affiché, jamais filtrant (D09). Le studio est nommé par son nom propre, jamais « école » ou « studio » en libellé générique (D30).
- Rien n'est caché derrière un cache : un planning hors ligne est un planning périmé (D22).
- Anti-références visuelles : ClassPass (grille marketplace avec catégories, notes et avis) ; Google Agenda (blocs colorés qui se chevauchent dans une grille horaire, l'agenda illisible du problème, D03) ; dashboard SaaS (cartes KPI, sidebar, template admin, palette par défaut d'une librairie, D34) ; Inter comme police par défaut ; les affiches de battle en capitales saturées, qui sont le terrain, pas l'app.

## Mouvement

Les transitions entre écrans utilisent un flou de mouvement (14 px, 300 ms, flou + léger déplacement), sans traînée ni aberration chromatique (D46). Au repos, seule la lumière du calque dérive ; l'interface, elle, ne bouge pas : pas de parallaxe, pas d'animation décorative. Tout respecte `prefers-reduced-motion` (transition coupée, lumière immobile). L'attente pendant un chargement (pulsation de la brume, avec ou sans texte) : à décider au premier chargement réel (D46).

## Ton rédactionnel

- Tout le texte utilisateur est en français (D19).
- Vocabulaire fixé : « mon planning » (la sélection), « ajouter à mon planning » / « retirer de mon planning » ; « indicateur de progression », jamais « gamification » (D24). L'outil n'est pas un « générateur » (D05).
- Les mentions obligatoires, telles quelles : « planning de saison, vérifie sur le site du studio » (D07) ; « prof variable, vérifie auprès du studio » (D30) ; « niveau non précisé par le studio » (D30) ; « non précisé » pour le type (D31).
- Court et direct, comme la personnalité : pas d'exclamation, pas d'emoji, pas de ton « copain ». Les questions d'onboarding en serif sont les seules phrases qui se permettent une image (« Quels styles te font bouger ? »).
- Écriture inclusive : à définir (forme retenue).
