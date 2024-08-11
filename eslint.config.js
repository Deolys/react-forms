import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier],
  files: ['**/*.{ts,tsx}'],
  ignores: ['dist'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    react,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    'react-compiler': reactCompiler,
    prettier: eslintPluginPrettier,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
    'react-compiler/react-compiler': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
});
