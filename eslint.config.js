import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  { ignores: ['dist', 'dev-dist', 'coverage', 'node_modules'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    },
  },
  {
    // Arquivos que combinam componentes e utilitários por desenho (router,
    // providers, constantes de UI). O Fast Refresh aceita esse padrão.
    files: [
      'src/app/router/**/*.tsx',
      'src/app/providers/**/*.tsx',
      'src/components/ui/Badge.tsx',
      'src/components/ui/Toast.tsx',
    ],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
  {
    files: ['**/*.{test,spec}.{ts,tsx}', 'src/test/**/*.ts'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: { 'no-console': 'off' },
  },
);
