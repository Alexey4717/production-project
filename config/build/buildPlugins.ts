import HTMLWebpackPlugin from "html-webpack-plugin";
import path from "path";
import type { WebpackPluginInstance } from "webpack";
import { ProgressPlugin } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/config";

export function buildPlugins({ paths } : BuildOptions): WebpackPluginInstance[] {
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
    })
  ];
}
