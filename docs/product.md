# product.md

Ce fichier markdown rappelle ce qu'on construit et pour qui. Toute modification du périmètre passe par un arbitrage dans `arbitrage.md`. Les écrans décrits ici sont la référence avant de coder.

## Problème et but

Un danseur qui souhaite s'investir dans la danse en région parisienne doit reconstituer lui-même, studio par studio, quels sont les différents cours qu'il peut tester : 
- Quels sont les cours qui collent bien avec mon agenda ? 
- Quels sont les styles que je pourrais tester ?
- Quels enseignants me donnent envie de tester son cours ?
- Quels sont les cours adaptés à mon niveau ?
  
Avant, un danseur devait se baser sur les critères suivants : 
- les échos de ses amis
- le couple créneau / distance
- les réseaux sociaux d'un prof et son avis sur son style

Tous ces facteurs sont difficiles à réunir au sein d'un agenda : un travail de curation doit se faire à travers un outil d'agenda. Ce planning peut vite être amené à changer, dépendant des studios concernés (changements de professeurs, vacances scolaires...)

Le but : un guide curé, pas un annuaire exhaustif de tous les cours possibles en région parisienne. Trois studios ont été choisis pour le MVP, reconnus dans le milieu et dont Emmanuel peut attester la renommée (D17, D43), une liste filtrée des cours compatibles, une sélection qui devient « mon planning », un export vers l'agenda. L'outil est l'index ; Instagram reste le média (D08). 

Objectifs du projet : résoudre un vrai problème utilisateur, shipper un produit live avec des métriques, savoir répondre sur le business model (parqué, D12), matière pour les entretiens product design.

## Utilisateurs

Toute personne qui veut s'investir dans la danse urbaine, débutante ou avancée. Ce qui l'unit : l'intention de pratiquer régulièrement (2 à 3 cours par semaine) et le moment où elle construit ou reconstruit son planning — entrée dans un style, nouvelle saison. Le niveau n'est pas un critère de persona mais un filtre (D02, D10). Usage sur mobile (D11).

Cas vécus : entrée en freestyle (dizaines de sites parcourus, profs cherchés à la main sur les réseaux, agenda illisible et jamais à jour) ; même douleur observée chez une débutante en hip-hop.

## Anti-références produit

- Pas ClassPass : on ne vend pas d'accès, on ne compare pas des offres.
- Pas un clone d'Instagram : pas de média intégré, pas de fil.
- Pas une app fitness gamifiée : pas de streaks, pas de badges ; on parle d'« indicateur de progression », jamais de « gamification » (D24).
- Pas un générateur : l'outil ne choisit jamais à la place de l'utilisateur, c'est un catalogue personnalisé (D05).
- Pas un annuaire exhaustif ni un calendrier abonnable par style (D05, D17).

## Dans / hors MVP

### MVP (test 1 : « des danseurs construisent-ils un planning multi-studios et l'exportent-ils ? »)

