// https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js#L5
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
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
      screens: {
        xl: '1280px',
        xxl: '1920px'
      },
      spacing: {
        '0.5': '0.125rem',
        '1.5': '0.375rem'
      },
      fontFamily: {
        sans: ['Work Sans', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    borderWidth: ['responsive', 'hover', 'focus', 'active']
  },
  plugins: []
};
