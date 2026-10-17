# design.md

À lire avant de générer tout écran, composant ou texte d'interface. Pas de tokens pour l'instant.

## Personnalité

À définir.

## Ton rédactionnel

- Tout le texte utilisateur est en français (D19).
- Le studio est nommé par son nom propre ; jamais « école » ou « studio » comme libellé générique (D30).
- Vocabulaire fixé : « mon planning » (la sélection), « ajouter à mon planning » / « retirer de mon planning » ; « indicateur de progression », jamais « gamification » (D24). L'outil n'est pas un « générateur » (D05).
- Les mentions obligatoires, telles quelles : « planning de saison, vérifie sur le site du studio » (D07) ; « prof variable, vérifie auprès du studio » (D30) ; « niveau non précisé par le studio » (D30) ; « non précisé » pour le type (D31).
- Écriture inclusive : à définir (forme retenue).

## Références

À définir.

## Anti-références visuelles

- Pas de SaaS générique : pas de template admin, pas de palette par défaut d'une librairie.
- Pas un dashboard (D34).

## Principes

- Mobile-first ; la cible utilise un téléphone plus qu'un PC (D11, D20).
- Liste, pas grille : les cours se lisent par jour, triés par heure ; les chevauchements sont des lignes voisines (D20).
- Réutiliser un composant shadcn avant d'en créer un ; aucune autre librairie de composants.
- Pas de photo de prof (D08). Le lien vers ses réseaux n'apparaît que s'il existe.
- Le prix est affiché, jamais filtrant (D09).
- Rien n'est caché derrière un cache : un planning hors ligne est un planning périmé (D22).

## Accessibilité

- Contraste AA sur tout texte et toute icône porteuse de sens.
- Cibles tactiles de 44 px minimum.
- Une information n'est jamais portée uniquement par la couleur.
- Focus visible sur tout élément interactif.
