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
        // Mi Gente Latino — "Mercado" palette (light, warm, appetizing).
        // Fresh-market feel: warm cream base, espresso text, a salsa CTA
        // (amber→orange→coral) and fresh green/teal for produce vibes.
        //   coral → Chili/Tomato   sun → Mango/Amber
        //   mint  → Fresh Green    grape → Teal
        //   ink   → Espresso text   cream → Warm cream background
        coral: {
          DEFAULT: "#F0473D", // Chili / tomato
          50: "#FDE7E4",
          100: "#FBD3CE",
          400: "#F46A60",
          500: "#F0473D",
          600: "#DA3328",
        },
        sun: {
          DEFAULT: "#F7B733", // Mango / amber
          100: "#FDEFCB",
          400: "#F9C75C",
          500: "#F7B733",
          600: "#E69E12",
        },
        mint: {
          DEFAULT: "#15A56A", // Fresh green
          100: "#D2F1E2",
          500: "#15A56A",
          600: "#0E8A57",
        },
        grape: {
          DEFAULT: "#0FB0A4", // Teal
          100: "#CFF1EE",
          500: "#0FB0A4",
          600: "#0A8F86",
        },
        ink: {
          DEFAULT: "#2B1A12", // Espresso (primary text)
          soft: "#7C6A5E", // Warm gray (secondary text)
        },
        surface: "#FFFFFF", // Card surface
        lavender: "#7C6A5E", // Secondary text fallback
        cream: "#FFF6EA", // Page background (warm cream)
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 16px 44px -18px rgba(120, 60, 20, 0.30)",
        // Warm CTA glow + fresh cool accent glow
        glow: "0 14px 36px -10px rgba(240, 71, 61, 0.45)",
        "glow-cool": "0 14px 34px -12px rgba(21, 165, 106, 0.40)",
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
