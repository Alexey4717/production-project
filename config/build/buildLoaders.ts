import { type RuleSetRule } from 'webpack';
import { BuildOptions } from './types/config';
import { buildSvgLoader } from './loaders/buildSvgLoader';
import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildFileLoader } from './loaders/buildFileLoader';

export function buildLoaders(options: BuildOptions): RuleSetRule[] {
    const svgLoader = buildSvgLoader();

    // Babel это транспилятор js из одного стандарта в другой,
    // чтобы поддерживался код во всех браузерах
    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    const cssLoader = buildCssLoader(options);

    // Если не используем typescript, то нужен babel-loader (он умеет работать с jsx)
    // который берет новый стандарт js и билдит его в старый, чтобы во всех браузерах поддерживался
    // const typescriptLoader = buildTypescriptLoader();

    const fileLoader = buildFileLoader();

    // Порядок в массиве лоадеров имеет значение
    return [
        svgLoader,
        // babelLoader должен быть до typescriptLoader, иначе ошибка билда
        codeBabelLoader,
        tsxCodeBabelLoader,
        // typescriptLoader, // заменили только babelLoader с доп плагинами для ускорения сборки (78l)
        cssLoader,
        fileLoader,
    ];
}
