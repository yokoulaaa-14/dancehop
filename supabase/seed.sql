-- Données de référence rejouables (`supabase db reset` les applique après les migrations).
-- Taxonomie à 14 styles (D41, D57), chacun dans sa famille de repère (D71, D74).
-- Les studios, lieux, profs et cours se saisissent à la main.

insert into style (slug, label, sort_order, family) values
  ('hip-hop',     'Hip-hop',     1,  'hiphop'),
  ('house',       'House',       2,  'club'),
  ('popping',     'Popping',     3,  'funk'),
  ('locking',     'Locking',     4,  'funk'),
  ('waacking',    'Waacking',    5,  'ballroom'),
  ('voguing',     'Voguing',     6,  'ballroom'),
  ('dancehall',   'Dancehall',   7,  'afro'),
  ('afro',        'Afro',        8,  'afro'),
  ('breaking',    'Breaking',    9,  'hiphop'),
  ('krump',       'Krump',       10, 'hiphop'),
  ('electro',     'Electro',     11, 'club'),
  ('heels',       'Heels',       12, 'studio'),
  ('street-jazz', 'Street jazz', 13, 'studio'),
  ('commercial',  'Commercial',  14, 'studio')
on conflict (slug) do nothing;
