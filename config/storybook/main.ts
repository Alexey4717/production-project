// Пришлось заменить module.export на export default
// т.к. после включения isolatedModules в ts конфиге
// появилась ошибка, что импорт в CommonJS
export default {
    stories: [
        '../../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        'storybook-addon-mock', // TODO тут должна быть storybook-addon-mock/register, но падает ошибка, вероятно нужно обновление до 7 версии сторибука
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
    staticDirs: ['../../public'],
};
