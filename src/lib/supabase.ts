import { createClient } from '@supabase/supabase-js'

// Les deux variables viennent de `.env` (voir `.env.example`).
// La clé anon est publique par conception : la sécurité est portée par les RLS (D19).
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY manquent dans .env')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
