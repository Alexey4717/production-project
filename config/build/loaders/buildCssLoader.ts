import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildCssLoader(isDev: boolean) {
    return {
        test: /\.s[ac]ss$/i,
        use: [
            // Порядок лоадеров важен (взят из доки)
            isDev
                ? 'style-loader' // create style nodes from JS strings
                : MiniCssExtractPlugin.loader, // Нужен для создания css файла для каждого
            // js файла в папке билда (иначе будет находиться в js)
            {
                // Translates CSS into CommonJS
                loader: 'css-loader',
                options: {
                    modules: {
                        // Это нужно, чтобы модульность стилей работала только для файлов с .module
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                        localIdentName: isDev
                            ? '[path][name]__[local]--[hash:base64:5]'
                            : '[hash:base64:8]',
                    },
                },
            },
            // Compiles Sass to CSS
            'sass-loader',
        ],
    };
}
