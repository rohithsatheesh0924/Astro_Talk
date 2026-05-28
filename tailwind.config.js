/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Add Montserrat font family
      },
      colors: {
        redCustom: '#ff1f3d', // Or add your custom reds if needed
      },
    },
  },
  plugins: [],
}
