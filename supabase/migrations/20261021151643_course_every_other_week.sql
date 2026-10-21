-- Cours donnés une semaine sur deux (D59). Les cours existants restent hebdomadaires.

alter table course
  add column every_other_week boolean not null default false;
