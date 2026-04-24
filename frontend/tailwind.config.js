/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        oerGreen: '#27ae60',
        oerBlue: '#34495e',
      },
    },
  },
  plugins: [],
}