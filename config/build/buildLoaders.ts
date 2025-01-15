import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCssLoader } from './loaders/buildCssLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    // Babel это транспилятор js из одного стандарта в другой,
    // чтобы поддерживался код во всех браузерах
    const babelLoader = buildBabelLoader(options);
    const cssLoader = buildCssLoader(options);

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
