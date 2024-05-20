import type { ResolveOptions } from "webpack";

export function buildResolvers(): ResolveOptions {
  return {
    extensions: [".tsx", ".ts", ".js"], // при импорте мы не будем указывать разширение компонента
  };
}
