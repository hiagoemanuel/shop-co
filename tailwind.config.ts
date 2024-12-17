import type { Config } from 'tailwindcss'

export default {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	fontFamily: {
  		'integral-cf': 'var(--font-integral-cf)',
  		satoshi: 'var(--satoshi)'
  	},
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			cyan: 'var(--cyan)',
  			golden: 'var(--golden)',
  			green: 'var(--green)'
  		},
  		keyframes: {
  			'translate-to-left': {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(-100%)'
  				}
  			}
  		},
  		animation: {
  			'to-left': 'translate-to-left 10s linear infinite'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config
