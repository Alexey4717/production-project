import { memo, Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from 'widgets/PageLoader';
import { getUserAuthData } from 'entities/User';
import { RouteConfig } from 'shared/config/routeConfig/routeConfig';

const AppRouter = () => {
    const isAuth = useSelector(getUserAuthData);

    const routes = useMemo(() => Object.values(RouteConfig)
        .filter(({ authOnly }) => !(authOnly && !isAuth))
        .map(({ path, element }) => (
            <Route
                key={path}
                path={path}
                element={(
                    <Suspense fallback={<PageLoader />}>
                        <div className="page-wrapper">
                            {element}
                        </div>
                    </Suspense>
                )}
            />
        )), [isAuth]);

    return (
        <Routes>
            {routes}
        </Routes>

    );
};

export default memo(AppRouter);
