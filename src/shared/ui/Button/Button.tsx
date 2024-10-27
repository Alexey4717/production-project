import React, { ButtonHTMLAttributes, type ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ButtonTheme {
    CLEAR = 'clear',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum ButtonSize {
    // Можно добавить так же размер S - самый маленький, но пока не нужен
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl'
}

interface ButtonProps extends ButtonHTMLAttributes<any> {
    children: ReactNode;
    className?: string;
    theme?: ButtonTheme;
    square?: boolean;
    size?: ButtonSize;
}

export const Button = ({
                           children,
                           className,
                           theme,
                           square,
                           size = ButtonSize.M,
                           ...buttonProps
                       }: ButtonProps) => {
    const mods: Record<string, boolean> = {
        [cls[theme]]: true,
        [cls.square]: square,
        [cls[size]]: true,
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [className, cls[theme]])}
            {...buttonProps}
        >
            {children}
        </button>
    );
};
