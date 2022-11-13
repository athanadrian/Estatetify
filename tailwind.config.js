/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5E8EA2',
        night: '#2D4E5A',
        dark: '#31515E',
        darker: '#1A3D4B',
        light: '#B9D5DE',
      },
      screens: {
        xs: '300px',
        mobile: '400px',
        tablet: '640px',
        laptop: '1024px',
        desktop: '1280px',
      },
    },
  },
  plugins: [],
};
