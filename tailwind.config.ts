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
        // Mi Gente Latino — "Mercado" palette, from the Mexican street-food
        // reference: vibrant orange, teal, warm cream, golden and chili red.
        //   coral → Orange (hero / CTA)   sun → Golden
        //   mint  → Teal                  grape → Chili red
        //   olive → Lime green   ink → Deep teal text   cream → Warm cream bg
        coral: {
          DEFAULT: "#E2611E", // Orange
          50: "#FBE7D7",
          100: "#F8D2B6",
          400: "#EA7E3F",
          500: "#E2611E",
          600: "#C75214",
        },
        sun: {
          DEFAULT: "#F2A93B", // Golden
          100: "#FBE7C2",
          400: "#F5BC63",
          500: "#F2A93B",
          600: "#DC8F1C",
        },
        mint: {
          DEFAULT: "#1F7A6B", // Teal
          100: "#CDE3DE",
          500: "#1F7A6B",
          600: "#155C50",
        },
        grape: {
          DEFAULT: "#D8442B", // Chili red
          100: "#F6D2CB",
          400: "#E0654F",
          500: "#D8442B",
          600: "#BB3420",
        },
        olive: {
          DEFAULT: "#6FA03C", // Lime green
          100: "#E0EBC8",
          500: "#6FA03C",
          600: "#577F2D",
        },
        ink: {
          DEFAULT: "#1E332E", // Deep teal (text)
          soft: "#5E6B62", // Muted
        },
        surface: "#FFFDF7", // Warm white card
        lavender: "#5E6B62", // Secondary text fallback
        cream: "#F6ECD3", // Warm cream background
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 12px 40px -14px rgba(60, 35, 10, 0.30)",
        card: "0 4px 22px -8px rgba(60, 35, 10, 0.20)",
        glow: "0 14px 34px -12px rgba(226, 97, 30, 0.5)",
        "glow-cool": "0 12px 32px -14px rgba(31, 122, 107, 0.4)",
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
