-- Juste Debout School : grille des cours open adultes, saison 2026-2027 (D52).
-- Source : https://www.juste-debout-school.com/cours-open-prives/ relevée le 21/10/2026.
-- Rejouable : les lignes existantes sont mises à jour, jamais dupliquées.
-- Règles appliquées (data-model.md) :
--   aucune étiquette de niveau → les trois niveaux, level_raw null (D54) ;
--   noms de profs : majuscule au début de chaque mot (D53) ; Snaking Popping est le nom de scène d'Aston ;
--   aucun type annoncé → course_type null ;
--   durée 1h30 partout ; prix et paiement au niveau du studio.
-- Exclus : Jazz Rock (jeudi 17h30, hors taxonomie, D41) ; cours Hip-Hop Kids (D30) ;
--   site INDUSTRY (75017), annoncé mais pas ouvert.

begin;

insert into studio (slug, name, website_url, booking_mode, booking_note, unit_price_cents,
                    grid_reliability, grid_source_url, notes)
values ('juste-debout-school', 'Juste Debout School', 'https://www.juste-debout-school.com',
        'none', 'Sans réservation, paiement sur place.', 1500,
        'season_grid', 'https://www.juste-debout-school.com/cours-open-prives/',
        'Second site INDUSTRY (27 bd de la Somme, 75017) annoncé, pas encore ouvert : non saisi.')
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
-- On met à jour le lieu s'il existe, sinon on l'insère.
update location set
  name = 'Juste Debout School', city = 'Paris', district_label = 'Paris 20e',
  metro = 'Gambetta (L3), Jourdain (L11)'
where address_line = '3 rue de l''Est' and postal_code = '75020';

insert into location (name, address_line, postal_code, city, district_label, metro)
select 'Juste Debout School', '3 rue de l''Est', '75020', 'Paris', 'Paris 20e',
       'Gambetta (L3), Jourdain (L11)'
where not exists (
  select 1 from location where address_line = '3 rue de l''Est' and postal_code = '75020'
);

-- Profs : nom normalisé (D53) ; un prof déjà saisi ailleurs n'est pas recréé (D26).
insert into teacher (name) values
  ('Baby Roc1'), ('Ayélé'), ('La Petite'), ('Daneshiro'), ('Queensy'), ('La Salle Rose'),
  ('K-Yoo'), ('Tarik'), ('Soyymimy'), ('Aston (Snaking Popping)'), ('Kota'), ('Hpone'),
  ('Dys Dys'), ('Boustesse'),
  ('Axoo Gucci'), ('Spider'), ('Tevin'), ('Rickysoul'),
  ('Henrique'), ('Giu'), ('Trix'), ('Andy')
on conflict (name) do nothing;

-- Cours : jour (1 = lundi), heure, style, étiquette du studio, prof, titre.
with grid (weekday, start_time, style_slug, style_raw, teacher_name, title) as (
  values
    (1, '17:30', 'hip-hop',   'Hip-Hop',     'Baby Roc1',     null),
    (1, '17:30', 'hip-hop',   'Hip-Hop',     'Ayélé',         null),
    (1, '17:30', 'locking',   'Locking',     'La Petite',     null),
    (1, '19:00', 'house',     'House Dance', 'Daneshiro',     null),
    (1, '19:00', 'dancehall', 'Dancehall',   'Queensy',       null),
    (1, '20:30', 'hip-hop',   'Hip-Hop',     'La Salle Rose', null),
    (2, '17:30', 'hip-hop',   'Hip-Hop',     'K-Yoo',         null),
    (2, '17:30', 'house',     'House Dance', 'Tarik',         null),
    (2, '19:00', 'hip-hop',   'Hip-Hop',     'Soyymimy',      null),
    (2, '19:00', 'popping',   'Popping',     'Aston (Snaking Popping)', null),
    (2, '19:00', 'locking',   'Locking',     'Kota',          null),
    (2, '20:30', 'house',     'House Dance', 'Hpone',         null),
    (3, '19:00', 'breaking',  'Bboying',     'Dys Dys',       null),
    (3, '20:30', 'house',     'House Dance', 'Boustesse',     null),
    (4, '17:30', 'voguing',   'Voguing',     'Axoo Gucci',    null),
    (4, '17:30', 'hip-hop',   'Hip-Hop',     'Spider',        null),
    (4, '19:00', 'hip-hop',   'Hip-Hop',     'Tevin',         null),
    (4, '19:00', 'popping',   'Popping',     'Kota',          null),
    (4, '19:00', 'house',     'House Dance', 'Rickysoul',     null),
    (5, '17:30', 'house',     'House Dance', 'Henrique',      null),
    (5, '17:30', 'hip-hop',   'Hip-Hop',     'Giu',           null),
    (5, '19:00', 'hip-hop',   'Hip-Hop',     'Trix',          null),
    (5, '19:00', 'afro',      'Amapiano',    'Andy',          null)
)
insert into course (studio_id, location_id, teacher_id, style_id, weekday, start_time,
                    duration_min, levels, style_raw, title, season, source_url, last_verified_at)
select s.id, l.id, t.id, st.id, g.weekday, g.start_time::time,
       90, '{beginner,intermediate,advanced}'::level[], g.style_raw, g.title, '2026-2027',
       'https://www.juste-debout-school.com/cours-open-prives/', date '2026-10-21'
from grid g
join studio s on s.slug = 'juste-debout-school'
join location l on l.address_line = '3 rue de l''Est' and l.postal_code = '75020'
join teacher t on t.name = g.teacher_name
join style st on st.slug = g.style_slug
on conflict (studio_id, weekday, start_time, teacher_id, style_id) do update set
  location_id = excluded.location_id,
  duration_min = excluded.duration_min,
  levels = excluded.levels,
  style_raw = excluded.style_raw,
  title = excluded.title,
  season = excluded.season,
  is_active = true,
  source_url = excluded.source_url,
  last_verified_at = excluded.last_verified_at;

commit;
