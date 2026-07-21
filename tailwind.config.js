/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5170ff',
        'primary-light': '#eef1ff',
        'dark-warm': '#525157',
        dark: '#1a1a24',
        muted: '#9090a0',
        cream: '#faf4f1',
        surface: '#fdfaf9',
        'badge-cream': '#fbeee8',
        community: '#fff4f2',
        accent: {
          yellow: '#f4c841',
          purple: '#8b5cf6',
          orange: '#f5a623',
          coral: '#ff6366',
          pink: '#d9547a',
        },
        success: '#22c55e',
        error: '#ef4444',
      },
      fontFamily: {
        serif: ['"Bodoni Moda"', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'hero-fade': {
          '0%': { opacity: '0', transform: 'scale(1.03)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'heart-bump': {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.3)' },
          '40%': { transform: 'scale(0.9)' },
          '60%': { transform: 'scale(1.15)' },
          '80%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'hero-fade': 'hero-fade 0.5s ease-out forwards',
        'heart-bump': 'heart-bump 2.4s ease-in-out infinite',
      },
      boxShadow: {
        card: '0px 4px 20px 0px rgba(0,0,0,0.07)',
        hero: '0px 24px 44px -22px rgba(50,20,15,0.55)',
        pill: '0px 4px 20px 0px rgba(0,0,0,0.08)',
        review: '0px 2px 6px rgba(0,0,0,0.05)',
        geo: '0px 4px 20px 0px rgba(50,40,30,0.08)',
        sheet: '0px 2px 12px 0px rgba(0,0,0,0.12)',
        chip: '0px 2px 8px 0px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        '4xl': '32px',
      },
    },
  },
  plugins: [],
};


