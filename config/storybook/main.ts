import { Configuration, DefinePlugin, RuleSetRule } from 'webpack';
import { type StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

const storybookConfig: StorybookConfig = {
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    staticDirs: ['../../public'],
    stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],

    addons: [
        '@storybook/addon-links',
        '@storybook/addon-themes',
        {
            name: '@storybook/addon-essentials',
            options: {
                backgrounds: false,
            },
        },
        '@storybook/addon-interactions',
        '@storybook/addon-docs',
        'storybook-addon-themes',
    ],

    typescript: {
        check: false, // optional
        reactDocgen: false,
    },

    babel: async (options: any) => ({
        ...options,
        presets: [...(options.presets || []), '@babel/preset-typescript'],
    }),

    webpackFinal: async (config: Configuration) => {
        const paths = {
            build: '',
            html: '',
            entry: '',
            src: path.resolve(__dirname, '..', '..', 'src'),
            // Тут локали особо не нужны, т.к. в качестве переводов используются ключи на русском
            // TODO - Но если использовать английские ключи и перевод, то тут стоит указать путь до папки public
            locales: '',
            buildLocales: '',
        };
        config!.resolve!.modules!.push(paths.src);
        config!.resolve!.extensions!.push('.ts', '.tsx');
        config!.resolve!.alias = {
            ...config!.resolve!.alias,
            '@': paths.src,
        };

        config!.module!.rules = config!.module!.rules!.map(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (rule: RuleSetRule) => {
                if (/svg/.test(rule.test as string)) {
                    return { ...rule, exclude: /\.svg$/i };
                }

                return rule;
            },
        );

        config!.module!.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        config!.module!.rules.push(buildCssLoader({ isDev: true }));

        config!.module!.rules.push({
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-typescript',
                        [
                            '@babel/preset-react',
                            {
                                runtime: 'automatic',
                            },
                        ],
                    ],
                },
            },
        });

        config!.plugins!.push(
            new DefinePlugin({
                __IS_DEV__: JSON.stringify(true),
                __API__: JSON.stringify('https://testapi.ru'),
                __PROJECT__: JSON.stringify('storybook'),
            }),
        );

        return config;
    },
};

export default storybookConfig;
