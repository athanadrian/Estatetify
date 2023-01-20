/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    'bg-owner-100',
    'bg-owner-500',
    'bg-real-estater-100',
    'bg-real-estater-500',
    'bg-agent-100',
    'bg-agent-500',
    'bg-admin-100',
    'bg-admin-500',
    'hover:bg-owner-100',
    'hover:bg-owner-500',
    'hover:bg-real-estater-100',
    'hover:bg-real-estater-500',
    'hover:bg-agent-100',
    'hover:bg-agent-500',
    'hover:bg-admin-100',
    'hover:bg-admin-500',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5E8EA2',
        night: '#2D4E5A',
        dark: '#31515E',
        darker: '#1A3D4B',
        light: '#B9D5DE',
        owner: {
          100: '#d6d6d6',
          500: '#5E8EA2',
        },
        'real-estater': {
          100: '#ffedd5',
          500: '#ff6922',
        },
        agent: {
          100: '#a7efe0',
          500: '#0bb792',
        },
        admin: {
          100: '#a0def7',
          500: '#0086bd',
        },
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
