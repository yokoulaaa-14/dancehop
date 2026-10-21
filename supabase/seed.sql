-- Données de référence rejouables (`supabase db reset` les applique après les migrations).
-- Taxonomie à 14 styles (D41, D57). Les studios, lieux, profs et cours se saisissent à la main.

insert into style (slug, label, sort_order) values
  ('hip-hop',     'Hip-hop',     1),
  ('house',       'House',       2),
  ('popping',     'Popping',     3),
  ('locking',     'Locking',     4),
  ('waacking',    'Waacking',    5),
  ('voguing',     'Voguing',     6),
  ('dancehall',   'Dancehall',   7),
  ('afro',        'Afro',        8),
  ('breaking',    'Breaking',    9),
  ('krump',       'Krump',       10),
  ('electro',     'Electro',     11),
  ('heels',       'Heels',       12),
  ('street-jazz', 'Street jazz', 13),
  ('commercial',  'Commercial',  14)
on conflict (slug) do nothing;
