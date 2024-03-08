/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {
      fontFamily: {
        'lexend': ['Lexend', 'sans'],
        jost: ['Jost', 'sans'],
      },
      fontSize: {
        header: '5rem',
        subheader: '3rem',
        'main-but': '1.5rem'
      },
      fontWeight: {
        title: '600',
        'main-but': '400',
      },
      width: {
        '50': '3.125rem',
        '326': '20.375rem',
        '360': '22.5rem',
      },
      height: {
        '70': '4.375rem',
      },
    
    },
  },
  plugins: [],
}

