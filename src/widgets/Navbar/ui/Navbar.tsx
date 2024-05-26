import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => (
  <div className={classNames(cls.Navbar, {}, [className])}>
    <ThemeSwitcher />
    <div className={cls.links}>
      <AppLink className={cls.mainLink} to="/" theme={AppLinkTheme.SECONDARY}>
        Главная
      </AppLink>
      <AppLink to="/about" theme={AppLinkTheme.SECONDARY}>
        О сайте
      </AppLink>
    </div>
  </div>
);
