// https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js#L5
const defaultTheme = require('tailwindcss/defaultTheme');
const customUtilities = require('./src/styles/tailwind-utilities');

module.exports = {
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '928px'
    },
    extend: {
      container: { padding: '1.5rem', center: true },
      colors: {
        primary: '#011D51',
        secondary: '#03B3F9',
        background: '#FFFFFF',
        surface: '#FFFFFF',
        error: '#FF5959',
        priority: '#D84E4E',
        events: '#FFBA03',
        plant: '#8894A0',
        community: '#52AE31',
        people: '#01B1EC',
        oneteam: '#D9EFFF',
        answers: '#EDEDED'
      },
      spacing: {
        '0.5': '0.125rem',
        '1.5': '0.375rem'
      },
      fontFamily: {
        sans: ['Work Sans', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        xs: '0.75rem', // 12
        sm: '0.875rem', // 16
        base: '1rem', // 16
        lg: '1.25rem', // 20
        xl: '1.375rem', // 22
        '2xl': '1.5rem', // 24
        '3xl': '2rem', // 32
        '4xl': '2.25rem', // 36
        '5xl': '3rem', // 48
        '6xl': '3.5rem', // 56
        '7xl': '7rem' // 112
      },
      lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
        '3': '.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem'
      },
      scale: {
        '-1': '-1'
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    borderWidth: ['responsive', 'hover', 'focus', 'active']
  },
  plugins: [...customUtilities]
};
