import { ComponentType } from 'react';
// Это не бизнес код, можно исключить
// eslint-disable-next-line alexey4717-plugin/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Theme } from '@/shared/consts/theme';

export const ThemeDecorator =
    (theme: Theme) => (StoryComponent: ComponentType) => (
        <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>
                <StoryComponent />
            </div>
        </ThemeProvider>
    );
