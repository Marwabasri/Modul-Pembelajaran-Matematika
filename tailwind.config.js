/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],

  theme: {
    extend: {
      fontFamily:{
        Poppins: ['Poppins', 'sans'],
      },

      colors:{
        primary: '#ffa114',
        secondary: '#fef2c1',
        tertiary: '#95ccd5',
        quaternary: '#081F5C',
      },

      fontSize:{
        xxs: '0.5rem',
      }
    },
  },
  plugins: [],
}

