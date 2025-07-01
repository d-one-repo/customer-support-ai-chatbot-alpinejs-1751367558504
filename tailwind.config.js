/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          gray: '#f5f5f7',
          darkgray: '#333333',
          blue: '#0071e3',
        }
      },
    },
  },
  plugins: [],
}