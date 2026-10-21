# data-model.md

Tables, contraintes, règles métier et format d'export. Postgres via Supabase, schéma versionné dans `supabase/migrations/`. À lire avant toute migration, requête ou saisie ; à mettre à jour à chaque migration. Les particularités d'un seul studio sont dans `audit-studios.md`.

## Tables

```
studio ──< course >── location
             │  \
             │   └── teacher
             └────── style

auth.users ── profile
auth.users ──< plan_item >── course
```

Un `course` est un créneau hebdomadaire récurrent (D25), rattaché à **un** studio (qui organise et encaisse), **un** lieu (où l'on va), **un** prof (ou le prof « Guest ») et **un** style. Un utilisateur a un `profile` (ses réponses d'onboarding) et des `plan_item` (sa sélection = « mon planning », D05). Noms de tables au singulier, en anglais.

### Types énumérés

| Enum | Valeurs | Source |
|---|---|---|
| `level` | `beginner`, `intermediate`, `advanced` | D10 |
| `course_type` | `freestyle`, `choreography`, `technique` | D31 |
| `grid_reliability` | `season_grid`, `frequent_updates` | D30 |
| `booking_mode` | `app_required`, `online_or_onsite`, `none` | audit |

Le jour de la semaine est un `smallint` 1 (lundi) → 7 (dimanche), conforme à ISO 8601 et à la génération .ics.

### `style` — taxonomie (14 styles, D41, D57)

| Colonne | Type | Contraintes | Note |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | |
| `slug` | `text` | unique, not null | `hip-hop`, `house`, `popping`, `locking`, `waacking`, `voguing`, `dancehall`, `afro`, `breaking`, `krump`, `electro`, `heels`, `street-jazz`, `commercial` |
| `label` | `text` | not null | libellé affiché, en français |
| `sort_order` | `smallint` | not null | ordre d'affichage dans l'onboarding |

En table plutôt qu'en enum pour ajouter un style sans migration de code. La correspondance étiquette brute → style s'applique à la saisie (voir Règles métier), pas en base.

### `studio` — qui organise et encaisse

| Colonne | Type | Contraintes | Note |
|---|---|---|---|
| `id` | `uuid` | PK | |
| `slug` | `text` | unique, not null | |
| `name` | `text` | not null | nom propre, seul libellé affiché |
| `website_url` | `text` | | |
| `instagram` | `text` | | handle sans `@` |
| `booking_mode` | `booking_mode` | not null | |
| `booking_url` | `text` | | un lien par studio, surchargeable par cours |
| `booking_note` | `text` | | affichée sur la fiche : « réservation obligatoire via l'app », « paiement sur place »… |
| `unit_price_cents` | `integer` | check > 0 | prix plein à l'unité (D09) |
| `grid_reliability` | `grid_reliability` | not null | module le disclaimer |
| `grid_source_url` | `text` | | où est publiée la grille |
| `season_end_date` | `date` | | fin annoncée par le studio ; `null` → 30 juin (D27) |
| `notes` | `text` | | interne |
| `created_at` / `updated_at` | `timestamptz` | | |

### `location` — où l'on va (indépendant des studios)

| Colonne | Type | Contraintes | Note |
|---|---|---|---|
| `id` | `uuid` | PK | |
| `name` | `text` | not null | |
| `address_line` | `text` | not null | |
| `postal_code` | `text` | not null | |
| `city` | `text` | not null | |
| `district_label` | `text` | | affiché : « Paris 20e », « Pantin » |
| `metro` | `text` | not null | texte libre affiché, métro ou RER : « Gambetta (L3), Jourdain (L11) », « Pantin (RER E) » |
| `access_note` | `text` | | code porte, etc. |
| `lat` / `lng` | `double precision` | | optionnels, pour un futur filtre distance (D15) |

Un lieu peut accueillir plusieurs studios ; un studio peut utiliser plusieurs lieux.

### `teacher`

