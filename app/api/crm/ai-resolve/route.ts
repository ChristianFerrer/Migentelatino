import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { isAuthed } from "@/lib/crmAuth";
import { getSupabaseAdmin, isCrmDataConfigured } from "@/lib/supabaseAdmin";
import { loadCatalog, invalidateCatalogCache } from "@/lib/catalogStore";
import { normalizeText } from "@/lib/normalize";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Optional AI pass over still-pending submissions. Sends the canonical catalog
 * + the pending raw inputs to Claude and asks it to map each input to a
 * catalog slug (or "none"). It is constrained to choose from the catalog — it
 * cannot invent products. Confident AI matches are applied (status "auto",
 * method "ai") and their raw text is learned as an alias.
 *
 * Requires ANTHROPIC_API_KEY; degrades gracefully if absent.
 */
export async function POST() {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ ok: false, error: "no_ai" }, { status: 503 });
  }
  if (!isCrmDataConfigured) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });

  // Pending rows that still have raw text to work with.
  const { data: pending, error } = await supabase
    .from("signups")
    .select("id, missed_product")
    .eq("match_status", "pending")
    .not("missed_product", "is", null)
    .order("created_at", { ascending: false })
    .limit(30);
  if (error) return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  const rows = (pending ?? []).filter((r) => (r.missed_product || "").trim());
  if (!rows.length) return NextResponse.json({ ok: true, resolved: 0, pending: 0 });

  const catalog = await loadCatalog();
  const catalogList = catalog.map((p) => `${p.slug} | ${p.name} (${p.country})`).join("\n");
  const inputs = rows.map((r) => `${r.id} :: ${(r.missed_product || "").trim()}`).join("\n");

  const client = new Anthropic();
  let toolInput: { results?: Array<{ id: string; slug: string }> } = {};
  try {
    const resp = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 4000,
      tools: [
        {
          name: "submit_matches",
          description: "Return the canonical slug for each input id.",
          input_schema: {
            type: "object",
            properties: {
              results: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    slug: {
                      type: "string",
                      description: "A slug from the catalog, or 'none' if no clear match.",
                    },
                  },
                  required: ["id", "slug"],
                  additionalProperties: false,
                },
              },
            },
            required: ["results"],
            additionalProperties: false,
          },
        },
      ],
      tool_choice: { type: "tool", name: "submit_matches" },
      messages: [
        {
          role: "user",
          content:
            "You normalize free-text Latin-American grocery product names to a fixed catalog. " +
            "Match each input to the single best catalog slug. Inputs may be misspelled, in " +
            "Spanish/Portuguese, or describe the product. If an input does not clearly correspond " +
            "to any catalog item, return the slug \"none\" — never guess or invent a slug.\n\n" +
            `CATALOG (slug | name (country)):\n${catalogList}\n\n` +
            `INPUTS (id :: text):\n${inputs}\n\n` +
            "Call submit_matches with one result per input id.",
        },
      ],
    });
    const block = resp.content.find((b) => b.type === "tool_use");
    if (block && block.type === "tool_use") toolInput = block.input as typeof toolInput;
  } catch {
    return NextResponse.json({ ok: false, error: "ai_error" }, { status: 502 });
  }

  const results = Array.isArray(toolInput.results) ? toolInput.results : [];
  const bySlug = new Map(catalog.map((p) => [p.slug, p]));
  const rawById = new Map(rows.map((r) => [r.id as string, (r.missed_product || "").trim()]));

  let resolved = 0;
  for (const r of results) {
    const prod = bySlug.get(r.slug);
    if (!prod || !rawById.has(r.id)) continue;
    await supabase
      .from("signups")
      .update({
        canonical_slug: prod.slug,
        canonical_name: prod.name,
        match_method: "ai",
        match_score: 0.9,
        match_status: "auto",
      })
      .eq("id", r.id);
    const normalized = normalizeText(rawById.get(r.id) || "");
    if (normalized) {
      await supabase
        .from("product_aliases")
        .upsert({ normalized, canonical_slug: prod.slug, source: "ai" }, { onConflict: "normalized" });
    }
    resolved++;
  }
  invalidateCatalogCache();
  return NextResponse.json({ ok: true, resolved, pending: rows.length - resolved });
}
