/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        primary : "#fea928",
        secondary: "#ed8900",

      },
      container:{
        center: true,
        padding: {
          default: "1rem",
          sm: "3rem",
        }
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

