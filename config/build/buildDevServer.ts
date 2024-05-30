import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/config';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port,
        open: true, // Для автоматического открытия страницы приложения после его запуска в браузере
        historyApiFallback: true, // это нужно, чтобы можно было обновлять
        // страницу из не главного роута
        hot: true, // для того, чтобы при изменении кода,
        // в браузере не перезагружалась вся страница, а именения появлялись
        // только по изменяемому коду
    };
}
