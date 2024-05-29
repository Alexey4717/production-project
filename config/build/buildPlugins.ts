import HTMLWebpackPlugin from "html-webpack-plugin";
import path from "path";
import type { WebpackPluginInstance } from "webpack";
import {
  ProgressPlugin,
  DefinePlugin,
  HotModuleReplacementPlugin,
} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/config";

export function buildPlugins({
  paths,
  isDev,
}: BuildOptions): WebpackPluginInstance[] {
  return [
    // вроде как порядок плагинов тут значения не имеет
    new ProgressPlugin(), // отображение % сборки в терминале
    new HTMLWebpackPlugin({
      // файл будет использоваться как шаблон, чтобы в html из сборки присутствовал div с id="root", иначе body будет пустой
      template: paths.html,
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      // для асинхронных подгрузок чанок
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
    // нужен для того, чтобы в исходниках приложения прокидывать глобальные переменные (например isDev)
    // для использования в коде, нужно в global.d.ts объявить константу с возвращаемым типом
    new DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
    }),

    // нужен для того, чтобы при изменении кода, в браузере не перезагружалась вся страница,
    // а именения появлялись только по изменяемому коду
    // Это удобно при разработке модалок, многоэтапных модулей, т.к. при перезагрузке стр. не обновляется состояние
    // Можно с isDev
    new HotModuleReplacementPlugin(),

    // ReactRefreshWebpackPlugin - можно также поставить для более корректной работы c isDev
  ];
}
