// После установки ts-node typescript @types/node @types/webpack @types/webpack-dev-server
// и замены расширения конфига на .ts можно писать привычные импорты, до этого момента require
import path from 'path';
import webpack from 'webpack';

import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv } from './config/build/types/config';

export default (env: BuildEnv) => {
    const paths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    };

    const mode = env.mode || 'development'; // production for public, zip, remove comments and other minifications
    const PORT = env.port ?? 3000;

    const isDev = mode === 'development';

    // export analog in nodejs
    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT,
    });

    return config;
};
