import defaultTheme from 'tailwindcss/defaultTheme';
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', ...defaultTheme.fontFamily.serif],
        bitter: ['Bitter', ...defaultTheme.fontFamily.serif],
        roboto: ['Roboto', ...defaultTheme.fontFamily.sans],
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
      },

      colors: {
        dark_blue: '#0C052F',
        white: '#FFFFFF',
        purple: '#914297',
        light_purple: '#3D3959',
        light_pruple_hover: '#c166c8',
        blue: '#009FE3',
        pink: '#B1A1FF',
        gray: '#AAAAAA',
        yellow: '#FFEE00',
        light_blue: '#009FE3',
      },

      padding: {
        general: '40px',
        general_desktop: '80px',
        general_two: '24px',
      },

      fontSize: {
        title: ['48px', '0.905'],
        title_two: '18px',
        title_three: ['24px', '1.4'],
        paragraph: ['16px', '1.6'],
      },
    },
  },
  plugins: [],
};
