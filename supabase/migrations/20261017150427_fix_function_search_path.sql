-- Corrige l'avertissement du linter Supabase « function_search_path_mutable » :
-- fige le search_path de la fonction trigger pour qu'elle ne dépende pas du rôle appelant.
alter function set_updated_at() set search_path = '';
