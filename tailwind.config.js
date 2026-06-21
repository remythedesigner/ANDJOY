/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5170ff',
        'primary-light': '#eef1ff',
        'dark-warm': '#2b211c',
        dark: '#1a1a24',
        muted: '#9090a0',
        cream: '#faf4f1',
        'badge-cream': '#fbeee8',
        community: '#fff4f2',
        accent: {
          yellow: '#f4c841',
          purple: '#8b5cf6',
          orange: '#f5a623',
        },
      },
      fontFamily: {
        serif: ['"Bodoni Moda"', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        meta: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'hero-fade': {
          '0%': { opacity: '0', transform: 'scale(1.03)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'hero-fade': 'hero-fade 0.5s ease-out forwards',
      },
      boxShadow: {
        card: '0px 4px 20px 0px rgba(0,0,0,0.07)',
        hero: '0px 24px 44px -22px rgba(50,20,15,0.55)',
        pill: '0px 4px 20px 0px rgba(0,0,0,0.08)',
        review: '0px 2px 6px rgba(0,0,0,0.05)',
        geo: '0px 4px 20px 0px rgba(50,40,30,0.08)',
      },
    },
  },
  plugins: [],
};


