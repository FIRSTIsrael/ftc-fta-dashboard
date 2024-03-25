import type { Config } from "tailwindcss";

const config = {
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        glow: {
          "0%": {
            boxShadow: "0 0 0 0 rgba(74, 222, 128, 0.7)",
          },
          "50%": {
            boxShadow: "0 0 0 5px rgba(74, 222, 128, 0)",
          },
          "100%": {
            boxShadow: "0 0 0 0 rgba(74, 222, 128, 0)",
          },
        },
        "flash-red": {
          "0%": {
            backgroundColor: "rgba(255, 0, 0, 1)",
          },
          "50%": {
            backgroundColor: "rgba(255, 0, 0, 0)",
          },
          "100%": {
            backgroundColor: "rgba(255, 0, 0, 1)",
          },
        },
        "flash-green": {
          "0%": {
            backgroundColor: "rgba(0, 255, 0, 1)",
          },
          "50%": {
            backgroundColor: "rgba(0, 255, 0, 0.5)",
          },
          "100%": {
            backgroundColor: "rgba(0, 255, 0, 1)",
          },
        },
        "flash-red-alliance": {
          "0%": {
            "--tw-gradient-to":
              "rgba(239, 68, 68, 1) var(--tw-gradient-to-position)",
          },
          "50%": {
            "--tw-gradient-to":
              "rgba(239, 68, 68, 0) var(--tw-gradient-to-position)",
          },
          "100%": {
            "--tw-gradient-to":
              "rgba(239, 68, 68, 1) var(--tw-gradient-to-position)",
          },
        },
        "flash-blue-alliance": {
          "0%": {
            "--tw-gradient-from":
              "rgba(59, 130, 246, 1) var(--tw-gradient-from-position)",
          },
          "50%": {
            "--tw-gradient-from":
              "rgba(59, 130, 246, 0) var(--tw-gradient-from-position)",
          },
          "100%": {
            "--tw-gradient-from":
              "rgba(59, 130, 246, 1) var(--tw-gradient-from-position)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        glow: "glow 1s linear forwards",
        "fast-red-flash": "flash-red 600ms ease-in-out infinite",
        "slow-green-flash": "flash-green 2s ease-in-out infinite",
        "fast-flash-red-alliance":
          "flash-red-alliance 500ms ease-in-out infinite",
        "fast-flash-blue-alliance":
          "flash-blue-alliance 500ms ease-in-out infinite",
        "fast-flash-alliances":
          "flash-red-alliance 1s ease-in-out infinite, flash-blue-alliance 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
