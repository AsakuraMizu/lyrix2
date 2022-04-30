module.exports = {
  content: ['./index.html', './src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {},
  },

  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
};
