import type { CountryKey } from "./products";
import type { CanonicalProduct } from "./catalog";

/**
 * Free-text product normalization (entity resolution).
 *
 * Pure, dependency-free matching so it can run anywhere and be unit-tested
 * offline. The pipeline is: clean the string → exact alias hit → fuzzy match
 * (Levenshtein ratio + character-trigram Dice). Conservative thresholds: only
 * confident matches auto-resolve; everything else is left "pending" for the
 * CRM (and the optional AI pass) to confirm — better to under-merge than to
 * wrongly merge two different products.
 */

export type MatchMethod = "exact" | "alias" | "fuzzy" | "manual" | "ai" | "none";
export type MatchStatus = "auto" | "confirmed" | "pending" | "not_product";

export type MatchResult = {
  normalized: string;
  slug: string | null;
  name: string | null;
  country: CountryKey | null;
  method: MatchMethod;
  score: number;
  status: MatchStatus;
};

// Above this, auto-accept. Between PENDING and AUTO, keep the suggestion but
// leave it pending for human/AI review. Below PENDING, no suggestion at all.
const AUTO_THRESHOLD = 0.86;
const PENDING_THRESHOLD = 0.66;

const STOPWORDS = new Set([
  "la", "el", "los", "las", "de", "del", "un", "una", "y", "e",
  "o", "marca", "the", "of", "da", "do", "der", "die", "das",
]);

/** Lowercase, strip diacritics/punctuation, collapse whitespace. */
export function normalizeText(input: string): string {
  return (input || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ") // punctuation → space
    .replace(/\s+/g, " ")
    .trim();
}

/** Drop filler words for matching (keeps the discriminative tokens). */
function matchKey(normalized: string): string {
  const tokens = normalized.split(" ").filter((t) => t && !STOPWORDS.has(t));
  return (tokens.length ? tokens : normalized.split(" ")).join(" ");
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  let curr = new Array(b.length + 1).fill(0);
  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[b.length];
}

function levRatio(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return 1 - levenshtein(a, b) / maxLen;
}

function trigrams(s: string): Set<string> {
  const padded = `  ${s} `;
  const grams = new Set<string>();
  for (let i = 0; i < padded.length - 2; i++) grams.add(padded.slice(i, i + 3));
  return grams;
}

function trigramDice(a: string, b: string): number {
  if (a === b) return 1;
  const A = trigrams(a);
  const B = trigrams(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const g of A) if (B.has(g)) inter++;
  return (2 * inter) / (A.size + B.size);
}

/** Best of edit-distance ratio and trigram similarity. */
function similarity(a: string, b: string): number {
  return Math.max(levRatio(a, b), trigramDice(a, b));
}

/**
 * Build an exact-match index (normalizedAlias → slug) from the catalog plus any
 * learned aliases. Canonical names are indexed too. Later entries win on
 * collision, so pass learned aliases last to let them override.
 */
export function buildAliasIndex(
  catalog: CanonicalProduct[],
  learned: Array<{ normalized: string; slug: string }> = []
): Map<string, string> {
  const idx = new Map<string, string>();
  for (const p of catalog) {
    idx.set(matchKey(normalizeText(p.name)), p.slug);
    for (const a of p.aliases) idx.set(matchKey(normalizeText(a)), p.slug);
  }
  for (const l of learned) {
    if (l.normalized) idx.set(matchKey(l.normalized), l.slug);
  }
  return idx;
}

/**
 * Resolve a raw free-text product to a canonical entry.
 * `aliasIndex` is the exact-match map; `catalog` is scanned for fuzzy matches.
 */
export function matchProduct(
  raw: string,
  catalog: CanonicalProduct[],
  aliasIndex: Map<string, string>
): MatchResult {
  const normalized = normalizeText(raw);
  const bySlug = new Map(catalog.map((p) => [p.slug, p]));

  const empty: MatchResult = {
    normalized,
    slug: null,
    name: null,
    country: null,
    method: "none",
    score: 0,
    status: "pending",
  };
  if (!normalized) return empty;

  const key = matchKey(normalized);

  // 1) Exact alias / name hit.
  const exactSlug = aliasIndex.get(key) ?? aliasIndex.get(normalized);
  if (exactSlug && bySlug.has(exactSlug)) {
    const p = bySlug.get(exactSlug)!;
    return {
      normalized,
      slug: p.slug,
      name: p.name,
      country: p.country,
      method: "exact",
      score: 1,
      status: "auto",
    };
  }

  // 2) Fuzzy scan over canonical names + aliases.
  let best: CanonicalProduct | null = null;
  let bestScore = 0;
  for (const p of catalog) {
    const candidates = [normalizeText(p.name), ...p.aliases.map(normalizeText)];
    for (const cand of candidates) {
      const candKey = matchKey(cand);
      const s = Math.max(similarity(key, candKey), similarity(normalized, cand));
      if (s > bestScore) {
        bestScore = s;
        best = p;
      }
    }
  }

  if (best && bestScore >= AUTO_THRESHOLD) {
    return {
      normalized,
      slug: best.slug,
      name: best.name,
      country: best.country,
      method: "fuzzy",
      score: round(bestScore),
      status: "auto",
    };
  }
  if (best && bestScore >= PENDING_THRESHOLD) {
    // Keep the suggestion but don't count it until reviewed.
    return {
      normalized,
      slug: best.slug,
      name: best.name,
      country: best.country,
      method: "fuzzy",
      score: round(bestScore),
      status: "pending",
    };
  }
  return { ...empty, score: round(bestScore) };
}

function round(n: number): number {
  return Math.round(n * 1000) / 1000;
}
