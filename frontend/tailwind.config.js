/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blueDark: '#041562',
        blueMarin: '#11468F',
        redPush: '#DA1212',
        witheLight: '#DA1212',
        darkLight: '#191919',
        grayLight: '#EEEEEE',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
        Oswald: ['Oswald', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        adelia: ['ADELIA', 'cursive'],
      },
    },
    plugins: [],
  },
};
