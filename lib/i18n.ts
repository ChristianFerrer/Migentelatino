import type { CountryKey, PackType } from "./products";

export type Locale = "en" | "es" | "de";

export const LOCALES: Locale[] = ["en", "es", "de"];

export const LOCALE_LABELS: Record<Locale, { flag: string; name: string }> = {
  en: { flag: "🇬🇧", name: "English" },
  es: { flag: "🇪🇸", name: "Español" },
  de: { flag: "🇦🇹", name: "Deutsch" },
};

type Dict = {
  nav: { product: string; cta: string };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    chips: string[];
    emailPlaceholder: string;
    cta: string;
    privacy: string;
  };
  marquee: string[];
  categories: { title: string; items: { icon: string; label: string }[] };
  popular: {
    title: string;
    subtitle: string;
    hint: string;
    countries: Record<CountryKey, string>;
    packs: Record<PackType, string>;
  };
  signup: {
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    countryPlaceholder: string;
    countryOther: string;
    missedLabel: string;
    missedPlaceholder: string;
    cta: string;
    success: string;
    errorEmail: string;
    errorRequired: string;
    errorGeneric: string;
    sending: string;
  };
  footer: { tagline: string; rights: string; madeWith: string };
};

export const translations: Record<Locale, Dict> = {
  en: {
    nav: { product: "Products", cta: "Get early access" },
    hero: {
      badge: "🌎 Latin American products in Europe",
      title1: "What does your",
      title2: "country miss most?",
      subtitle:
        "We're a Latin American grocery store in Europe. Tell us the packaged brand or treat you miss most from home — and help us bring it to your door.",
      chips: ["Authentic brands", "Non-perishable", "To your door"],
      emailPlaceholder: "your@email.com",
      cta: "Send",
      privacy: "We'll reach out on WhatsApp. No spam.",
    },
    marquee: ["Arepas", "Dulce de leche", "Mate", "Tortillas", "Ají", "Plátano", "Café", "Salsa", "Tajín", "Yuca"],
    categories: {
      title: "What we bring",
      items: [
        { icon: "grocery", label: "Pantry & Groceries" },
        { icon: "drink", label: "Drinks & Mate" },
        { icon: "snack", label: "Snacks & Sweets" },
        { icon: "spice", label: "Spices & Sauces" },
        { icon: "can", label: "Canned & Preserves" },
        { icon: "coffee", label: "Coffee & Cocoa" },
      ],
    },
    popular: {
      title: "What each country misses most",
      subtitle: "A taste of what's coming — the packaged classics each community misses most.",
      hint: "Pick a country",
      countries: { pe: "Peru", co: "Colombia", br: "Brazil", ar: "Argentina", mx: "Mexico", ve: "Venezuela" },
      packs: { bottle: "Drink", can: "Canned", jar: "Jar", box: "Boxed", pouch: "Packet", coffee: "Coffee", cookies: "Cookies" },
    },
    signup: {
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      phonePlaceholder: "Phone number",
      countryPlaceholder: "Country of origin",
      countryOther: "Other",
      missedLabel: "What's the product you miss the most?",
      missedPlaceholder: "e.g. Inca Kola, Harina P.A.N., dulce de leche…",
      cta: "Notify me",
      success: "You're in! 🎉 We'll email you at launch.",
      errorEmail: "Please enter a valid email.",
      errorRequired: "Please complete the required fields.",
      errorGeneric: "Something went wrong. Try again.",
      sending: "Joining…",
    },
    footer: { tagline: "Latin flavors from home, across Europe.", rights: "All rights reserved.", madeWith: "Made with cariño" },
  },
  es: {
    nav: { product: "Productos", cta: "Acceso anticipado" },
    hero: {
      badge: "🌎 Productos latinos en Europa",
      title1: "¿Qué es lo que más",
      title2: "extraña tu país?",
      subtitle:
        "Somos una tienda de productos latinos en Europa. Cuéntanos qué marca o antojo envasado extrañas más de casa — y ayúdanos a traerlo a tu puerta.",
      chips: ["Marcas auténticas", "No perecibles", "A tu puerta"],
      emailPlaceholder: "tu@correo.com",
      cta: "Enviar",
      privacy: "Te contactamos por WhatsApp. Cero spam.",
    },
    marquee: ["Arepas", "Dulce de leche", "Mate", "Tortillas", "Ají", "Plátano", "Café", "Salsa", "Tajín", "Yuca"],
    categories: {
      title: "Lo que traemos",
      items: [
        { icon: "grocery", label: "Despensa" },
        { icon: "drink", label: "Bebidas y mate" },
        { icon: "snack", label: "Snacks y dulces" },
        { icon: "spice", label: "Especias y salsas" },
        { icon: "can", label: "Conservas" },
        { icon: "coffee", label: "Café y cacao" },
      ],
    },
    popular: {
      title: "Lo que más extraña cada país",
      subtitle: "Un adelanto de lo que viene — los clásicos envasados que cada comunidad más extraña.",
      hint: "Elige un país",
      countries: { pe: "Perú", co: "Colombia", br: "Brasil", ar: "Argentina", mx: "México", ve: "Venezuela" },
      packs: { bottle: "Bebida", can: "Lata", jar: "Tarro", box: "Caja", pouch: "Paquete", coffee: "Café", cookies: "Galletas" },
    },
    signup: {
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "tu@correo.com",
      phonePlaceholder: "Número de teléfono",
      countryPlaceholder: "País de origen",
      countryOther: "Otro",
      missedLabel: "¿Cuál es el producto que más extrañas?",
      missedPlaceholder: "ej. Inca Kola, Harina P.A.N., dulce de leche…",
      cta: "Avísenme",
      success: "¡Estás dentro! 🎉 Te escribimos al lanzar.",
      errorEmail: "Ingresa un correo válido.",
      errorRequired: "Por favor completa los campos obligatorios.",
      errorGeneric: "Algo salió mal. Inténtalo de nuevo.",
      sending: "Uniéndote…",
    },
    footer: { tagline: "El sabor de casa, en toda Europa.", rights: "Todos los derechos reservados.", madeWith: "Hecho con cariño" },
  },
  de: {
    nav: { product: "Produkte", cta: "Früher Zugang" },
    hero: {
      badge: "🌎 Lateinamerikanische Produkte in Europa",
      title1: "Was vermisst dein",
      title2: "Land am meisten?",
      subtitle:
        "Wir sind ein Shop für lateinamerikanische Produkte in Europa. Sag uns, welche haltbare Marke oder Leckerei du am meisten von zu Hause vermisst — und hilf uns, sie vor deine Tür zu bringen.",
      chips: ["Echte Marken", "Haltbar", "Vor deine Tür"],
      emailPlaceholder: "deine@email.com",
      cta: "Senden",
      privacy: "Wir melden uns per WhatsApp. Kein Spam.",
    },
    marquee: ["Arepas", "Dulce de leche", "Mate", "Tortillas", "Ají", "Plátano", "Kaffee", "Salsa", "Tajín", "Yuca"],
    categories: {
      title: "Was wir bringen",
      items: [
        { icon: "grocery", label: "Vorrat & Lebensmittel" },
        { icon: "drink", label: "Getränke & Mate" },
        { icon: "snack", label: "Snacks & Süßes" },
        { icon: "spice", label: "Gewürze & Saucen" },
        { icon: "can", label: "Konserven" },
        { icon: "coffee", label: "Kaffee & Kakao" },
      ],
    },
    popular: {
      title: "Was jedes Land am meisten vermisst",
      subtitle: "Ein Vorgeschmack — die haltbaren Klassiker, die jede Community am meisten vermisst.",
      hint: "Land wählen",
      countries: { pe: "Peru", co: "Kolumbien", br: "Brasilien", ar: "Argentinien", mx: "Mexiko", ve: "Venezuela" },
      packs: { bottle: "Getränk", can: "Dose", jar: "Glas", box: "Schachtel", pouch: "Packung", coffee: "Kaffee", cookies: "Kekse" },
    },
    signup: {
      namePlaceholder: "Dein Name",
      emailPlaceholder: "deine@email.com",
      phonePlaceholder: "Telefonnummer",
      countryPlaceholder: "Herkunftsland",
      countryOther: "Andere",
      missedLabel: "Welches Produkt vermisst du am meisten?",
      missedPlaceholder: "z. B. Inca Kola, Harina P.A.N., Dulce de Leche…",
      cta: "Benachrichtigen",
      success: "Du bist dabei! 🎉 Wir melden uns zum Start.",
      errorEmail: "Bitte gib eine gültige E-Mail ein.",
      errorRequired: "Bitte fülle die Pflichtfelder aus.",
      errorGeneric: "Etwas ist schiefgelaufen. Versuch es erneut.",
      sending: "Wird gesendet…",
    },
    footer: { tagline: "Heimatgeschmack aus Lateinamerika, in ganz Europa.", rights: "Alle Rechte vorbehalten.", madeWith: "Mit cariño gemacht" },
  },
};
