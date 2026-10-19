# design.md

À lire avant de générer ou modifier tout écran, composant ou texte d'interface. Direction artistique tranchée le 19/10 (D44) à partir de l'atelier FigJam (https://www.figma.com/board/7bPq3e7G7zt1cwsrBXBDC9) et du comparateur d'écrans (https://claude.ai/artifact/YFU216pNndZPd5Cft8SX9v). Les tokens se créent dans `src/index.css` au premier écran, à partir des valeurs ci-dessous.

## Personnalité

- **Aérienne et froide.** Bleu nuit, blanc cassé, accent glace, et beaucoup d'espace vide. L'interface respire ; elle ne réchauffe rien et ne cherche pas à être amicale.
- **Sobre, pas austère.** L'interface se tait pour laisser la place aux cours. Une seule chose parle fort par écran : le titre.
- **Délicate, pas fragile.** Typographie fine et condensée, mais jamais au prix de la lisibilité : graisses et contrastes minimaux fixés dans Principes.
- **En mouvement.** Le mouvement du moodboard (pose longue, flou, traînées) se retrouve dans les transitions entre écrans, pas dans des éléments qui bougent au repos.
- Mots-clés d'origine : mouvements, sobre, aérien, sérénité, délicatesse.

## Ton rédactionnel

- Tout le texte utilisateur est en français (D19).
- Le studio est nommé par son nom propre ; jamais « école » ou « studio » comme libellé générique (D30).
- Vocabulaire fixé : « mon planning » (la sélection), « ajouter à mon planning » / « retirer de mon planning » ; « indicateur de progression », jamais « gamification » (D24). L'outil n'est pas un « générateur » (D05).
- Les mentions obligatoires, telles quelles : « planning de saison, vérifie sur le site du studio » (D07) ; « prof variable, vérifie auprès du studio » (D30) ; « niveau non précisé par le studio » (D30) ; « non précisé » pour le type (D31).
- Court et direct, comme la personnalité : pas d'exclamation, pas d'emoji, pas de ton « copain ».
- Écriture inclusive : à définir (forme retenue).

## Références

- Moodboard de l'atelier (planche 4) : pose longue, traînées de lumière, chrome liquide, eau, portraits flous, affiches « The Art of Movement » et JUOS.
- Position sur les axes : raffiné, froid, aéré, sérieux, entre institutionnel et street.
- Terrain (planche 2) : ce que les trois studios font déjà. Lax en noir et blanc minimaliste, JDS en stickers et textures, Ambassadeur en saturé et dégradés. On ne copie aucun des trois ; on se place à côté, plus calme, avec la même condensation typographique mais en minuscules.

## Anti-références visuelles

- ClassPass : la grille marketplace avec catégories, notes et avis.
- Google Agenda : les blocs colorés qui se chevauchent dans une grille horaire, l'agenda illisible du problème (D03).
- Dashboard SaaS : cartes KPI, sidebar, template admin, palette par défaut d'une librairie (D34).
- Inter comme police par défaut.
- Les affiches de battle en capitales saturées : c'est le terrain, pas l'app.

## Principes

- **Palette « Nuit », règle 60 / 30 / 10** : fond `#0c1320` (60 %), texte `#e9e5dc` (30 %), accent `#9fd6ff` (10 %). Trois couleurs, aucune autre : gris, surfaces et bordures sont des teintes du texte par transparence (`color-mix`). L'accent n'apparaît que sur une action (ajouter, exporter, filtre actif) ou un état actif. Fond sombre par défaut, pas de thème clair en MVP.
- **Typographie** : Sofia Sans Extra Condensed pour les titres (jours, compteur du planning, nom de l'app), variable, graisse 600 à 700 pour les titres de jour, jamais sous 500 sur fond sombre, casse normale (« Mardi »), léger interlettrage positif. Hanken Grotesk pour tout le reste, graisses 400 à 600, jamais en dessous de 400 sur fond sombre. Les deux viennent de Google Fonts. Aucune autre police.
- **Taille** : texte courant à 14 px, hiérarchie par la taille et la graisse. Exception : les champs de formulaire restent à 16 px, sinon iOS zoome au focus.
- **Espace** : le vide fait partie du dessin. Marges généreuses, listes aérées, une information par ligne ; on préfère faire défiler plutôt que tasser.
- **Mouvement** : les transitions entre écrans utilisent un flou de mouvement court (200 à 300 ms, flou + déplacement), qui rappelle le moodboard. Rien ne bouge au repos : pas de parallaxe, pas d'animation d'attente décorative. Tout respecte `prefers-reduced-motion` (transition coupée, pas de flou).
- Mobile-first ; la cible utilise un téléphone plus qu'un PC (D11, D20).
- Liste, pas grille : les cours se lisent par jour, triés par heure ; les chevauchements sont des lignes voisines (D20).
- Réutiliser un composant shadcn avant d'en créer un ; aucune autre librairie de composants. Les composants shadcn sont restylés avec les tokens ci-dessus, jamais laissés en style par défaut.
- Pas de photo de prof (D08). Le lien vers ses réseaux n'apparaît que s'il existe.
- Le prix est affiché, jamais filtrant (D09).
- Rien n'est caché derrière un cache : un planning hors ligne est un planning périmé (D22).

## Accessibilité

- Contraste AA sur tout texte et toute icône porteuse de sens. Palette Nuit : texte / fond 14:1, accent / fond 11:1, libellé noir sur accent 13:1.
- Cibles tactiles de 44 px minimum, même quand le texte fait 14 px.
- Une information n'est jamais portée uniquement par la couleur (styles, studios, cours dans le planning : texte, forme ou position en plus).
- Focus visible sur tout élément interactif, à l'accent.
- `prefers-reduced-motion` respecté partout.
