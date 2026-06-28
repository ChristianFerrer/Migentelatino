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
  signup: {
    emailPlaceholder: string;
    cta: string;
    success: string;
    errorEmail: string;
    errorGeneric: string;
    sending: string;
  };
  footer: { tagline: string; rights: string; madeWith: string };
};

export const translations: Record<Locale, Dict> = {
  en: {
    nav: { product: "Products", cta: "Get early access" },
    hero: {
      badge: "🌎 Online store · Opening soon in Austria",
      title1: "Latin America,",
      title2: "at your door.",
      subtitle:
        "We're an online store about to open in Austria, bringing authentic Latin American products straight to your door.",
      chips: ["100% authentic", "To your door", "Launching soon"],
      emailPlaceholder: "your@email.com",
      cta: "Notify me",
      privacy: "No spam. Unsubscribe anytime.",
    },
    marquee: ["Arepas", "Dulce de leche", "Mate", "Tortillas", "Ají", "Plátano", "Café", "Salsa", "Tajín", "Yuca"],
    categories: {
      title: "What we bring",
      items: [
        { icon: "grocery", label: "Groceries" },
        { icon: "drink", label: "Drinks & Mate" },
        { icon: "snack", label: "Snacks & Sweets" },
        { icon: "spice", label: "Spices & Sauces" },
        { icon: "fresh", label: "Fresh Produce" },
        { icon: "frozen", label: "Frozen" },
      ],
    },
    signup: {
      emailPlaceholder: "your@email.com",
      cta: "Notify me",
      success: "You're in! 🎉 We'll email you at launch.",
      errorEmail: "Please enter a valid email.",
      errorGeneric: "Something went wrong. Try again.",
      sending: "Joining…",
    },
    footer: { tagline: "Latin America, at your door — in Austria.", rights: "All rights reserved.", madeWith: "Made with cariño" },
  },
  es: {
    nav: { product: "Productos", cta: "Acceso anticipado" },
    hero: {
      badge: "🌎 Tienda online · Próxima apertura en Austria",
      title1: "Latinoamérica,",
      title2: "en tu puerta.",
      subtitle:
        "Somos una tienda online a punto de abrir en Austria. Traemos productos de Latinoamérica a la puerta de tu casa.",
      chips: ["100% auténtico", "A tu puerta", "Próxima apertura"],
      emailPlaceholder: "tu@correo.com",
      cta: "Avísenme",
      privacy: "Cero spam. Cancela cuando quieras.",
    },
    marquee: ["Arepas", "Dulce de leche", "Mate", "Tortillas", "Ají", "Plátano", "Café", "Salsa", "Tajín", "Yuca"],
    categories: {
      title: "Lo que traemos",
      items: [
        { icon: "grocery", label: "Despensa" },
        { icon: "drink", label: "Bebidas y mate" },
        { icon: "snack", label: "Snacks y dulces" },
        { icon: "spice", label: "Especias y salsas" },
        { icon: "fresh", label: "Frescos" },
        { icon: "frozen", label: "Congelados" },
      ],
    },
    signup: {
      emailPlaceholder: "tu@correo.com",
      cta: "Avísenme",
      success: "¡Estás dentro! 🎉 Te escribimos al lanzar.",
      errorEmail: "Ingresa un correo válido.",
      errorGeneric: "Algo salió mal. Inténtalo de nuevo.",
      sending: "Uniéndote…",
    },
    footer: { tagline: "Latinoamérica, en tu puerta — en Austria.", rights: "Todos los derechos reservados.", madeWith: "Hecho con cariño" },
  },
  de: {
    nav: { product: "Produkte", cta: "Früher Zugang" },
    hero: {
      badge: "🌎 Online-Shop · Bald in Österreich",
      title1: "Lateinamerika,",
      title2: "vor deine Tür.",
      subtitle:
        "Wir sind ein Online-Shop, der bald in Österreich öffnet, und bringen authentische Produkte aus Lateinamerika direkt vor deine Tür.",
      chips: ["100% authentisch", "Vor deine Tür", "Bald verfügbar"],
      emailPlaceholder: "deine@email.com",
      cta: "Benachrichtigen",
      privacy: "Kein Spam. Jederzeit abbestellbar.",
    },
    marquee: ["Arepas", "Dulce de leche", "Mate", "Tortillas", "Ají", "Plátano", "Kaffee", "Salsa", "Tajín", "Yuca"],
    categories: {
      title: "Was wir bringen",
      items: [
        { icon: "grocery", label: "Lebensmittel" },
        { icon: "drink", label: "Getränke & Mate" },
        { icon: "snack", label: "Snacks & Süßes" },
        { icon: "spice", label: "Gewürze & Saucen" },
        { icon: "fresh", label: "Frische Produkte" },
        { icon: "frozen", label: "Tiefkühl" },
      ],
    },
    signup: {
      emailPlaceholder: "deine@email.com",
      cta: "Benachrichtigen",
      success: "Du bist dabei! 🎉 Wir melden uns zum Start.",
      errorEmail: "Bitte gib eine gültige E-Mail ein.",
      errorGeneric: "Etwas ist schiefgelaufen. Versuch es erneut.",
      sending: "Wird gesendet…",
    },
    footer: { tagline: "Lateinamerika, vor deiner Tür — in Österreich.", rights: "Alle Rechte vorbehalten.", madeWith: "Mit cariño gemacht" },
  },
};
