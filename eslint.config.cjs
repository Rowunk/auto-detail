/* eslint.config.cjs – ESLint v9+ flat config ----------------------------- */

const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const reactPlugin = require('eslint-plugin-react');
const hooksPlugin = require('eslint-plugin-react-hooks');
const a11yPlugin = require('eslint-plugin-jsx-a11y');
const prettierPlugin = require('eslint-config-prettier');
const globals = require('globals');

module.exports = [
    {
        /* Lint all TS / TSX files (adjust patterns if you have JS files too) */
        files: ['**/*.ts', '**/*.tsx'],

        /* --------------------- language / parser -------------------------- */
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
                project: './tsconfig.json'
            },
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },

        /* --------------------- plugins & shared configs ------------------ */
        plugins: {
            '@typescript-eslint': tsPlugin,
            react: reactPlugin,
            'react-hooks': hooksPlugin,
            'jsx-a11y': a11yPlugin
        },
        // flat config doesn’t have “extends”; instead we merge configs
        ...prettierPlugin,               // ⬅ turns off formatting rules

        /* ------------------------- rules tweaks -------------------------- */
        rules: {
            'react/react-in-jsx-scope': 'off', // React ≥ 17
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/consistent-type-imports': [
                'warn',
                { prefer: 'type-imports' }
            ]
        }
    }
];
