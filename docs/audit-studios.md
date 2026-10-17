# audit-studios.md

Archive du premier passage web (09/10/2026), pas de mise à jour. Une fiche par studio : source du planning, format, pièges, relevé brut. Relevé depuis les sites publics uniquement ; à vérifier par Emmanuel et son réseau avant saisie. Les étiquettes sont reproduites **telles quelles**. Les règles valables pour tous les studios sont dans `data-model.md`.

## Lax Studio

- **Identité** : studio avec lieu propre, 18 bis villa Riberolle, 75020, M° Alexandre Dumas (L2). Instagram @lax_studio. Réservation **obligatoire** via l'app Lax, un lien par événement sur le site. Prix unité 17 € ; cartes 10 : 160 € (3 mois) · 20 : 280 € (6 mois) · 50 : 590 € (6 mois). Durée observée 1h15.
- **Source du planning** : pas de grille lisible sur le site ; planning dans leur app propre (iOS/Android). Chaque **fiche prof** (`/professeurs`, 47 fiches) liste ses créneaux hebdo avec étiquette de niveau, ex. « HipHop INTER/AV : tous les mardis 20h30-21h45 ». C'est la source de saisie. Pages utiles : `/disciplines` (27 disciplines, liens vers profs), `/tarifs`, `/planning` (renvoie vers l'app).
- **Format** : 47 fiches à parcourir une par une ; bio, discipline, vidéo YouTube embarquée (la « vidéo représentative » de D08 existe en lien), section « Horaires », lien vers le prochain événement réservable.
- **Pièges** : pas de date de fin de grille trouvée (→ défaut 30 juin) ; fermeture annoncée 21/12/2026 → 03/01/2027 (non modélisée, D07) ; estimation 45-60 cours urbains, à confirmer fiche par fiche.
- **Relevé** — disciplines telles quelles : Afro · Afro Hybrid · Atelier Scénique · Commercial · Commercial Hiphop · Contemporary · Contemporary Lyrical · Dancehall · Dancehall Hybrid · Heels (Choreo) · HipHop · House Dance · Jazz · Jazz Fusion · Krump · Locking · Modern Contempo · Organic Dance Movement · Popping · Street Jazz · Street Ragga · Talons (Cours Technique) · Urban Contemporary · Urban Jazz · Vogue Fem Class · Waacking · Yoga Dynamique. Niveaux relevés : DEB/INTER, INTER/AV. Profs HipHop : Kuty, Indies Rhino, Djibryl Denaï, Samad, Omar Khdiri, Alexinho, Carmel, Jackenzy, William Arese, Maxime Garvi.

## Juste Debout School (CORE)

- **Identité** : école avec lieu propre, 3 rue de l'Est, 75020, M° Gambetta (L3) / Jourdain (L11). Second site « INDUSTRY », 27 bd de la Somme, 75017, annoncé « coming soon ». Instagram @jdschool. **Aucune** réservation, paiement sur place. Prix unité 15 € (site CORE) / 17 € (site INDUSTRY) ; kids 10 € ; cartes 5 : 75 € · 10 : 135 € · 20 : 245 € · 50 : 555 € (−5 € cartes suivantes). Durée 1h30 partout. Carte ados 15-17 ans sur les cours open.
- **Source du planning** : grille HTML complète sur la page « Cours open », filtrable par style. Planning « 2026-2027 » publié début septembre.
- **Format** : grille hebdo lisible, trois créneaux (17h30, 19h, 20h30), jusqu'à trois cours par créneau (trois salles).
- **Pièges** : **aucune étiquette de niveau** (« cours open », ouverts à tous → `levels = {}`) ; Jazz Rock hors taxonomie ; workshops ponctuels à 20 € et formation pro CORE (3 ans, auditions) hors périmètre ; au moins deux changements vs saison précédente signalés sur Instagram (Boustesse 19h → 20h30 ; Kota Popping vendredi → jeudi) ; le site INDUSTRY ne se saisit pas tant qu'il n'est pas ouvert ; Spider enseigne aussi chez Ambassadeur (une seule ligne `teacher`).
- **Relevé** — grille adulte 2026-2027 :

