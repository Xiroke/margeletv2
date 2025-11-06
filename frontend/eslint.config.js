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
  globalIgnores(['src/shared/api/gererated/']),
  ...storybook.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  eslint.configs.recommended,

  // ✅ Добавляем готовые конфигурации stylistic
  stylistic.configs['disable-legacy'], // Отключает legacy-правила
  stylistic.configs.customize({
    indent: 2,
    jsx: true,
    quotes: 'single',
    semi: false,
  }),

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@stylistic': stylistic,
      perfectionist,
    },
    rules: {
      'import/no-cycle': 'off',
      ...perfectionist.configs['recommended-natural'].rules,
    },
  },

  {
    extends: [pluginReact.configs.flat.recommended],
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      globals: { React: 'readonly' },
    },
    plugins: {
      'pluginReact': fixupPluginRules(pluginReact),
      'react-hooks': fixupPluginRules(reactHooks),
    },
    rules: {
      // === TypeScript ===
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      'no-shadow': 'off',
      'no-undef': 'off',

      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',

      // кастыли
      'react/display-name': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      'react/no-array-index-key': 'off',
      'react/no-children-prop': 'off',
      'react/no-unstable-nested-components': 'warn',

      // === React ===
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'no-unused-vars': 'off',
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
  },
])
