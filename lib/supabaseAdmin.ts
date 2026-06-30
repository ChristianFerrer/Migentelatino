import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * The CRM reads the signups list, which is locked down by RLS (anon can only
 * INSERT, never SELECT). Reading therefore requires the Supabase service-role
 * key, which is server-only and must NEVER be exposed to the browser.
 */
export const isCrmDataConfigured = Boolean(url && serviceKey);

let admin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!isCrmDataConfigured) return null;
  if (!admin) {
    admin = createClient(url as string, serviceKey as string, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return admin;
}

export type Lead = {
  id: string;
  created_at: string;
  name: string | null;
  phone: string | null;
  country: string | null;
  missed_product: string | null;
  email: string | null;
  locale: string | null;
  source: string | null;
  // Normalization layer (derived from missed_product).
  missed_product_normalized: string | null;
  canonical_slug: string | null;
  canonical_name: string | null;
  match_method: string | null;
  match_score: number | null;
  match_status: string | null;
};
