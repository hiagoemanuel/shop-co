import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'integral-cf': 'var(--font-integral-cf)',
      satoshi: 'var(--satoshi)',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        cyan: 'var(--cyan)',
        golden: 'var(--golden)',
        green: 'var(--green)',
        red: 'var(--red)',
      },
    },
  },
  plugins: [],
} satisfies Config
