import webpack from 'webpack';

import { BuildOptions } from './types/config';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(
    options: BuildOptions,
): webpack.Configuration {
    const { mode, paths, isDev } = options;

    return {
        mode,
        entry: paths?.entry,
        output: {
            // браузер кеширует файлы по названию и может использовать
            // старые бандлы, поэтому добавляем генерацию уникальных постфиксов
            filename: '[name].[contenthash].js',
            path: paths?.build,
            clean: true, // для подчищения папки build при каждой сборке
        },
        plugins: buildPlugins(options),
        module: {
            // loaders
            // Тут обработка всех файлов, кроме js
            // Т.е. css, sass, html, ts, png, jpg, svg, ...
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        // добавляет коммент в сборку о карте стектрейса,
        // чтобы выявлять местонахождение ошибки из исходников
        devtool: isDev ? 'inline-source-map' : undefined,
        // сервер разработки, который ребилдит сборку и отображает изменения в браузере
        devServer: isDev ? buildDevServer(options) : undefined,
    };
}
