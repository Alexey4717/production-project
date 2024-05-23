import { createContext } from "react";

export enum Theme {
  LIGTH = "light",
  DARK = "dark",
}

export interface ThemeContextProps {
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
}

export const ThemeContext: React.Context<ThemeContextProps> =
  createContext<ThemeContextProps>({});

export const LOCAL_STORAGE_THEME_KEY = "theme";
