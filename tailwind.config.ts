import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
      fontFamily: {
        sans: ['var(--font-merriweather)', 'var(--font-outfit)', 'system-ui'],
        display: ['var(--font-merriweather)', 'var(--font-outfit)', 'serif'],
        outfit: ['var(--font-outfit)'],
        merriweather: ['var(--font-merriweather)'],
        playfair: ['var(--font-playfair)'],
      },
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
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        "gradient-x": {
          '0%, 100%': { backgroundPosition: '200% 0' },
          '50%': { backgroundPosition: '0 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        "pulse-slow": {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.6' }
        },
        beam: {
          '0%, 100%': { backgroundPosition: '200% 200%' },
          '50%': { backgroundPosition: '-200% -200%' }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin-slow 20s linear infinite",
        gradient: 'gradient 3s ease infinite',
        "gradient-x": 'gradient-x 15s linear infinite',
        "float": 'float 6s ease-in-out infinite',
        "float-delayed": 'float 6s ease-in-out infinite 3s',
        "shimmer": 'shimmer 8s linear infinite',
        "pulse": 'pulse-slow 8s ease-in-out infinite',
        "pulse-delay-1": 'pulse-slow 8s ease-in-out infinite 2s',
        "pulse-delay-2": 'pulse-slow 8s ease-in-out infinite 4s',
        "beam": 'beam 8s linear infinite'
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config