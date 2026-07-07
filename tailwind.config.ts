import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        input: 'var(--color-input)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        muted: 'var(--text-muted)',
        purple: 'var(--purple)',
        white: 'rgb(var(--white) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        navy: 'rgb(var(--navy) / <alpha-value>)',
        'navy-mid': 'rgb(var(--navy-mid) / <alpha-value>)',
        rule: 'var(--rule)',
        'section-gutter': 'var(--section-gutter)',
        'brand-blue': 'rgb(var(--brand-blue) / <alpha-value>)',
        'brand-blue-light': 'rgb(var(--brand-blue-light) / <alpha-value>)',
        'near-black': 'rgb(var(--near-black) / <alpha-value>)',
        'hero-near-black': 'rgb(var(--hero-near-black) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '0.25': '0.0625rem',
      },
    },
  },
  plugins: [],
};

export default config;
