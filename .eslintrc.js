module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-unused-components': 'warn',
    indent: ['warn', 2],
    quotes: ['warn', 'single'],
    // TODO remove
    'no-useless-catch': 'off',
    // TODO remove
    'no-unused-vars': 'off',
    // TODO remove
    'no-empty': 'off',
    // TODO remove
    'getter-return': 'off'
  }
};
