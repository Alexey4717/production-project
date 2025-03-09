import { type ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserAuthData, getUserRoles, UserRole } from '@/entities/User';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig';

interface RequireAuthProps {
    children: ReactNode;
    roles?: UserRole[];
}

export const RequireAuth = ({ children, roles }: RequireAuthProps) => {
    const isAuth = useSelector(getUserAuthData);
    const location = useLocation();
    const userRoles = useSelector(getUserRoles);

    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }

        return roles.some((requiredRole) => {
            const hasRole = userRoles?.includes(requiredRole);
            return Boolean(hasRole);
        });
    }, [roles, userRoles]);

    if (!isAuth) {
        return <Navigate to={RoutePaths.main} state={{ path: location.pathname }} replace />;
    }

    if (!hasRequiredRoles) {
        return <Navigate to={RoutePaths.forbidden} state={{ path: location.pathname }} replace />;
    }

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
};
