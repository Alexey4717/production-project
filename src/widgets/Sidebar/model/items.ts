import { type VFC, type SVGProps } from 'react';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg';
import ArticleIcon from 'shared/assets/icons/article-20-20.svg';

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: VFC<SVGProps<SVGSVGElement>>;
    authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: RoutePaths.main,
        text: 'Главная',
        Icon: MainIcon,
    },
    {
        path: RoutePaths.about,
        text: 'О сайте',
        Icon: AboutIcon,
    },
    {
        path: RoutePaths.profile,
        text: 'Профиль',
        Icon: ProfileIcon,
        authOnly: true,
    },
    {
        path: RoutePaths.articles,
        text: 'Статьи',
        Icon: ArticleIcon,
        authOnly: true,
    },
];
