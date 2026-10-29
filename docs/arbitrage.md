# arbitrage.md — Journal des décisions

Source de vérité du projet. Une décision = Dxx (date, décision, alternatives écartées, raison, révision éventuelle). Une décision révisée n'est pas réécrite : on ajoute « révisé le … ». Les questions encore ouvertes vivent dans `TODO.md`.

---

## Décisions

### D01 — Sujet : la découverte de cours de danse urbaine (avant le 07/10/2026)
- **Décision** : partir sur l'aide à la découverte de cours de danse urbaine à Paris.
- **Justification** : problème vécu personnellement, réseau mobilisable (studios, profs, collectifs).
- **Écarté** : un logbook de pratique (saisie quotidienne) — marché productivité/journaling saturé.

### D02 — Persona cible (07/10, précisé 09/10)
- **Décision** : toute personne qui veut s'investir dans la danse urbaine, débutante ou avancée. Ce qui l'unit : l'intention de pratiquer régulièrement (1 cours/semaine au moins) et le moment où elle construit ou reconstruit son planning (entrée dans un style, nouvelle saison).
- **Justification** : cas vécu (entrée en freestyle : dizaines de sites parcourus, profs cherchés à la main sur les réseaux, agenda Google illisible et jamais à jour). Même douleur observée chez une débutante en hip-hop.
- **Précision du 09/10** : le niveau n'est pas un critère de persona mais un filtre (D10).

### D03 — Formulation du problème (08/10)
Un danseur qui entre dans un nouveau style doit reconstituer lui-même qui enseigne quoi, où, quand, à quel niveau, et à quoi ressemble le prof en mouvement. Il choisit sur trois critères : vidéo du prof, échos des amis, couple créneau + distance. Puis il maintient ce puzzle à la main, et l'ajuste pendant quelques semaines (retire un prof, cherche un remplaçant sur le même créneau).

### D04 — Nature du besoin : épisodique (08/10)
- **Décision** : le besoin est épisodique (1 à 2 fois/an) avec une boucle d'ajustement de quelques semaines. Le produit est un "moment", pas une habitude.
- **Conséquences** : pas d'app à usage quotidien, pas de métrique d'engagement quotidien, pas d'abonnement B2C.
- **Révisé le 09/10** : à Paris, on peut commencer un cours à tout moment, sans engagement, donc difficile de tenir la fréquence. Le planning est donc un dispositif d'engagement : il doit être **mouvant** (voir D14). Les rappels et le suivi d'assiduité restent hors V1.

### D05 — Format : liste filtrée en MVP, constructeur en V2, jamais de générateur (08/10, révisé 09/10)
- **Décision (révisée 09/10)** : le MVP est une **liste filtrée** permissive — l'utilisateur donne son objectif (styles, niveau, jours), l'outil montre tous les cours compatibles, chevauchements inclus. Sélection minimale par un bouton "ajouter à mon planning" par cours ; "mon planning" = cette sélection, c'est elle qu'on exporte. Pas de grille, pas de règle de non-chevauchement. Le constructeur avec boucle (retrait, motif, alternatives) est la V2.
- **Vocabulaire fixé** : Emmanuel a parlé de "générateur" pour le MVP ; ce n'est pas un générateur (un générateur choisit à la place de l'utilisateur), c'est un catalogue personnalisé.
- **Trou évité** : exporter toute la liste avec chevauchements reconstruirait l'agenda illisible du problème initial (D03) — d'où la sélection minimale.
- **Justification** : aucun signal fiable pour classer deux cours sur le même créneau (pas de vibe, pas d'avis, pas d'historique). Un générateur qui se trompe sur une donnée périmée perd toute la confiance ; un constructeur partage la responsabilité du choix.
- **Écarté** : générateur automatique ("on te sort le planning idéal") — reporté à quand il y aura des signaux de classement.
- **Écarté** : MVP concierge (formulaire + planning composé à la main) — refusé, l'objectif est un outil automatique.
- **Écarté** : un simple calendrier abonnable par style — il couvre le "suivre" mais pas le "choisir".

### D06 — Périmètre V1 (08/10, révisé 09/10)
- **Décision** : toute la danse urbaine (hip-hop, house, dancehall, popping, freestyle, chorégraphies commerciales…), ~~studios parisiens uniquement (pas de banlieue)~~ → accessible en métro (D29, 09/10), 4 structures (D17), saison 2026-2027.
- **Justification** : le persona "entre dans un nouveau style", et ce style varie selon la personne ; un seul style ne servirait qu'une fraction des entrants. L'algorithme ne dépend pas de la taille de la base ; la saisie et la maintenance, si.
- **Coût accepté** : 400 à 600 créneaux par saison sur 5-6 studios (contre 60 à 100 pour un seul style), à refaire à chaque changement de grille.
- **Arbitrage confirmé le 09/10** : en cas de volume trop lourd, on réduit le nombre de studios, jamais la variété des styles. Nombre et choix des studios tranchés en D17.
- **Conditions** : (1) taxonomie figée après l'audit et avant la saisie — liste fermée de 8 à 10 styles construite à partir des étiquettes réelles des studios, un seul style par cours, l'étiquette du studio prime (D41) ; (2) audit sur 3 studios avant de s'engager davantage.
- **Coûts notés** : moins de studios = couverture géographique plus faible (le filtre distance perd son sens si les studios sont concentrés) et moins d'alternatives sur créneaux proches pour la boucle de remplacement (D14) — la boucle sera testée sur un terrain défavorable.
- **Écarté (08/10)** : un seul style en V1 — trop étroit pour le persona.
- **Écarté** : "tous les cours possibles sur l'année en backend" — irréaliste seul, et les plannings n'existent pas à l'année mais par saison avec exceptions.

### D07 — Données : grille de saison saisie à la main, exceptions hors scope (08/10)
- **Décision** : saisie manuelle par Emmanuel de la grille de saison (profs réguliers par saison). Les exceptions (vacances, remplacements) ne sont pas gérées en V1. Disclaimer systématique : "planning de saison, vérifie sur le site du studio avant d'y aller".
- **Justification** : les profs sont stables par saison, la maintenance porte sur la grille, pas sur l'hebdo. Les exceptions sont annoncées par les studios en story/mail et ne sont pas captables de façon fiable.
- **Écarté** : saisie communautaire en V1 — problème de démarrage à froid, aucune raison pour un danseur de maintenir le planning d'un studio.
- **Écarté** : scraping — fragile, zone grise, plannings souvent sur des plateformes tierces (Bsport, Deciplus…).
- **Retenu pour plus tard** : signalement d'info périmée par les utilisateurs, à condition d'un engagement de correction (48 h) — sinon une info marquée obsolète qui traîne détruit la confiance.

### D08 — Vidéos : l'outil est l'index, Instagram reste le média (08/10)
- **Décision** : pas d'embed de vidéos. Fiche prof avec nom, styles, studios, créneaux et lien vers son compte *quand il existe* (optionnel, D26). Éventuellement une vidéo représentative liée par prof.
- **Photos (09/10)** : aucune en MVP. Les photos des sites des studios appartiennent aux studios ou aux photographes ; une photo n'entre que si le prof ou le studio la fournit.
- **Justification** : la douleur était "je ne sais pas qui suivre", pas "je ne peux pas voir les vidéos". L'embed Instagram dépend de Meta et casse régulièrement.

### D09 — Prix : affiché, pas filtrant (08/10)
- **Décision** : le prix n'est pas une contrainte de l'algorithme. Hypothèse : l'utilisateur teste à l'unité avant de s'engager, puis décide lui-même d'un carnet dans un studio. Le prix à l'unité est affiché (donnée stable, peu coûteuse). ~~Prix d'essai~~ retiré le 09/10 : aucun des quatre n'en propose.
- **Risque noté** : un planning sur trois studios = trois carnets ; le coût peut expliquer pourquoi les gens restent dans un seul studio.

### D10 — Niveau : trois valeurs, multi-valeurs par cours (08/10, révisé 09/10)
- **Décision (09/10)** : trois niveaux — débutant, intermédiaire, avancé. Un cours peut en porter plusieurs ("INTER/AV" = intermédiaire + avancé). L'étiquette d'origine du studio est affichée sur la fiche.
- **"Tous niveaux" (tranché 09/10)** : à la lettre = les trois valeurs, étiquette brute visible sur la fiche. Justification : ne pas porter préjudice au label donné par le studio. Intuition d'Emmanuel consignée pour mémoire : en pratique, c'est généralement intermédiaire + avancé à Paris.
- **Justification** : le niveau annoncé n'est jamais fiable d'un studio à l'autre ; un filtre exclusif exclurait des cours à tort.
- **Historique** : 08/10 débutant / confirmé ; 09/10 débutant / intermédiaire-avancé avec "tous niveaux = intermédiaire-avancé".

### D11 — Pas d'app ; compte par lien magique (08/10, révisé 09/10)
- **Décision** : site mobile-first, pas d'app native. Compte par lien magique (mail → lien → connecté, sans mot de passe).
- **Justification** : besoin épisodique → friction d'installation d'une app injustifiée. Le planning mouvant (D14) doit persister sur plusieurs semaines et entre appareils, ce qui justifie un compte. Le lien magique supprime les mots de passe et les réinitialisations, pas le backend ni la mention RGPD.
- **Écarté (08/10)** : pas de compte, planning dans l'URL et le navigateur — insuffisant dès que le planning évolue sur plusieurs semaines.

