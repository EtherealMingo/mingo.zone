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
      'md': { 'min': '768px', 'max': '1023px' },
      'lg': { 'min': '1024px', 'max': '1279px' },
      'xl': { 'min': '1280px', 'max': '1535px' },
      '2xl': { 'min': '1536px' },
    },
    extend: {}
  },
  plugins: []
}
