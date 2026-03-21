/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        burgundy: '#754247',
        coral:    '#DC6567',
        cream:    '#F9EBDB',
        beige:    '#E8DBC9',
        mint:     '#BCE2D3',
        dark:     '#2D1F21',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"Inter"', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '6': '48px',
        '8': '64px',
        '12': '96px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
