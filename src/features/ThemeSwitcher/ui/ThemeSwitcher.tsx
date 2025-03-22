import { memo } from 'react';
import { Theme } from '@/shared/consts/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { classNames } from '@/shared/lib/classNames/classNames';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
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
                    [Theme.LIGHT]: <LightIcon />,
                    [Theme.ORANGE]: <DarkIcon />,
                }[theme]
            }
        </Button>
    );
});
