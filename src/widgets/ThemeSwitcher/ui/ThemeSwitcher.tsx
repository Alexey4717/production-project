import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import LightIcon from 'shared/assets/icons/theme-light.svg';
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            onClick={toggleTheme}
            type="button"
            theme={ButtonTheme.CLEAR}
            className={classNames('', {}, [className])}
        >
            {
                {
                    [Theme.DARK]: <DarkIcon />,
                    [Theme.LIGTH]: <LightIcon />,
                }[theme]
            }
        </Button>
    );
};
