-- Lax Studio : planning annuel 2026-2027 (D52).
-- Source : visuel « Planning annuel 2026-2027 » du studio, transmis par Emmanuel et relevé le 21/10/2026.
-- Rejouable : les lignes existantes sont mises à jour, jamais dupliquées.
-- Règles appliquées (data-model.md) :
--   durée 1h30 (la grille affiche 1h15, transition comprise, D56) ;
--   Commercial, Commercial HipHop, Commercial - Movement Quality → commercial (D57) ;
--   « Choreography » seul → style non précisé, type choreography (D58) ;
--   « … Choreo », « … Choreography » → type choreography (D31) ;
--   Street Ragga, Dancehall Hybrid, Dancehall Style Jamaica → dancehall ; Afro Hybrid, Tyaka Dance → afro ;
--   Urban Jazz, Street-Jazz → street-jazz (D41, D57) ;
--   « 1 semaine sur 2 » → every_other_week (D59) ; le dimanche en salle 1, un cours présent en
--   semaine 1 et en semaine 2 est hebdomadaire ;
--   noms de profs normalisés (D53).
-- Exclus : styles non urbains (Yoga Dynamique Flow, Modern / Contempo, Jazz, Organic Dance Movement,
--   Contemporary, Jazz Fusion, Urban Contemporary, Contemporary Lyrical, D41) ; Special Class et
--   Guests, style tournant (D37).

begin;

insert into studio (slug, name, website_url, booking_mode, booking_note, unit_price_cents,
                    grid_reliability, grid_source_url, notes)
values ('lax-studio', 'Lax Studio', 'https://www.laxstudio.fr',
        'app_required', 'Réservation obligatoire dans l''application Lax.', 1700,
        'season_grid', 'https://www.laxstudio.fr',
        'Planning annuel 2026-2027 publié en visuel. Créneaux affichés en 1h15, durée réelle 1h30 (D56). Fermeture du 21/12/2026 au 03/01/2027, non modélisée (D07).')
on conflict (slug) do update set
  name = excluded.name,
  website_url = excluded.website_url,
  booking_mode = excluded.booking_mode,
  booking_note = excluded.booking_note,
  unit_price_cents = excluded.unit_price_cents,
  grid_reliability = excluded.grid_reliability,
  grid_source_url = excluded.grid_source_url,
  notes = excluded.notes;

-- location n'a pas de clé unique : un lieu se reconnaît à son adresse et son code postal.
update location set
  name = 'Lax Studio', city = 'Paris', district_label = 'Paris 20e', metro = 'Alexandre Dumas (L2)'
where address_line = '18 bis villa Riberolle' and postal_code = '75020';

insert into location (name, address_line, postal_code, city, district_label, metro)
select 'Lax Studio', '18 bis villa Riberolle', '75020', 'Paris', 'Paris 20e', 'Alexandre Dumas (L2)'
where not exists (
  select 1 from location where address_line = '18 bis villa Riberolle' and postal_code = '75020'
);

-- « Carmel » chez Ambassadeur d'Espérance est Carmel Loanga (même prof, D26).
update teacher set name = 'Carmel Loanga'
where name = 'Carmel' and not exists (select 1 from teacher where name = 'Carmel Loanga');

-- Profs : nom normalisé (D53) ; un prof déjà saisi ailleurs n'est pas recréé (D26).
insert into teacher (name) values
  ('Delphine Lemaître'),
  ('Samad'),
  ('Djibryl Denaï'),
  ('Carmel Loanga'),
  ('Lionel Vero'),
  ('William Arese'),
  ('Jr Dirty'),
  ('Laetitia Simon'),
  ('Indies Rhino'),
  ('Jerky Jessy'),
  ('Sharxxx'),
  ('Kuty'),
  ('Céline Vacca'),
  ('Andy Da Veiga'),
  ('Layo'),
  ('Kwal King'),
  ('Yankee'),
  ('Maxime Garvi'),
  ('Aston (Snaking Popping)'),
  ('Léonie Mauger'),
  ('Romeo Traetto'),
  ('Dylan Finlande'),
  ('Yassin'),
  ('Omar Khdiri'),
  ('Kate Kovalenko'),
  ('Leany'),
  ('Steven Deba'),
  ('Boun'''),
  ('Chaton'),
  ('Jayjay'),
  ('Clément Cepeda'),
  ('Jena Divol'),
  ('Marion Agosta'),
  ('Aurélie Sériné'),
  ('Quentin Cerini'),
  ('Jordan Boury'),
  ('Jo Dos Santos'),
  ('Jackenzy'),
  ('Ulijen')
on conflict (name) do nothing;

