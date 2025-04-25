export function buildTypescriptLoader() {
    return {
        // можно проверить определение регулярки (между //) на https://regex101.com/
        test: /\.tsx?$/, // находит соответствие ts и tsx
        use: 'ts-loader', // какой лоадер использовать
        exclude: /node_modules/, // исключение для обработки
    };
}
