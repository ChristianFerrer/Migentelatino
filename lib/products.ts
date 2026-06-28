// Top packaged, non-perishable products by country — a demo "taste" of the
// catalog. Names are brand/product proper nouns (not translated). `pack` maps
// to a flat packaging illustration in components/Icons.tsx.

export type PackType = "bottle" | "can" | "jar" | "box" | "pouch" | "coffee" | "cookies";

export type CountryKey = "pe" | "co" | "br" | "ar" | "mx" | "ve";

export type Country = {
  key: CountryKey;
  flag: string;
  products: { name: string; pack: PackType }[];
};

export const COUNTRIES: Country[] = [
  {
    key: "pe",
    flag: "🇵🇪",
    products: [
      { name: "Inca Kola", pack: "bottle" },
      { name: "Ají Amarillo", pack: "jar" },
      { name: "Chocolate Sublime", pack: "box" },
      { name: "Galletas Casino", pack: "cookies" },
      { name: "Panetón D'Onofrio", pack: "box" },
    ],
  },
  {
    key: "co",
    flag: "🇨🇴",
    products: [
      { name: "Café Colombiano", pack: "coffee" },
      { name: "Bocadillo Veleño", pack: "box" },
      { name: "Chocolate Corona", pack: "box" },
      { name: "Galletas Festival", pack: "cookies" },
      { name: "Arequipe", pack: "jar" },
    ],
  },
  {
    key: "br",
    flag: "🇧🇷",
    products: [
      { name: "Guaraná Antarctica", pack: "can" },
      { name: "Leite Moça", pack: "can" },
      { name: "Polvilho / Tapioca", pack: "pouch" },
      { name: "Farofa Yoki", pack: "pouch" },
      { name: "Café do Brasil", pack: "coffee" },
    ],
  },
  {
    key: "ar",
    flag: "🇦🇷",
    products: [
      { name: "Yerba Mate", pack: "pouch" },
      { name: "Dulce de Leche", pack: "jar" },
      { name: "Alfajores Havanna", pack: "box" },
      { name: "Galletitas Criollitas", pack: "cookies" },
      { name: "Mate Cocido", pack: "box" },
    ],
  },
  {
    key: "mx",
    flag: "🇲🇽",
    products: [
      { name: "Tajín", pack: "bottle" },
      { name: "Salsa Valentina", pack: "bottle" },
      { name: "Maseca", pack: "pouch" },
      { name: "Mole Doña María", pack: "jar" },
      { name: "Mazapán De la Rosa", pack: "pouch" },
    ],
  },
  {
    key: "ve",
    flag: "🇻🇪",
    products: [
      { name: "Harina P.A.N.", pack: "pouch" },
      { name: "Malta Maltín Polar", pack: "can" },
      { name: "Diablitos Underwood", pack: "can" },
      { name: "Galletas Cocosette", pack: "cookies" },
      { name: "Café Fama de América", pack: "coffee" },
    ],
  },
];
