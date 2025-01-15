import { Configuration } from 'webpack';

export type BuildMode = Configuration['mode'];
export type Port = number;

export interface BuildPaths {
  entry: string;
  build: string;
  html: string;
  src: string;
}

export interface BuildEnv {
  mode: BuildMode;
  port: Port;
  apiUrl: string;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  port: Port;
  apiUrl: string;
  project: 'storybook' | 'frontend' | 'jest';
}
