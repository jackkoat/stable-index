/** @type {import('tailwindcss').Config} */
module.exports = {
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
        // Stable Index Professional Color System
        stable: {
          navy: {
            50: '#f0f4f8',
            100: '#d9e6f2',
            200: '#b3cde4',
            300: '#8fb3d6',
            400: '#6b9cc8',
            500: '#4a7fba',
            600: '#3a6499',
            700: '#2d4d78',
            800: '#1f3557',
            900: '#111e36',
          }
        },
        // Professional Color Palette
        'accent-navy': '#1e3a8a',
        'accent-navy-light': '#3b82f6',
        'accent-navy-dark': '#1e40af',
        
        // Surface Colors
        'surface-primary': '#ffffff',
        'surface-secondary': '#f8fafc',
        'surface-tertiary': '#f1f5f9',
        'surface-border': '#e2e8f0',
        
        // Text Colors
        'text-primary': '#0f172a',
        'text-secondary': '#475569',
        'text-muted': '#64748b',
        'text-dim': '#94a3b8',
        
        // Risk Level Colors
        'risk-low': '#22c55e',
        'risk-low-base': '#16a34a',
        'risk-moderate': '#eab308',
        'risk-moderate-base': '#ca8a04',
        'risk-high': '#f97316',
        'risk-high-base': '#ea580c',
        'risk-critical': '#ef4444',
        'risk-critical-base': '#dc2626'
      },
      fontSize: {
        // Typography Scale - Professional
        'micro': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.02em' }],
        'caption': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0.005em' }],
        'body-xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '0' }],
        'heading-sm': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'heading-md': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-lg': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'heading-xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading-2xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }]
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}