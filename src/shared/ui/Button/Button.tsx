import React, { ButtonHTMLAttributes, type ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ThemeButton {
    CLEAR = 'clear',
    OUTLINE = 'outline'
}

interface ButtonProps extends ButtonHTMLAttributes<any> {
    children: ReactNode;
    className?: string;
    theme?: ThemeButton;
}

export const Button = ({
    children,
    className,
    theme,
    ...buttonProps
}: ButtonProps) => (
    <button
        type="button"
        className={classNames(cls.Button, {}, [className, cls[theme]])}
        {...buttonProps}
    >
        {children}
    </button>
);