| Jour | 17h30-19h | 19h-20h30 | 20h30-22h |
|---|---|---|---|
| Lundi | Hip-Hop · Baby ROC1 / Hip-Hop · AYÉLÉ / Locking · LA PETITE | House Dance · Daneshiro / Dancehall · Queensy | Hip-Hop · LA SALLE ROSE |
| Mardi | Hip-Hop · K-Yoo / House Dance · TARIK | Hip-Hop · SOYYMIMY / Popping · ASTON (Snaking Popping) / Locking · Kota | House Dance · HPONE |
| Mercredi | *(kids 17h-19h, CAMILLA)* | Bboying · Dys Dys | House Dance · BOUSTESSE |
| Jeudi | Jazz Rock · Dominique Lesdema / Voguing · AXOO GUCCI / Hip-Hop · SPIDER | Hip-Hop · TEVIN / Popping · Kota / House Dance · RICKYSOUL | — |
| Vendredi | House Dance · HENRIQUE / Hip-Hop · GIU | Hip-Hop · Trix / Amapiano · Andy | — |
| Samedi | *(kids 11h30-14h, IONY)* | — | — |

Styles tels quels : Hip-Hop · Locking · House Dance · Dancehall · Popping · Bboying · Jazz Rock · Voguing · Amapiano (+ Hip-Hop Kids). 24 cours adultes, 4 kids.

## Ambassadeur d'Espérance

