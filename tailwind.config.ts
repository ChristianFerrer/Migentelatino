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
        // Mi Gente Latino — vibrant Latino palette
        coral: {
          DEFAULT: "#FF6B5C",
          50: "#FFF1EF",
          100: "#FFE0DB",
          400: "#FF8779",
          500: "#FF6B5C",
          600: "#F04E3D",
        },
        sun: {
          DEFAULT: "#FFC233",
          100: "#FFF3D6",
          400: "#FFCF5C",
          500: "#FFC233",
        },
        mint: {
          DEFAULT: "#2EC4A6",
          100: "#D7F5EE",
          500: "#2EC4A6",
          600: "#1FA98D",
        },
        grape: {
          DEFAULT: "#7C5CFF",
          100: "#E9E2FF",
          500: "#7C5CFF",
        },
        ink: {
          DEFAULT: "#1F1B2E",
          soft: "#4A4458",
        },
        cream: "#FFFBF5",
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
        glow: "0 14px 50px -10px rgba(255, 107, 92, 0.45)",
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
