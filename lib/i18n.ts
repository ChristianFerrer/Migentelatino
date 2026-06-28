export type Locale = "en" | "es" | "de";

export const LOCALES: Locale[] = ["en", "es", "de"];

export const LOCALE_LABELS: Record<Locale, { flag: string; name: string }> = {
  en: { flag: "🇬🇧", name: "English" },
  es: { flag: "🇪🇸", name: "Español" },
  de: { flag: "🇦🇹", name: "Deutsch" },
};

type Dict = {
  nav: { product: string; how: string; faq: string; cta: string };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    emailPlaceholder: string;
    cta: string;
    privacy: string;
    socialProof: string;
  };
  marquee: string[];
  categories: { title: string; subtitle: string; items: { icon: string; label: string }[] };
  value: {
    title: string;
    subtitle: string;
    items: { icon: string; title: string; text: string }[];
  };
  how: {
    title: string;
    subtitle: string;
    steps: { icon: string; title: string; text: string }[];
  };
  signup: {
    title: string;
    subtitle: string;
    emailPlaceholder: string;
    cta: string;
    success: string;
    errorEmail: string;
    errorGeneric: string;
    sending: string;
  };
  faq: { title: string; items: { q: string; a: string }[] };
  footer: { tagline: string; rights: string; madeWith: string };
};

