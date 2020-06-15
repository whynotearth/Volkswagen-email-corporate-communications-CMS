// https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js#L5
const defaultTheme = require('tailwindcss/defaultTheme');
const { colors } = require('tailwindcss/defaultTheme');
const customUtils = require('./src/styles/tailwind-utilities');

module.exports = {
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '928px'
    },
    extend: {
      container: { padding: '1.5rem', center: true },
      cursor: {
        inherit: 'inherit'
      },
      colors: {
        inherit: 'inherit',
        blue: {
          ...colors.blue,
          '500': '#008ec6',
          '900': '#002F62'
        },
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
        answers: '#EDEDED',
        divider: 'rgba(0,0,0,0.12)'
      },
      spacing: {
        '0.5': '0.125rem',
        '1.5': '0.375rem',
        '14': '3.5rem'
      },
      borderWidth: {
        default: '1px',
        '0': '0',
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '8': '8px'
      },
      borderRadius: {
        xlg: '12px'
      },
      fontFamily: {
        sans: ['Work Sans', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        '2xs': '0.5625rem', // 9
        xs: '0.75rem', // 12
        sm: '0.875rem', // 14
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
      zIndex: {
        '-1': '-1',
        '100': '100',
        '110': '110'
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
        '10': '2.5rem',
        // custom:
        '11': '1.181818'
      },
      scale: {
        '-1': '-1'
      },
      inset: {
        '1/2': '50%'
      },
      boxShadow: {
        '1dp': '0 1px 3px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.12), 0 0 2px rgba(0, 0, 0, 0.14)',
        '2dp': '0 1px 5px rgba(0, 0, 0, 0.2), 0 3px 4px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14)',
        '3dp': '0 1px 8px rgba(0, 0, 0, 0.2), 0 3px 4px rgba(0, 0, 0, 0.12), 0 3px 3px rgba(0, 0, 0, 0.14)',
        '4dp': '0 1px 10px rgba(0, 0, 0, 0.2), 0 4px 5px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14)',
        '6dp': '0 3px 5px rgba(0, 0, 0, 0.2), 0 1px 18px rgba(0, 0, 0, 0.12), 0 6px 10px rgba(0, 0, 0, 0.14)',
        '8dp': '0 4px 5px rgba(0, 0, 0, 0.2), 0 3px 14px rgba(0, 0, 0, 0.12), 0 8px 10px rgba(0, 0, 0, 0.14)',
        '9dp': '0 5px 6px rgba(0, 0, 0, 0.2), 0 3px 16px rgba(0, 0, 0, 0.12), 0 9px 12px rgba(0, 0, 0, 0.14)',
        '12dp': '0 7px 8px rgba(0, 0, 0, 0.2), 0 5px 22px rgba(0, 0, 0, 0.12), 0 12px 17px rgba(0, 0, 0, 0.14)',
        '16dp': '0 8px 10px rgba(0, 0, 0, 0.2), 0 6px 30px rgba(0, 0, 0, 0.12), 0 16px 24px rgba(0, 0, 0, 0.14)',
        '24dp': '0 11px 15px rgba(0, 0, 0, 0.2), 0 9px 46px rgba(0, 0, 0, 0.12), 0 24px 38px rgba(0, 0, 0, 0.14)',
        card: '0px 2px 4px rgba(0, 0, 0, 0.25)'
      },
      minHeight: {
        '104': '26rem'
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    borderWidth: ['responsive', 'hover', 'focus', 'active', 'last']
  },
  plugins: [...customUtils]
};
