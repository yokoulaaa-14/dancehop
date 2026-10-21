-- Style facultatif : vide = style non précisé par le studio (D58).
-- L'unicité traite deux styles vides comme égaux, pour que les fichiers de supabase/data/
-- restent rejouables sans doublon (on conflict).

alter table course
  alter column style_id drop not null;

alter table course
  drop constraint course_studio_id_weekday_start_time_teacher_id_style_id_key;

alter table course
  add constraint course_studio_id_weekday_start_time_teacher_id_style_id_key
  unique nulls not distinct (studio_id, weekday, start_time, teacher_id, style_id);
