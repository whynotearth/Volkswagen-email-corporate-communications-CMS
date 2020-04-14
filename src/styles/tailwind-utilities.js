// https://www.tailwindcss.cn/docs/plugins/
// https://web-crunch.com/posts/how-to-extend-tailwind-css

const plugin = require('tailwindcss/plugin');

const textUtilsPlugin = plugin(function({ addUtilities, theme, variants }) {
  const textUtils = {
    '.display-4': {
      fontSize: theme('fontSize.7xl'),
      fontWeight: theme('fontWeight.normal'),
      lineHeight: '112px',
      color: 'rgba(0,0,0,0.87)'
    },
    '.display-3': {
      fontSize: theme('fontSize.6xl'),
      fontWeight: theme('fontWeight.normal'),
      lineHeight: '48px',
      color: 'rgba(0,0,0,0.87)'
    },
    '.display-2': {
      fontSize: theme('fontSize.5xl'),
      fontWeight: theme('fontWeight.normal'),
      lineHeight: '40px',
      color: 'rgba(0,0,0,0.87)'
    },
    '.display-1': {
      fontSize: theme('fontSize.xl'),
      fontWeight: theme('fontWeight.semibold'),
      lineHeight: '40px',
      color: 'rgba(0,0,0,0.87)'
    },

    '.headline': {
      fontSize: theme('fontSize.3xl'),
      fontWeight: theme('fontWeight.bold'),
      lineHeight: '38px'
      // color: 'rgba(0,0,0,0.87)'
    },
    '.title': {
      fontSize: theme('fontSize.xl'),
      fontWeight: theme('fontWeight.semibold'),
      lineHeight: '26px',
      color: 'rgba(0,0,0,0.87)'
    },
    '.subheader': {
      fontSize: theme('fontSize.xl'),
      fontWeight: theme('fontWeight.medium'),
      lineHeight: '25px',
      color: 'rgba(0,0,0,0.87)'
    },
    '.body-2': {
      fontSize: theme('fontSize.xl'),
      fontWeight: theme('fontWeight.medium'),
      lineHeight: '24px',
      color: 'rgba(0,0,0,0.87)'
    },
    '.body-1': {
      fontSize: theme('fontSize.xl'),
      fontWeight: theme('fontWeight.normal'),
      lineHeight: '20px',
      color: 'rgba(0,0,0,0.87)'
    },
    '.body-1-mobile': {
      fontSize: theme('fontSize.base'),
      fontWeight: theme('fontWeight.normal'),
      lineHeight: '20px',
      color: 'rgba(0,0,0,0.84)'
    },
    '.caption': {
      fontSize: theme('fontSize.xl'),
      fontWeight: theme('fontWeight.normal'),
      lineHeight: '16px',
      color: 'rgba(0,0,0,0.54)'
    }
  };

  const backgroundUtils = {
    '.bg-brand-gradient': {
      background: `radial-gradient(50% 49.2% at 0% 0.8%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 100%), ${theme(
        'colors.primary'
      )}`
    }
  };

  addUtilities(textUtils, variants('responsive'));
  addUtilities(backgroundUtils);
});

module.exports = [textUtilsPlugin];
