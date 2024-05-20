/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        'poppins': ["'Poppins'"],
      },

    },
  },
  corePlugins: {
    animation: true,
  },
  plugins: [],
}