### D12 — Business model : parqué (08/10)
- **Décision** : pas de design du modèle en V1, mais une réponse prête. L'épisodique tue l'abonnement danseur. Pistes crédibles : mise en avant payante pour les profs (ce sont eux qui tournent et se vendent seuls), affiliation sur les cours d'essai.

### D13 — Lancement : dans la saison 2026-2027, pas trop tard (08/10)
- **Décision** : pas de date contrainte (on peut commencer un cours à tout moment à Paris). Les grilles de saison sont publiées depuis septembre, c'est le moment de les saisir.

### D14 — Le planning est mouvant : boucle test / retour / remplacement (09/10, reportée en V2 le 09/10)
- **Décision** : cœur du produit à terme, **reporté en V2**. Le MVP teste d'abord si des danseurs construisent et exportent un planning multi-studios (voir D16). L'utilisateur teste un cours de son planning, indique s'il a aimé ou non et pourquoi, le retire, et demande une alternative (même créneau ou créneaux proches).
- **Justification** : à Paris, aucun engagement structurel ; le planning qui évolue est ce qui maintient la fréquence. Le "pourquoi" est aussi le seul signal de classement qui pourra, à terme, faire passer du constructeur (D05) au générateur.
- **Conditions** : motifs de rejet en liste fermée (prof, niveau réel, ambiance, créneau, lieu, prix…), pas de texte libre seul. Les alternatives doivent inclure des créneaux proches (même soir, ±1 h), car avec 5-6 studios l'alternative au créneau exact n'existe souvent pas.
- **Hors V1** : rappels, suivi d'assiduité, statistiques de pratique.

### D15 — Pas de filtre de distance en V1 (09/10)
- **Décision** : le filtre par arrondissement / temps de trajet est retiré. L'arrondissement et le métro restent affichés sur chaque cours.
- **Justification** : périmètre Paris intra-muros et 3-4 studios seulement, l'utilisateur fait le tri à l'œil. Retirer le filtre ne retire pas la donnée, qui faisait partie des trois critères de choix du persona (D03).
- **À rouvrir si** : extension à plus de studios ou à la petite couronne.

### D16 — Finalité du MVP : test terrain avant de continuer (09/10, révisé 09/10)
- **Décision** : deux tests successifs. Test 1 (MVP) : "des danseurs construisent-ils un planning multi-studios à partir d'une liste filtrée, et l'exportent-ils ?". Test 2 (V2) : la boucle de remplacement (D14). Si le test 1 échoue, la boucle n'a pas besoin d'exister.
- **Conditions** : testeurs qui entrent réellement dans un nouveau style au moment du test (pas des amis en jeu de rôle), une dizaine ; durée de test de 3 à 4 semaines minimum (il faut aller au cours puis revenir) ; seuils de succès et d'arrêt écrits avant le test (à fixer par Emmanuel, voir `TODO.md`).

### D17 — Studios de la V1 : curation éditoriale (09/10)
- **Décision** : Lax Studio, Juste Debout School, Ambassadeur d'Espérance, Studio MRG. Base simple, enrichie au fur et à mesure.
- **Critère retenu** : studios reconnus dans le milieu pour leur qualité, choisis par Emmanuel et son réseau. C'est un parti pris de curation (guide, pas annuaire exhaustif), à assumer comme tel.
- **Écarté** : Studio Harmonic — forte part de jazz et de classique hors périmètre.
- **Révisé le 17/10 (D43)** : Studio MRG retiré ; trois studios en MVP.
- **Coût accepté** : la couverture géographique n'est pas un critère de sélection ; les studios peuvent être concentrés dans certains quartiers.

### D18 — Ordre des travaux et stack (09/10)
- **Décision** : audit des studios avant toute ligne de code, car le modèle de données en dépend (prof entité ou champ texte ? lien de réservation par cours ou par studio ? prix par studio ou par cours ? étiquettes de niveau homogènes ?). Le choix de la stack, lui, ne dépend pas de l'audit et se fait tout de suite.
- **Révisé le 09/10** : Emmanuel ne cherche plus à apprendre React ; le code sera produit avec l'assistance de l'IA. Critère de choix de stack qui en découle : la voie la plus empruntée (celle où les générations IA sont les plus fiables), pas la plus élégante.
- **Options listées** : A. Next.js + Supabase + Vercel (corpus IA le plus profond, auth lien magique incluse, saisie dans l'interface de tables Supabase, gratuit au départ ; mais codebase à maintenir sans pouvoir déboguer seul en profondeur). B. No-code Airtable + Softr/Glide (le plus rapide, pas de bug non corrigeable ; mais le moteur est ce que le no-code fait mal, auth limitée, 30-60 €/mois, dépendance). C. Hybride Airtable + front codé (écarté : deux systèmes, autant de code qu'en A). D. Astro/SvelteKit + Supabase (écarté : corpus IA plus mince). Recommandation : A, avec B en sortie de secours.
- **Architecture en quatre blocs** : donnée (studios, profs, cours, saison) ; moteur ; planning utilisateur (compte, cours retenus, retours avec motif) ; export.
- **Définition du moteur** : couche de logique entre la donnée et l'écran. Prend les entrées utilisateur, sort les cours compatibles sur une grille hebdo, interdit les chevauchements, et au retrait d'un cours calcule les alternatives (même créneau puis créneaux proches). Filtres et trois règles, pas d'IA. Seule partie vraiment spécifique au produit.
- **Risque principal** : ne pas comprendre le code généré quand il casse. Borne : si le moteur et le compte ne tournent pas au bout de trois semaines, bascule sur l'option B, code reporté en V2.

