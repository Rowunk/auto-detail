// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:       'var(--primary)',
        'primary-dark': 'var(--primary-dark)'
      }
    }
  },
  plugins: []
};
