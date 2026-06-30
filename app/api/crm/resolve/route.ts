import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/crmAuth";
import { getSupabaseAdmin, isCrmDataConfigured } from "@/lib/supabaseAdmin";
import { invalidateCatalogCache } from "@/lib/catalogStore";
import { normalizeText } from "@/lib/normalize";

/**
 * CRM curation endpoint. Lets a team member fix/confirm how a free-text input
 * was normalized. Confirming a match also writes a learned alias so future
 * submissions of the same text auto-resolve (the self-improving loop).
 *
 * actions:
 *  - "confirm"      : set canonical_slug to `slug`, status confirmed, learn alias
 *  - "create"       : create a new canonical product + assign it, learn alias
 *  - "not_product"  : mark the row as not a product (excluded from the ranking)
 */
export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!isCrmDataConfigured) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });

  let body: {
    action?: string;
    signupId?: string;
    slug?: string;
    newName?: string;
    newCountry?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const { action, signupId } = body;
  if (!signupId) return NextResponse.json({ ok: false, error: "missing_signup" }, { status: 400 });

  // Load the signup so we can learn its raw input as an alias.
  const { data: signup, error: e0 } = await supabase
    .from("signups")
    .select("id, missed_product, missed_product_normalized")
    .eq("id", signupId)
    .single();
  if (e0 || !signup) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });

  const normalized =
    (signup as { missed_product_normalized: string | null }).missed_product_normalized ||
    normalizeText((signup as { missed_product: string | null }).missed_product || "");

  async function learnAlias(slug: string) {
    if (!normalized) return;
    await supabase!
      .from("product_aliases")
      .upsert({ normalized, canonical_slug: slug, source: "manual" }, { onConflict: "normalized" });
  }

  if (action === "not_product") {
    await supabase
      .from("signups")
      .update({ canonical_slug: null, canonical_name: null, match_method: "manual", match_status: "not_product" })
      .eq("id", signupId);
    return NextResponse.json({ ok: true });
  }

  if (action === "confirm") {
    const slug = (body.slug || "").trim();
    if (!slug) return NextResponse.json({ ok: false, error: "missing_slug" }, { status: 400 });
    const { data: prod, error: e1 } = await supabase
      .from("products_canonical")
      .select("slug, name")
      .eq("slug", slug)
      .single();
    if (e1 || !prod) return NextResponse.json({ ok: false, error: "bad_slug" }, { status: 400 });
    await supabase
      .from("signups")
      .update({
        canonical_slug: prod.slug,
        canonical_name: (prod as { name: string }).name,
        match_method: "manual",
        match_score: 1,
        match_status: "confirmed",
      })
      .eq("id", signupId);
    await learnAlias(prod.slug);
    invalidateCatalogCache();
    return NextResponse.json({ ok: true });
  }

  if (action === "create") {
    const name = (body.newName || "").trim().slice(0, 80);
    const country = (body.newCountry || "").trim().slice(0, 4) || "mx";
    if (!name) return NextResponse.json({ ok: false, error: "missing_name" }, { status: 400 });
    const slug =
      normalizeText(name).replace(/\s+/g, "-").slice(0, 60) || `prod-${Date.now()}`;
    await supabase
      .from("products_canonical")
      .upsert({ slug, name, country, status: "active" }, { onConflict: "slug" });
    await supabase
      .from("signups")
      .update({
        canonical_slug: slug,
        canonical_name: name,
        match_method: "manual",
        match_score: 1,
        match_status: "confirmed",
      })
      .eq("id", signupId);
    await learnAlias(slug);
    invalidateCatalogCache();
    return NextResponse.json({ ok: true, slug });
  }

  return NextResponse.json({ ok: false, error: "unknown_action" }, { status: 400 });
}
