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
        // Mi Gente Latino — "Fiesta Pop" palette (fun, vibrant, neo-brutalist).
        // NOTE: token names are kept stable across themes so component
        // classes don't change. Current mapping:
        //   coral → Orange (CTA / warm)     sun → Fluo Yellow (accent)
        //   mint  → Electric Cyan           grape → Electric Violet
        //   ink   → Near-black (text)       cream → Fuchsia (background)
        coral: {
          DEFAULT: "#FF6A00", // Orange
          50: "#FFE6D2",
          100: "#FFD3AD",
          400: "#FF8A33",
          500: "#FF6A00",
          600: "#E85F00",
        },
        sun: {
          DEFAULT: "#EAFF00", // Fluo yellow
          100: "#F4FF8A",
          400: "#EFFF33",
          500: "#EAFF00",
        },
        mint: {
          DEFAULT: "#14E0C8", // Electric cyan
          100: "#B6F7EF",
          500: "#14E0C8",
          600: "#0FBFAA",
        },
        grape: {
          DEFAULT: "#8B3DFF", // Electric violet
          100: "#E2D2FF",
          500: "#8B3DFF",
        },
        ink: {
          DEFAULT: "#141414", // Near-black
          soft: "#3D3D3D",
        },
        cream: "#F4108C", // Fuchsia background
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(20, 20, 20, 0.25)",
        glow: "0 14px 50px -10px rgba(255, 106, 0, 0.45)",
        // Neo-brutalist hard offset shadows
        brutal: "6px 6px 0 0 #141414",
        brutalsm: "4px 4px 0 0 #141414",
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
