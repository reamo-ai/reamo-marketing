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
        white: 'var(--white)',
        ink: 'var(--ink)',
        navy: 'var(--navy)',
        'navy-mid': 'var(--navy-mid)',
        rule: 'var(--rule)',
        'section-gutter': 'var(--section-gutter)',
        'brand-blue': 'var(--brand-blue)',
        'brand-blue-light': 'var(--brand-blue-light)',
        'near-black': 'var(--near-black)',
        'hero-near-black': 'var(--hero-near-black)',
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
