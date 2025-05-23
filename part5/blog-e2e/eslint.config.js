const js = require('@eslint/js')
const playwright = require('eslint-plugin-playwright')
const globals = require('globals')

module.exports = [
  {
    ignores: [
      'playwright-report',
      'test-results',
      'node_modules',
      'playwright.config.js',
      'eslint.config.js'
    ],
  },

  {
    files: ['**/*.js'],

    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'commonjs',
      },
    },

    rules: {
      ...js.configs.recommended.rules,

      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],

      'no-console': 'off',
      'no-unused-vars': 'warn',
    },
  },

  {
    files: ['tests/**/*.spec.js'],

    ...playwright.configs['flat/recommended'],

    languageOptions: {

      globals: {
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'commonjs',
      },
    },

    rules: {
    },
  },
]
