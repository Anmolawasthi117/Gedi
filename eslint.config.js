const eslint = require('@eslint/js');
const parser = require('@typescript-eslint/parser');

module.exports = [
  { ignores: ['node_modules/**', '.expo/**', 'dist/**'] },
  eslint.configs.recommended,
  { files: ['**/*.{js,jsx,ts,tsx}'], languageOptions: { parser, parserOptions: { ecmaFeatures: { jsx: true }, ecmaVersion: 'latest', sourceType: 'module' } }, rules: { 'no-undef': 'off', 'no-unused-vars': 'off' } },
  { files: ['scripts/**/*.cjs'], rules: { 'no-undef': 'off' } },
];
