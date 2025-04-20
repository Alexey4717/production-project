import { type ReactNode } from 'react';
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

    const hasRequiredRoles = () => {
        if (!roles) {
            return true;
        }

        return roles.some((requiredRole) => {
            const hasRole = userRoles?.includes(requiredRole);
            return Boolean(hasRole);
        });
    };

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

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
};
