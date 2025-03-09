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
          50: "#EEFFEE",
          100: "#D7FFD8",
          200: "#B2FFB4",
          300: "#76FF7B",
          400: "#33F53C",
          500: "#09DE13", // Base color
          600: "#00B809",
          700: "#04910C",
          800: "#0A7110",
          900: "#0A5D10",
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
        yellow: {
          50: "#FAFDEC",
          400: "#F2D024",
          600: "#C99A2E",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
}

