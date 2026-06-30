import type { CountryKey, PackType } from "./products";

export type Locale = "en" | "es" | "de" | "pt";

export const LOCALES: Locale[] = ["en", "es", "de", "pt"];

export const LOCALE_LABELS: Record<Locale, { flag: string; name: string }> = {
  en: { flag: "🇬🇧", name: "English" },
  es: { flag: "🇪🇸", name: "Español" },
  de: { flag: "🇦🇹", name: "Deutsch" },
  pt: { flag: "🇧🇷", name: "Português" },
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
    votesLabel: string;
    top10: string;
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
  footer: { tagline: string; rights: string; madeWith: string; crm: string };
};

export const translations: Record<Locale, Dict> = {
  en: {
    nav: { product: "Products", cta: "Get early access" },
    hero: {
      badge: "🌎 Latin American products in Europe",
      title1: "What flavor do you miss",
      title2: "from your country?",
      subtitle:
        "A new online store bringing your favorite Latin American brands home, across Europe. Tell us which one you miss and we'll let you know when it arrives.",
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
      title: "What my people are asking for",
      subtitle:
        "Add your favorite product to the list with the form above, rally more people to ask for it — if it makes the ranking, we'll bring it to Europe.",
      hint: "Pick a country",
      votesLabel: "votes",
      top10: "Top 10 most-requested products",
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
    footer: { tagline: "From Latin America to all of Europe.", rights: "All rights reserved.", madeWith: "Made with cariño", crm: "Team access" },
  },
  es: {
    nav: { product: "Productos", cta: "Acceso anticipado" },
    hero: {
      badge: "🌎 Productos latinos en Europa",
      title1: "¿Qué sabor extrañas",
      title2: "de tu país?",
      subtitle:
        "Una nueva tienda online que trae tus marcas latinas favoritas hasta tu casa, en toda Europa. Dinos cuál extrañas y te avisamos cuando llegue.",
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
      title: "Lo que más pide mi gente",
      subtitle:
        "Agrega tu producto favorito a la lista con el formulario de arriba, anima a más gente a pedirlo y si aparece en el ranking lo traeremos a Europa.",
      hint: "Elige un país",
      votesLabel: "votos",
      top10: "Top 10 productos más pedidos",
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
    footer: { tagline: "De Latinoamérica para toda Europa.", rights: "Todos los derechos reservados.", madeWith: "Hecho con cariño", crm: "Acceso equipo" },
  },
  de: {
    nav: { product: "Produkte", cta: "Früher Zugang" },
    hero: {
      badge: "🌎 Lateinamerikanische Produkte in Europa",
      title1: "Welchen Geschmack vermisst du",
      title2: "aus deinem Land?",
      subtitle:
        "Ein neuer Online-Shop, der deine liebsten lateinamerikanischen Marken nach Hause bringt – in ganz Europa. Sag uns, welche du vermisst, und wir melden uns, sobald sie da ist.",
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
      title: "Was meine Leute sich am meisten wünschen",
      subtitle:
        "Füge dein Lieblingsprodukt mit dem Formular oben hinzu, motiviere mehr Leute, danach zu fragen — schafft es ins Ranking, bringen wir es nach Europa.",
      hint: "Land wählen",
      votesLabel: "Stimmen",
      top10: "Top 10 der meistgefragten Produkte",
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
    footer: { tagline: "Aus Lateinamerika für ganz Europa.", rights: "Alle Rechte vorbehalten.", madeWith: "Mit cariño gemacht", crm: "Team-Zugang" },
  },
  pt: {
    nav: { product: "Produtos", cta: "Acesso antecipado" },
    hero: {
      badge: "🌎 Produtos latino-americanos na Europa",
      title1: "Que sabor do seu país",
      title2: "você sente falta?",
      subtitle:
        "Uma nova loja online que traz suas marcas latino-americanas favoritas até a sua casa, em toda a Europa. Conta pra gente qual você sente falta e avisamos quando chegar.",
      chips: ["Marcas autênticas", "Não perecíveis", "Na sua porta"],
      emailPlaceholder: "seu@email.com",
      cta: "Enviar",
      privacy: "Falamos com você no WhatsApp. Sem spam.",
    },
    marquee: ["Arepas", "Doce de leite", "Mate", "Tortillas", "Ají", "Banana", "Café", "Salsa", "Tajín", "Mandioca"],
    categories: {
      title: "O que trazemos",
      items: [
        { icon: "grocery", label: "Despensa & Mercearia" },
        { icon: "drink", label: "Bebidas & Mate" },
        { icon: "snack", label: "Snacks & Doces" },
        { icon: "spice", label: "Temperos & Molhos" },
        { icon: "can", label: "Conservas" },
        { icon: "coffee", label: "Café & Cacau" },
      ],
    },
    popular: {
      title: "O que a minha gente mais pede",
      subtitle:
        "Adicione seu produto favorito à lista com o formulário acima, incentive mais gente a pedir — se entrar no ranking, traremos para a Europa.",
      hint: "Escolha um país",
      votesLabel: "votos",
      top10: "Top 10 produtos mais pedidos",
      countries: { pe: "Peru", co: "Colômbia", br: "Brasil", ar: "Argentina", mx: "México", ve: "Venezuela" },
      packs: { bottle: "Bebida", can: "Lata", jar: "Pote", box: "Caixa", pouch: "Pacote", coffee: "Café", cookies: "Biscoitos" },
    },
    signup: {
      namePlaceholder: "Seu nome",
      emailPlaceholder: "seu@email.com",
      phonePlaceholder: "Número de telefone",
      countryPlaceholder: "País de origem",
      countryOther: "Outro",
      missedLabel: "Qual é o produto que você mais sente falta?",
      missedPlaceholder: "ex. Inca Kola, Harina P.A.N., doce de leite…",
      cta: "Avise-me",
      success: "Você entrou! 🎉 Avisamos no lançamento.",
      errorEmail: "Insira um e-mail válido.",
      errorRequired: "Por favor preencha os campos obrigatórios.",
      errorGeneric: "Algo deu errado. Tente de novo.",
      sending: "Enviando…",
    },
    footer: { tagline: "Da América Latina para toda a Europa.", rights: "Todos os direitos reservados.", madeWith: "Feito com carinho", crm: "Acesso da equipe" },
  },
};
