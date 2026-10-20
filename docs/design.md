---
version: alpha
name: Dancehop
description: Direction artistique de Dancehop, planning de cours de danse urbaine à Paris. Palette Nuit, tokens à deux étages, trois polices à rôle fixe, atmosphère éthérée sur les écrans sans donnée.
colors:
  # Primitifs (D49) : réserve de valeurs, jamais appelés directement par un écran.
  slate-50: "#f1f5fe"
  slate-100: "#e1e8f5"
  slate-200: "#c8d5ec"
  slate-300: "#b2bfd5"
  slate-400: "#97a3b9"
  slate-500: "#7c889d"
  slate-600: "#626d82"
  slate-700: "#495468"
  slate-800: "#323c4f"
  slate-900: "#1a2334"
  slate-950: "#0c1320"
  neutral-50: "#f6f4ef"
  neutral-100: "#e9e5dc"
  neutral-200: "#d4d0c8"
  neutral-300: "#bcb9b1"
  neutral-400: "#9e9b93"
  neutral-500: "#827e77"
  neutral-600: "#66635c"
  neutral-700: "#4c4942"
  neutral-800: "#333029"
  neutral-900: "#191711"
  neutral-950: "#090704"
  blue-50: "#eff8ff"
  blue-100: "#ddf0fe"
  blue-200: "#c1e4ff"
  blue-300: "#9fd6ff"
  blue-400: "#5ab7f6"
  blue-500: "#0096df"
  blue-600: "#0175af"
  blue-700: "#005683"
  blue-800: "#003958"
  blue-900: "#001b2e"
  blue-950: "#000811"
  red-50: "#ffeff0"
  red-100: "#ffd7d8"
  red-200: "#fab2b7"
  red-300: "#ec8a92"
  red-400: "#d86673"
  red-500: "#be4657"
  red-600: "#9f2b40"
  red-700: "#7b172c"
  red-800: "#560c1c"
  red-900: "#2c070d"
  red-950: "#100405"
  orange-50: "#fff4e5"
  orange-100: "#fbe7cc"
  orange-200: "#f6d2a2"
  orange-300: "#eeba70"
  orange-400: "#db9400"
  orange-500: "#b37900"
  orange-600: "#8d5e01"
  orange-700: "#694500"
  orange-800: "#462d00"
  orange-900: "#241400"
  orange-950: "#0e0500"
  green-50: "#e8faf3"
  green-100: "#d3f0e4"
  green-200: "#ade2ce"
  green-300: "#80d1b5"
  green-400: "#3ab794"
  green-500: "#009877"
  green-600: "#00785d"
  green-700: "#015844"
  green-800: "#003b2c"
  green-900: "#001d14"
  green-950: "#000a06"
  # Couleurs de lumière, hors système : calque d'atmosphère seulement (D45, D46).
  light-blue: "#4f7fd9"
  light-violet: "#6b5cff"
  # Sémantiques (D49) : catégorie.élément.rôle.modificateur.état ; les seuls appelés par les écrans.
  # Neutre : fonds et surfaces
  bg-neutral-default: "{colors.slate-950}"
  bg-neutral-strong-default: "{colors.slate-900}"
  bg-neutral-strong-pressed: "{colors.slate-800}"
  bg-neutral-strong-disabled: "{colors.slate-900}"
  # Neutre : texte, bordures, icônes
  text-neutral-strong-default: "{colors.neutral-50}"
  text-neutral-default: "{colors.neutral-100}"
  text-neutral-subtle-default: "{colors.neutral-400}"
  text-neutral-disabled: "{colors.neutral-600}"
  border-neutral-default: "{colors.slate-800}"
  border-neutral-strong-default: "{colors.slate-700}"
  icon-neutral-default: "{colors.neutral-100}"
  icon-neutral-subtle-default: "{colors.neutral-400}"
  icon-neutral-disabled: "{colors.neutral-600}"
  # Accent
  bg-accent-default: "{colors.blue-300}"
  bg-accent-hover: "{colors.blue-200}"
  bg-accent-pressed: "{colors.blue-400}"
  bg-accent-selected: "{colors.blue-300}"
  bg-accent-disabled: "{colors.slate-800}"
  bg-accent-subtle-default: "{colors.blue-900}"
  text-accent-default: "{colors.blue-300}"
  text-accent-hover: "{colors.blue-200}"
  text-accent-inverted-default: "{colors.slate-950}"
  text-accent-inverted-disabled: "{colors.neutral-600}"
  border-accent-selected: "{colors.blue-300}"
  border-accent-focus: "{colors.blue-300}"
  icon-accent-default: "{colors.blue-300}"
  # État : info
  bg-info-subtle-default: "{colors.blue-900}"
  text-info-default: "{colors.blue-300}"
  icon-info-default: "{colors.blue-300}"
  border-info-default: "{colors.blue-500}"
  # État : success
  bg-success-subtle-default: "{colors.green-900}"
  text-success-default: "{colors.green-300}"
  icon-success-default: "{colors.green-300}"
  border-success-default: "{colors.green-500}"
  # État : warning
  bg-warning-subtle-default: "{colors.orange-900}"
  text-warning-default: "{colors.orange-300}"
  icon-warning-default: "{colors.orange-300}"
  border-warning-default: "{colors.orange-500}"
  # État : error
  bg-error-subtle-default: "{colors.red-900}"
  text-error-default: "{colors.red-300}"
  icon-error-default: "{colors.red-300}"
  border-error-default: "{colors.red-500}"
