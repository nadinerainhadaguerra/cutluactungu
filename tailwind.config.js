/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        achtung: {
          green: '#4a7c3f',
          'green-dark': '#2d4a25',
          'green-darker': '#1e3318',
          'green-light': '#6d9e52',
          'green-muted': '#8aaa6a',
          parchment: '#e8dcc8',
          'parchment-dark': '#d4c5a9',
          'parchment-light': '#f0e8d8',
        },
        // Paleta da área Monstro da Semana
        mds: {
          50: '#f7f2fc',
          100: '#eee3f8',
          200: '#dcc6f0',
          300: '#c09ce3',
          400: '#a06fd2',
          500: '#8348bd',
          600: '#6d35a3',
          700: '#582a85',
          800: '#43206a',
          900: '#2c1549',
          950: '#1a0b2e',
        },
      },
      fontFamily: {
        gothic: ['"UnifrakturMaguntia"', 'cursive'],
        'mds-title': ['"Bebas Neue"', 'Impact', 'sans-serif'],
        'mds-serif': ['"Crimson Pro"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
