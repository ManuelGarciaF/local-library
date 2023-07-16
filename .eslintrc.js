module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'off',
    'no-console': 'off',
    'func-names': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
  },
};