### D19 — Stack tranchée (09/10, révisée 09/10)
- **Décision** : React + **Vite** (SPA, pas de rendu serveur nécessaire avec Supabase) + Supabase (Postgres, auth lien magique, RLS, API auto) + Vercel + Tailwind + shadcn/ui + PostHog (UE, sans cookie) + Resend (mails de lien magique) + GitHub. Code assisté par l'IA. Option B (no-code) conservée comme sortie de secours (borne de trois semaines, D18).
- **Révision** : Next.js → Vite (plus simple à générer, plugin PWA mûr, aucun besoin de SSR). Justifications consignées le 09/10 : Vite = moins de concepts (pas de serveur/client components, zone d'erreur fréquente du code généré) pour une app derrière compte sans SEO ni logique serveur ; Postgres = données relationnelles avec contraintes d'intégrité (cours → studio, lieu, prof, style ; planning = utilisateur × cours), Mongo écarté ; PostHog = analyse produit (événements, entonnoirs, rétention) là où Clarity est un outil d'observation (sessions, heatmaps) qui dépose des cookies ; shadcn/ui retenu parce qu'il copie le code source des composants dans le repo (restylables, tokenisables).
- **Storybook (tranché 09/10)** : reporté **après le test terrain**, livrable de phase 2 pour pérenniser le projet ; composants isolés dans `components/ui` dès le début pour le préparer.
- **Confirmés le 09/10 par Emmanuel** : Vite, Postgres, PostHog (Clarity éventuellement plus tard, en complément).
- **Choix par défaut proposés et validés le 09/10** : TypeScript ; React Router ; supabase-js + TanStack Query ; react-hook-form + zod ; Supabase CLI avec `supabase/migrations` versionnées dans le repo ; RLS dès la première table (lecture publique sur course/studio/location/teacher/style, propriétaire seul sur profile/plan_item) ; Vitest sur le moteur de filtrage et la génération .ics (fuseau Europe/Paris, changement d'heure) ; GitHub Actions (lint, tests) + Vercel (main + prévisualisations par branche) ; un projet Supabase jusqu'au test, un second pour la prod ensuite ; pages mentions légales et confidentialité avant tout utilisateur réel ; français uniquement ; pas de suivi d'erreurs en MVP.
- **Stack d'équipe proposée par un ami développeur, examinée et écartée** : Node + GraphQL (serveur et API à maintenir pour ce que Supabase donne sans code ; GraphQL = outil de coordination d'équipe), Render (inutile sans backend), Google Analytics + Clarity (bandeau de consentement, redondant avec PostHog), Three.js / GSAP / Motion (hors objectif du MVP), Storybook (seconde chaîne de build pour dix composants). Retenus : Vite, Tailwind, shadcn/ui, Postgres, GitHub.
- **Ajout proposé** : web-app installable en PWA (manifeste, icône, ajout à l'écran d'accueil) — expérience "app" sans stores, et ouvre les notifications web push pour le rappel avant le cours (nice to have).
- **Révisé le 17/10** : projet Supabase `dancehop` (eu-west-1) relié au repo GitHub ; les migrations de `supabase/migrations/` s'appliquent au push sur `main`, sans `db push` manuel. Un seul projet jusqu'au test, comme prévu. Clé publique au format `sb_publishable_…` plutôt que l'ancienne clé `anon`. Projet Vercel `dancehop` relié au même repo : déploiement de production à chaque push sur `main`, prévisualisation par branche, variables Supabase dans les trois environnements ; première URL https://dancehop.vercel.app.

### D20 — Vue liste, pas vue agenda (09/10)
- **Décision** : les cours sont présentés en liste groupée par jour et triée par heure ; les chevauchements apparaissent comme lignes voisines. La grille hebdomadaire est une vue desktop, nice to have.
- **Justification** : lecture mobile (la cible utilise un téléphone plus qu'un PC) ; l'export .ics reste le pont vers les agendas tiers.
- **Conséquence** : les jours/plages deviennent des filtres ; la fréquence visée devient un objectif affiché (D24).

### D21 — Organisation interne : le repo est la source de vérité (09/10)
- **Décision** : documentation en markdown dans le repo — `CLAUDE.md` (contexte permanent pour l'IA qui code), `docs/` (Arbitrage.md, PRD, specs), suivi des tâches en `TODO.md` ou GitHub Issues.
- **Justification** : solo, et le builder (IA) lit le repo ; les décisions doivent être à côté du code. Une seconde source de vérité (Notion) est le vrai risque.
- **Écarté** : espace Notion façon Jira — Kanban que personne d'autre ne regarde, double maintenance. La présentation à un recruteur non technique se règle en fin de projet, via le case study monté à partir des docs du repo.
- **Révisé le 16/10 (D40)** : structure resserrée à cinq documents dans `docs/` ; suivi des tâches dans `TODO.md` seulement.

### D22 — PWA : manifeste et icône seulement en MVP (09/10)
- **Décision** : web-app mobile-first installable (manifeste, icône, service worker minimal), sans cache de données.
- **Justification** : un planning en cache hors-ligne est un planning périmé. Sur iPhone l'installation est manuelle ("Partager > Sur l'écran d'accueil"), donc ne pas compter dessus pour l'adoption. Notifications push en V2.

### D23 — Export : deux granularités en MVP (09/10)
- **Décision** : export d'un cours (événement .ics) et de "mon planning" (fichier .ics de la sélection). Pas d'export de la liste filtrée entière.
- **V2** : flux .ics abonnable par style ou par planning (URL qui se met à jour dans l'agenda) — endpoint à maintenir et promesse de fraîcheur non tenue en V1.

### D24 — Fréquence visée et indicateur de progression : V2 (09/10, révisé 09/10)
- **Décision (09/10)** : la fréquence visée sort de l'onboarding MVP ; l'objectif avec compteur ("objectif 2 cours/semaine, 2 ajoutés") passe en V2. Onboarding MVP = styles, niveau, disponibilités.
- **Pour la V2** : ce qui remplit l'objectif, ce sont les cours *ajoutés* au planning, pas les cours suivis (invérifiable).
- **Garde-fous** : pas de statut par cours (à tester / testé / gardé) — un cours est dans le planning ou non ; les statuts relèvent de la boucle V2 (D14). Vocabulaire : "indicateur de progression", pas "gamification" — le mot promettrait des mécaniques non prévues sur un usage épisodique.

### D25 — Définition et périmètre d'un cours (09/10)
- **Décision** : un cours = un créneau hebdomadaire récurrent sur la période de la grille. Seuls les cours adultes ouverts à l'unité (drop-in) entrent.
- **Exclus** : stages, workshops, masterclass, événements ponctuels, cours enfants et ados, formations à engagement annuel ou sur audition, cours fermés.

### D26 — Identification des profs (09/10)
- **Décision** : table profs (id, nom, compte Instagram optionnel). Les noms sont stables d'un studio à l'autre : dédoublonnage par le nom à la saisie. L'id est la clé technique.
- **Écarté** : Instagram comme identifiant — risque de piratage de compte, et certains profs n'ont pas de réseaux. La fiche n'affiche le lien que s'il existe (D08 amendé).
- **Révisé le 10/10 (D38)** : le compte Instagram devient une liste de handles (`instagrams`), pour les binômes.

### D27 — Période des grilles et fin de récurrence (09/10)
- **Décision** : les studios publient des grilles à l'année (hypothèse D07 maintenue, à confirmer par l'audit studio par studio). Export .ics en récurrence hebdomadaire.
- **Fin de récurrence (tranché 09/10)** : date de fin annoncée par la grille du studio si elle existe, sinon fin juin par défaut. L'audit relève cette date par studio. Écarté : fin août (deux mois d'événements fantômes, l'été étant un autre planning).

### D28 — Disponibilités dans l'onboarding (09/10)
- **Décision** : deux plages, "journée" (matin + après-midi) et "soirée".
- **Tranché (09/10)** : soirée = cours commençant à 18h ou après. Saisie en grille jours × plages (14 cases), avec des raccourcis qui pré-remplissent la grille ("tous les soirs", "les week-ends", "soirs de semaine + week-ends") pour les personnes sans planning précis ; l'utilisateur affine ensuite en décochant.
- **Écarté** : jours et plages en deux filtres séparés — produirait "lundi journée" pour quelqu'un qui voulait "semaine soir + week-end journée".

### D29 — Périmètre géographique : accessible en métro (09/10)
- **Décision** : le périmètre passe de "Paris intra-muros" à "accessible en métro depuis Paris". Formulation proposée pour la rendre vérifiable : lieu à moins de dix minutes à pied d'une station de métro (lignes 1 à 14), hors RER et tram. Pantin (Studio Bleu) et Ivry (MRG) entrent.
- **Justification** : la liste D17 (curation) contredisait D06 ; la règle géographique dit qui *peut* entrer, la curation (D17) dit qui entre.
- **Remplace** : la mention "studios parisiens uniquement (pas de banlieue)" de D06.
- **Volume** : on commence petit, quatre structures ; le volume réel (~100-120 cours) permet d'en ajouter plus tard sans changer d'ordre de grandeur.
- **Révisé le 17/10 (D43)** : trois structures, ~80-100 cours.
- **Révisé le 21/10** : le RER compte comme le métro. Un lieu doit être à moins de dix minutes à pied d'une station de métro (lignes 1 à 14) ou de RER ; le tram reste exclu. Le champ `location.metro` cite l'une ou l'autre (« Pantin (RER E) »).

### D30 — Modèle de données (09/10, révisé 09/10)
- **Décision** : tables en anglais. `studio` (qui organise et encaisse : nom, Instagram, lien de réservation, prix unité, fiabilité de la grille), `location` (adresse, arrondissement/ville, métro ; indépendante des studios, un lieu peut accueillir plusieurs studios), `teacher` (id, nom, Instagram optionnel), `course` (→ studio, → location, → teacher, jour, heure, durée, → style, niveaux en tableau, type optionnel, `style_raw` / `level_raw` / `type_raw`, lien de réservation surchargeable), `style` (taxonomie en table, un style par cours), `profile` (réponses d'onboarding liées au compte), `plan_item` (sélection utilisateur × cours = "mon planning", base de l'export).
- **Écarté** : `class` comme nom de table (mot-clé JavaScript, collision avec les types générés) ; table `event` (PostHog prend la mesure).
- **Guests** : un enregistrement `teacher` "Guest" partagé entre studios, sans lien, fiche avec disclaimer "prof variable, vérifie auprès du studio". Cours mensuels hors périmètre (cassent la récurrence hebdo).
- **Révisé le 10/10 (D37)** : seuls les créneaux Guest à style déclaré entrent en base ; ceux dont le style tourne sont exclus.
- **Règle d'interface** : à l'écran, le nom propre du studio, jamais un libellé générique.
- **Niveau non précisé** : matche les trois filtres, affiché "niveau non précisé par le studio".
- **Fiabilité** : champ par école (grille de saison / mise à jour fréquente) qui module le disclaimer.
- **"Adulte"** : tout cours non étiqueté enfants/ados (remplace la formulation de D25).

### D31 — Second axe "type de cours" (09/10)
- **Décision** : champ optionnel `type` à trois valeurs — freestyle, chorégraphie, technique — à côté du style. Renseigné **uniquement** quand l'étiquette du studio le dit ("Coaching FreeStyle", "Hip Hop Choreo", "Talons (Cours Technique)") ; jamais inféré, `null` sinon.
- **Non renseigné (09/10)** : pas de quatrième valeur "inconnu" (c'est ce que `null` veut dire) ; affiché "non précisé", matche tous les filtres de type — même règle que le niveau (D30).
- **Justification** : "freestyle" est une pratique, pas un style ; donne un filtre au persona "progresser en freestyle".

### D32 — Passage à Claude Code (09/10, révisé 09/10)
- **Décision (révisée)** : bascule **complète** dès que le repo existe — décisions produit, journal et code au même endroit, une seule source de vérité (D21). Plus de va-et-vient avec le chat.
- **Condition** : `CLAUDE.md` consigne le rôle de challenger (questions de clarification, refus de coder une fonctionnalité sans arbitrage consigné, mise à jour de `docs/arbitrage.md` à chaque décision), sinon l'environnement pousse à produire sans questionner.
- **Reste à décider dans Claude Code** : style des créneaux Guest (D37), binômes (D38), nom et domaine (`TODO.md`).
- **Prérequis dans le repo avant la première session** : `CLAUDE.md`, `docs/arbitrage.md`, `docs/data-model.md`, `docs/audit-studios.md`, `docs/prd.md` (court, tiré du périmètre figé).

### D33 — Le repo comme cerveau du produit : structure étendue (09/10)
- **Source** : vidéo "Why the Old Design-to-Code Process Doesn't Work Anymore" (transcription fournie par Emmanuel). Thèse : sans contexte centralisé l'IA devine ; le repo doit porter exigences, règles métier, décisions, design system et règles d'usage des composants ; les composants deviennent de la logique métier.
- **Décision** : `docs/` passe de 5 à 11 fichiers, chacun avec un déclencheur de mise à jour écrit dans `CLAUDE.md` : ajout de `README.md` (humains), `research.md` (hypothèses, entretiens, résultats de test), `business-rules.md` (règles métier une par ligne, extraites de `data-model.md` et du journal), `components.md` (usage, états et règles métier portés par chaque composant — "businessware"), `analytics.md` (événements PostHog nommés avant l'implémentation).
- **Definition of done** ajoutée à `CLAUDE.md` : spec, règles métier, composants, analytics, docs à jour, TODO coché — vérification explicite par l'agent.
- **Écarté** : agents gardiens de PR et détection de dérive entre branches (contexte d'équipe, pas de branches concurrentes) ; les skills vendus par la vidéo (encodent un process d'équipe).
- **Effet sur Storybook (D19)** : `components.md` porte la logique d'usage dès le MVP ; Storybook ne montrera que les variantes, plus tard. Confirme le report.
- **Mise en garde** : un cerveau de douze fichiers non tenus est pire que cinq fichiers à jour — d'où les déclencheurs.
- **Révisé le 16/10 (D40)** : `research.md`, `business-rules.md`, `components.md`, `analytics.md` et la definition of done sont supprimés ; leur contenu utile est replié dans `product.md` et `data-model.md`.

### D34 — `product.md`, skills, et `design.md` comme source des tokens (09/10)
- **Source** : seconde vidéo (The Design Project) sur agent.md / skills / product.md / design.md, transcription fournie par Emmanuel.
- **`CLAUDE.md`** : reste court (coût en tokens à chaque session) ; ajout d'une section UI explicite (lire `design.md` et `components.md` avant tout élément d'interface, réutiliser avant de créer), des commandes build/test (dès le scaffold) et de la règle "un changement par PR". Plus aucun ajout : le spécifique va dans les skills.
- **Skills du projet** : quatre, pas plus sans arbitrage — `saisir-un-cours`, `ecrire-une-spec`, `consigner-un-arbitrage`, `creer-un-composant`. Écarté : skills globaux de goût ("UI designer") qui encodent le goût d'un tiers.
- **`vision.md` → `product.md`** : qui on est (mission, personnalité, références, anti-références), distinct du PRD (ce qu'on livre). Deux temps : mission + anti-références maintenant (pas ClassPass, pas un clone d'Instagram, pas une app fitness gamifiée, pas un dashboard) ; personnalité + références après le nom.
- **`design.md`** : en-tête YAML lisible par la machine = **source de vérité des tokens** ; `src/styles/tokens.css` **généré** par un script (`npm run tokens`) avec un test de divergence. Justification : un seul endroit à éditer, celui que le designer éditera volontiers ; l'IA lit des valeurs structurées ; shadcn consomme le CSS généré. Si la machinerie agace, inverser le sens, mais jamais les deux à la main.
- **Conservé de D33** : `components.md` porte l'usage et la logique métier des composants ; `design.md` porte les tokens et les règles visuelles.
- **Révisé le 16/10 (D40)** : skills supprimés ; `design.md` sans tokens pour l'instant ; `product.md` absorbe le PRD. Le découpage en deux temps (mission maintenant, personnalité et références après le nom) tient.
- **Révisé le 17/10 (D42)** : personnalité et références de `design.md` se définissent **avant** le nom, pas après ; le nom en découlera. Évite des premiers écrans en style shadcn par défaut à restyler ensuite.
- **Révisé le 19/10 (D44)** : personnalité, références et anti-références visuelles tranchées à l'atelier de direction artistique.

### D35 — Inbox, protocole de démarrage, frontières des outils (09/10)
- **Source** : troisième vidéo (même chaîne) sur le "cerveau" / Context OS d'agence, transcription fournie par Emmanuel.
- **Retenu** : `docs/inbox.md` (zone tampon jetée sans trier, vidée par l'agent au début de chaque session, jamais source de vérité) ; protocole de lecture au démarrage (inbox → `TODO.md` → questions ouvertes du journal, le reste selon la tâche) ; frontières des outils (le repo décide, Figma explore, `TODO.md` porte le périmètre, PostHog mesure) ; principes "maintenabilité > exhaustivité" et "une décision n'est jamais enterrée dans une transcription" (entretien → `research.md`, conclusion → journal) ; contrôle "tokens plutôt que valeurs en dur, instances plutôt que créations" ajouté à la definition of done.
- **Écarté** : états Figma et porte de promotion par le designer (une seule personne), Linear, directives de communication (un skill le jour venu), Business Model Canvas (D12 parqué), `start_here.md` et `context_now.md` (couverts par `CLAUDE.md`, `product.md`, `TODO.md`).
- **Mise en garde consignée** : trois vidéos, trois révisions du système documentaire, zéro donnée saisie, pas de repo. Le système est complet ; prochaine étape = repo + saisie des 24 cours JDS avant toute nouvelle lecture.
- **Révisé le 10/10** : `docs/inbox.md` supprimé (D36). Le reste de D35 tient.
- **Révisé le 16/10 (D40)** : les idées vivent dans Notion ; protocole de démarrage = `TODO.md` → questions ouvertes → documents liés à la tâche.

### D36 — Suppression de l'inbox (10/10)
- **Décision** : `docs/inbox.md` est supprimé. Une idée, un lien ou un retour se donne directement en début de session ; l'agent le range aussitôt dans `research.md`, `arbitrage.md` (question ouverte) ou `TODO.md`. Le protocole de démarrage devient : `TODO.md` → questions ouvertes du journal → le reste selon la tâche.
- **Justification** : projet solo, tout passe déjà par une session Claude Code ; un fichier tampon vide à chaque démarrage ne fait qu'ajouter une étape. Application directe de "maintenabilité > exhaustivité" (D35) et de la mise en garde de D35 sur l'inflation documentaire.
- **Écarté** : garder l'inbox "au cas où" — un doc non utilisé est un doc périmé.
- **Risque accepté** : une idée notée hors session (téléphone) vit ailleurs jusqu'à la session suivante ; elle n'entre dans le repo que rangée.

### D37 — Créneaux Guest sans style déclaré : exclus (10/10)
- **Décision** : un créneau dont le style change d'une semaine à l'autre n'entre pas en base. Cas connus : le Guest d'Ambassadeur le lundi à La Place et le Guest de MRG le lundi 20h30. `course.style_id` reste `not null`. Le prof "Guest" (D30) ne sert plus qu'aux créneaux à style fixe et à prof variable ; s'il n'en existe aucun chez les quatre studios, la ligne reste sans usage en MVP.
- **Justification** : un cours de niveau non précisé reste un cours du style visé. Un cours de style inconnu, lui, n'est probablement pas du style visé (environ 1 chance sur 13). Le faire matcher tous les filtres polluerait toutes les listes. Et la liste des guests d'Ambassadeur contient du hors-urbain (Jazz rock, Identité Artistique), ce qui contredirait D41 (urbain strict). Perte : environ 3 créneaux sur 100 à 120, négligeable pour le test 1.
- **Écarté** : `style_id` nullable qui matche tout (pollution des listes, hors-urbain) ; un 14e style "Guest" (casse la taxonomie figée, et "Guest" n'est pas un style).
- **Révise** : D30 (Guests), en partie.
- **Fait à vérifier** : existe-t-il, chez l'un des quatre studios, un créneau à prof variable mais à style fixe ? Si non, la ligne `teacher` "Guest" pourra être retirée.

### D38 — Binômes de profs : une ligne `teacher`, plusieurs Instagram (10/10)
- **Décision** : un cours donné par deux profs ("Mariana et Kenny", "Cleve & Sandra") est rattaché à **une** ligne `teacher` dont le nom est normalisé "A & B", dans l'ordre du studio. La colonne `teacher.instagram` (texte) devient `teacher.instagrams` (`text[]`, vide par défaut) : la fiche cours affiche un lien par handle, aucun si la liste est vide (D08). Un prof seul a zéro ou un handle ; un binôme peut en avoir deux.
- **Justification** : aucun changement de structure pour 2 ou 3 cours, une saisie simple dans l'interface Supabase, et chacun des deux profs garde sa visibilité (demande d'Emmanuel). Une liste plutôt que deux colonnes `instagram` / `instagram_2` : un seul champ, un seul rendu, quel que soit le nombre de personnes.
- **Écarté** : table de jointure `course_teacher` (une table, une RLS et une saisie en deux temps pour 2-3 cours) ; prof "principal" + champ texte pour le second (choix arbitraire, donnée incohérente) ; deux handles dans un même champ texte (casse le rendu du lien).
- **Dette connue** : si l'un des membres d'un binôme enseigne aussi seul, il existe deux lignes `teacher` pour lui, ce qui contourne le dédoublonnage de D26. Invisible en MVP (pas de fiche prof, pas de filtre par prof) ; à reprendre avec `course_teacher` si une fonctionnalité centrée sur le prof arrive (alternatives "même prof", D14).
- **Révise** : D26 (Instagram optionnel → liste de handles).

### D39 — Structure du repo : une arborescence dans `CLAUDE.md` (10/10)
- **Décision** : la structure du repo quitte `arbitrage.md` et **remplace** le tableau "Documents du repo" de `CLAUDE.md`, sous la forme d'une arborescence commentée : pour chaque fichier, ce qu'il contient et son déclencheur de mise à jour (→). Les dossiers de code (`src/`, `supabase/migrations/`) y entrent au scaffold.
- **Justification** : un journal consigne des décisions, pas l'état du repo. L'arborescence se lit d'un coup d'œil (préférence d'Emmanuel). Elle remplace le tableau au lieu de s'y ajouter : une seule liste de fichiers à tenir, et `CLAUDE.md` ne grossit pas (D34).
- **Écarté** : l'arborescence en plus du tableau (deux listes à synchroniser) ; garder la structure dans le journal.
- **Perdu volontairement** : les descriptions longues du tableau (exemples de règles métier, détail de `design.md`) ; elles vivent dans les fichiers eux-mêmes et dans la section "Interface et design".
- **Révisé le 16/10 (D40)** : l'arborescence devient une section « Structure du repo » avec une règle d'usage par document.

### D40 — Architecture documentaire resserrée (16/10)
- **Décision** : le repo passe à cinq documents dans `docs/` : `arbitrage.md`, `product.md` (ex-`prd.md`, enrichi : problème et but, utilisateurs, anti-références produit, dans / hors MVP, un écran par section avec objectif, contenu, actions, états, test terrain), `design.md` (personnalité, ton rédactionnel dont écriture inclusive, références, anti-références visuelles, principes, accessibilité ; pas de tokens pour l'instant), `data-model.md` (tables, contraintes et RLS, règles métier en trois volets — admission, correspondance, comportement — avec les cas ambigus listés au lieu d'être devinés, format .ics), `audit-studios.md` (une fiche par studio, archive). `CLAUDE.md` est réécrit : projet en deux lignes, stack de référence, trois règles dures, protocole de démarrage, structure du repo avec une règle d'usage par document, conventions. `TODO.md` : En cours / À faire / Fait. `README.md` : mission, ce que fait le produit, état, construit avec (une phrase simple).
- **Supprimés** : `prd.md` (renommé), `business-rules.md` (jamais écrit ; absorbé par `data-model.md`), `components.md`, `analytics.md` (les événements sont dans `product.md`), `research.md` (le test terrain est dans `product.md`), `docs/specs/` (les écrans sont dans `product.md`), `skills/`, la definition of done, les tokens YAML et `tokens.css`, les sections Problème et Démarche du README.
- **Règles ajoutées** : (1) `TODO.md` ne recopie pas une question ouverte, il contient seulement « Trancher Qxx » ; (2) une particularité d'un seul studio reste dans `audit-studios.md`, une règle valable pour tous va dans `data-model.md`, un piège présent chez deux studios devient une règle ; (3) anti-références produit dans `product.md`, visuelles dans `design.md` ; (4) accessibilité : contraste AA, cibles tactiles de 44 px, information jamais portée uniquement par la couleur, focus visible ; (5) les idées vivent dans Notion et sont collées en début de session si besoin ; (6) TypeScript strict, aucune autre librairie de composants que shadcn/ui, RLS sur toutes les tables, aucune nouvelle dépendance sans arbitrage.
- **Écarté** : un PRD par fonctionnalité (doublon avec le journal et les sections écrans) ; conserver onze fichiers « au cas où » ; les tokens machine avant le premier écran.
- **Raison** : trois révisions du système documentaire sans une ligne de code (mise en garde de D35) ; des doublons entre fichiers (tableau + arborescence, PRD + specs + journal) ; la maintenabilité prime sur l'exhaustivité.
- **Révise** : D21 (structure), D33 (onze fichiers, definition of done), D34 (skills, tokens dans `design.md`, `product.md` en deux temps — conservé), D35 (protocole de démarrage), D39 (arborescence seule → section avec règles d'usage).
- **Révisé le 17/10** : le registre « Questions ouvertes » du journal est supprimé (illisible à la longue). Les questions encore ouvertes vivent dans `TODO.md` avec leur contenu ; une question tranchée devient une décision. La taxonomie, qui ne vivait que dans ce registre, est consignée en D41. Les références Qxx sont retirées de tous les documents. La section « Test terrain » de `product.md` est retirée ; un `research.md` sera créé avant le test terrain (tâche dans `TODO.md`). **Révisé le 19/10 (D44)** : le stress test est fait (comparateur sur la grille JDS) ; les tokens peuvent être créés au premier écran.

### D41 — Taxonomie des styles figée à 13 (tranché le 09/10 ; consigné en décision le 17/10, depuis l'ancien registre des questions)
- **Décision** : treize styles, un seul par cours, l'étiquette du studio prime et se conserve telle quelle. Hip-hop (HipHop, Hip-Hop, Hip Hop, Hip Hop Choreo, Commercial, Commercial Hiphop) · House (House, House Dance) · Popping · Locking · Waacking · Voguing (Voguing, Vogue Fem Class) · Dancehall (Dancehall, Dancehall Hybrid, Street Ragga) · Afro (Afro, Afro Hybrid, Amapiano) · Breaking (Bboying) · Krump · Electro · Heels (Heels, Heels (Choreo), Talons) · Street jazz (Street Jazz, Urban Jazz). Hors périmètre : Contemporary, Contemporary Lyrical, Urban Contemporary, Modern Contempo, Jazz, Jazz Fusion, Jazz Rock, Organic Dance Movement, Yoga Dynamique, Atelier Scénique, Identité Artistique.
- **Écarté** : une catégorie Contemporary (demandée par Emmanuel, puis retirée) — elle contredisait D06 (toute la danse urbaine, rien d'autre) et D17 (Harmonic écarté pour jazz et classique), et aurait entraîné Jazz et Jazz Fusion ; une règle « tout ce que les écoles curées enseignent sauf exclusions » (il aurait fallu justifier Jazz dehors).
- **Raison** : règle cohérente et vérifiable — urbain strict ; 40 étiquettes brutes relevées à l'audit, repliées sur 13 valeurs sans migration de code (table `style`).

### D42 — Le nom et le domaine se choisissent après un premier produit utilisable (17/10)
- **Décision** : l'ordre des travaux devient : repo GitHub et scaffold de la stack → `design.md` → saisie des cours → nom → domaine → `research.md` → test terrain. Le nom se choisit avec un produit sous les yeux ; le domaine se prend avant le test terrain (contrainte Resend). D'ici là, « Dancehop » sert de nom de code pour le repo, le projet Supabase et le `package.json`.
- **Écarté** : choisir le nom et le domaine d'abord (ordre précédent) — engage une marque et un achat avant de savoir à quoi ressemble le produit.
- **Raison** : rien dans le code ne dépend du nom final, tout se renomme ; seul l'envoi des liens magiques à de vrais testeurs dépend du domaine. Et la borne des trois semaines (D18) court à partir du premier code : autant la lancer sur le scaffold, pas sur une recherche de nom.

### D43 — Trois studios en MVP : Studio MRG retiré (17/10)
- **Décision** : le MVP couvre Lax Studio, Juste Debout School et Ambassadeur d'Espérance. Studio MRG sort du périmètre pour l'instant ; il pourra revenir plus tard, comme tout studio ajouté « au fur et à mesure » (D17).
- **Écarté** : garder MRG sur la foi de l'audit web seul.
- **Raison** : la curation (D17) repose sur la renommée attestée par Emmanuel et son réseau ; il connaît les trois premiers, pas MRG. Accessoirement, MRG était le studio le moins exploitable : grille publiée en image, page encore datée de la saison précédente, deux cas ambigus de saisie (absence d'étiquette de niveau interprétée par une FAQ, « Female Class » sans correspondance) qui tombent avec lui.
- **Conséquences** : volume de saisie ~80-100 cours (Lax 45-60, JDS 23, Ambassadeur ~13) au lieu de ~100-120 ; Ivry n'est plus représentée, le périmètre « accessible en métro » (D29) reste valable mais n'est exercé que par Pantin ; la fiche MRG de `audit-studios.md` reste en archive.
- **Révise** : D17 (liste des studios), D29 (volume).

### D44 — Direction artistique : Nuit, Bebas Neue et Hanken Grotesk (19/10)
- **Source** : atelier FigJam en huit planches (terrain, anti-références, moodboard, personnalité, typo, couleur), puis comparateur d'écrans sur la grille réelle de JDS (https://claude.ai/artifact/YFU216pNndZPd5Cft8SX9v).
- **Décision** :
  - *Principe* : structure calme, un seul élément fort. L'élément fort est la typographie de titre ; tout le reste est sobre.
  - *Position* : raffiné, froid, aéré, sobre, délicat ; le mouvement vient des contenus (photos des studios, noms, horaires), pas de l'interface. « Transcendance » retiré des mots-clés : intraduisible en décision d'écran.
  - *Palette « Nuit »*, règle 60 / 30 / 10 : fond `#0c1320` (60 %), texte `#e9e5dc` (30 %, et toutes les surfaces et bordures en sont des teintes par transparence), accent `#9fd6ff` (10 %, réservé aux actions : ajouter, exporter, filtre actif). Trois couleurs, aucune autre ; les gris sont dérivés. Contrastes : texte / fond 14:1, accent / fond 11:1, libellé noir sur accent 13:1. Fond sombre par défaut ; pas de thème clair en MVP.
  - *Typographie* : Bebas Neue pour les titres (jours, compteur du planning, nom de l'app) ; Hanken Grotesk pour tout le texte, graisses 400 à 600, jamais en dessous de 400 sur fond sombre. Bebas Neue n'existe qu'en capitales : jamais pour un nom de prof ni une étiquette de studio. Texte courant à 16 px minimum sur mobile. Les deux sont sur Google Fonts, licence libre.
  - *Anti-références visuelles* : ClassPass (grille marketplace avec catégories, notes et avis) ; Google Agenda (blocs colorés qui se chevauchent dans une grille horaire, l'agenda illisible du problème, D03) ; dashboard SaaS (cartes KPI, sidebar) ; template admin et palette par défaut d'une librairie.
  - *Tokens* : le comparateur a tenu lieu de stress test (planche 8) sur de la donnée réelle et dense ; les tokens peuvent naître au premier écran codé, dans `src/index.css`, en remplaçant la palette shadcn par défaut.
- **Écarté** : palette « Sarcelle » V1 (`#044141` sur `#010a0a` : 1,5:1, accent invisible) et sa variante éclaircie ; V2 (`slate-200` et `sky-300` de Tailwind, palette par défaut) ; « Braise » orange ; fond clair par défaut ; Nunito (ronde et chaude, à contre-sens de « froid, raffiné ») ; Inter (police par défaut du généré, anti-référence « SaaS générique ») ; IBM Plex Sans, Manrope, Instrument Sans, Source Sans 3 (bons candidats, moins proches du moodboard) ; Phenomena et Satoshi (hors Google Fonts, non retenues).
- **Raison** : la palette et la typo ont été jugées sur l'écran le plus dense (liste de cours, 11 lignes, capitales longues, mention de niveau en petit), pas sur un moodboard. Hanken Grotesk est la plus proche de « délicat et raffiné » ; sa finesse est compensée par les graisses minimales fixées ci-dessus.
- **Révise** : D34 (personnalité et références désormais définies), D40 (tokens autorisés après ce stress test).
- **Révisé le 19/10, même session** : les titres passent de Bebas Neue à **Sofia Sans Extra Condensed** (variable, minuscules, chiffres tabulaires), graisse 600 à 700 pour les titres de jour, jamais sous 500 sur fond sombre, casse normale (« Mardi »), léger interlettrage positif. Raison : même étroitesse que Bebas avec des minuscules, ce qui distingue l'app des affiches en capitales des studios et règle le cas des noms dans un titre. Bebas Neue, Antonio, Big Shoulders Display, Oswald, League Gothic et Anton comparés sur la grille JDS et écartés ; Big Shoulders était la plus singulière, Sofia la plus lisible.
- **Révisé le 19/10, même session, à la rédaction de `design.md`** : texte courant à **14 px** (champs de formulaire à 16 px pour éviter le zoom iOS) au lieu de 16 ; l'espace vide est un principe (aérien) ; la personnalité est « aérienne et froide », sans l'idée que la chaleur viendrait des contenus ; les **transitions entre écrans utilisent un flou de mouvement** court (200 à 300 ms) qui rappelle le moodboard, rien ne bouge au repos, `prefers-reduced-motion` respecté. Remplace « pas de transitions décoratives ».
- **Révisé le 19/10 (D45)** : une troisième police, Instrument Serif italique, pour les moments d'atmosphère ; calque de lumière derrière l'en-tête des écrans peu denses ; « éthéré » en mot-clé.

### D45 — Trois polices, calque de lumière, style « éthéré » (19/10)
- **Source** : référence « Ethereal » apportée par Emmanuel (affiche bleue : femme floue dans la foule, titre serif italique, bleu nuit) ; essai d'onboarding en trois étapes avec cinq serifs italiques et un calque de brume (https://claude.ai/artifact/83SmoVw6crnSo8K4T96rTQ).
- **Décision** :
  - « Éthéré » entre dans les mots-clés de la personnalité, à la place de « transcendance ».
  - *Trois polices, chacune un rôle* : Sofia Sans Extra Condensed pour la structure (jours, étapes, compteurs, nom de l'app) ; Hanken Grotesk à 14 px pour le texte ; **Instrument Serif italique** réservé aux moments d'atmosphère : la question de chaque étape d'onboarding, l'accueil, les états vides, les confirmations. Jamais dans la liste des cours ni sur une donnée. Titres serif à 40 px sur mobile.
  - *Calque de lumière* derrière l'en-tête des écrans à faible densité (connexion, onboarding, états vides, confirmation d'export) : deux halos flous (accent glace et bleu `#4f7fd9`) plus un grain léger, intensité de référence 1. Jamais sur la liste des cours ni derrière de la donnée. Le texte posé dessus garde le contraste AA ; si un libellé secondaire passe sous 4,5:1 sur la brume, il repasse en pleine opacité.
  - *Matière, pas de corps* : les fonds évoquent la lumière et la matière (traînées, chrome, eau, brume), jamais des silhouettes de danseurs. Les photos de personnes sont exclues (D08, droits).
  - *Contraste* : AA minimum conservé pour tout texte ; l'effet « bas contraste » du style éthéré se joue uniquement sur les éléments secondaires (opacité 60 à 70 %) et les filets.
- **Écarté** : un serif en police de titre unique à la place de Sofia (tire vers « high fashion / spiritual brand ») ; Cormorant Garamond (disparaît sous 36 px), Fraunces (réchauffe), Playfair Display (magazine), Newsreader (bon second choix) ; brume sur les écrans denses ; silhouettes floues de danseurs.
- **Raison** : le style visé se reconnaît à l'atmosphère et au titre, pas à la densité. Séparer les écrans d'atmosphère (serif + brume) des écrans de donnée (sans) garde la liste lisible et donne au produit son moment « éthéré » là où il n'y a rien à lire.
- **Révise** : D44 (« aucune autre police » → trois polices à rôle fixe).

### D46 — Réglages de l'atmosphère (19/10)
- **Source** : prototype v2 de l'onboarding avec onze leviers réglables (https://claude.ai/artifact/28aYM26Qr5fnC1Dw2abCSF), testés par Emmanuel levier par levier.
- **Décision**, valeurs de référence pour les écrans d'atmosphère :
  - *Calque de lumière* : brume 1, grain 0,8, halos glace et bleu plus un halo violet `#6b5cff` à 0,5 ; pas de seconde source en bas. **La lumière dérive** lentement (une dérive de 20 s, aller-retour), seule exception à « rien ne bouge au repos », coupée par `prefers-reduced-motion`.
  - *Titre serif* : 40 px, lueur à 1 (double ombre portée de l'accent, 18 px à 45 % et 44 px à 30 %), pas d'effet de mise au point à l'arrivée.
  - *Surfaces* : verre dépoli (flou d'arrière-plan 12 px, fond texte 7 %, liseré clair en haut) sur les écrans d'atmosphère et la barre « Mon planning ». Sélection lumineuse partout où il y a un choix : dégradé accent vers `#e6f5ff`, lueur extérieure 16 px, libellé noir.
  - *Transitions* : flou 14 px, 300 ms, sans traînée ni aberration chromatique.
  - *Confirmation d'export* : calque de lumière et titre serif seulement ; **pas de traînées de lumière animées en fond** (Canvas écarté).
- **Écarté** : traînée au départ et aberration chromatique (mal de mer) ; mise au point du titre ; seconde source de lumière ; traînées Canvas sur la confirmation ; grain plus faible.
- **Raison** : choix faits sur le prototype, levier par levier, par retrait. Le grain à 0,8 et la dérive à 20 s sont les deux réglages les plus marqués ; ils se vérifient au premier écran codé sur un vrai téléphone (lisibilité du 14 px sous le grain, confort de la dérive).
- **Révise** : D44 (mouvement au repos), D45 (valeurs du calque de lumière).
- **Non tranché** : l'attente comme lumière (pulsation de la brume pendant un chargement), à décider au premier chargement réel.

### D47 — `design.md` au format DESIGN.md de Google (19/10)
- **Source** : spécification DESIGN.md (https://stitch.withgoogle.com/docs/design-md/specification, https://github.com/google-labs-code/design.md), apportée par Emmanuel.
- **Décision** : `docs/design.md` adopte le format DESIGN.md : un en-tête YAML (`name`, `colors`, `typography`, `rounded`, `spacing`, `components`, références `{…}`) qui est la **source de vérité des tokens**, puis la prose dans l'ordre canonique (Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts), suivie de nos sections propres, conservées par les outils (Ton rédactionnel, Mouvement). Toute la prose reste en français. Outillage : `@google/design.md` en dépendance de développement, version figée ; `lint` dans la CI (références, `primary`, contraste AA 4,5:1 par composant) ; `export css-tailwind` vers `src/styles/tokens.css`, **généré, jamais édité à la main** ; `src/index.css` raccorde les variables shadcn à ces tokens.
- **Écarté** : garder un `design.md` en prose seule avec des valeurs recopiées à la main dans le CSS (deux sources de vérité, la dérive est certaine) ; un script maison de génération (D34) alors qu'un outil tiers fait la même chose avec un lint en plus.
- **Raison** : c'est l'intention de D34 (YAML source, CSS généré) avec un standard et un outil à la place d'un script à maintenir ; le lint de contraste automatise la règle AA de D40 ; le format est celui que lisent les agents de code et Stitch, ce qui sert le jour où l'on génère des écrans.
- **Risques acceptés** : spec en alpha (version du CLI figée, `diff` relu à chaque montée) ; ce que le format ne modélise pas (transitions, calque de lumière, ton) reste en prose.
- **Révise** : D34 (retour au YAML source de vérité), D40 (tokens, `design.md` sans tokens), D44 (tokens dans `src/index.css` → générés dans `src/styles/tokens.css`).

### D48 — Paper, copie de travail synchronisée de `design.md` (20/10)
- **Décision** : le fichier Paper « Design System » (https://app.paper.design/file/01M5CQ9YBDRJR7JBRDTR6QVD5V) reçoit une copie des tokens et des fondations de `docs/design.md`, transférés par le serveur MCP de Paper. **`design.md` reste la seule source de vérité** (D47). Paper sert à créer des variations ; une variation retenue revient dans le repo en modifiant l'en-tête YAML, puis `npm run tokens`, puis une nouvelle synchro vers Paper. Les synchros repo → Paper sont régulières ; on ne recopie jamais une valeur de Paper vers le code sans passer par `design.md` et le journal.
- **Périmètre de la première synchro** : fondations seulement (couleurs avec leurs contrastes, typographie, rayons, espacements). Composants et écrans de référence plus tard.
- **Écarté** : Paper comme source des tokens (deux sources, dérive certaine) ; la direction par défaut proposée par Paper (fond clair, accents saturés, ton enjoué) : on reproduit D44 à D46.
- **Raison** : Emmanuel explore visuellement dans un outil de design, le code se nourrit d'un fichier versionné et lintable ; le sens unique repo → Paper, avec retour par arbitrage, garde une seule vérité.

### D49 — Tokens à deux étages et nommage sémantique (20/10)
- **Décision** :
  - *Primitifs* : six gammes de 11 crans (50 le plus clair, 950 le plus foncé, convention Tailwind), générées en OKLCH à partir de nos couleurs, chaque couleur actuelle tombant exactement sur son cran : `slate` (fond, `#0c1320` = 950), `neutral` (texte, `#e9e5dc` = 100), `blue` (accent, `#9fd6ff` = 300), et trois gammes d'état en tons froids et retenus : `red`, `orange`, `green`. Plus `light-blue` et `light-violet`, hors gammes, pour le calque de lumière.
  - *Sémantiques* : `catégorie.élément.rôle.modificateur.état`, écrit avec des tirets dans le code (`--color-text-neutral-subtle-default`). Élément : `bg`, `text`, `border`, `icon`. Rôle : `accent`, `neutral`, `info`, `success`, `warning`, `error`. Modificateur facultatif, du plus bas au plus haut : `subtle`, (rien), `strong`, plus `inverted` pour le texte posé sur un remplissage plein. État : `default`, `hover`, `pressed`, `selected`, `focus`, `disabled`. Le préfixe de catégorie (`color-`, `font-`, `text-`, `spacing-`, `radius-`) est ajouté par l'export, jamais écrit dans le YAML. Une combinaison sans token n'existe pas et ne s'utilise pas.
  - *Rôles d'état* : `info` (gamme `blue` pour l'instant), `success` (`green`), `warning` (`orange`), `error` (`red`). Réservés aux messages d'état, jamais en décoration, toujours avec une icône et un texte.
  - *Les écrans n'appellent que des sémantiques* ; les primitifs sont la réserve où l'on pioche les variations (Paper, D48).
  - *Typographie* : rôles, sans nom de composant : `display`, `heading-large`, `heading-small`, `label`, `body`, `body-strong`, `body-small`, `body-large`. **Révisé le 20/10, même session** : `time` supprimé, doublon de `body-strong` (sa seule différence, les chiffres tabulaires, n'était pas exportée, et les chiffres de Hanken Grotesk ont déjà tous la même largeur, mesuré à 400 et 600). Les boutons passent en `body-strong` (14 px au lieu de 15) ; les champs en `body-large` (16 px, obligatoire contre le zoom iOS).
  - *Espacement* : échelle chiffrée sur l'unité de 4 px (`050` = 4, `100` = 8, `150` = 12, `200` = 16, `250` = 20, `300` = 24, `400` = 32, `600` = 48) plus trois alias de mise en page : `gutter` (20), `gutter-atmosphere` (24), `target` (44). Les chips s'espacent de 12 px au lieu de 10.
  - **Révisé le 20/10, même session** : les trois alias `gutter`, `gutter-atmosphere` et `target` sont supprimés ; une seule échelle, les règles de mise en page pointent sur un cran (gouttières `250` et `300`, cible tactile `550`). Le cran `550` = 44 px est ajouté pour la cible tactile. Le cran `500` = 40 px est ajouté en réserve, sans usage attribué pour l'instant.
  - *Pas de token par composant*. La section `components:` du YAML reste, mais seulement pour déclarer les couples fond / texte que le lint vérifie (contraste AA), sans valeur en dur ni dimension.
  - *Épaisseurs de bordure, opacités, élévation* : en prose dans `design.md`, sans token, tant que la spec DESIGN.md ne les prend pas en charge (sinon, seconde source écrite à la main dans le CSS).
  - *Palette Tailwind par défaut désactivée* (`--color-*: initial`) : seules nos couleurs existent dans le code ; une classe hors système ne compile pas.
- **Valeurs** : niveaux de texte en option B : `text-neutral-strong` = neutral-50 (titres), `text-neutral` = neutral-100 (courant), `text-neutral-subtle` = neutral-400 (prof, studio, mentions, 6,7:1) ; la mention « niveau non précisé » remonte de 4,9 à 6,7:1. Surfaces `bg-neutral-strong` = slate-900 `#1a2334`, filets `border-neutral` = slate-800 `#323c4f` (plus bleutés qu'avant). Libellé du bouton plein = `slate-950`, le `#0b1016` à part disparaît.
- **Écarté** : la palette Tailwind (`blue-500`…) comme primitifs (anti-référence, D34) ; des primitifs nommés par ambiance (`night`, `sand`, `ice`), moins prévisibles ; la priorité `primary / secondary / tertiary` mélangée à `accent` (un rang et un ton sur le même niveau) ; les modificateurs `light` / `dark` (doublons de `subtle` / `strong` sur un thème unique) ; une gamme `indigo` pour `info` (gardée en réserve) ; des tokens d'épaisseur, d'opacité ou d'ombre hors du YAML ; `bg_surface` et `bg_fill` (le modificateur fait le même travail).
- **Lint** : le lint de la spec signale chaque primitif qui ne sert à aucun composant et l'absence d'une couleur nommée `primary`. Ces deux règles sont filtrées par le script `lint:design` (une gamme complète est voulue ; `primary` n'existe pas dans notre nommage) ; les règles de référence cassée, de contraste, d'ordre de sections et de clé inconnue restent bloquantes.
- **Raison** : séparer valeur et usage pour varier sans réécrire ; un nommage qu'on peut deviner ; des rôles d'état prêts avant le premier formulaire.
- **Révise** : D44 (trois couleurs → trois couleurs d'interface plus quatre rôles d'état, réservés aux messages), D47 (couleur d'erreur : il en existe une désormais, `error`), D46 (libellé du bouton, sélection), D47 (`components:` sans dimensions).

### D50 — La CI vérifie que `tokens.css` est à jour (20/10)
- **Décision** : une étape de la CI relance `npm run tokens` puis échoue si `src/styles/tokens.css` diffère du fichier commité (`git diff --exit-code`). Oublier de régénérer après une modification de `design.md` bloque donc le push sur `main` et toute PR.
- **Écarté** : un hook git local (contournable, à installer sur chaque poste) ; générer `tokens.css` au build sans le commiter (le fichier ne serait plus lisible dans le repo ni relu en diff).
- **Raison** : D47 fait de `design.md` la seule source ; sans contrôle, une valeur changée dans `design.md` mais pas régénérée laisse le code sur l'ancienne valeur sans rien signaler.

### D51 — On garde le double préfixe des classes de couleur (20/10)
- **Décision** : les classes Tailwind des sémantiques gardent le nom complet du token : `bg-bg-neutral-default`, `text-text-neutral-subtle-default`, `border-border-neutral-default`. Le nom est identique dans `design.md`, Paper, `tokens.css` et le code (D49).
- **Écarté** : ranger chaque sémantique dans l'espace de noms Tailwind de son élément (`--background-color-*`, `--text-color-*`, `--border-color-*`) par un script après l'export, pour écrire `bg-neutral-default` : classes plus courtes, mais un nom de variable CSS différent de celui du token, un script de plus à maintenir et un sémantique (`text-neutral-default`) plus facile à confondre avec un primitif (`text-neutral-100`).
- **Raison** : un seul nom partout et aucune étape en plus valent mieux que quelques caractères gagnés.

### D52 — Saisie des cours : relevé par Claude, fichier SQL versionné, validation d'Emmanuel (21/10)
- **Décision** : Claude relève la grille publiée de chaque studio (site du studio, jamais Instagram pour l'instant), applique les règles de `data-model.md` et écrit un fichier SQL par studio dans `supabase/data/` (`juste-debout-school.sql`…). Le fichier est rejouable sans doublon (`on conflict`). Emmanuel valide le relevé ; Claude l'applique ensuite en production. Les données ne passent jamais par `supabase/migrations/` (réservé au schéma, appliqué automatiquement à chaque push). Ordre : Juste Debout School, puis Ambassadeur d'Espérance (après arbitrage des cas ambigus 3 et 4 de `data-model.md`), puis Lax Studio.
- **Écarté** : saisie à la main dans l'interface Supabase (D07 d'origine) : plus longue, sans trace dans le repo ni diff d'une saison à l'autre ; données dans les migrations : une erreur de saisie deviendrait une migration à corriger par une autre.
- **Raison** : une saisie relisible, rejouable et comparable d'une saison à l'autre, avec une validation humaine avant la production.
- **Révise** : D07 (qui saisit et comment ; la grille de saison et le hors-scope des exceptions restent).

### D53 — Écriture des noms de profs (21/10)
- **Décision** : majuscule au début de chaque mot, le reste en minuscules, y compris après un tiret et pour les noms de scène : « Spider », « K-Yoo », « Axoo Gucci », « La Salle Rose ». Un nom de scène qui complète le nom se met entre parenthèses : « Aston (Snaking Popping) ». La forme normalisée sert aussi de clé de dédoublonnage entre studios (D26).
- **Écarté** : l'écriture de chaque studio (« SPIDER » chez Juste Debout School, « Spider » chez Ambassadeur d'Espérance) : affichage irrégulier, et le premier studio saisi imposerait sa graphie aux autres.
- **Raison** : une liste régulière à lire, une seule graphie par prof.

### D54 — Sans étiquette de niveau, un cours est tous niveaux (21/10)
- **Décision** : un cours dont le studio n'affiche aucun niveau porte les trois niveaux (`{beginner, intermediate, advanced}`), `level_raw` reste vide. La mention « niveau non précisé par le studio » disparaît de la liste, de la fiche et du ton rédactionnel.
- **Écarté** : `levels = {}` avec la mention « niveau non précisé par le studio » ; une règle propre à Juste Debout School (qui écrit « Quel que soit votre niveau » en tête de grille) au lieu d'une règle générale.
- **Raison** : un cours sans étiquette est ouvert à tous dans les studios curés ; Juste Debout School l'écrit en toutes lettres. Le filtrage ne change pas (un cours sans niveau matchait déjà tous les profils), seul ce qu'on affiche change.
- **Risque accepté** : présenter comme accessible à un débutant un cours que le studio n'a pas étiqueté.
- **Révise** : D10 (l'absence d'étiquette n'est plus « non précisé »), D30 (mention de niveau supprimée).

### D55 — Le planning publié prime ; Coaching FreeStyle est du hip-hop (21/10)
- **Décision** : quand une page d'un studio se contredit (planning et liste des profs, version française et anglaise), le planning publié prime. « Coaching FreeStyle » se saisit en style hip-hop, type `freestyle`. Tranche les cas ambigus 3 et 4 de `data-model.md`.
- **Écarté** : la liste des profs comme source (déjà incohérente avec elle-même chez Ambassadeur d'Espérance) ; exclure Coaching FreeStyle faute de style dans l'étiquette.
- **Raison** : le planning est la partie que le studio met à jour et depuis laquelle on réserve ; Spider est présenté comme prof de « Hip hop & Coaching Freestyle ».

### D56 — Cours de Lax Studio : 1h30, pas 1h15 (21/10)
- **Décision** : les cours de Lax Studio se saisissent en 1h30. La grille publiée affiche des créneaux de 1h15 : c'est le temps de cours moins une transition de 15 minutes, pas la durée réelle (Emmanuel, élève régulier du studio).
- **Raison** : une exception à D55 (le planning prime) fondée sur la connaissance du terrain ; un export agenda en 1h15 finirait chaque cours trop tôt.

### D57 — Quatorzième style : Commercial (21/10)
- **Décision** : la taxonomie passe à 14 styles avec Commercial. Tout cours dont l'étiquette contient « Commercial » y va (Commercial, Commercial HipHop, Commercial - Movement Quality) ; ces étiquettes quittent Hip-hop. Un nom de cours qui n'est pas un style se garde dans `title` (« Movement Quality »), sans type inféré (D31). Correspondances ajoutées à l'occasion de Lax Studio : Dancehall Style Jamaica → Dancehall ; Tyaka Dance (méthode de Ralph Beaubrun) → Afro ; niveaux « INTER » → intermédiaire, « AVANCÉ » → avancé, « DEBUTANT » → débutant.
- **Écarté** : garder Commercial dans Hip-hop (près d'un tiers des cours urbains de Lax Studio y seraient confondus) ; un type « atelier » pour « Movement Quality » (un nom de cours, pas une nature de cours).
- **Raison** : Commercial est une famille à part entière chez Lax Studio, que les danseurs cherchent pour elle-même.
- **Révise** : D41 (13 → 14 styles ; Commercial et Commercial Hiphop quittent Hip-hop).

### D58 — Style non précisé : un cours peut n'avoir aucun style (21/10)
- **Décision** : `course.style_id` devient facultatif ; vide = style non précisé par le studio, sur le modèle du type (D31). Cas d'origine : les cours étiquetés seulement « Choreography » (type `choreography`, style vide). Un cours sans style s'affiche pour tout le monde, quels que soient les styles choisis, avec la mention « style non précisé par le studio ». L'unicité d'un cours traite deux styles vides comme égaux (`nulls not distinct`), pour que la saisie reste rejouable.
- **Écarté** : une ligne « non précisé » dans la table `style` (elle apparaîtrait comme un style à cocher à l'onboarding et mêlerait une donnée et son absence) ; ne montrer ces cours à personne (autant ne pas les saisir).
- **Révise** : D06 (un seul style par cours → au plus un).

### D59 — Cours une semaine sur deux (21/10)
- **Décision** : un cours donné une semaine sur deux entre en base, avec `course.every_other_week = true` et la mention « une semaine sur deux, vérifie sur l'application du studio ». Le comportement de l'export .ics pour ces cours se tranche quand on construira l'export (on ne sait pas quelle semaine est la bonne).
- **Écarté** : les exclure (des cours réels disparaîtraient de la liste) ; une note en texte libre (ni le moteur ni l'export ne pourraient s'en servir).
- **Révise** : D25 (un cours n'est plus forcément hebdomadaire).

### D60 — Suppression de audit-studios.md (21/10)
- **Décision** : `docs/audit-studios.md` est supprimé. Les règles valables pour tous les studios sont dans `data-model.md` ; les particularités d'un studio vont dans l'en-tête de son fichier `supabase/data/` (et dans `studio.notes` quand elles doivent vivre en base). La fiche Studio MRG reste dans l'historique git. La seule information encore sans autre place (une vidéo YouTube par fiche prof chez Lax Studio) passe dans le TODO.
- **Raison** : l'audit préparait la saisie ; les trois studios du MVP sont saisis et ses pièges sont tranchés (D54, D55, D56). Le garder ferait une seconde source sur chaque studio.
- **Révise** : D40 (structure de la documentation).

### D61 — Accès sans compte, compte proposé pour garder son planning (29/10)
- **Décision** : on entre dans Dancehop sans créer de compte. À la première visite, une connexion anonyme Supabase crée un compte invisible : réponses d'onboarding et planning sont enregistrés en base comme pour un compte normal, avec les mêmes règles d'accès (RLS). Le compte avec e-mail (lien magique, D11) est proposé, jamais exigé, pour garder son planning : changement de téléphone, données du navigateur effacées, autre navigateur (lien ouvert depuis Instagram). Créer le compte ajoute l'e-mail au compte anonyme existant : rien n'est perdu ni transféré. Le parcours devient onboarding → liste ; la connexion n'est plus le premier écran.
- **Écarté** : compte obligatoire avant la liste (D11 d'origine) : on demande l'e-mail avant d'avoir montré la valeur ; réponses et planning gardés dans le seul navigateur puis transférés à l'inscription : plus de code, deux endroits où vivent les données ; un code à six chiffres en secours du lien magique : Dancehop s'utilise au téléphone, pas d'aller-retour entre appareils (Emmanuel).
- **Reporté** : un captcha sur la connexion anonyme (recommandé par Supabase contre les abus), avant l'ouverture publique, pas pour le MVP ; la purge des comptes anonymes jamais convertis.
- **À faire hors code** : activer la connexion anonyme dans Supabase (Authentication > Sign In / Providers), par Emmanuel.
- **Révise** : D11 (compte obligatoire → proposé), D16 et D19 (la mesure « compte créé » ne marque plus l'entrée dans le produit).