| # | Fonctionnalité | Détail | Réf. |
|---|---|---|---|
| 1 | Compte | Accès sans compte (connexion anonyme) ; compte par lien magique proposé pour garder son planning | D11, D61 |
| 2 | Onboarding | Styles visés (multi), niveaux (multi), disponibilités en grille jours × plages avec raccourcis | D28, D30 |
| 3 | Liste filtrée | Cours compatibles, groupés par jour, triés par heure ; chevauchements autorisés ; niveau / type non précisés matchent tout | D05, D20, D31 |
| 4 | Mon planning | Ajouter / retirer un cours ; la sélection est le planning | D05 |
| 5 | Fiche cours | Prof (lien si existant, pas de photo), niveaux + étiquette brute, lieu, métro, prix unité, lien de réservation, disclaimer de saison, mention « prof variable » (Guest) | D08, D09, D10, D30 |
| 6 | Export | .ics d'un cours ou du planning, récurrence hebdo, Europe/Paris, fin de saison | D23, D27 |
| 7 | Mesure | PostHog : onboarding terminé, cours ajouté, cours retiré, export, compte créé (passage d'anonyme à e-mail) | D16, D19, D61 |
| 8 | PWA | Manifeste et icône ; pas de cache de données | D22 |
| — | Pages légales | Mentions légales, confidentialité (profil, PostHog, contact de retrait pour les profs) | D19 |

Prérequis hors fonctionnalités : saisie manuelle des ~80-100 cours des trois studios dans Supabase.

### V2 — constructeur avec boucle (test 2)

Suppression d'un cours avec motif en liste fermée · recommandations de créneaux de remplacement (même créneau, puis créneaux proches) · statuts par cours (à tester / testé / gardé) · fréquence visée et indicateur de progression · flux .ics abonnable · vue grille hebdo (desktop) · Storybook. (D14, D19, D23, D24)

### Nice to have

Signalement d'une information fausse (avec engagement de correction sous 48 h) · partage du planning · notification avant le cours (web push) · filtre distance · médias des profs intégrés · Clarity en complément de PostHog.

### Hors périmètre

App native · générateur automatique de planning · saisie communautaire · scraping · exceptions de planning (vacances, remplacements) · prix comme contrainte · cours enfants/ados, stages, workshops, mensuels, formations · photos de profs récupérées sur les sites · styles non urbains (contemporain, jazz…).

## Écrans du MVP

### Onboarding

- **Objectif** : recueillir ce qui filtre la liste (D24 : pas de fréquence visée).
- **Contenu affiché** : styles visés (14, multi) ; niveaux (débutant / intermédiaire / avancé, multi) ; grille de disponibilités 7 jours × 2 plages (journée / soirée), avec les raccourcis « tous les soirs », « les week-ends », « soirs de semaine + week-ends » (D28).
- **Actions** : cocher / décocher ; appliquer un raccourci puis affiner ; terminer → liste filtrée. Événement PostHog « onboarding terminé ».
- **États** : à définir (ordre des étapes, validation minimale, retour pour modifier).

### Liste des cours

- **Objectif** : montrer tous les cours compatibles, chevauchements inclus, pour que l'utilisateur choisisse (D05, D20).
- **Contenu affiché** : cours groupés par jour, triés par heure ; par cours : heure, style, prof, studio (nom propre), lieu et métro, niveaux (sans étiquette du studio : tous niveaux, D54). Chevauchements visibles comme lignes voisines.
- **Actions** : ajouter à / retirer de mon planning (événements PostHog) ; ouvrir la fiche cours ; modifier ses réponses d'onboarding.
- **États** : aucun cours compatible ; style non précisé (visible par tous, D58) ; une semaine sur deux (D59) ; autres états : à définir.

### Fiche cours

- **Objectif** : donner ce qu'il faut pour décider et y aller.
- **Contenu affiché** : style (+ titre du cours s'il diffère) ; prof avec lien Instagram par handle seulement s'il existe, jamais de photo (D08, D38) ; niveaux + étiquette brute du studio (D10) ; type si précisé, sinon « non précisé » (D31) ; studio, lieu, adresse, métro ; prix à l'unité (D09) ; lien de réservation et note de réservation ; date de dernière vérification ; disclaimer « planning de saison, vérifie sur le site du studio », modulé par la fiabilité de la grille du studio (D07, D30) ; mention « prof variable, vérifie auprès du studio » si Guest (D30).
- **Actions** : ajouter / retirer ; exporter ce cours en .ics (événement PostHog) ; ouvrir le lien de réservation.
- **États** : Guest ; style non précisé ; une semaine sur deux ; type non précisé ; autres états : à définir.

### Mon planning

- **Objectif** : voir sa sélection et l'exporter (D05, D23).
- **Contenu affiché** : les cours ajoutés, groupés par jour, triés par heure ; chevauchements visibles, aucune règle de non-chevauchement.
- **Actions** : retirer un cours ; exporter le planning en .ics (événement PostHog).
- **États** : planning vide ; autres états : à définir.

### Créer un compte / se connecter

- **Objectif** : garder son planning (nouveau téléphone, autre navigateur), sans mot de passe (D11, D61).
- **Quand** : proposé après le premier cours ajouté et depuis Mon planning ; jamais bloquant. Avant, la personne utilise Dancehop sur une session anonyme.
- **Contenu affiché** : champ e-mail, explication du lien magique, pourquoi créer un compte.
- **Actions** : envoyer le lien ; ouvrir le lien reçu → compte créé, planning conservé ; « J'ai déjà un compte » pour le retrouver sur un nouveau téléphone.
- **États** : lien envoyé (attente du mail) ; lien expiré ou invalide ; adresse déjà liée à un compte. À définir : connexion à un compte existant depuis une session anonyme qui a déjà un planning (fusionner, remplacer, ou perdre en prévenant). Autres états : à définir.

### Pages légales

- **Objectif** : mentions légales et confidentialité avant tout utilisateur réel (D19).
- **Contenu affiché** : données du profil, PostHog (UE, sans cookie), données des profs (nom + lien public) et contact pour demande de retrait.
- **Actions** : aucune.
- **États** : aucun.
