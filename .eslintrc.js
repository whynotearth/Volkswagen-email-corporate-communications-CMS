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
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
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
