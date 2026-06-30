// Top packaged, non-perishable products by country — a demo "taste" of the
// catalog and the live demand ranking. Names are brand/product proper nouns
// (not translated). `pack` maps to a flat packaging illustration in
// components/Icons.tsx (fallback for `image`). `votes` seeds the ranking —
// sized to be believable for the Latin-American community in Austria/Germany.

export type PackType = "bottle" | "can" | "jar" | "box" | "pouch" | "coffee" | "cookies";

export type CountryKey = "pe" | "co" | "br" | "ar" | "mx" | "ve";

export type Product = { name: string; pack: PackType; image: string; votes: number };

export type Country = {
  key: CountryKey;
  flag: string;
  products: Product[];
};

export const COUNTRIES: Country[] = [
  {
    key: "pe",
    flag: "🇵🇪",
    products: [
      { name: "Inca Kola", pack: "bottle", image: "/products/pe-inca-kola.jpg", votes: 257 },
      { name: "Ají Amarillo", pack: "jar", image: "/products/pe-aji-amarillo.jpg", votes: 189 },
      { name: "Chocolate Sublime", pack: "box", image: "/products/pe-sublime.jpg", votes: 122 },
      { name: "Galletas Casino", pack: "cookies", image: "/products/pe-casino.jpg", votes: 98 },
      { name: "Panetón D'Onofrio", pack: "box", image: "/products/pe-paneton.jpg", votes: 71 },
    ],
  },
  {
    key: "co",
    flag: "🇨🇴",
    products: [
      { name: "Café Colombiano", pack: "coffee", image: "/products/co-cafe.jpg", votes: 220 },
      { name: "Arequipe", pack: "jar", image: "/products/co-arequipe.jpg", votes: 138 },
      { name: "Bocadillo Veleño", pack: "box", image: "/products/co-bocadillo.jpg", votes: 121 },
      { name: "Chocolate Corona", pack: "box", image: "/products/co-chocolate-corona.jpg", votes: 108 },
      { name: "Galletas Festival", pack: "cookies", image: "/products/co-festival.jpg", votes: 82 },
    ],
  },
  {
    key: "br",
    flag: "🇧🇷",
    products: [
      { name: "Guaraná Antarctica", pack: "can", image: "/products/br-guarana.jpg", votes: 238 },
      { name: "Café do Brasil", pack: "coffee", image: "/products/br-cafe.jpg", votes: 176 },
      { name: "Leite Moça", pack: "can", image: "/products/br-leite-moca.jpg", votes: 144 },
      { name: "Farofa Yoki", pack: "pouch", image: "/products/br-farofa.jpg", votes: 102 },
      { name: "Polvilho / Tapioca", pack: "pouch", image: "/products/br-polvilho.jpg", votes: 86 },
    ],
  },
  {
    key: "ar",
    flag: "🇦🇷",
    products: [
      { name: "Yerba Mate", pack: "pouch", image: "/products/ar-yerba-mate.jpg", votes: 282 },
      { name: "Dulce de Leche", pack: "jar", image: "/products/ar-dulce-de-leche.jpg", votes: 264 },
      { name: "Alfajores Havanna", pack: "box", image: "/products/ar-havanna.jpg", votes: 194 },
      { name: "Galletitas Criollitas", pack: "cookies", image: "/products/ar-criollitas.jpg", votes: 90 },
      { name: "Mate Cocido", pack: "box", image: "/products/ar-mate-cocido.jpg", votes: 76 },
    ],
  },
  {
    key: "mx",
    flag: "🇲🇽",
    products: [
      { name: "Tajín", pack: "bottle", image: "/products/mx-tajin.jpg", votes: 251 },
      { name: "Salsa Valentina", pack: "bottle", image: "/products/mx-valentina.jpg", votes: 236 },
      { name: "Maseca", pack: "pouch", image: "/products/mx-maseca.jpg", votes: 176 },
      { name: "Mole Doña María", pack: "jar", image: "/products/mx-mole.jpg", votes: 128 },
      { name: "Mazapán De la Rosa", pack: "pouch", image: "/products/mx-mazapan.jpg", votes: 104 },
    ],
  },
  {
    key: "ve",
    flag: "🇻🇪",
    products: [
      { name: "Harina P.A.N.", pack: "pouch", image: "/products/ve-harina-pan.jpg", votes: 300 },
      { name: "Malta Maltín Polar", pack: "can", image: "/products/ve-maltin.jpg", votes: 138 },
      { name: "Diablitos Underwood", pack: "can", image: "/products/ve-diablitos.jpg", votes: 122 },
      { name: "Galletas Cocosette", pack: "cookies", image: "/products/ve-cocosette.jpg", votes: 108 },
      { name: "Café Fama de América", pack: "coffee", image: "/products/ve-cafe-fama.jpg", votes: 94 },
    ],
  },
];