- **Identité** : école **sans murs**, trois lieux loués : Studio Bleu Pantin (100 av. du Général Leclerc, 93500 Pantin) · La Place (10 passage de la Canopée, 75001) · Studio Bleu 12e (10 rue Érard, 75012). Instagram @ambassadeurdesperance. Réservation Viviarto (en ligne) ou espèces sur place, un seul lien pour tous les cours. Prix unité 17 € ; cartes 10 : 150 € (3 mois) · 20 : 280 € (6 mois) · 50 : 600 € (8 mois), tous lieux. Durée 1h30.
- **Source du planning** : page « Nos cours » (Webflow), liste par lieu et par jour, déclarée « mise à jour chaque semaine », réseaux sociaux en référence.
- **Format** : liste texte, lisible ; grille « réguliers » + guests hebdo + cours mensuels.
- **Pièges** : **incohérences internes** à la même date entre la grille et la liste des profs (Aminata Crazystyle mardi 20h30 vs mercredi 19h ; Myax mardi 19h vs 20h30 ; Eva lundi uniquement vs lundi La Place **et** jeudi Pantin ; Cintia « Débutants » vs « Tous niveaux » ; Carmel jusqu'à 21h30 en anglais, 20h30 en français) ; version anglaise obsolète encore en ligne (15 €, 140 €/10) ; ancienne page indexée avec le Palais de la Femme (75011) comme troisième lieu, remplacé depuis ; guests hebdo à style tournant exclus (D37) ; cours mensuel du vendredi exclu ; guests avec styles hors taxonomie (Afro / Jazz rock, Identité Artistique) ; binôme « Mariana et Kenny » (D38).
- **Relevé** — grille « réguliers » telle que publiée :

| Lieu | Jour | Créneau | Niveau | Style | Prof |
|---|---|---|---|---|---|
| Studio Bleu Pantin | Lundi | 19h-20h30 | Tous niveaux | Hip Hop | Spider |
| Studio Bleu Pantin | Lundi | 20h30-22h | Tous niveaux | Coaching FreeStyle | Spider |
| Studio Bleu Pantin | Mardi | 19h-20h30 | Tous niveaux | Waacking | Boubou |
| Studio Bleu Pantin | Mardi | 20h30-22h | Tous niveaux | Electro | Myax |
| Studio Bleu Pantin | Mercredi | 19h-20h30 | Tous niveaux | Hip Hop | Aminata Crazystyle |
| Studio Bleu Pantin | Mercredi | 20h30-22h | Tous niveaux | Waacking | Sofia |
| Studio Bleu Pantin | Mercredi | 20h30-22h | Tous niveaux | House | Raza |
| Studio Bleu Pantin | Jeudi | 19h-20h30 | Débutants/inter | Hip Hop Choreo | Carmel |
| Studio Bleu Pantin | Jeudi | 20h30-22h | Débutants | Waacking | Eva |
| Studio Bleu Pantin | Vendredi (1×/mois) | 19h-20h30 | Tous niveaux | ? (cours mensuel) | ? |
| La Place (75001) | Lundi | 19h-20h30 | Débutants | House | Valentina Paradox-sal |
| La Place (75001) | Lundi | 19h-20h30 | Tous niveaux | Guest | rotatif |
| La Place (75001) | Lundi | 20h30-22h | Débutants | Waacking | Eva |
| La Place (75001) | Lundi | 20h30-22h | Tous niveaux | Guest | rotatif |
| Studio Bleu 12e (75012) | Jeudi | 19h-20h30 | Tous niveaux | Popping | Cintia |
| Studio Bleu 12e (75012) | Jeudi | 20h30-22h | Débutants | Hip Hop | Mariana et Kenny |

Guests hebdomadaires (mardis 20h30 d'après la liste, lundis à La Place d'après la grille) : Nelson, Joseph Go, Link Le Neil, Mounia, Yanou, Darren & Willis, Anaïs, Odilon, Erine, Oumrata, Odile, Waabee. Styles tels quels : Hip Hop · Coaching FreeStyle · Waacking · Electro · House · Hip Hop Choreo · Popping (+ guests : Voguing, Afro / Jazz rock, Identité Artistique).

## Studio MRG

- **Identité** : studio avec lieu propre, 6 rue Jules Vanzuppe, 94200 Ivry-sur-Seine. Instagram @studiomrg. Réservation **Bsport**, un seul lien calendrier pour tous les cours. Prix unité 17 € (valable 2 mois) ; cartes 5 : 75 € · 10 : 140 € (3 mois) · 50 : 550 € (6 mois). Cours adultes **à partir de 16 ans**.
- **Source du planning** : image PNG « Planning 2026-27 » sur le site, non lisible par machine ; à transcrire à la main.
- **Format** : image. Snapshot texte de la saison 2025-26 disponible, indicatif seulement, **à ne pas saisir**.
- **Pièges** : texte de la page encore « SAISON 2025-2026 » ; grille 2026-27 non transcrite dans ce passage ; FAQ « les cours débutants sont précisés sur le planning, les autres sont tous niveaux » (cas ambigu 1 de `data-model.md`) ; « Female Class » sans correspondance dans la taxonomie (cas ambigu 2) ; un créneau « GUEST » lundi 20h30 exclu (D37) ; deux créneaux « INTENSIVE CLASSES » (350 €/9 sessions) et formations pro (10 mois / 4 mois) hors périmètre ; site secondaire `studiomrg.com` avec contenus 2019, ne pas utiliser. Cours enfants « jusqu'à fin juin ».
- **Relevé** (snapshot 2025-26, indicatif) : lundi → vendredi, deux créneaux 19h et 20h30, 2 à 4 cours par créneau ; styles : Street Jazz, Hip Hop, Dancehall, Heels, Afro, House, Female Class, Amapiano ; cours enfants/ados 17h et 18h (Afro, Yaps). ~20 cours adultes estimés.

## Volume

~100 à 120 cours adultes urbains par semaine sur les quatre structures (Lax 45-60 à confirmer, JDS 24, Ambassadeur ~15, MRG ~20). Un week-end de saisie.
