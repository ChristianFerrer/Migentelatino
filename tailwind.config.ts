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
        // Mi Gente Latino — "Aventura" palette, from the vibrant cartoon:
        // turquoise sky background, golden glow, periwinkle violet, berry red,
        // leaf green and deep teal, with dark ink outlines.
        //   coral → Berry red    sun → Golden
        //   mint  → Leaf green   grape → Violet (periwinkle)
        //   olive → Deep teal    ink → Ink outline   cream → Turquoise bg
        coral: {
          DEFAULT: "#F0473D", // Berry red
          50: "#FCE3E0",
          100: "#FAD0CB",
          400: "#F46A60",
          500: "#F0473D",
          600: "#D8362C",
        },
        sun: {
          DEFAULT: "#FFC22E", // Golden
          100: "#FFEFC2",
          400: "#FFD062",
          500: "#FFC22E",
          600: "#F0A800",
        },
        mint: {
          DEFAULT: "#2FB86A", // Leaf green
          100: "#CFEEDD",
          500: "#2FB86A",
          600: "#239455",
        },
        grape: {
          DEFAULT: "#7C6BD6", // Violet (periwinkle)
          100: "#E0DBF7",
          400: "#9A8CE3",
          500: "#7C6BD6",
          600: "#6253C2",
        },
        olive: {
          DEFAULT: "#0E8FA0", // Deep teal accent
          100: "#C7E8ED",
          500: "#0E8FA0",
          600: "#0A7383",
        },
        ink: {
          DEFAULT: "#13303A", // Deep teal-navy (text / outlines)
          soft: "#3E5963", // Muted teal
        },
        surface: "#FFFFFF", // Card surface
        lavender: "#3E5963", // Secondary text fallback
        cream: "#1FBCD0", // Page background (turquoise)
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 16px 44px -18px rgba(10, 45, 55, 0.45)",
        // Golden CTA glow + violet accent glow
        glow: "0 14px 36px -10px rgba(255, 194, 46, 0.55)",
        "glow-cool": "0 14px 34px -12px rgba(124, 107, 214, 0.45)",
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
