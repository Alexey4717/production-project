import React, { type ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./AppLink.module.scss";
import { Link, type LinkProps } from "react-router-dom";

export enum AppLinkTheme {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

interface AppLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  theme?: AppLinkTheme;
}

export const AppLink = ({
  children,
  className,
  theme = AppLinkTheme.PRIMARY,
  ...linkProps
}: AppLinkProps) => {
  return (
    <Link
      className={classNames(cls.AppLink, {}, [className, cls[theme]])}
      {...linkProps}
    >
      {children}
    </Link>
  );
};