typography:
  display:
    fontFamily: Instrument Serif
    fontSize: 40px
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: -0.005em
  heading-large:
    fontFamily: Sofia Sans Extra Condensed
    fontSize: 32px
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: 0.02em
  heading-small:
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
  body-large:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.4
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
  body-small:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
  time:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.45
    fontFeature: "\"tnum\" 1"
rounded:
  none: 0px
  sm: 8px
  md: 10px
  lg: 14px
  full: 9999px
spacing:
  "050": 4px
  "100": 8px
  "150": 12px
  "200": 16px
  "250": 20px
  "300": 24px
  "400": 32px
  "600": 48px
  gutter: 20px
  gutter-atmosphere: 24px
  target: 44px
# Couples fond / texte vérifiés par le lint (contraste AA). Pas de dimensions : pas de token par composant (D49).
components:
  page:
    backgroundColor: "{colors.bg-neutral-default}"
    textColor: "{colors.text-neutral-default}"
    typography: "{typography.body}"
  page-heading:
    backgroundColor: "{colors.bg-neutral-default}"
    textColor: "{colors.text-neutral-strong-default}"
    typography: "{typography.heading-large}"
  page-subtle:
    backgroundColor: "{colors.bg-neutral-default}"
    textColor: "{colors.text-neutral-subtle-default}"
    typography: "{typography.body-small}"
  page-link:
    backgroundColor: "{colors.bg-neutral-default}"
    textColor: "{colors.text-accent-default}"
    typography: "{typography.body-strong}"
  surface:
    backgroundColor: "{colors.bg-neutral-strong-default}"
    textColor: "{colors.text-neutral-default}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
  surface-subtle:
    backgroundColor: "{colors.bg-neutral-strong-default}"
    textColor: "{colors.text-neutral-subtle-default}"
    typography: "{typography.body}"
  surface-pressed:
    backgroundColor: "{colors.bg-neutral-strong-pressed}"
    textColor: "{colors.text-neutral-default}"
  surface-input:
    backgroundColor: "{colors.bg-neutral-strong-default}"
    textColor: "{colors.text-neutral-default}"
    typography: "{typography.body-large}"
    rounded: "{rounded.lg}"
  chip:
    backgroundColor: "{colors.bg-neutral-strong-default}"
    textColor: "{colors.text-neutral-default}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
  chip-selected:
    backgroundColor: "{colors.bg-accent-selected}"
    textColor: "{colors.text-accent-inverted-default}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.full}"
  accent-fill:
    backgroundColor: "{colors.bg-accent-default}"
    textColor: "{colors.text-accent-inverted-default}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.lg}"
  accent-fill-hover:
    backgroundColor: "{colors.bg-accent-hover}"
    textColor: "{colors.text-accent-inverted-default}"
  accent-fill-pressed:
    backgroundColor: "{colors.bg-accent-pressed}"
    textColor: "{colors.text-accent-inverted-default}"
  accent-subtle:
    backgroundColor: "{colors.bg-accent-subtle-default}"
    textColor: "{colors.text-accent-default}"
  message-info:
    backgroundColor: "{colors.bg-info-subtle-default}"
    textColor: "{colors.text-info-default}"
  message-success:
    backgroundColor: "{colors.bg-success-subtle-default}"
    textColor: "{colors.text-success-default}"
  message-warning:
    backgroundColor: "{colors.bg-warning-subtle-default}"
    textColor: "{colors.text-warning-default}"
  message-error:
    backgroundColor: "{colors.bg-error-subtle-default}"
    textColor: "{colors.text-error-default}"
