/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*html"],
  theme:  {
    screens: {
      'tab': '640px',
      // => @media (min-width: 640px) { ... }

      'lap': '1024px',
      // => @media (min-width: 1024px) { ... }
    },
  },
  plugins: [],
}
