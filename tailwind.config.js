/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'spa-teal': {
          light: '#5C9A9A',
          DEFAULT: '#2C6B6B',
          dark: '#1A4444',
        },
        'slate-grey': {
          light: '#B8BFCA',
          DEFAULT: '#6B7280',
          dark: '#4B5563',
        },
        'warm-cream': {
          light: '#FFFBF5',
          DEFAULT: '#F5F1E8',
          dark: '#E8E0D0',
        },
        'charcoal': {
          DEFAULT: '#2D3748',
          dark: '#1A202C',
        },
        'gold-leaf': {
          light: '#D4AF37',
          DEFAULT: '#C5A028',
          dark: '#9B7E1F',
        },
        'rose': {
          light: '#FDE8EC',
          DEFAULT: '#F9A8C0',
          dark: '#E75B8D',
        },
        'lavender': {
          light: '#F3E8FF',
          DEFAULT: '#D8B4FE',
          dark: '#A855F7',
        },
        'peach': {
          light: '#FFF0E6',
          DEFAULT: '#FFD4B8',
          dark: '#FF9A76',
        },
      },
      fontFamily: {
        sans: ['Quicksand', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        script: ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
}
