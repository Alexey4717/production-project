import { memo, type ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  RED = 'red'
}

interface AppLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  theme?: AppLinkTheme;
}

export const AppLink = memo(({
    children,
    className,
    theme = AppLinkTheme.PRIMARY,
    ...linkProps
}: AppLinkProps) => (
    <Link
        className={classNames(cls.AppLink, {}, [className, cls[theme]])}
        {...linkProps}
    >
        {children}
    </Link>
));
