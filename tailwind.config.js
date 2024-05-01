/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./layout.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "demos/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f9f7fd",
          100: "#f0ecfb",
          200: "#e3dcf8",
          300: "#cdc0f2",
          400: "#af97e9",
          500: "#8f6ede",
          600: "#7850cd",
          700: "#633db3",
          800: "#5d3ba0",
          900: "#472d76",
          950: "#2c1655",
        },
      },
    },
  },
  plugins: [],
};
