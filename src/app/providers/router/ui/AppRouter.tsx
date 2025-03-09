import { memo, Suspense, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from '@/widgets/PageLoader';
import { getUserAuthData } from '@/entities/User';
import { AppRoutes, AppRoutesProps, RouteConfig } from '@/shared/config/routeConfig/routeConfig';
import { RequireAuth } from './RequireAuth';

const AppRouter = () => {
    const isAuth = useSelector(getUserAuthData);

    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                {route.element}
            </Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly
                        ? <RequireAuth roles={route?.roles}>{element}</RequireAuth>
                        : element
                }
            />
        );
    }, []);

    return (
        <Routes>
            {Object.values(RouteConfig).map(renderWithWrapper)}
        </Routes>

    );
};

export default memo(AppRouter);