-- Cours : jour (1 = lundi), heure, style, étiquette du studio, niveaux, étiquette de niveau,
-- type, étiquette de type, prof, titre, une semaine sur deux.
with grid (weekday, start_time, style_slug, style_raw, levels, level_raw,
           course_type, type_raw, teacher_name, title, every_other_week) as (
  values
    (1, '17:30', 'street-jazz', 'Street Jazz',                   '{intermediate,advanced}',          'INTER/AV',     null,           null,                   'Delphine Lemaître',        null,               false),
    (1, '17:30', 'hip-hop',    'HipHop',                        '{intermediate,advanced}',          'INTER/AV',     null,           null,                   'Samad',                    null,               false),
    (1, '19:00', 'hip-hop',    'HipHop',                        '{intermediate,advanced}',          'INTER/AV',     null,           null,                   'Djibryl Denaï',            null,               false),
    (1, '19:00', 'hip-hop',    'HipHop Choreography',           '{beginner,intermediate}',          'DEB/INTER',    'choreography', 'HipHop Choreography',  'Carmel Loanga',            null,               false),
    (1, '20:30', 'afro',       'Afro',                          '{beginner,intermediate}',          'DEB/INTER',    null,           null,                   'Lionel Vero',              null,               false),
    (1, '20:30', null,         'Choreography',                  '{intermediate,advanced}',          'INTER/AV',     'choreography', 'Choreography',         'William Arese',            null,               false),
    (1, '20:30', 'krump',      'Krump',                         '{beginner,intermediate}',          'DEB/INTER',    null,           null,                   'Jr Dirty',                 null,               false),
    (2, '17:30', 'heels',      'Heels Choreo',                  '{intermediate,advanced}',          'INTER/AV',     'choreography', 'Heels Choreo',         'Laetitia Simon',           null,               false),
    (2, '17:30', 'hip-hop',    'HipHop',                        '{intermediate,advanced}',          'INTER/AV',     null,           null,                   'Indies Rhino',             null,               false),
    (2, '19:00', 'commercial', 'Commercial',                    '{advanced}',                       'AVANCÉ',       null,           null,                   'Jerky Jessy',              null,               false),
    (2, '19:00', 'house',      'House Dance',                   '{intermediate,advanced}',          'INTER/AV',     null,           null,                   'Sharxxx',                  null,               false),
    (2, '20:30', 'hip-hop',    'HipHop',                        '{intermediate,advanced}',          'INTER/AV',     null,           null,                   'Kuty',                     null,               false),
    (2, '20:30', 'dancehall',  'Dancehall',                     '{intermediate,advanced}',          'INTER/AV',     null,           null,                   'Céline Vacca',             null,               false),
    (3, '17:30', 'street-jazz', 'Street Jazz',                   '{intermediate,advanced}',          'INTER/AV',     null,           null,                   'Andy Da Veiga',            null,               false),
    (3, '17:30', 'house',      'House Dance',                   '{beginner,intermediate}',          'DEB/INTER',    null,           null,                   'Sharxxx',                  null,               false),
    (3, '19:00', 'commercial', 'Commercial',                    '{advanced}',                       'AVANCÉ',       null,           null,                   'Layo',                     null,               false),
    (3, '19:00', 'dancehall',  'Dancehall Style Jamaica',       '{beginner,intermediate}',          'DEB/INTER',    null,           null,                   'Kwal King',                null,               false),
    (3, '20:30', 'locking',    'Locking',                       '{beginner,intermediate,advanced}', 'TOUS NIVEAUX', null,           null,                   'Yankee',                   null,               false),
    (4, '17:30', 'street-jazz', 'Street Jazz',                   '{intermediate,advanced}',          'INTER/AV',     null,           null,                   'Delphine Lemaître',        null,               false),
    (4, '17:30', 'hip-hop',    'HipHop',                        '{intermediate,advanced}',          'INTER/AV',     null,           null,                   'Maxime Garvi',             null,               false),
    (4, '19:00', 'commercial', 'Commercial',                    '{advanced}',                       'AVANCÉ',       null,           null,                   'Jerky Jessy',              null,               false),
    (4, '20:30', 'street-jazz', 'Street Jazz',                   '{beginner,intermediate}',          'DEB/INTER',    null,           null,                   'Delphine Lemaître',        null,               false),
    (4, '20:30', 'popping',    'Popping',                       '{beginner,intermediate,advanced}', 'TOUS NIVEAUX', null,           null,                   'Aston (Snaking Popping)',  null,               false),
    (5, '17:30', 'heels',      'Heels Choreo',                  '{intermediate,advanced}',          'INTER/AV',     'choreography', 'Heels Choreo',         'Léonie Mauger',            null,               false),
    (5, '17:30', 'commercial', 'Commercial',                    '{intermediate,advanced}',          'INTER/AV',     null,           null,                   'Romeo Traetto',            null,               false),
    (5, '19:00', 'commercial', 'Commercial',                    '{beginner,intermediate}',          'DEB/INTER',    null,           null,                   'Dylan Finlande',           null,               false),
    (5, '19:00', 'hip-hop',    'HipHop',                        '{intermediate,advanced}',          'INTER/AV',     null,           null,                   'Yassin',                   null,               false),
    (5, '20:30', 'hip-hop',    'HipHop',                        '{intermediate,advanced}',          'INTER/AV',     null,           null,                   'Omar Khdiri',              null,               false),
    (6, '11:30', null,         'Choreography',                  '{intermediate}',                   'INTER',        'choreography', 'Choreography',         'Kate Kovalenko',           null,               false),
    (6, '13:00', 'commercial', 'Commercial',                    '{intermediate,advanced}',          'INTER/AV',     null,           null,                   'Leany',                    null,               false),
    (6, '13:00', 'dancehall',  'Street Ragga',                  '{intermediate}',                   'INTER',        null,           null,                   'Steven Deba',              null,               false),
    (6, '14:30', 'afro',       'Afro Hybrid',                   '{beginner}',                       'DEBUTANT',     null,           null,                   'Boun''',                   null,               false),
    (6, '14:30', 'commercial', 'Commercial',                    '{intermediate,advanced}',          'INTER/AV',     null,           null,                   'Chaton',                   null,               false),
    (6, '16:00', 'dancehall',  'Dancehall Hybrid',              '{beginner,intermediate}',          'DEB/INTER',    null,           null,                   'Jayjay',                   null,               false),
    (6, '16:00', null,         'Choreography',                  '{intermediate,advanced}',          'INTER/AV',     'choreography', 'Choreography',         'Clément Cepeda',           null,               false),
    (6, '17:30', 'commercial', 'Commercial',                    '{intermediate,advanced}',          'INTER/AV',     null,           null,                   'Jena Divol',               null,               false),
    (6, '17:30', 'street-jazz', 'Urban Jazz',                    '{intermediate,advanced}',          'INTER/AV',     null,           null,                   'Marion Agosta',            null,               false),
    (7, '11:30', 'afro',       'Tyaka Dance By Ralph Beaubrun', '{beginner}',                       'DEBUTANT',     null,           null,                   'Aurélie Sériné',           null,               true),
    (7, '13:00', 'afro',       'Tyaka Dance By Ralph Beaubrun', '{beginner,intermediate}',          'DEB/INTER',    null,           null,                   'Aurélie Sériné',           null,               true),
    (7, '13:00', 'commercial', 'Commercial',                    '{beginner}',                       'DEBUTANT',     null,           null,                   'Jena Divol',               null,               true),
    (7, '14:30', 'street-jazz', 'Street Jazz',                   '{beginner,intermediate}',          'DEB/INTER',    null,           null,                   'Quentin Cerini',           null,               false),
    (7, '16:00', 'street-jazz', 'Street-Jazz',                   '{beginner,intermediate}',          'DEB/INTER',    null,           null,                   'Andy Da Veiga',            null,               false),
    (7, '16:00', 'commercial', 'Commercial - Movement Quality', '{intermediate,advanced}',          'INTER/AV',     null,           null,                   'Jordan Boury',             'Movement Quality', false),
    (7, '17:30', 'street-jazz', 'Street-Jazz',                   '{beginner,intermediate}',          'DEB/INTER',    null,           null,                   'Andy Da Veiga',            null,               false),
    (7, '17:30', 'commercial', 'Commercial HipHop',             '{intermediate,advanced}',          'INTER/AV',     null,           null,                   'Jo Dos Santos',            null,               false),
    (7, '19:00', 'hip-hop',    'HipHop',                        '{advanced}',                       'AVANCÉ',       null,           null,                   'Jackenzy',                 null,               false),
    (7, '19:00', 'house',      'House Dance',                   '{beginner}',                       'DEBUTANT',     null,           null,                   'Ulijen',                   null,               false)
)
insert into course (studio_id, location_id, teacher_id, style_id, weekday, start_time,
                    duration_min, levels, level_raw, course_type, type_raw, style_raw, title,
                    every_other_week, season, source_url, last_verified_at)
select s.id, l.id, t.id, st.id, g.weekday, g.start_time::time,
       90, g.levels::level[], g.level_raw, g.course_type::course_type, g.type_raw, g.style_raw, g.title,
       g.every_other_week, '2026-2027', 'https://www.laxstudio.fr', date '2026-10-21'
from grid g
join studio s on s.slug = 'lax-studio'
join location l on l.address_line = '18 bis villa Riberolle' and l.postal_code = '75020'
join teacher t on t.name = g.teacher_name
left join style st on st.slug = g.style_slug
on conflict (studio_id, weekday, start_time, teacher_id, style_id) do update set
  location_id = excluded.location_id,
  duration_min = excluded.duration_min,
  levels = excluded.levels,
  level_raw = excluded.level_raw,
  course_type = excluded.course_type,
  type_raw = excluded.type_raw,
  style_raw = excluded.style_raw,
  title = excluded.title,
  every_other_week = excluded.every_other_week,
  season = excluded.season,
  is_active = true,
  source_url = excluded.source_url,
  last_verified_at = excluded.last_verified_at;

commit;