| Colonne | Type | Contraintes | Note |
|---|---|---|---|
| `id` | `uuid` | PK | |
| `name` | `text` | unique, not null | clé humaine de dédoublonnage (D26) ; un binôme = une ligne « A & B » (D38) |
| `instagrams` | `text[]` | not null, default `'{}'` | handles sans `@` ; un lien affiché par handle, aucun si vide (D08, D38) |
| `video_url` | `text` | | une vidéo représentative liée (D08) |
| `is_guest` | `boolean` | default false | `true` sur la seule ligne « Guest », réservée aux créneaux à style fixe et prof variable (D30, D37) |
| `notes` | `text` | | |

Pas de photo (D08).

### `course` — un créneau hebdomadaire récurrent (D25)

| Colonne | Type | Contraintes | Note |
|---|---|---|---|
| `id` | `uuid` | PK | |
| `studio_id` | `uuid` | FK → studio, not null | |
| `location_id` | `uuid` | FK → location, not null | |
| `teacher_id` | `uuid` | FK → teacher, not null | |
| `style_id` | `uuid` | FK → style, nullable | au plus un style par cours (D06, D37) ; `null` = style non précisé par le studio (D58) |
| `weekday` | `smallint` | check 1–7, not null | |
| `start_time` | `time` | not null | heure locale Europe/Paris |
| `duration_min` | `integer` | check > 0, not null | |
| `levels` | `level[]` | not null, default `'{}'` | sans étiquette du studio : les trois niveaux (D54) ; `{}` n'est pas utilisé à la saisie |
| `course_type` | `course_type` | nullable | `null` = non précisé ; jamais inféré (D31) |
| `style_raw` | `text` | not null | étiquette du studio telle quelle |
| `level_raw` | `text` | nullable | étiquette du studio telle quelle, `null` si absente |
| `type_raw` | `text` | nullable | |
| `title` | `text` | nullable | libellé affiché si différent du style |
| `booking_url` | `text` | nullable | surcharge du lien studio |
| `price_cents` | `integer` | nullable | surcharge du prix studio |
| `season` | `text` | not null | `2026-2027` |
| `valid_from` | `date` | nullable | |
| `valid_until` | `date` | nullable | `null` → `studio.season_end_date`, sinon 30 juin (D27) |
| `every_other_week` | `boolean` | not null, default false | cours donné une semaine sur deux (D59) |
| `is_active` | `boolean` | default true | retirer un cours sans le supprimer |
| `source_url` | `text` | | page d'où vient la donnée |
| `last_verified_at` | `date` | | dernière vérification manuelle ; affichée sur la fiche |
| `created_at` / `updated_at` | `timestamptz` | | |

### `profile` — réponses d'onboarding (une par compte)

| Colonne | Type | Contraintes | Note |
|---|---|---|---|
| `user_id` | `uuid` | PK, FK → `auth.users(id)` on delete cascade | |
| `style_ids` | `uuid[]` | not null, default `'{}'` | styles visés |
| `levels` | `level[]` | not null, default `'{}'` | |
| `availability` | `jsonb` | not null, default `'{}'` | `{"1":{"day":false,"evening":true}, …, "7":{…}}` (D28) |
| `onboarding_completed_at` | `timestamptz` | nullable | |
| `created_at` / `updated_at` | `timestamptz` | | |

Pas de fréquence visée (D24). Les raccourcis de disponibilités ne sont pas stockés : ils pré-remplissent `availability` côté client.

### `plan_item` — « mon planning » (D05)

| Colonne | Type | Contraintes | Note |
|---|---|---|---|
| `id` | `uuid` | PK | |
| `user_id` | `uuid` | FK → `auth.users(id)` on delete cascade, not null | |
| `course_id` | `uuid` | FK → course, not null | |
| `added_at` | `timestamptz` | default `now()` | |

Pas de statut, pas de motif (V2, D14).

## Contraintes et RLS

- `course` : unicité `(studio_id, weekday, start_time, teacher_id, style_id)`, `nulls not distinct` : deux cours sans style se confondent, pour que la saisie reste rejouable (D58). Deux cours au même créneau dans le même studio avec des profs différents sont légitimes (plusieurs salles).
- `plan_item` : unicité `(user_id, course_id)`.
- `teacher.name` unique ; `style.slug` et `studio.slug` uniques.
- RLS activée sur toutes les tables (D19) :

