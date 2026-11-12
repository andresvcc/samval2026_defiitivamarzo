module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
      },
      colors: {
        samval: {
          guinda: '#801b1b',
          light: '#a62d2d',
          dark: '#5a1212',
          accent: '#d4a373',
        },
        neu: {
          base: '#e0d6cc',
          light: '#f0e8e0',
          dark: '#c4b8ac',
          surface: '#e4dacf',
        }
      },
      borderRadius: {
        'neu': '20px',
        'neu-lg': '28px',
        'neu-xl': '36px',
      }
    }
  }
};
