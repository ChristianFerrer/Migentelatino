import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mi Gente Latino — "Acuarela" palette, from the watercolor courtyard:
        // cream paper, turquoise door, terracotta pots, golden blossoms,
        // olive foliage, lavender shadows, black ink outlines.
        //   coral → Terracotta   sun → Golden
        //   mint  → Turquoise    grape → Lavender   olive → Foliage green
        //   ink   → Ink outline  cream → Paper background
        coral: {
          DEFAULT: "#D9542B", // Terracotta
          50: "#F7E2D8",
          100: "#F1CDBC",
          400: "#E0764F",
          500: "#D9542B",
          600: "#BE4421",
        },
        sun: {
          DEFAULT: "#F2B33C", // Golden
          100: "#FBEBC6",
          400: "#F5C463",
          500: "#F2B33C",
          600: "#DD9A1E",
        },
        mint: {
          DEFAULT: "#2F9FBE", // Turquoise (the door)
          100: "#CDE9F0",
          500: "#2F9FBE",
          600: "#237E98",
        },
        grape: {
          DEFAULT: "#9A8CBE", // Lavender (shadows)
          100: "#E4DEF0",
          500: "#9A8CBE",
          600: "#7E6FA6",
        },
        olive: {
          DEFAULT: "#8AA63E", // Foliage green
          100: "#E6EDCB",
          500: "#8AA63E",
          600: "#6F8A2C",
        },
        ink: {
          DEFAULT: "#221E18", // Ink outline (primary text)
          soft: "#6E6353", // Warm gray (secondary text)
        },
        surface: "#FCF8EF", // Card surface (warm paper)
        lavender: "#6E6353", // Secondary text fallback
        cream: "#F4EDDD", // Page background (watercolor paper)
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 16px 44px -18px rgba(80, 55, 25, 0.32)",
        // Terracotta CTA glow + turquoise accent glow
        glow: "0 14px 36px -10px rgba(217, 84, 43, 0.42)",
        "glow-cool": "0 14px 34px -12px rgba(47, 159, 190, 0.40)",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "float-slow": "float-slow 6s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
