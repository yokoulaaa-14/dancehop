-- Un niveau par style choisi (D62) : { "<style_id>": "beginner" | "intermediate" | "advanced" }.
-- Remplace style_ids et levels. Aucun profil n'existe encore en base : rien à reprendre.

alter table profile
  add column style_levels jsonb not null default '{}'::jsonb
    check (jsonb_typeof(style_levels) = 'object');

alter table profile
  drop column style_ids,
  drop column levels;
