import { type RouteProps } from 'react-router-dom';
import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  NOT_FOUND = 'not_found',
}

export const RoutePaths: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    // Должен быть последний
    [AppRoutes.NOT_FOUND]: '*',
};

export const RouteConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePaths[AppRoutes.MAIN],
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePaths[AppRoutes.ABOUT],
        element: <AboutPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePaths[AppRoutes.NOT_FOUND],
        element: <NotFoundPage />,
    },
};
