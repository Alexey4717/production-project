import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'], // при импорте мы не будем указывать разширение компонента
        preferAbsolute: true, // для приоритета абсолютных импортов
        modules: [
            // Указание абсолютного пути для вебпака из src
            options.paths.src,
            // Для указания что из этой папки импорты тоже абсолютные
            'node_modules',
        ],
        // Для каждого модуля главный файл (по дефолту index)
        mainFiles: ['index'],
        // можно указывать (@/features/feat),
        // если оставить пустой объект, то алиас не нужно указывать (features/feat)
        alias: {
            '@': options.paths.src,
        },
    };
}
