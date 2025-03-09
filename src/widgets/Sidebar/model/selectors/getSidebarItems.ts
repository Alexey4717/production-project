import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import AboutIcon from '@/shared/assets/icons/about-20-20.svg';
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
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

        ];

        if (userData) {
            sidebarItemsList.push(
                {
                    path: `${RoutePaths.profile}${userData.id}`,
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
            );
        }

        return sidebarItemsList;
    },
);
