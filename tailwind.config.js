// https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js#L5
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

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
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xxl: '1920px'
      },
      spacing: {
        '0.5': '0.125rem',
        '1.5': '0.375rem'
      },
      fontFamily: {
        sans: ['Work Sans', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.25rem',
        xl: '1.375rem',
        '2xl': '2rem',
        '3xl': '2.25rem',
        '4xl': '3rem',
        '5xl': '3.5rem',
        '6xl': '7rem'
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    borderWidth: ['responsive', 'hover', 'focus', 'active']
  },
  plugins: [
    plugin(function({ addUtilities, config }) {
      const newUtilities = {
        '.display-1': {
          fontSize: config('theme.fontSize.xl'),
          fontWeight: config('theme.fontWeight.semibold'),
          lineHeight: config('theme.lineHeight.10')
        }
      };

      addUtilities(newUtilities, {
        variants: ['responsive']
      });
    })
  ]
};
