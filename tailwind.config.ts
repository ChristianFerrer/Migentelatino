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
        // Mi Gente Latino — "Tropical Fresco" palette.
        // NOTE: token names are kept stable across themes so component
        // classes don't change. Current mapping:
        //   coral → Mango (CTA / warm)   sun → Lima (accent)
        //   mint  → Turquesa (primary)   grape → Ocean (deep teal)
        //   ink   → Navy (text)          cream → off-white background
        coral: {
          DEFAULT: "#FF7A33", // Mango
          50: "#FFF1E8",
          100: "#FFE0CC",
          400: "#FF9456",
          500: "#FF7A33",
          600: "#ED6118",
        },
        sun: {
          DEFAULT: "#8DD13C", // Lima
          100: "#EAF7D6",
          400: "#A0DB5C",
          500: "#8DD13C",
        },
        mint: {
          DEFAULT: "#14A6A0", // Turquesa
          100: "#D2F1EF",
          500: "#14A6A0",
          600: "#0E8882",
        },
        grape: {
          DEFAULT: "#0E7C8B", // Ocean (deep teal)
          100: "#D0EBEF",
          500: "#0E7C8B",
        },
        ink: {
          DEFAULT: "#103A4A", // Navy
          soft: "#3E5A66",
        },
        cream: "#F6FBFA", // Blanco hueso
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(31, 27, 46, 0.18)",
        glow: "0 14px 50px -10px rgba(255, 122, 51, 0.45)",
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
