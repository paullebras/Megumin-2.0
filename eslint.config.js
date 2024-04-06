const js = require('@eslint/js');
const eslintConfigPrettier = require('eslint-config-prettier');
const globals = require('globals');

const config = [
  js.configs.recommended,
  eslintConfigPrettier,

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        myCustomGlobal: 'readonly',
      },
    },
  },
  {
    rules: {
      'handle-callback-err': 'off',
      'max-depth': ['error', { max: 3 }],
      'max-nested-callbacks': ['error', { max: 4 }],
      'no-empty-function': 'error',
      'no-lonely-if': 'error',
      'no-shadow': ['error', { allow: ['err', 'resolve', 'reject'] }],
      'no-var': 'error',
      'prefer-const': 'error',
      yoda: 'error',
    },
  },
];

module.exports = config;
