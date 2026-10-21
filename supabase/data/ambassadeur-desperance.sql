-- Ambassadeur d'Espérance : planning des cours réguliers, saison 2026-2027 (D52).
-- Source : https://www.ecole-ambassadeurdesperance.fr/nos-cours relevée le 21/10/2026.
-- Rejouable : les lignes existantes sont mises à jour, jamais dupliquées.
-- Règles appliquées (data-model.md) :
--   le planning prime sur la liste des profs de la même page (D55) ;
--   niveaux : « Tous niveaux » → les trois, « Débutants » → beginner,
--   « Débutants/inter » → beginner + intermediate (D10) ;
--   type : « Hip Hop Choreo » → choreography ; « Coaching FreeStyle » → freestyle, style hip-hop (D31, D55) ;
--   noms de profs normalisés (D53) ; binôme « Mariana et Kenny » → « Mariana & Kenny » (D38) ;
--   durée 1h30 partout ; prix et réservation au niveau du studio.
-- Exclus : les deux créneaux « Guest » du lundi à La Place, style tournant (D37) ;
--   guests et cours mensuels (D25, D30).

begin;

insert into studio (slug, name, website_url, booking_mode, booking_url, booking_note,
                    unit_price_cents, grid_reliability, grid_source_url, notes)
values ('ambassadeur-desperance', 'Ambassadeur d''Espérance',
        'https://www.ecole-ambassadeurdesperance.fr',
        'online_or_onsite',
        'https://viviarto.com/organisateurs-ateliers-cours-artistiques/ambassadeur-desperance/planning?archive-id=0',
        'Réservation en ligne, ou paiement en espèces sur place.', 1700,
        'frequent_updates', 'https://www.ecole-ambassadeurdesperance.fr/nos-cours',
        'École sans murs, trois lieux loués. Planning annoncé « mis à jour chaque semaine ».')
on conflict (slug) do update set
  name = excluded.name,
  website_url = excluded.website_url,
  booking_mode = excluded.booking_mode,
  booking_url = excluded.booking_url,
  booking_note = excluded.booking_note,
  unit_price_cents = excluded.unit_price_cents,
  grid_reliability = excluded.grid_reliability,
  grid_source_url = excluded.grid_source_url,
  notes = excluded.notes;

-- location n'a pas de clé unique : un lieu se reconnaît à son adresse et son code postal.
-- On met à jour les lieux existants, puis on insère les absents.
create temp table releve_location on commit drop as
select * from (values
  ('Studio Bleu Pantin', '100 avenue du Général Leclerc', '93500', 'Pantin', 'Pantin',
   'Pantin (RER E), Hoche (L5)'),
  ('La Place', '10 passage de la Canopée', '75001', 'Paris', 'Paris 1er',
   'Les Halles (L4), Châtelet (L1, L4, L7, L11, L14)'),
  ('Studio Bleu 12e', '10 rue Érard', '75012', 'Paris', 'Paris 12e',
   'Reuilly-Diderot (L1, L8)')
) as v (name, address_line, postal_code, city, district_label, metro);

update location l set
  name = v.name, city = v.city, district_label = v.district_label, metro = v.metro
from releve_location v
where l.address_line = v.address_line and l.postal_code = v.postal_code;

insert into location (name, address_line, postal_code, city, district_label, metro)
select v.* from releve_location v
where not exists (
  select 1 from location l where l.address_line = v.address_line and l.postal_code = v.postal_code
);

-- Profs : nom normalisé (D53) ; un prof déjà saisi ailleurs n'est pas recréé (D26).
insert into teacher (name) values
  ('Spider'), ('Boubou'), ('Myax'), ('Aminata Crazystyle'), ('Sofia'), ('Raza'),
  ('Carmel Loanga'), ('Eva'), ('Valentina Paradox-Sal'), ('Cintia'), ('Mariana & Kenny')
on conflict (name) do nothing;

