module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'implicit-arrow-linebreak': 0,
        'import/extensions': 0,
        'import/no-unresolved': 0,
        'import/prefer-default-export': 0,
        indent: 'off',
        'max-len': ['error', { code: 120 }],
        'no-use-before-define': 0,
        'no-shadow': 'off',
        'operator-linebreak': 0,
        'sort-keys': ['error', 'asc', { caseSensitive: true, minKeys: 2, natural: false }],
    },
};
