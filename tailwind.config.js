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
      },
      fontFamily: {
        gothic: ['"UnifrakturMaguntia"', 'cursive'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