---

# design.md

À lire avant de générer ou modifier tout écran, composant ou texte d'interface. L'en-tête YAML est la source de vérité des tokens (D47) : `src/styles/tokens.css` en est généré par `npm run tokens`, jamais édité à la main. La prose suit l'ordre de la spécification DESIGN.md ; les titres de section restent en anglais pour l'outil, le contenu est en français. Direction artistique tranchée le 19/10 (D44 à D47), tokens à deux étages le 20/10 (D49) à partir de l'atelier FigJam (https://www.figma.com/board/7bPq3e7G7zt1cwsrBXBDC9), du comparateur de la liste des cours (https://claude.ai/artifact/YFU216pNndZPd5Cft8SX9v), de l'essai d'onboarding (https://claude.ai/artifact/83SmoVw6crnSo8K4T96rTQ) et de sa v2 à leviers réglables (https://claude.ai/artifact/28aYM26Qr5fnC1Dw2abCSF).

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

**Deux étages** (D49). Les *primitifs* sont six gammes de 11 crans, 50 le plus clair et 950 le plus foncé, générées en OKLCH à partir de nos couleurs : `slate` (fonds), `neutral` (texte), `blue` (accent), `red`, `orange` et `green` (états). Les *sémantiques* pointent sur les primitifs et sont **les seuls tokens qu'un écran appelle** ; les primitifs sont la réserve où l'on pioche une variation (Paper, D48). Une combinaison sémantique qui n'existe pas dans l'en-tête ne s'utilise pas.

**Nommage** : `catégorie.élément.rôle.modificateur.état`, écrit avec des tirets (`--color-text-neutral-subtle-default`).
- *Élément* : `bg`, `text`, `border`, `icon`.
- *Rôle* : `neutral`, `accent`, et les rôles d'état `info`, `success`, `warning`, `error`.
- *Modificateur*, facultatif, du plus bas au plus haut : `subtle`, (rien), `strong` ; plus `inverted` pour le texte posé sur un remplissage plein.
- *État* : `default`, `hover`, `pressed`, `selected`, `focus`, `disabled`. `hover` ne sert qu'au desktop ; sur téléphone, c'est `pressed` qui compte.

**Palette « Nuit », règle 60 / 30 / 10** (D44) : `bg-neutral` (slate-950) est le fond, 60 % ; le texte `neutral` en trois niveaux, 30 % ; l'accent `blue`, 10 %, n'apparaît que sur une action (ajouter, exporter, filtre actif) ou un état actif, jamais en décoration. `bg-neutral-strong` (slate-900) porte les surfaces qui se détachent du fond (chips, cartes, champs, barre), `border-neutral` (slate-800) les filets.

