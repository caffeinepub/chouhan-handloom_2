import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
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
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        // Chouhan Handloom Brand Colors
        maroon: {
          DEFAULT: "oklch(0.32 0.13 18)",
          dark: "oklch(0.18 0.09 18)",
          deep: "oklch(0.12 0.07 18)",
          light: "oklch(0.42 0.12 18)",
        },
        gold: {
          DEFAULT: "oklch(0.72 0.14 78)",
          bright: "oklch(0.80 0.16 80)",
          pale: "oklch(0.88 0.10 80)",
          dark: "oklch(0.60 0.12 78)",
        },
        ivory: {
          DEFAULT: "oklch(0.97 0.02 85)",
          warm: "oklch(0.95 0.03 80)",
        },
        jet: {
          DEFAULT: "oklch(0.10 0.005 20)",
          dark: "oklch(0.07 0.002 20)",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', '"Instrument Serif"', "Georgia", "serif"],
        heading: ['"Fraunces"', '"Playfair Display"', "Georgia", "serif"],
        body: ['"Cabinet Grotesk"', '"Sora"', "system-ui", "sans-serif"],
        brand: ['"Fraunces"', '"Playfair Display"', "Georgia", "serif"],
        sans: ['"Sora"', '"Cabinet Grotesk"', "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', '"Playfair Display"', "Georgia", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        "gold-sm": "0 2px 8px oklch(0.72 0.14 78 / 0.3)",
        "gold-md": "0 4px 20px oklch(0.72 0.14 78 / 0.3)",
        "gold-lg": "0 8px 40px oklch(0.72 0.14 78 / 0.4)",
        "maroon-md": "0 4px 20px oklch(0.32 0.13 18 / 0.4)",
        royal: "0 20px 60px oklch(0.07 0.002 20 / 0.6)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fabric-shimmer": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "float-up": {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "0.7" },
          "100%": { transform: "translateY(-100vh) rotate(360deg)", opacity: "0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "bounce-cart": {
          "0%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.3)" },
          "60%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fabric-shimmer": "fabric-shimmer 6s ease infinite",
        "float-up": "float-up linear infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "bounce-cart": "bounce-cart 0.4s ease",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
