import astroParser from 'astro-eslint-parser';
import typescriptParser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';

export default [
  {
    files: ['*.astro'],
    parser: astroParser,
    parserOptions: {
      parser: typescriptParser,
      extraFileExtensions: ['.astro'],
    },
    plugins: {
      astro,
    },
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
  },
];
