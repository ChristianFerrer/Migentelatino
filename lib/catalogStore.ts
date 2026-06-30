import { getSupabaseAdmin, isCrmDataConfigured } from "./supabaseAdmin";
import { CATALOG, type CanonicalProduct } from "./catalog";
import { buildAliasIndex, matchProduct, type MatchResult } from "./normalize";
import type { CountryKey } from "./products";

/**
 * Loads the canonical catalog + learned aliases from the database (so matches
 * improve as the CRM confirms them) and resolves free-text input against it.
 * Falls back to the static catalog when the DB isn't configured/reachable.
 *
 * Cached in-memory with a short TTL so a burst of submissions doesn't hammer
 * the DB; new aliases confirmed in the CRM show up on the next refresh.
 */

let cache: { entries: CanonicalProduct[]; at: number } | null = null;
const TTL_MS = 60_000;

async function fetchFromDb(): Promise<CanonicalProduct[] | null> {
  if (!isCrmDataConfigured) return null;
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const [{ data: canon, error: e1 }, { data: aliases, error: e2 }] = await Promise.all([
    supabase.from("products_canonical").select("slug, name, country, status").eq("status", "active"),
    supabase.from("product_aliases").select("normalized, canonical_slug"),
  ]);
  if (e1 || e2 || !canon) return null;

  const bySlug = new Map<string, CanonicalProduct>();
  for (const c of canon as Array<{ slug: string; name: string; country: string }>) {
    bySlug.set(c.slug, { slug: c.slug, name: c.name, country: c.country as CountryKey, aliases: [] });
  }
  for (const a of (aliases ?? []) as Array<{ normalized: string; canonical_slug: string }>) {
    bySlug.get(a.canonical_slug)?.aliases.push(a.normalized);
  }
  return [...bySlug.values()];
}

export async function loadCatalog(force = false): Promise<CanonicalProduct[]> {
  const now = Date.now();
  if (!force && cache && now - cache.at < TTL_MS) return cache.entries;
  const fromDb = await fetchFromDb().catch(() => null);
  const entries = fromDb && fromDb.length ? fromDb : CATALOG;
  cache = { entries, at: now };
  return entries;
}

export function invalidateCatalogCache() {
  cache = null;
}

/** Resolve a raw free-text product against the catalog (DB-backed). */
export async function resolveProduct(raw: string): Promise<MatchResult> {
  const entries = await loadCatalog();
  const idx = buildAliasIndex(entries);
  return matchProduct(raw, entries, idx);
}
