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
          "success-content": "#195766",
          "warning": "#FBD178",
          "error": "#EF7158",
          'fontFamily': "Lexend, sans-serif",
        },
        'dark-theme': {
          "primary": '#F1F0E8',
          "secondary": "#63A3B2",
          "accent": "#63A3B2",
          "neutral": "#F1F0E8",
          "base-100": "#111111",
          "info": "#1e1d1d",
          "success": "#7fc9da",
          "success-content": "#22768a",
          "warning": "#FBD178",
          "error": "#EF7158",
          'fontFamily': "Lexend, sans-serif",
        },
      },],
  },

}
