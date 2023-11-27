/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  darkMode: ["class", '[data-theme="dark-theme"]'],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        'light-theme': {
          "primary": "#504642",
          "secondary": "#EEE0C9",
          "accent": "#63A3B2",
          "neutral": "#0B0A0A",
          "base-100": "#FBFBFB",
          "info": "#F1F0E8",
          "success": "#63A3B2",
          "warning": "#FBD178",
          "error": "#EF7158",
        },
        'dark-theme': {
          "primary": "#8D7E76",
          "secondary": "#EEE0C9",
          "accent": "#2C6A79",
          "neutral": "#0B0A0A",
          "base-100": "#504642",
          "info": "#F1F0E8",
          "success": "#63A3B2",
          "warning": "#FBD178",
          "error": "#EF7158",
        },
      },],
  },

}
