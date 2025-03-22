import { type Context, createContext } from 'react';
import { Theme } from '../../consts/theme';

export interface ThemeContextProps {
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
}

export const ThemeContext: Context<ThemeContextProps> = createContext<ThemeContextProps>({});