| Table | Lecture | Écriture |
|---|---|---|
| `style`, `studio`, `location`, `teacher`, `course` | publique (anon + authentifié) | aucune depuis l'app ; saisie par les fichiers de `supabase/data/` (D52) |
| `profile` | `auth.uid() = user_id` | idem (insert, update) |
| `plan_item` | `auth.uid() = user_id` | idem (insert, delete) |

## Règles métier

Une règle par ligne. En cas d'ambiguïté, le cas est listé en fin de section, pas deviné.

### Admission (ce qui entre en base)

- Un cours = un créneau hebdomadaire récurrent sur la période de la grille (D25).
- Seuls les studios de la curation entrent (D17). Un lieu doit être à moins de dix minutes à pied d'une station de métro (lignes 1 à 14) ou de RER, hors tram (D29 révisé le 21/10).
- « Adulte » = tout cours non étiqueté enfants / ados (D30).
- Ouvert à l'unité : les formations à engagement ou sur audition et les programmes payants à part n'entrent pas (D25).
- Pas de ligne pour : stages, workshops, masterclass, événements ponctuels, cours mensuels (D25, D30).
- Un créneau à prof variable (Guest) entre seulement si son style est fixe ; s'il change chaque semaine, il n'entre pas (D37).
- Au plus un style par cours ; les styles hors taxonomie n'entrent pas (D41).
- Un cours donné une semaine sur deux entre, marqué `every_other_week` (D59).
- Une grille 2026-2027 publiée est la source ; une grille de la saison précédente ne se saisit pas (D07).
- Les exceptions (vacances, remplacements) ne se modélisent pas (D07).

### Correspondance (étiquette du studio → champs)

- L'étiquette du studio prime et se conserve telle quelle dans `style_raw`, `level_raw`, `type_raw` (D06, D10).
- Styles (D41, D57) : Hip-hop ← HipHop, Hip-Hop, Hip Hop, Hip Hop Choreo, HipHop Choreography, Coaching FreeStyle (D55) · Commercial ← toute étiquette contenant « Commercial » (Commercial, Commercial HipHop, Commercial - Movement Quality) · House ← House, House Dance · Popping · Locking · Waacking · Voguing ← Voguing, Vogue Fem Class · Dancehall ← Dancehall, Dancehall Hybrid, Dancehall Style Jamaica, Street Ragga · Afro ← Afro, Afro Hybrid, Amapiano, Tyaka Dance · Breaking ← Bboying · Krump · Electro · Heels ← Heels, Heels (Choreo), Heels Choreo, Talons · Street jazz ← Street Jazz, Street-Jazz, Urban Jazz · « Choreography » seul → style `null`, type `choreography` (D58).
- Hors taxonomie, pas de ligne : Contemporary, Contemporary Lyrical, Urban Contemporary, Modern Contempo, Jazz, Jazz Fusion, Jazz Rock, Organic Dance Movement, Yoga Dynamique, Atelier Scénique, Identité Artistique (D41).
- Niveaux (D10) : « Tous niveaux » → `{beginner, intermediate, advanced}` · « INTER/AV » → `{intermediate, advanced}` · « DEB/INTER », « Débutants/inter » → `{beginner, intermediate}` · « Débutants », « DEBUTANT » → `{beginner}` · « INTER » → `{intermediate}` · « AVANCÉ » → `{advanced}` (D57) · aucune étiquette → `{beginner, intermediate, advanced}`, `level_raw` null (D54).
- Source (D55) : quand une page du studio se contredit (planning et liste des profs, versions française et anglaise), le planning publié prime.
- Type (D31) : renseigné uniquement quand l'étiquette le dit — « Coaching FreeStyle » → `freestyle`, style hip-hop (D55) ; « … Choreo » → `choreography` ; « … (Cours Technique) » → `technique` ; sinon `null`, jamais inféré.
- Titre : `title` renseigné quand le studio nomme le cours autrement que par le style (ex. « Snaking Popping » → style Popping, titre conservé).
- Nom de prof : majuscule au début de chaque mot, le reste en minuscules, y compris après un tiret et pour les noms de scène (« Spider », « K-Yoo », « Axoo Gucci ») ; un nom de scène qui complète le nom se met entre parenthèses (« Aston (Snaking Popping) ») (D53).
- Prof : dédoublonnage par le nom, un prof présent dans deux studios = une ligne (D26) ; un binôme = une ligne « A & B » dans l'ordre du studio, un handle par personne dans `instagrams` (D38) ; prof tournant = la ligne « Guest » (D30).
- Prix et lien de réservation : au niveau studio, surcharge par cours seulement si le studio publie un prix ou un lien propre à ce cours.
- `source_url` et `last_verified_at` renseignés à chaque saisie, pour re-vérifier studio par studio.

