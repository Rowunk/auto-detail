/* .eslintrc.cjs ----------------------------------------------------------- */
module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: './tsconfig.json'
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'jsx-a11y'
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier'                 // ⬅ turn off style rules handled by Prettier
  ],
  settings: {
    react: { version: 'detect' },
    'import/resolver': { typescript: {} }
  },
  rules: {
    // --- tweak a few noisy or project‑specific rules -------------
    'react/react-in-jsx-scope': 'off',           // Not needed with React ≥17
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/consistent-type-imports': ['warn', {prefer: 'type-imports'}]
  }
};