-- Cours : lieu (code postal), jour (1 = lundi), heure, style, étiquettes du studio, prof.
with grid (postal_code, weekday, start_time, style_slug, style_raw, levels, level_raw,
           course_type, type_raw, teacher_name) as (
  values
    ('93500', 1, '19:00', 'hip-hop',  'Hip Hop',            '{beginner,intermediate,advanced}', 'Tous niveaux',    null,           null,                 'Spider'),
    ('93500', 1, '20:30', 'hip-hop',  'Coaching FreeStyle', '{beginner,intermediate,advanced}', 'Tous niveaux',    'freestyle',    'Coaching FreeStyle', 'Spider'),
    ('93500', 2, '19:00', 'waacking', 'Waacking',           '{beginner,intermediate,advanced}', 'Tous niveaux',    null,           null,                 'Boubou'),
    ('93500', 2, '20:30', 'electro',  'Electro',            '{beginner,intermediate,advanced}', 'Tous niveaux',    null,           null,                 'Myax'),
    ('93500', 3, '19:00', 'hip-hop',  'Hip Hop',            '{beginner,intermediate,advanced}', 'Tous niveaux',    null,           null,                 'Aminata Crazystyle'),
    ('93500', 3, '20:30', 'waacking', 'Waacking',           '{beginner,intermediate,advanced}', 'Tous niveaux',    null,           null,                 'Sofia'),
    ('93500', 3, '20:30', 'house',    'House',              '{beginner,intermediate,advanced}', 'Tous niveaux',    null,           null,                 'Raza'),
    ('93500', 4, '19:00', 'hip-hop',  'Hip Hop Choreo',     '{beginner,intermediate}',          'Débutants/inter', 'choreography', 'Hip Hop Choreo',     'Carmel Loanga'),
    ('93500', 4, '20:30', 'waacking', 'Waacking',           '{beginner}',                       'Débutants',       null,           null,                 'Eva'),
    ('75001', 1, '19:00', 'house',    'House',              '{beginner}',                       'Débutants',       null,           null,                 'Valentina Paradox-Sal'),
    ('75001', 1, '20:30', 'waacking', 'Waacking',           '{beginner}',                       'Débutants',       null,           null,                 'Eva'),
    ('75012', 4, '19:00', 'popping',  'Popping',            '{beginner,intermediate,advanced}', 'Tous niveaux',    null,           null,                 'Cintia'),
    ('75012', 4, '20:30', 'hip-hop',  'Hip Hop',            '{beginner}',                       'Débutants',       null,           null,                 'Mariana & Kenny')
)
insert into course (studio_id, location_id, teacher_id, style_id, weekday, start_time,
                    duration_min, levels, level_raw, course_type, type_raw, style_raw,
                    season, source_url, last_verified_at)
select s.id, l.id, t.id, st.id, g.weekday, g.start_time::time,
       90, g.levels::level[], g.level_raw, g.course_type::course_type, g.type_raw, g.style_raw,
       '2026-2027', 'https://www.ecole-ambassadeurdesperance.fr/nos-cours', date '2026-10-21'
from grid g
join studio s on s.slug = 'ambassadeur-desperance'
join location l on l.postal_code = g.postal_code
  and l.address_line in ('100 avenue du Général Leclerc', '10 passage de la Canopée', '10 rue Érard')
join teacher t on t.name = g.teacher_name
join style st on st.slug = g.style_slug
on conflict (studio_id, weekday, start_time, teacher_id, style_id) do update set
  location_id = excluded.location_id,
  duration_min = excluded.duration_min,
  levels = excluded.levels,
  level_raw = excluded.level_raw,
  course_type = excluded.course_type,
  type_raw = excluded.type_raw,
  style_raw = excluded.style_raw,
  season = excluded.season,
  is_active = true,
  source_url = excluded.source_url,
  last_verified_at = excluded.last_verified_at;

commit;
