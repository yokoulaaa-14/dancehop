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

Le but : un guide curé, pas un annuaire exhaustif de tous les cours possibles en région parisienne. Trois studios ont été choisis pour le MVP, reconnus dans le milieu et dont Emmanuel peut attester la renommée (D17, D43), une liste filtrée des cours compatibles qu'on consulte telle quelle pour trouver quoi tester, puis réserver sur le site du studio ; en second, une sélection, « mes cours », exportable vers l'agenda (D65, D66). L'outil est l'index ; Instagram reste le média (D08). 

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

### MVP (test 1 : « des danseurs trouvent-ils dans une liste multi-studios des cours à tester, et vont-ils les réserver ? », D65)

| # | Fonctionnalité | Détail | Réf. |
|---|---|---|---|
| 1 | Compte | Accès sans compte (connexion anonyme) ; compte par lien magique proposé pour garder son planning | D11, D61 |
| 2 | Onboarding | Styles visés (multi), niveaux (multi), disponibilités en grille jours × plages avec raccourcis | D28, D30 |
| 3 | Liste filtrée | Cours compatibles sur les 7 prochains jours, groupés par jour, triés par heure ; chevauchements autorisés ; niveau / type non précisés matchent tout ; filtres en puces, temporaires, qui peuvent tout afficher | D05, D20, D31, D64 |
| 4 | Mes cours | Ajouter / retirer un cours ; la sélection, en semaine type ; secondaire, pas l'action principale | D05, D65, D66 |
| 4 bis | Navigation et Profil | Barre d'onglets Cours · Mes cours · Profil ; Profil : préférences (onboarding prérempli) et compte | D66 |
| 5 | Fiche cours | Prof (lien si existant, pas de photo), niveaux + étiquette brute, lieu, métro, prix unité, lien de réservation, disclaimer de saison, mention « prof variable » (Guest) ; écran où l'on va réserver | D08, D09, D10, D30, D65 |
| 6 | Export | .ics d'un cours ou du planning, récurrence hebdo, Europe/Paris, fin de saison | D23, D27 |
| 7 | Mesure | PostHog. En premier : onboarding terminé, retour sur la liste, fiche ouverte, clic sur le lien de réservation. En second : cours ajouté, cours retiré, export, compte créé (passage d'anonyme à e-mail) | D16, D19, D61, D65 |
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

- **Objectif** : recueillir ce qui filtre la liste (D24 : pas de fréquence visée), sur une session anonyme créée au clic sur « Commencer » (D61).
- **Parcours** : accueil (promesse, « Commencer », « J'ai déjà un compte ») → styles → niveau par style → disponibilités → liste. Progression en trois segments ; l'accueil n'est pas une étape (D62).
- **Contenu affiché** :
  - Styles : les 14 styles (multi) ; message info sous les puces : les choix restent modifiables depuis la liste.
  - Niveau : un niveau par style choisi (débutant / intermédiaire / avancé), intermédiaire par défaut ; une légende décrit les trois niveaux.
  - Disponibilités : grille 7 jours × 2 plages (journée avant 18 h, soirée dès 18 h), vide par défaut, avec les raccourcis « tous les soirs », « les week-ends », « soirs de semaine + week-ends », « tout le temps » (D28), et une puce « Personnalisé » allumée dès que la grille remplie ne correspond à aucun raccourci ; au clic, elle vide la grille pour partir de zéro (D62).
- **Actions** : cocher / décocher ; appliquer un raccourci puis affiner ; retour à l'étape précédente, réponses gardées ; terminer → liste filtrée. Événement PostHog « onboarding terminé ».
- **États** : bouton inactif tant qu'aucun choix n'est fait à l'étape ; bouton fixé en bas, contenu qui défile dessous ; modification plus tard par les mêmes écrans, préremplis.

### Liste des cours

- **Objectif** : montrer les cours compatibles, chevauchements inclus, pour qu'on trouve quoi tester sans rien avoir à sélectionner (D05, D20, D65).
- **Contenu affiché** (D64) :
  - Bandeau des 7 prochains jours, datés, à partir d'aujourd'hui, collé en haut ; le jour actif suit le défilement. Liste continue sur les 7 jours, en-têtes datés (« Aujourd'hui, jeu. 12 nov. »).
  - Rangée de puces de filtre qui défile : croix (tout afficher), Styles, Niveau, Créneaux, Type, Studio. Par défaut, les préférences de l'onboarding.
  - Par cours : heure de début et durée (répétées sur chaque ligne, même à la même heure), style (le type si le style est vide, D58), prof, nom du studio ; badges neutres sur une ligne : niveaux (tous niveaux si le studio ne précise pas, D54), type, « 1 sem. sur 2 », « prof variable ». Ni adresse ni métro (sur la fiche).
- **Actions** : ouvrir la fiche cours (action principale, D65) ; filtrer avec les puces, chacune ouvre un panneau du bas avec des cases et « Afficher N cours » (Créneaux reprend la grille de l'onboarding et ses raccourcis) ; tout afficher ; ajouter à / retirer de mes cours (secondaire, place à trancher sur maquette, D65 ; événements PostHog). Les filtres sont temporaires : ils ne modifient jamais les réponses de l'onboarding, et la liste repart des préférences à chaque ouverture.
- **États** : aucun cours (seulement avec des filtres : écran d'atmosphère, bouton « Effacer les filtres ») ; style non précisé (visible par tous, D58) ; une semaine sur deux (D59, affiché chaque semaine) ; prof variable (D30) ; autres états : à définir.

### Fiche cours

- **Objectif** : donner ce qu'il faut pour décider et y aller.
- **Contenu affiché** : style (+ titre du cours s'il diffère) ; prof avec lien Instagram par handle seulement s'il existe, jamais de photo (D08, D38) ; niveaux + étiquette brute du studio (D10) ; type si précisé, sinon « non précisé » (D31) ; studio, lieu, adresse, métro ; prix à l'unité (D09) ; lien de réservation et note de réservation ; date de dernière vérification ; disclaimer « planning de saison, vérifie sur le site du studio », modulé par la fiabilité de la grille du studio (D07, D30) ; mention « prof variable, vérifie auprès du studio » si Guest (D30).
- **Actions** : ajouter / retirer ; exporter ce cours en .ics (événement PostHog) ; ouvrir le lien de réservation.
- **États** : Guest ; style non précisé ; une semaine sur deux ; type non précisé ; autres états : à définir.

### Mes cours (onglet, ex-« Mon planning »)

- **Objectif** : voir sa sélection et l'exporter (D05, D23, D66).
- **Contenu affiché** : les cours ajoutés, groupés par jour, triés par heure ; chevauchements visibles, aucune règle de non-chevauchement. La mise en page doit se distinguer de Cours au premier regard (D66) ; proposition à valider sur maquette : semaine type sans dates (seuls les jours qui ont un cours), résumé en tête (« 3 cours par semaine, 2 studios »), cartes sur surface, ni bandeau ni puces.
- **Actions** : retirer un cours ; ouvrir la fiche ; exporter la sélection en .ics, seule action principale de l'écran (événement PostHog).
- **États** : aucun cours ajouté (écran d'atmosphère, renvoi vers Cours) ; autres états : à définir.

### Profil (onglet)

- **Objectif** : modifier ses préférences par défaut et gérer son compte (D64, D66).
- **Contenu affiché** : « Mes préférences » (résumé des styles, niveaux et créneaux) ; « Compte » (e-mail si un compte existe, sinon l'invitation à en créer un).
- **Actions** : modifier ses préférences (rouvre l'onboarding prérempli, sans l'accueil ; seul endroit où elles changent) ; créer un compte ou se connecter (D61).
- **États** : session anonyme ; compte avec e-mail ; autres états : à définir.

### Créer un compte / se connecter

- **Objectif** : garder ses cours et ses préférences (nouveau téléphone, autre navigateur), sans mot de passe (D11, D61).
- **Quand** : depuis Profil, et proposé après le premier cours ajouté ; jamais bloquant (D66). Avant, la personne utilise Dancehop sur une session anonyme.
- **Contenu affiché** : champ e-mail, explication du lien magique, pourquoi créer un compte.
- **Actions** : envoyer le lien ; ouvrir le lien reçu → compte créé, planning conservé ; « J'ai déjà un compte » pour le retrouver sur un nouveau téléphone.
- **États** : lien envoyé (attente du mail) ; lien expiré ou invalide ; adresse déjà liée à un compte. À définir : connexion à un compte existant depuis une session anonyme qui a déjà un planning (fusionner, remplacer, ou perdre en prévenant). Autres états : à définir.

### Pages légales

- **Objectif** : mentions légales et confidentialité avant tout utilisateur réel (D19).
- **Contenu affiché** : données du profil, PostHog (UE, sans cookie), données des profs (nom + lien public) et contact pour demande de retrait.
- **Actions** : aucune.
- **États** : aucun.
