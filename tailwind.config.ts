import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1A1F2C",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#0EA5E9",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#8B5CF6",
          foreground: "#FFFFFF",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#FFFFFF',
            h1: { color: '#FFFFFF' },
            h2: { color: '#FFFFFF' },
            h3: { color: '#FFFFFF' },
            h4: { color: '#FFFFFF' },
            h5: { color: '#FFFFFF' },
            h6: { color: '#FFFFFF' },
            strong: { color: '#FFFFFF' },
            code: { color: '#FFFFFF' },
            blockquote: { color: '#FFFFFF' },
            'ul > li::marker': { color: '#FFFFFF' },
            'ol > li::marker': { color: '#FFFFFF' },
          },
        },
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;