**Texte** : `text-neutral-strong` (neutral-50) pour les titres, `text-neutral` (neutral-100) pour le texte courant, `text-neutral-subtle` (neutral-400) pour le prof, le studio et les mentions. `text-accent-inverted` (slate-950) est le libellé posé sur l'accent plein.

**Rôles d'état** : `info` (gamme `blue` pour l'instant), `success`, `warning`, `error`, chacun avec un fond teinté (`bg-X-subtle`, cran 900), un texte et une icône (cran 300), une bordure (cran 500). Réservés aux messages d'état : jamais en décoration, toujours avec une icône et un texte.

**Lumière** : `light-blue` et `light-violet` sont hors système, pour le calque d'atmosphère seulement, jamais pour un élément d'interface.

Contrastes sur le fond : texte courant 14,8:1, titres 16,9:1, texte discret 6,7:1, accent 12:1, libellé sur accent 12:1, textes d'état sur leur fond teinté de 7,5:1 (`error`) à 11,3:1 (`info`). Le lint vérifie chaque couple déclaré dans `components`. L'effet « bas contraste » du style éthéré se joue sur les éléments discrets et les filets, jamais sur le texte courant. Les états `disabled` sont volontairement sous 4,5:1 (exemptés par WCAG) et ne sont jamais le seul indice qu'un élément est inactif.

## Typography

Trois polices à rôle fixe (D44, D45), toutes sur Google Fonts, aucune autre. Les niveaux sont des **rôles**, jamais des noms de composant (D49).

- *Structure* : Sofia Sans Extra Condensed (`heading-large`, `heading-small`, `label`), variable. `heading-large` (32 px, 700) pour les jours ; `heading-small` (22 px, 600) pour les titres de bloc et le compteur du planning ; `label` (15 px, 500) en capitales (« ÉTAPE 1 SUR 3 »). Jamais sous 500 sur fond sombre ; léger interlettrage positif ; jamais sur un nom de prof ni de studio.
- *Texte* : Hanken Grotesk, graisses 400 à 600, jamais en dessous de 400 sur fond sombre. `body` (14 px) est la base ; `body-strong` (14 px, 600) pour le style d'un cours et les libellés de bouton ; `body-small` (12 px) seulement pour les métadonnées (« 1h30 », « 2 cours »), en `text-neutral-subtle` au minimum ; `body-large` (16 px) obligatoire dans les champs, sinon iOS zoome au focus ; `time` (14 px, 600, chiffres tabulaires) pour les horaires.
- *Atmosphère* : Instrument Serif italique (`display`), 40 px sur mobile, réservé à la question de chaque étape d'onboarding, à l'accueil, aux états vides et aux confirmations. Jamais dans la liste des cours ni sur une donnée. Il porte une lueur de l'accent (ombres portées 18 px à 45 % et 44 px à 30 %), sans animation d'arrivée (D46).

## Layout

Le vide fait partie du dessin : marges généreuses, listes aérées, une information par ligne ; on préfère faire défiler plutôt que tasser. **Échelle chiffrée** sur l'unité de 4 px (D49) : `050` (4), `100` (8), `150` (12), `200` (16), `250` (20), `300` (24), `400` (32), `600` (48). Pas d'espacement propre à un composant : les chips s'espacent de `150`, les lignes de liste ont `150` de marge interne, boutons et champs font `600` de haut. Trois alias de mise en page : `gutter` (20 px, écrans de donnée), `gutter-atmosphere` (24 px, écrans d'atmosphère) et `target` (44 px, cible tactile minimale, même quand le texte fait 14 px).

Liste, pas grille : les cours se lisent par jour, triés par heure ; les chevauchements sont des lignes voisines (D20). Chaque ligne de cours : heure en `time`, style en `body-strong`, prof et studio en `body` et `text-neutral-subtle`, mention de niveau en `body-small`, action à droite.

