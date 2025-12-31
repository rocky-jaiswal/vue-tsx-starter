/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{vue,tsx,ts}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)'
      }
    },
  },
  plugins: [],
}
