import * as js from '@eslint/js';
import * as ts from 'typescript-eslint';
import * as jsxA11y from 'eslint-plugin-jsx-a11y';
import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import * as pluginImportX from 'eslint-plugin-import-x';
import reactPlugin from 'eslint-plugin-react';
import i18nextPlugin from 'eslint-plugin-i18next';
import storybookPlugin from 'eslint-plugin-storybook';
import * as reactHooksPlugin from 'eslint-plugin-react-hooks';
import alexeyPlugin from 'eslint-plugin-alexey4717-plugin';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default [
    js.default.configs.recommended,
    ...ts.configs.recommended,
    pluginImportX.flatConfigs.recommended,
    pluginImportX.flatConfigs.typescript,
    jsxA11y.default.flatConfigs.recommended,

    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                __IS_DEV__: 'readonly',
                __API__: 'readonly',
                __PROJECT__: 'readonly',
            },
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        plugins: {
            react: reactPlugin,
            i18next: i18nextPlugin,
            storybook: storybookPlugin,
            'react-hooks': reactHooksPlugin,
            'alexey4717-plugin': alexeyPlugin,
            'unused-imports': unusedImportsPlugin,
            typescriptEslint,
        },

        rules: {
            'unused-imports/no-unused-imports': 'error',
            'import-x/no-unresolved': 'warn',
            'react/jsx-filename-extension': [
                'error',
                { extensions: ['.js', '.jsx', '.tsx'] },
            ],
            'import/no-unresolved': 'off',
            'import/prefer-default-export': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'react/require-default-props': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-props-no-spreading': 'warn',
            'react/function-component-definition': 'off',
            'no-shadow': 'off',
            'import/extensions': 'off',
            'import/no-extraneous-dependencies': 'off',
            'no-underscore-dangle': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            'i18next/no-literal-string': [
                'error',
                {
                    markupOnly: true,
                    ignoreAttribute: [
                        'as',
                        'role',
                        'data-testid',
                        'to',
                        'target',
                        'justify',
                        'align',
                        'border',
                        'direction',
                        'gap',
                        'fallback',
                        'feature',
                        'color',
                        'variant',
                        'size',
                        'wrap',
                    ],
                },
            ],
            'jsx-a11y/no-static-element-interactions': 'off',
            'jsx-a11y/click-events-have-key-events': 'off',
            'no-param-reassign': 'off', // отключаем для ImmerJs в redux-toolkit
            'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
            'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
            'lines-between-class-members': 'off',
            'no-undef': 'off',
            'react/no-array-index-key': 'off',
            'arrow-body-style': 'off',
            'alexey4717-plugin/path-checker': ['error', { alias: '@' }],
            'alexey4717-plugin/layer-imports': [
                'error',
                {
                    alias: '@',
                    ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
                },
            ],
            'alexey4717-plugin/public-api-imports': [
                'error',
                {
                    alias: '@',
                    testFilesPatterns: [
                        '**/*.test.*',
                        '**/*.story.*',
                        '**/StoreDecorator.tsx',
                    ],
                },
            ],
            'react/jsx-max-props-per-line': ['error', { maximum: 4 }], // Правило для выравнивания тут, более гибкое чем у prettier
            'react/no-unstable-nested-components': 'warn',
        },
    },

    // storybook
    {
        files: ['**/*.stories.@(ts|tsx|js|jsx)'],
        plugins: {
            storybook: storybookPlugin,
        },
        rules: {
            // можно кастомизировать отдельно
            'max-len': 'off', // Отключаем правило для файлов .stories
        },
    },

    // overrides для тестов и storybook
    {
        files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
        rules: {
            'i18next/no-literal-string': 'off',
            'max-len': 'off',
        },
    },

    // prettier как последний слой, чтобы отключить конфликтующие правила от предыдущих конфигов
    eslintConfigPrettier,
];
