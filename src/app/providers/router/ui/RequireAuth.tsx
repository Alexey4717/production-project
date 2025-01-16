import { type ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserAuthData } from 'entities/User';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';

interface RequireAuthProps {
    children: ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
    const isAuth = useSelector(getUserAuthData);
    const location = useLocation();

    if (!isAuth) {
        return <Navigate to={RoutePaths.main} state={{ path: location.pathname }} />;
    }

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
};
