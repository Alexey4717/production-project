export function buildSvgLoader() {
    return {
        test: /\.svg$/,
        use: [{
            loader: '@svgr/webpack',
            options: {
                icon: true, // для замены ширины и высоты кастомным значением
                svgoConfig: {
                    // плагин для конвертации цветов (автоматически заменяет цвета в файлах на current color)
                    plugins: [
                        {
                            name: 'convertColors',
                            params: {
                                currentColor: true,
                            },
                        },
                    ],
                },
            },
        }],
    };
}
