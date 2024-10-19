import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    // Babel это транспилятор js из одного стандарта в другой,
    // чтобы поддерживался код во всех браузерах
    const babelLoader = {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    // плагин для автогенерации translations после билда
                    // (в папке extractedTranslations)
                    ['i18next-extract', { locales: ['en', 'ru'], keyAsDefaultValue: true }],
                ],
            },
        },
    };

    const cssLoader = buildCssLoader(isDev);

    // Если не используем typescript, то нужен babel-loader (он умеет работать с jsx)
    // который берет новый стандарт js и билдит его в старый, чтобы во всех браузерах поддерживался
    const typescriptLoader = {
        // можно проверить определение регулярки (между //) на https://regex101.com/
        test: /\.tsx?$/, // находит соответствие ts и tsx
        use: 'ts-loader', // какой лоадер использовать
        exclude: /node_modules/, // исключение для обработки
    };

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [{ loader: 'file-loader' }],
    };

    // Порядок в массиве лоадеров имеет значение
    return [
        fileLoader,
        svgLoader,
        // babelLoader должен быть до typescriptLoader, иначе ошибка билда
        babelLoader,
        typescriptLoader,
        cssLoader,
    ];
}
