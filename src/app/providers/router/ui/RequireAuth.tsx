import { type ReactNode, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router';
import { getRouteForbidden, getRouteMain } from '@/shared/consts/router';
import {
    useUserAuthDataSelector,
    useUserRolesSelector,
    UserRole,
} from '@/entities/User';

interface RequireAuthProps {
    children: ReactNode;
    roles?: UserRole[];
}

export const RequireAuth = ({ children, roles }: RequireAuthProps) => {
    const location = useLocation();

    const isAuth = useUserAuthDataSelector();
    const userRoles = useUserRolesSelector();

    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }

        return roles.some((requiredRole) => userRoles?.includes(requiredRole));
    }, [roles, userRoles]);

    if (!isAuth) {
        return (
            <Navigate
                to={getRouteMain()}
                state={{ path: location.pathname }}
                replace
            />
        );
    }

    if (!hasRequiredRoles) {
        return (
            <Navigate
                to={getRouteForbidden()}
                state={{ path: location.pathname }}
                replace
            />
        );
    }

    return <>{children}</>;
};
