/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colorPrimary: '#3a8edc',
        colorSecondary: '#39668a',
        colorTertiary: '#63A0D6',
        lightBackground: '#F8F8F8',
        infoLabel: '#d4e8ff',
        warningLabel: '#faab5b',
        dangerLabel: '#f96b54',
      },
      fontFamily: {
        sans: ['Frutiger', 'sans-serif']
      },
    },
  },
  plugins: [],
}