## Elevation & Depth

Deux régimes.

- *Écrans de donnée* (liste des cours, fiche cours, mon planning) : plat. La hiérarchie vient des filets (`border-neutral`) et des surfaces (`bg-neutral-strong`), sans ombre ni flou. Rien derrière la donnée.
- *Écrans d'atmosphère* (connexion, onboarding, états vides, confirmation d'export) : un **calque de lumière** derrière l'en-tête (D45, D46) : trois halos flous (`blue-300`, `light-blue`, `light-violet` à 0,5), flou 42 px, brume à 1, grain à 0,8 en `soft-light`. La lumière dérive lentement (aller-retour de 20 s), seule chose qui bouge au repos ; coupée par `prefers-reduced-motion`. Pas de traînées animées, pas de seconde source. Le texte posé dessus garde le contraste AA ; un libellé discret qui passerait sous 4,5:1 sur la brume repasse en `text-neutral`. Les surfaces y sont en **verre dépoli** : `text-neutral` à 7 % avec un flou d'arrière-plan de 12 px et un liseré clair de 1 px en haut ; repli opaque `bg-neutral-strong`. Le verre s'applique aussi à la barre « Mon planning », nulle part ailleurs.

Une sélection s'allume (D46) : chip, case de disponibilité cochée et bouton principal portent un dégradé de `bg-accent-selected` (blue-300) vers blue-50 et une lueur extérieure de 16 px de l'accent à 45 %, libellé en `text-accent-inverted`.

**Sans token, en prose** (D49 : la spec DESIGN.md ne les modélise pas) : bordures et filets 1 px ; bordure de sélection 1 px en `border-accent-selected` ; anneau de focus 2 px en `border-accent-focus`, décalé de 3 px ; opacité des éléments désactivés à fixer au premier formulaire ; pas d'ombre portée hors lueurs ci-dessus.

## Shapes

Arrondi doux sur ce qui se touche, rien sur ce qui se lit. `full` pour les chips, `lg` (14 px) pour les boutons, cartes, champs et la barre du planning, `sm` (8 px) pour les cases de disponibilité, `md` (10 px) pour les petits boutons. Les lignes de liste et les en-têtes de jour n'ont aucun rayon.

## Components

Les composants partent de shadcn/ui, restylés avec les tokens sémantiques, jamais laissés en style par défaut ; aucune autre librairie. Un composant existant se réutilise avant d'en créer un. **Pas de token par composant** (D49) : un composant combine des sémantiques, des niveaux typographiques et des pas d'espacement existants.

La section `components` de l'en-tête n'est pas une liste de composants : elle déclare les **couples fond / texte** que l'interface emploie, pour que le lint en vérifie le contraste (`page`, `surface`, `chip`, `chip-selected`, `accent-fill`, `message-error`…). Un nouveau couple s'y déclare avant d'être utilisé.

Composants prévus pour le MVP : chip (styles, filtres) ; bouton principal et bouton sans fond, une seule action principale par écran ; champ ; carte de niveau (onboarding) ; case de disponibilité (grille 7 jours × 2 plages) ; ligne de cours et en-tête de jour (liste, plats, séparés par un filet) ; barre « Mon planning » (compteur en `heading-small`, export à droite, en verre) ; message d'état (`info`, `success`, `warning`, `error`, toujours avec icône et texte).

## Do's and Don'ts

- Contraste AA sur tout texte et toute icône porteuse de sens ; 44 px de cible minimum ; focus visible en `border-accent-focus` ; une information n'est jamais portée uniquement par la couleur (styles, studios, cours dans le planning : texte, forme ou position en plus).
- L'accent sur une action ou un état actif, jamais en décoration ; les rôles d'état sur un message d'état, jamais ailleurs.
- Un écran n'appelle que des tokens sémantiques, jamais un primitif (`slate-900`, `blue-300`…) ni une valeur en dur.
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
