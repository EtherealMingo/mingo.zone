/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  // prefix: 'mw-',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: '2rem'
    },
    screens: {
      'sm': { 'min': '640px', 'max': '767px' },
      'md': { 'min': '768px', 'max': '1536px' },
      'lg': { 'min': '1536px' },
    },
    extend: {}
  },
  plugins: []
}
