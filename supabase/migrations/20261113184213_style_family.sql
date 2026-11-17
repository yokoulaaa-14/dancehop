-- Famille de chaque style, pour le repère de style de la liste (D71, D74).
-- Les valeurs reprennent les noms des tokens icon-style-{famille}-default de docs/design.md.

create type style_family as enum ('hiphop', 'funk', 'club', 'ballroom', 'afro', 'studio');

alter table style
  add column family style_family;

-- Les 14 styles déjà en base (seed.sql, D41, D57).
update style set family = case slug
  when 'hip-hop'     then 'hiphop'::style_family
  when 'breaking'    then 'hiphop'::style_family
  when 'krump'       then 'hiphop'::style_family
  when 'popping'     then 'funk'::style_family
  when 'locking'     then 'funk'::style_family
  when 'house'       then 'club'::style_family
  when 'electro'     then 'club'::style_family
  when 'waacking'    then 'ballroom'::style_family
  when 'voguing'     then 'ballroom'::style_family
  when 'afro'        then 'afro'::style_family
  when 'dancehall'   then 'afro'::style_family
  when 'heels'       then 'studio'::style_family
  when 'street-jazz' then 'studio'::style_family
  when 'commercial'  then 'studio'::style_family
end;

-- Échoue si un style inconnu est resté sans famille : on ne pose pas la contrainte à l'aveugle.
alter table style
  alter column family set not null;
