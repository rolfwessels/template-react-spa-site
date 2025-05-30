/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          
          light: '#b5dbb2',
          dark: '#15202b',
        }
      }
    },
  },
  plugins: [],
} 