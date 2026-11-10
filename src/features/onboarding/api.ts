import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Availability, StyleLevels } from './model'

export type Style = { id: string; slug: string; label: string }

export function useStyles() {
  return useQuery({
    queryKey: ['styles'],
    queryFn: async (): Promise<Style[]> => {
      const { data, error } = await supabase.from('style').select('id, slug, label').order('sort_order')
      if (error) throw error
      return data
    },
  })
}

/**
 * Session de l'utilisateur : la reprend si elle existe, sinon en crée une anonyme (D61).
 * Appelée au clic sur « Commencer », jamais au chargement de la page.
 */
export async function ensureSession(): Promise<string> {
  const { data } = await supabase.auth.getSession()
  if (data.session) return data.session.user.id
  const { data: signedIn, error } = await supabase.auth.signInAnonymously()
  if (error || !signedIn.user) throw error ?? new Error('Session anonyme non créée')
  return signedIn.user.id
}

export type SavedProfile = {
  style_levels: StyleLevels
  availability: Availability
  onboarding_completed_at: string | null
}

/** Profil de la session en cours, s'il existe (pour reprendre ou modifier ses choix). */
export async function fetchProfile(): Promise<SavedProfile | null> {
  const { data: session } = await supabase.auth.getSession()
  if (!session.session) return null
  const { data, error } = await supabase
    .from('profile')
    .select('style_levels, availability, onboarding_completed_at')
    .eq('user_id', session.session.user.id)
    .maybeSingle()
  if (error) throw error
  return data
}

/** Enregistre les réponses en une fois, à la fin de l'onboarding (D62). */
export async function saveProfile(styleLevels: StyleLevels, availability: Availability): Promise<void> {
  const userId = await ensureSession()
  const { error } = await supabase.from('profile').upsert({
    user_id: userId,
    style_levels: styleLevels,
    availability,
    onboarding_completed_at: new Date().toISOString(),
  })
  if (error) throw error
}
