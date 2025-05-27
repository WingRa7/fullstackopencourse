import js from '@eslint/js'
import globals from 'globals'
import React from 'eslint-plugin-react'
import ReactHooks from 'eslint-plugin-react-hooks'
import ReactRefresh from 'eslint-plugin-react-refresh'
import jestPlugin from 'eslint-plugin-jest'


export default [
  { ignores: ['dist', 'node_modules', '.eslint.config.js', 'vite.config.js'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: { ...globals.browser, ...globals.jest },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react: React,
      'react-hooks': ReactHooks,
      'react-refresh': ReactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...React.configs.recommended.rules,
      ...React.configs['jsx-runtime'].rules,
      ...ReactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',

      'indent': ['error', 2, { 'SwitchCase': 1 }],
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
    files: ['**/__tests__/**/*.{js,ts,jsx,tsx}', '**/*.{test,spec}.{js,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
]
