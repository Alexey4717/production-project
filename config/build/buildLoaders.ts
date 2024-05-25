import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/config";

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Порядок лоадеров важен (взят из доки)
      isDev
        ? "style-loader" // create style nodes from JS strings
        : MiniCssExtractPlugin.loader, // Нужен для создания css файла для каждого js файла в папке билда (иначе будет находиться в js)
      {
        // Translates CSS into CommonJS
        loader: "css-loader",
        options: {
          modules: {
            // Это нужно, чтобы модульность стилей работала только для файлов с .module
            auto: (resPath: string) => Boolean(resPath.includes(".module.")),
            localIdentName: isDev
              ? "[path][name]__[local]--[hash:base64:5]"
              : "[hash:base64:8]",
          },
        },
      },
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  // Если не используем typescript, то нужен babel-loader (он умеет работать с jsx)
  // который берет новый стандарт js и билдит его в старый, чтобы во всех браузерах поддерживался
  const typescriptLoader = {
    // можно проверить определение регулярки (между //) на https://regex101.com/
    test: /\.tsx?$/, // находит соответствие ts и tsx
    use: "ts-loader", // какой лоадер использовать
    exclude: /node_modules/, // исключение для обработки
  };

  // Порядок в массиве лоадеров имеет значение
  return [typescriptLoader, cssLoader];
}
