export function buildFileLoader() {
    return {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        type: 'asset/resource', // file-loader уже не обязателен в 5 версии webpack
    };
}
