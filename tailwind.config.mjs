/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        sage: {
          50:  '#f2f7f4',
          100: '#e0ece4',
          200: '#bfd9c9',
          300: '#92bfa6',
          400: '#5f9e7e',
          500: '#3d8063',
          600: '#2d654e',
          700: '#255140',
          800: '#204135',
          900: '#1b362c',
        },
        cream: {
          50:  '#fdfcf8',
          100: '#f9f5ed',
          200: '#f2ebda',
          300: '#e8dcc2',
          400: '#d9c89e',
        },
        bark: {
          500: '#8b5e3c',
          600: '#70492d',
          700: '#59391f',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
};
