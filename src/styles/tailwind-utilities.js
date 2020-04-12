const plugin = require('tailwindcss/plugin');

const displays = plugin(function({ addUtilities, config }) {
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
});

module.exports = [displays];
