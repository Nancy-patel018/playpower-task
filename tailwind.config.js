/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        airbnb: {
          red: '#FF385C',
          'red-hover': '#E00B41',
          'red-dark': '#D70466',
          charcoal: '#222222',
          gray: {
            50: '#F7F7F7',
            100: '#EBEBEB',
            200: '#DDDDDD',
            300: '#B0B0B0',
            400: '#717171',
            500: '#5E5E5E',
          },
        },
      },
      fontFamily: {
        sans: [
          'Circular',
          '-apple-system',
          'BlinkMacSystemFont',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      boxShadow: {
        'card': '0 6px 16px rgba(0, 0, 0, 0.12)',
        'pill': '0 1px 2px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)',
        'pill-hover': '0 2px 4px rgba(0, 0, 0, 0.18)',
        'modal': '0 8px 28px rgba(0, 0, 0, 0.28)',
        'nav': '0 1px 2px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        'airbnb': '12px',
        'airbnb-lg': '16px',
        'airbnb-xl': '24px',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s cubic-bezier(0, 0, 0.2, 1)',
        'slide-up': 'slideUp 0.3s cubic-bezier(0, 0, 0.2, 1)',
        'heart-bounce': 'heartBounce 0.4s cubic-bezier(0.17, 0.89, 0.32, 1.49)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        heartBounce: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
