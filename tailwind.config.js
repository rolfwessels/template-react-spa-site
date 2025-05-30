/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7bca74',
          light: '#b5dbb2',
          dark: '#15202b',
        }
      }
    },
  },
  plugins: [],
} 