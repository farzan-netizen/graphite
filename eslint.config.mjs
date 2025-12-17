import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettierConfig from 'eslint-plugin-prettier/recommended';
import unusedImports from "eslint-plugin-unused-imports";
import globals from 'globals'
import nextVitals from 'eslint-config-next/core-web-vitals'
import eslintNextPlugin from '@next/eslint-plugin-next'

export default defineConfig([
  ...nextVitals,
  globalIgnores([
    'dist',
    "node_modules",
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    "postcss.config.mjs",
  ]),
  reactHooks.configs.flat.recommended,
  {
    plugins: {
      "unused-imports": unusedImports,
      next: eslintNextPlugin,
    },
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      prettierConfig
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          "vars": "all",
          "varsIgnorePattern": "^_|.*Qql$|.*Gql$", // Explicitly match any chars before Qql/Gql
          "args": "after-used",
          "argsIgnorePattern": "^_",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "varsIgnorePattern": "^_|.*Qql$|.*Gql$", // Explicitly match any chars before Qql/Gql
          "argsIgnorePattern": "^_",
        },
      ],
    },
  },
])

