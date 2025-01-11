import { useCallback, useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

export interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = useCallback(() => {
        const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
        setTheme?.(newTheme);
        document.body.className = newTheme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    }, [setTheme, theme]);

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    };
}
