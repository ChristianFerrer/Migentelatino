import type { CountryKey } from "./products";

/**
 * Canonical product catalog for Mi Gente Latino.
 *
 * This is the source of truth that the normalization layer maps free-text user
 * input against ("inka cola", "Inka Lola", "inca cola" → "Inca Kola"). Each
 * entry has a stable `slug`, the official display `name`, an associated
 * `country` (used for the flag in the ranking), and a seed list of `aliases`
 * — common spellings, misspellings, and abbreviations. The alias list grows
 * over time as the CRM confirms matches, so this is a starting point, not the
 * full universe.
 */
export type CanonicalProduct = {
  slug: string;
  name: string;
  country: CountryKey;
  aliases: string[];
};

export const CATALOG: CanonicalProduct[] = [
  // ── Venezuela ─────────────────────────────────────────────
  {
    slug: "harina-pan",
    name: "Harina P.A.N.",
    country: "ve",
    aliases: ["harina pan", "arina pan", "harina p.a.n", "pan harina", "harina precocida", "harinapan", "harina de maiz pan"],
  },
  {
    slug: "maltin-polar",
    name: "Malta Maltín Polar",
    country: "ve",
    aliases: ["maltin polar", "malta polar", "maltin", "maltín", "malta maltin", "maltinpolar"],
  },
  {
    slug: "diablitos-underwood",
    name: "Diablitos Underwood",
    country: "ve",
    aliases: ["diablitos", "diablito underwood", "diablitos underwood", "diablito"],
  },
  {
    slug: "cocosette",
    name: "Galletas Cocosette",
    country: "ve",
    aliases: ["cocosette", "cocoset", "galletas cocosette", "coco sette"],
  },
  {
    slug: "cafe-fama",
    name: "Café Fama de América",
    country: "ve",
    aliases: ["cafe fama", "fama de america", "café fama de américa", "cafe fama de america"],
  },
  {
    slug: "toddy",
    name: "Toddy",
    country: "ve",
    aliases: ["toddy", "todi", "toody"],
  },

  // ── Argentina ─────────────────────────────────────────────
  {
    slug: "yerba-mate",
    name: "Yerba Mate",
    country: "ar",
    aliases: ["yerba mate", "yerba", "mate", "yerva mate", "yerba-mate", "hierba mate", "yerba mate playadito", "yerba mate taragui", "yerba mate rosamonte", "yerva", "llerba mate"],
  },
  {
    slug: "dulce-de-leche",
    name: "Dulce de Leche",
    country: "ar",
    aliases: ["dulce de leche", "dulce de lече", "dulce", "doce de leite", "manjar", "manjar blanco", "dulce d leche", "dulcedeleche", "ddl"],
  },
  {
    slug: "alfajores-havanna",
    name: "Alfajores Havanna",
    country: "ar",
    aliases: ["alfajores", "alfajor", "havanna", "alfajores havanna", "alfajor havanna", "alfajores avana", "havana"],
  },
  {
    slug: "criollitas",
    name: "Galletitas Criollitas",
    country: "ar",
    aliases: ["criollitas", "galletitas criollitas", "criollita"],
  },
  {
    slug: "mate-cocido",
    name: "Mate Cocido",
    country: "ar",
    aliases: ["mate cocido", "mate cosido", "cocido"],
  },

  // ── Perú ──────────────────────────────────────────────────
  {
    slug: "inca-kola",
    name: "Inca Kola",
    country: "pe",
    aliases: ["inca kola", "inka kola", "inca cola", "inka cola", "inka lola", "inca-kola", "incakola", "inka-kola", "incacola", "ynca kola", "inka colla", "la inca kola"],
  },
  {
    slug: "aji-amarillo",
    name: "Ají Amarillo",
    country: "pe",
    aliases: ["aji amarillo", "ají amarillo", "aji", "ají", "aji amarrillo", "pasta de aji amarillo", "ají amarillo en pasta"],
  },
  {
    slug: "sublime",
    name: "Chocolate Sublime",
    country: "pe",
    aliases: ["sublime", "chocolate sublime", "chocolate sublime nestle", "sublime nestle"],
  },
  {
    slug: "galletas-casino",
    name: "Galletas Casino",
    country: "pe",
    aliases: ["casino", "galletas casino", "galleta casino"],
  },
  {
    slug: "paneton-donofrio",
    name: "Panetón D'Onofrio",
    country: "pe",
    aliases: ["paneton", "panetón", "paneton donofrio", "panetón d'onofrio", "paneton d onofrio", "panteon"],
  },
  {
    slug: "pisco",
    name: "Pisco",
    country: "pe",
    aliases: ["pisco", "pisco peruano", "pisco quebranta"],
  },

  // ── Colombia ──────────────────────────────────────────────
  {
    slug: "cafe-colombiano",
    name: "Café Colombiano",
    country: "co",
    aliases: ["cafe colombiano", "café colombiano", "cafe de colombia", "juan valdez", "café de colombia", "cafe colombia", "cafecito colombiano"],
  },
  {
    slug: "arequipe",
    name: "Arequipe",
    country: "co",
    aliases: ["arequipe", "arequipe colombiano", "arekipe"],
  },
  {
    slug: "bocadillo-veleno",
    name: "Bocadillo Veleño",
    country: "co",
    aliases: ["bocadillo", "bocadillo veleño", "bocadillo veleno", "bocadillo de guayaba"],
  },
  {
    slug: "chocolate-corona",
    name: "Chocolate Corona",
    country: "co",
    aliases: ["chocolate corona", "corona", "chocolate de mesa corona", "chocolisto"],
  },
  {
    slug: "festival",
    name: "Galletas Festival",
    country: "co",
    aliases: ["festival", "galletas festival", "galleta festival"],
  },
  {
    slug: "aguila-roja",
    name: "Café Águila Roja",
    country: "co",
    aliases: ["aguila roja", "águila roja", "cafe aguila roja", "café águila roja"],
  },

  // ── Brasil ────────────────────────────────────────────────
  {
    slug: "guarana-antarctica",
    name: "Guaraná Antarctica",
    country: "br",
    aliases: ["guarana", "guaraná", "guarana antarctica", "guaraná antarctica", "guarana antartica", "guaraná antártica", "guaraná"],
  },
  {
    slug: "cafe-do-brasil",
    name: "Café do Brasil",
    country: "br",
    aliases: ["cafe do brasil", "café do brasil", "cafe brasileiro", "cafe brasil"],
  },
  {
    slug: "leite-moca",
    name: "Leite Moça",
    country: "br",
    aliases: ["leite moca", "leite moça", "leite condensado moça", "moça", "leite condensado"],
  },
  {
    slug: "farofa-yoki",
    name: "Farofa Yoki",
    country: "br",
    aliases: ["farofa", "farofa yoki", "yoki", "farofa pronta"],
  },
  {
    slug: "polvilho",
    name: "Polvilho / Tapioca",
    country: "br",
    aliases: ["polvilho", "tapioca", "goma de tapioca", "polvilho azedo", "polvilho doce"],
  },
  {
    slug: "brigadeiro",
    name: "Brigadeiro (granulado)",
    country: "br",
    aliases: ["brigadeiro", "granulado", "brigadeiro granulado", "chocolate granulado"],
  },
  {
    slug: "pao-de-queijo",
    name: "Pão de Queijo (mistura)",
    country: "br",
    aliases: ["pao de queijo", "pão de queijo", "mistura pao de queijo", "pan de queso"],
  },

  // ── México ────────────────────────────────────────────────
  {
    slug: "tajin",
    name: "Tajín",
    country: "mx",
    aliases: ["tajin", "tajín", "tahin", "tajin clasico", "chile tajin", "tajine"],
  },
  {
    slug: "salsa-valentina",
    name: "Salsa Valentina",
    country: "mx",
    aliases: ["valentina", "salsa valentina", "valentyna", "balentina", "salsa balentina"],
  },
  {
    slug: "maseca",
    name: "Maseca",
    country: "mx",
    aliases: ["maseca", "harina maseca", "maséca", "masa maseca", "harina de maiz maseca"],
  },
  {
    slug: "mole-dona-maria",
    name: "Mole Doña María",
    country: "mx",
    aliases: ["mole", "doña maria", "dona maria", "mole doña maría", "mole dona maria", "mole doña maria"],
  },
  {
    slug: "mazapan-de-la-rosa",
    name: "Mazapán De la Rosa",
    country: "mx",
    aliases: ["mazapan", "mazapán", "de la rosa", "mazapan de la rosa", "marzapan"],
  },
  {
    slug: "salsa-buffalo",
    name: "Salsa Búfalo",
    country: "mx",
    aliases: ["bufalo", "búfalo", "salsa bufalo", "salsa búfalo"],
  },
  {
    slug: "gansito",
    name: "Gansito Marinela",
    country: "mx",
    aliases: ["gansito", "gansito marinela", "ganzito"],
  },
  {
    slug: "chamoy",
    name: "Chamoy",
    country: "mx",
    aliases: ["chamoy", "salsa chamoy", "chamoi"],
  },
];

/** Quick lookup by slug. */
export const CATALOG_BY_SLUG: Record<string, CanonicalProduct> = Object.fromEntries(
  CATALOG.map((p) => [p.slug, p])
);
