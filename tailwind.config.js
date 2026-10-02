/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          600: "#2a2e39",
          700: "#1e222b",
          800: "#161920",
          900: "#0f1115",
          950: "#090a0d",
        },
        sand: {
          50: "#fdfbf7",
          100: "#f7f4ed",
          300: "#e0d9cc",
          400: "#c7bfae",
          500: "#a89f8c",
          600: "#807767",
        },
        accent: {
          DEFAULT: "#d97706",
          light: "#f59e0b",
          gold: "#eab308",
        },
      },
      fontFamily: {
        body: ["'DM Sans'", "sans-serif"],
        heading: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
}