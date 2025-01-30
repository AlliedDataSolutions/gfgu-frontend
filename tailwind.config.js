/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        brand: {
          50: "#EAF2E9",
          100: "#E0EBDF",
          200: "#BED5BC",
          300: "#2D7827",
          400: "#296C23",
          500: "#24601F", // Base color
          600: "#24601F",
          700: "#1B4817",
          800: "#143612",
          900: "#102A0E",
        },
        rose: {
          50: "#FFF1F2",
          400: "#FB7185",
          500: "#E11D48",
          600: "#E11D48",
        },
        green: {
          100: "#C0D4D2",
          400: "#35736E",
          600: "#306863",
        },
        teal: {
          50: "#EFFAC5",
          400: "#CAEF45",
          600: "#B6D73E",
        },
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
}

