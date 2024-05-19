/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        'scrollbar-thin': {
          scrollbarWidth: 'thin',
          scrollbarcolor: '#FF8080',
        },
        '.scrollbar-webkit': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'white',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#FF8080',
            borderRadius: '20px',
            border: '1px solid white',
          },
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}