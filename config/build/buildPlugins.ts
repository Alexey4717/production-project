import {
    type WebpackPluginInstance,
    ProgressPlugin,
    DefinePlugin,
    HotModuleReplacementPlugin,
} from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CopyPlugin from 'copy-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BuildOptions } from './types/config';

export function buildPlugins({
    paths,
    isDev,
    apiUrl,
    project,
}: BuildOptions): WebpackPluginInstance[] {
    const isProd = !isDev;
    const plugins = [
        // вроде как порядок плагинов тут значения не имеет
        new HTMLWebpackPlugin({
            // файл будет использоваться как шаблон, чтобы в html из сборки
            // присутствовал div с id="root", иначе body будет пустой
            template: paths.html,
        }),
        new ProgressPlugin(), // отображение % сборки в терминале
        // нужен для того, чтобы в исходниках приложения прокидывать
        // глобальные переменные (например isDev)
        // для использования в коде, нужно в global.d.ts объявить константу с возвращаемым типом
        new DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
        // Для обнаружения кольцевой зависимости
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true, // При обнаружении кольцевой зависимости будет ошибка в консоли
        }) as unknown as WebpackPluginInstance, // TODO Вероятно несовместимость версий выбрасывает ошибку типов
        // Для выноса проверки типов в отдельный процесс при использовании babel-loader
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                mode: 'write-references',
            },
        }),
    ];
    // При prod сборке, этих плагинов в webpack сборке не будет
    if (isDev) {
        // Нужен для того, чтобы при изменении кода, в браузере не перезагружалась вся страница,
        // а изменения появлялись только по изменяемому коду
        // Это удобно при разработке модалок, многоэтапных модулей,
        // т.к. при перезагрузке стр. не обновляется состояние
        // Можно с isDev
        plugins.push(new ReactRefreshWebpackPlugin());
        plugins.push(new HotModuleReplacementPlugin());
        plugins.push(
            new BundleAnalyzerPlugin({
                openAnalyzer: false, // Чтобы не открывался каждый раз при запуске, ссылка будет в терминале.
            }),
        );
    }

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                // для асинхронных подгрузок чанок
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
        );
        plugins.push(
            // locales хранятся в public и нужно чтобы в папке build они были.
            new CopyPlugin({
                patterns: [
                    { from: paths.locales, to: paths.buildLocales },
                ],
            }),
        );
    }

    return plugins;
}
