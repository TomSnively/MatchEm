/* istanbul ignore file */
module.exports = {
  env: {
    'jest/globals': true,
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'jest',
    'react',
  ],
  rules: {
    'import/no-extraneous-dependencies': [
      'error', {
        devDependencies: [
          '**/*.spec.js',
          '**/*.spec.jsx',
          'src/setuptests.js',
        ],
      },
    ],
  },
};
