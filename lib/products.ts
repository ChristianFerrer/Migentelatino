// Top packaged, non-perishable products by country — a demo "taste" of the
// catalog. Names are brand/product proper nouns (not translated). `pack` maps
// to a flat packaging illustration in components/Icons.tsx, used as a fallback
// until a real photo is added at `image` (a file under /public/products/).

export type PackType = "bottle" | "can" | "jar" | "box" | "pouch" | "coffee" | "cookies";

export type CountryKey = "pe" | "co" | "br" | "ar" | "mx" | "ve";

export type Product = { name: string; pack: PackType; image: string };

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
      { name: "Inca Kola", pack: "bottle", image: "/products/pe-inca-kola.jpg" },
      { name: "Ají Amarillo", pack: "jar", image: "/products/pe-aji-amarillo.jpg" },
      { name: "Chocolate Sublime", pack: "box", image: "/products/pe-sublime.jpg" },
      { name: "Galletas Casino", pack: "cookies", image: "/products/pe-casino.jpg" },
      { name: "Panetón D'Onofrio", pack: "box", image: "/products/pe-paneton.jpg" },
    ],
  },
  {
    key: "co",
    flag: "🇨🇴",
    products: [
      { name: "Café Colombiano", pack: "coffee", image: "/products/co-cafe.jpg" },
      { name: "Bocadillo Veleño", pack: "box", image: "/products/co-bocadillo.jpg" },
      { name: "Chocolate Corona", pack: "box", image: "/products/co-chocolate-corona.jpg" },
      { name: "Galletas Festival", pack: "cookies", image: "/products/co-festival.jpg" },
      { name: "Arequipe", pack: "jar", image: "/products/co-arequipe.jpg" },
    ],
  },
  {
    key: "br",
    flag: "🇧🇷",
    products: [
      { name: "Guaraná Antarctica", pack: "can", image: "/products/br-guarana.jpg" },
      { name: "Leite Moça", pack: "can", image: "/products/br-leite-moca.jpg" },
      { name: "Polvilho / Tapioca", pack: "pouch", image: "/products/br-polvilho.jpg" },
      { name: "Farofa Yoki", pack: "pouch", image: "/products/br-farofa.jpg" },
      { name: "Café do Brasil", pack: "coffee", image: "/products/br-cafe.jpg" },
    ],
  },
  {
    key: "ar",
    flag: "🇦🇷",
    products: [
      { name: "Yerba Mate", pack: "pouch", image: "/products/ar-yerba-mate.jpg" },
      { name: "Dulce de Leche", pack: "jar", image: "/products/ar-dulce-de-leche.jpg" },
      { name: "Alfajores Havanna", pack: "box", image: "/products/ar-havanna.jpg" },
      { name: "Galletitas Criollitas", pack: "cookies", image: "/products/ar-criollitas.jpg" },
      { name: "Mate Cocido", pack: "box", image: "/products/ar-mate-cocido.jpg" },
    ],
  },
  {
    key: "mx",
    flag: "🇲🇽",
    products: [
      { name: "Tajín", pack: "bottle", image: "/products/mx-tajin.jpg" },
      { name: "Salsa Valentina", pack: "bottle", image: "/products/mx-valentina.jpg" },
      { name: "Maseca", pack: "pouch", image: "/products/mx-maseca.jpg" },
      { name: "Mole Doña María", pack: "jar", image: "/products/mx-mole.jpg" },
      { name: "Mazapán De la Rosa", pack: "pouch", image: "/products/mx-mazapan.jpg" },
    ],
  },
  {
    key: "ve",
    flag: "🇻🇪",
    products: [
      { name: "Harina P.A.N.", pack: "pouch", image: "/products/ve-harina-pan.jpg" },
      { name: "Malta Maltín Polar", pack: "can", image: "/products/ve-maltin.jpg" },
      { name: "Diablitos Underwood", pack: "can", image: "/products/ve-diablitos.jpg" },
      { name: "Galletas Cocosette", pack: "cookies", image: "/products/ve-cocosette.jpg" },
      { name: "Café Fama de América", pack: "coffee", image: "/products/ve-cafe-fama.jpg" },
    ],
  },
];
