import { FlatCompat } from '@eslint/eslintrc';
import unusedImports from 'eslint-plugin-unused-imports';
import { dirname } from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  ...tseslint.configs.recommended,
  {
    plugins: {
      'unused-imports': unusedImports,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'unused-imports/no-unused-imports': 'warn',
      'no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          vars: 'all',
          argsIgnorePattern: '^_', // Ignore args starting with _
          varsIgnorePattern: '^_', // Ignore variables starting with _
          caughtErrorsIgnorePattern: '^_', // Ignore caught errors starting with _
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          vars: 'all',
          argsIgnorePattern: '^_', // Ignore args starting with _
          varsIgnorePattern: '^_', // Ignore variables starting with _
          caughtErrorsIgnorePattern: '^_', // Ignore caught errors starting with _
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    ignores: [
      'dist',
      'node_modules',
      '.next',
      '*.config.js',
      '*.config.mjs',
      'src/stories/**/*.ts',
      'src/stories/**/*.tsx',
      'src/app/api/auth/**/*.ts',
      'api-contract',
    ],
  },
];

export default eslintConfig;
