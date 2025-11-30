import { fixupPluginRules } from '@eslint/compat'
import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import perfectionist from 'eslint-plugin-perfectionist'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import storybook from 'eslint-plugin-storybook'
import unusedImports from 'eslint-plugin-unused-imports'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist/', 'node_modules/', 'src/shared/api/generated/']),

  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...storybook.configs['flat/recommended'],
  pluginReact.configs.flat.recommended,

  stylistic.configs.customize({
    arrowParens: 'always',
    braceStyle: '1tbs',
    indent: 2,
    jsx: true,
    quotes: 'single',
    semi: false,
  }),

  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      perfectionist,
      'react-hooks': fixupPluginRules(reactHooks),
      'unused-imports': unusedImports,
    },
    rules: {
      // === Import Sorting (Perfectionist) ===
      'import/no-cycle': 'off',
      ...perfectionist.configs['recommended-natural'].rules,

      // === TypeScript ===
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-shadow': 'off',
      'no-undef': 'off',

      // === Unused Imports ===
      'no-unused-vars': 'off',
      'react-hooks/exhaustive-deps': 'warn',

      // === React Hooks ===
      'react-hooks/rules-of-hooks': 'error',
      // === React ===
      'react/display-name': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
      'react/no-array-index-key': 'off',
      'react/no-children-prop': 'off',
      'react/no-unstable-nested-components': 'warn',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',

      'react/require-default-props': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],

    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
])