### Comportement (moteur et affichage)

- Soirée = cours commençant à 18h00 ou après ; journée sinon (D28). Un cours matche si `availability[weekday][plage]` est vrai.
- Style : `course.style_id` ∈ `profile.style_ids`, **ou** `course.style_id` null (style non précisé : visible par tous, D58).
- Niveau : `course.levels` vide **ou** intersection non vide avec `profile.levels` (D10, D30).
- Type (si un filtre de type est exposé) : `course.course_type` null **ou** égal au filtre (D31).
- Tri : `weekday`, puis `start_time` ; chevauchements autorisés et visibles, aucune règle de non-chevauchement (D05, D20).
- Seuls les cours `is_active` dont `valid_until` (ou le défaut) n'est pas passé.
- Le prix est affiché, jamais filtrant (D09).
- Le disclaimer de saison est modulé par `studio.grid_reliability` (D30).
- Mention « prof variable » si `teacher.is_guest` ; « style non précisé par le studio » si `style_id` null (D58) ; « une semaine sur deux, vérifie sur l'application du studio » si `every_other_week` (D59) ; « non précisé » si `course_type` null. Pas de mention de niveau : un cours sans étiquette est tous niveaux (D54).

### Cas ambigus listés

1. **Absence d'étiquette de niveau interprétée par une FAQ** (« débutant précisé sur la grille, le reste tous niveaux ») : la règle « aucune étiquette → `{}` » ou la FAQ du studio ? Sans objet tant que Studio MRG est hors périmètre (D43) ; à trancher s'il revient.
2. **« Female Class »** : aucun style de la taxonomie ne lui correspond. Sans objet tant que Studio MRG est hors périmètre (D43).
3. **« Coaching FreeStyle »** : tranché (D55) : style hip-hop, type `freestyle`.
4. **Deux sources d'un même studio qui se contredisent** : tranché (D55) : le planning publié prime.
5. **Guest à style fixe** : aucun cas relevé à ce jour ; la ligne « Guest » reste sans usage tant qu'il n'en existe pas (D37).
6. **Export .ics d'un cours une semaine sur deux** : on ne sait pas quelle semaine est la bonne ; récurrence hebdomadaire avec avertissement, `INTERVAL=2` à partir d'une semaine supposée, ou exclusion de l'export ? À trancher avec l'export (D59).

## Format .ics (D23, D27)

- Un `VEVENT` par cours, `RRULE:FREQ=WEEKLY;BYDAY=…;UNTIL=<valid_until ou défaut>`, `DTSTART` = prochaine occurrence, `TZID=Europe/Paris` (bibliothèque à choisir au moment du code ; le changement d'heure est à tester).
- `SUMMARY` : `{style.label} · {teacher.name} — {studio.name}` ; `LOCATION` : adresse du `location` ; `DESCRIPTION` : prix, lien de réservation, disclaimer « planning de saison, vérifie sur le site du studio », mention « prof variable » si `teacher.is_guest` ; `URL` : `booking_url` du cours ou du studio.
- Pas d'`EXDATE` pour les fermetures (exceptions hors périmètre, D07).
- Deux granularités : un cours, ou tous les `plan_item` de l'utilisateur. Jamais la liste filtrée entière (D23).
