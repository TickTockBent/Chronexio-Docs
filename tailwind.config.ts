import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066ff',
          dark: '#0052cc',
          light: '#3385ff',
        },
        success: {
          DEFAULT: '#00ff88',
          dark: '#00cc6a',
          light: '#33ffa3',
        },
        warning: {
          DEFAULT: '#ffaa00',
          dark: '#cc8800',
          light: '#ffbb33',
        },
        error: {
          DEFAULT: '#ff3366',
          dark: '#cc2952',
          light: '#ff5c85',
        },
        dark: {
          bg: '#0a0a0f',
          surface: '#1a1a1f',
          border: '#2a2a2f',
        },
        gray: {
          code: '#1e293b',
          slate: '#64748b',
          light: '#e2e8f0',
        },
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        code: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      fontSize: {
        'hero': ['48px', '56px'],
        'h2': ['36px', '44px'],
        'h3': ['28px', '36px'],
        'body-lg': ['18px', '28px'],
        'body': ['16px', '24px'],
        'caption': ['12px', '16px'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config