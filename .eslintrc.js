module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        indent: 'off',
        '@typescript-eslint/indent': ['error', 2],
        quotes: 'off',
        '@typescript-eslint/quotes': ['error', 'single'],
        semi: 'off',
        '@typescript-eslint/semi': ['error'],
    }
}
