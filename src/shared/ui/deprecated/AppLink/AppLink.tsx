import { ForwardedRef, forwardRef, type ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RED = 'red',
}

interface AppLinkProps extends LinkProps {
    children: ReactNode;
    className?: string;
    theme?: AppLinkTheme;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const AppLink = forwardRef(
    (
        {
            children,
            className,
            theme = AppLinkTheme.PRIMARY,
            ...linkProps
        }: AppLinkProps,
        ref: ForwardedRef<HTMLAnchorElement>,
    ) => (
        <Link
            className={classNames(cls.AppLink, {}, [className, cls[theme]])}
            {...linkProps}
            ref={ref}
        >
            {children}
        </Link>
    ),
);
