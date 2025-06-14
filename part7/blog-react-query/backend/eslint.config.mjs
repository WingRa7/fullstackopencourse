import globals from 'globals'
import js from '@eslint/js'
import pluginPrettierConfig from 'eslint-plugin-prettier/recommended'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  js.configs.recommended,

  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
    rules: {
      eqeqeq: 'error',
      'no-console': 'off',
    },
  },
  {
    ignores: ['dist/**'],
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  pluginPrettierConfig,
]