export const translations: Record<Locale, Dict> = {
  en: {
    nav: { product: "Products", how: "How it works", faq: "FAQ", cta: "Get early access" },
    hero: {
      badge: "🇦🇹 Now coming to Austria",
      title1: "The taste of home,",
      title2: "delivered to your door.",
      subtitle:
        "Mi Gente Latino brings authentic Latin American groceries, snacks and flavors to Austria. Be the first to know when we launch.",
      emailPlaceholder: "your@email.com",
      cta: "Notify me at launch",
      privacy: "No spam, ever. Unsubscribe anytime.",
      socialProof: "Join the growing latino community in Austria 🌎",
    },
    marquee: ["Arepas", "Dulce de leche", "Mate", "Tortillas", "Ají", "Plátano", "Café", "Salsa", "Tajín", "Yuca"],
    categories: {
      title: "Everything you miss, in one place",
      subtitle: "From pantry staples to the snacks you grew up with.",
      items: [
        { icon: "grocery", label: "Groceries & Pantry" },
        { icon: "drink", label: "Drinks & Mate" },
        { icon: "snack", label: "Snacks & Sweets" },
        { icon: "spice", label: "Spices & Sauces" },
        { icon: "fresh", label: "Fresh Produce" },
        { icon: "frozen", label: "Frozen Favorites" },
      ],
    },
    value: {
      title: "Why Mi Gente Latino?",
      subtitle: "Built by latinos, for our community in Austria.",
      items: [
        { icon: "heart", title: "100% Authentic", text: "Real brands and flavors imported straight from Latin America — no substitutes." },
        { icon: "truck", title: "Fast local delivery", text: "Shipped across Austria, fresh and fast, right to your door." },
        { icon: "globe", title: "Your community", text: "More than a store: events, recipes and the people that make us familia." },
      ],
    },
    how: {
      title: "How it works",
      subtitle: "A simple journey from craving to doorstep.",
      steps: [
        { icon: "mail", title: "1. Leave your email", text: "Join the list and help us bring the store to life in your city." },
        { icon: "cart", title: "2. Shop your favorites", text: "When we launch, browse hundreds of authentic latino products online." },
        { icon: "box", title: "3. Get it delivered", text: "We pack and ship it across Austria — fresh, fast and with cariño." },
      ],
    },
    signup: {
      title: "Be first in line 🎉",
      subtitle: "Drop your email and get early access plus a launch-day discount.",
      emailPlaceholder: "your@email.com",
      cta: "Join the waitlist",
      success: "You're in! 🎉 We'll email you the moment we launch.",
      errorEmail: "Please enter a valid email address.",
      errorGeneric: "Something went wrong. Please try again.",
      sending: "Joining…",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        { q: "When are you launching?", a: "We're validating demand right now. The more people join the waitlist, the faster we launch — leave your email to be notified first." },
        { q: "Where do you deliver?", a: "We plan to deliver across Austria, starting with the major cities. Tell us your city when we email you!" },
        { q: "What kind of products will you have?", a: "Authentic groceries, drinks, snacks, spices, fresh and frozen products from across Latin America." },
        { q: "Does it cost anything to join?", a: "Not at all. Joining the waitlist is free and you'll get an exclusive launch discount." },
      ],
    },
    footer: { tagline: "The taste of home, in Austria.", rights: "All rights reserved.", madeWith: "Made with cariño for our gente." },
  },
  es: {
    nav: { product: "Productos", how: "Cómo funciona", faq: "Preguntas", cta: "Acceso anticipado" },
    hero: {
      badge: "🇦🇹 Próximamente en Austria",
      title1: "El sabor de casa,",
      title2: "hasta tu puerta.",
      subtitle:
        "Mi Gente Latino trae productos, antojitos y sabores auténticos de Latinoamérica a Austria. Sé el primero en enterarte cuando lancemos.",
      emailPlaceholder: "tu@correo.com",
      cta: "Avísenme en el lanzamiento",
      privacy: "Cero spam. Cancela cuando quieras.",
      socialProof: "Únete a la creciente comunidad latina en Austria 🌎",
    },
    marquee: ["Arepas", "Dulce de leche", "Mate", "Tortillas", "Ají", "Plátano", "Café", "Salsa", "Tajín", "Yuca"],
    categories: {
      title: "Todo lo que extrañas, en un solo lugar",
      subtitle: "Desde la despensa hasta los antojitos de toda la vida.",
      items: [
        { icon: "grocery", label: "Despensa y abarrotes" },
        { icon: "drink", label: "Bebidas y mate" },
        { icon: "snack", label: "Snacks y dulces" },
        { icon: "spice", label: "Especias y salsas" },
        { icon: "fresh", label: "Frutas y verduras" },
        { icon: "frozen", label: "Congelados favoritos" },
      ],
    },
    value: {
      title: "¿Por qué Mi Gente Latino?",
      subtitle: "Hecho por latinos, para nuestra comunidad en Austria.",
      items: [
        { icon: "heart", title: "100% auténtico", text: "Marcas y sabores reales importados directo de Latinoamérica — sin sustitutos." },
        { icon: "truck", title: "Entrega local rápida", text: "Enviamos por toda Austria, fresco y rápido, hasta tu puerta." },
        { icon: "globe", title: "Tu comunidad", text: "Más que una tienda: eventos, recetas y la gente que nos hace familia." },
      ],
    },
    how: {
      title: "Cómo funciona",
      subtitle: "Un camino simple del antojo a tu casa.",
      steps: [
        { icon: "mail", title: "1. Deja tu correo", text: "Únete a la lista y ayúdanos a traer la tienda a tu ciudad." },
        { icon: "cart", title: "2. Compra tus favoritos", text: "Cuando lancemos, explora cientos de productos latinos auténticos online." },
        { icon: "box", title: "3. Recíbelo en casa", text: "Empacamos y enviamos por toda Austria — fresco, rápido y con cariño." },
      ],
    },
    signup: {
      title: "Sé de los primeros 🎉",
      subtitle: "Deja tu correo y obtén acceso anticipado más un descuento de lanzamiento.",
      emailPlaceholder: "tu@correo.com",
      cta: "Unirme a la lista",
      success: "¡Estás dentro! 🎉 Te escribiremos apenas lancemos.",
      errorEmail: "Por favor ingresa un correo válido.",
      errorGeneric: "Algo salió mal. Inténtalo de nuevo.",
      sending: "Uniéndote…",
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        { q: "¿Cuándo lanzan?", a: "Estamos validando la demanda ahora mismo. Mientras más gente se una a la lista, más rápido lanzamos — deja tu correo para enterarte primero." },
        { q: "¿A dónde envían?", a: "Planeamos enviar por toda Austria, empezando por las ciudades principales. ¡Cuéntanos tu ciudad cuando te escribamos!" },
        { q: "¿Qué tipo de productos tendrán?", a: "Abarrotes, bebidas, snacks, especias y productos frescos y congelados auténticos de toda Latinoamérica." },
        { q: "¿Cuesta algo unirme?", a: "Para nada. Unirte a la lista es gratis y recibirás un descuento exclusivo de lanzamiento." },
      ],
    },
    footer: { tagline: "El sabor de casa, en Austria.", rights: "Todos los derechos reservados.", madeWith: "Hecho con cariño para nuestra gente." },
  },
  de: {
    nav: { product: "Produkte", how: "So funktioniert's", faq: "FAQ", cta: "Früher Zugang" },
    hero: {
      badge: "🇦🇹 Bald in Österreich",
      title1: "Der Geschmack der Heimat,",
      title2: "direkt vor deine Tür.",
      subtitle:
        "Mi Gente Latino bringt authentische lateinamerikanische Lebensmittel, Snacks und Aromen nach Österreich. Sei der Erste, der vom Start erfährt.",
      emailPlaceholder: "deine@email.com",
      cta: "Beim Start benachrichtigen",
      privacy: "Kein Spam. Jederzeit abbestellbar.",
      socialProof: "Werde Teil der wachsenden Latino-Community in Österreich 🌎",
    },
    marquee: ["Arepas", "Dulce de leche", "Mate", "Tortillas", "Ají", "Plátano", "Kaffee", "Salsa", "Tajín", "Yuca"],
    categories: {
      title: "Alles, was du vermisst, an einem Ort",
      subtitle: "Von Grundnahrungsmitteln bis zu den Snacks deiner Kindheit.",
      items: [
        { icon: "grocery", label: "Lebensmittel & Vorrat" },
        { icon: "drink", label: "Getränke & Mate" },
        { icon: "snack", label: "Snacks & Süßes" },
        { icon: "spice", label: "Gewürze & Saucen" },
        { icon: "fresh", label: "Frische Produkte" },
        { icon: "frozen", label: "Tiefkühl-Favoriten" },
      ],
    },
    value: {
      title: "Warum Mi Gente Latino?",
      subtitle: "Von Latinos gemacht, für unsere Community in Österreich.",
      items: [
        { icon: "heart", title: "100% authentisch", text: "Echte Marken und Aromen direkt aus Lateinamerika importiert — kein Ersatz." },
        { icon: "truck", title: "Schnelle Lieferung", text: "Versand in ganz Österreich, frisch und schnell, direkt zu dir." },
        { icon: "globe", title: "Deine Community", text: "Mehr als ein Shop: Events, Rezepte und die Menschen, die uns zu familia machen." },
      ],
    },
    how: {
      title: "So funktioniert's",
      subtitle: "Ein einfacher Weg vom Gusto bis zur Haustür.",
      steps: [
        { icon: "mail", title: "1. E-Mail hinterlassen", text: "Trag dich ein und hilf uns, den Shop in deine Stadt zu bringen." },
        { icon: "cart", title: "2. Favoriten shoppen", text: "Beim Start kannst du Hunderte authentische Latino-Produkte online entdecken." },
        { icon: "box", title: "3. Liefern lassen", text: "Wir verpacken und versenden in ganz Österreich — frisch, schnell und mit cariño." },
      ],
    },
    signup: {
      title: "Sei von Anfang an dabei 🎉",
      subtitle: "Hinterlasse deine E-Mail für frühen Zugang plus Rabatt zum Start.",
      emailPlaceholder: "deine@email.com",
      cta: "Auf die Warteliste",
      success: "Du bist dabei! 🎉 Wir melden uns, sobald wir starten.",
      errorEmail: "Bitte gib eine gültige E-Mail-Adresse ein.",
      errorGeneric: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
      sending: "Wird gesendet…",
    },
    faq: {
      title: "Häufige Fragen",
      items: [
        { q: "Wann startet ihr?", a: "Wir testen gerade die Nachfrage. Je mehr Menschen sich eintragen, desto schneller starten wir — trag dich ein, um es als Erster zu erfahren." },
        { q: "Wohin liefert ihr?", a: "Wir planen die Lieferung in ganz Österreich, beginnend mit den großen Städten. Sag uns deine Stadt, wenn wir dir schreiben!" },
        { q: "Welche Produkte wird es geben?", a: "Authentische Lebensmittel, Getränke, Snacks, Gewürze sowie frische und tiefgekühlte Produkte aus ganz Lateinamerika." },
        { q: "Kostet die Anmeldung etwas?", a: "Überhaupt nicht. Die Anmeldung ist kostenlos und du erhältst einen exklusiven Start-Rabatt." },
      ],
    },
    footer: { tagline: "Der Geschmack der Heimat, in Österreich.", rights: "Alle Rechte vorbehalten.", madeWith: "Mit cariño für unsere gente gemacht." },
  },
};
