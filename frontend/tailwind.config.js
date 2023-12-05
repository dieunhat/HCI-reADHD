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
          "primary": "#695E5A",
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
          "primary": '#8D7E76',
          "secondary": "#63A3B2",
          "accent": "#63A3B2",
          "neutral": "#FBFBFB",
          "base-100": "#2B2B2B",
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
