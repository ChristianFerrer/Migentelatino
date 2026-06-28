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
        // Mi Gente Latino — "Noche Latina" palette (dark, vibrant, neon).
        // Inspired by the reference brand: deep purple base, violet accents,
        // signature lime→turquoise CTA, magenta→violet chips, cyan details.
        //   coral → Magenta      sun → Lime
        //   mint  → Turquoise    grape → Violet
        //   ink   → Deep purples (bars/scrims)   cream → Purple background
        coral: {
          DEFAULT: "#F0379E", // Magenta
          50: "#FBD9EC",
          100: "#FBC9E5",
          400: "#F45CB0",
          500: "#F0379E",
          600: "#D81E86",
        },
        sun: {
          DEFAULT: "#CFF598", // Lime
          100: "#E8FBC9",
          400: "#DCF7B0",
          500: "#CFF598",
        },
        mint: {
          DEFAULT: "#4FE3C9", // Turquoise
          100: "#C9F7EE",
          500: "#4FE3C9",
          600: "#2DE0D0", // Cyan
        },
        grape: {
          DEFAULT: "#B57BFF", // Violet
          100: "#E2D2FF",
          400: "#C79BFF",
          500: "#A855F7",
          600: "#8B3DFF",
        },
        ink: {
          DEFAULT: "#160727", // Deep purple (bars)
          soft: "#0F0420", // Darkest (scrims/footer)
        },
        surface: "#38146B", // Card surface
        lavender: "#D9C7FF", // Secondary text
        cream: "#2A0A48", // Page background (deep purple)
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 14px 50px -16px rgba(0, 0, 0, 0.6)",
        // Neon glows for the dark theme
        glow: "0 0 36px -6px rgba(79, 227, 201, 0.65)", // turquoise (CTA)
        "glow-violet": "0 0 36px -6px rgba(181, 123, 255, 0.6)",
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
