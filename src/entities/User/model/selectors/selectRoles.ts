import { buildSelector } from '@/shared/lib/store';
import { UserRole } from '../consts/userConsts';
import { selectUserAuthData } from './selectUserData';

export const [useUserRolesSelector, selectUserRoles] = buildSelector(
    selectUserAuthData,
    (authData) => authData?.roles,
);

export const [useIsUserAdminSelector, selectIsUserAdmin] = buildSelector(
    selectUserRoles,
    (roles) => Boolean(roles?.includes(UserRole.ADMIN)),
);

export const [useIsUserManagerSelector, selectIsUserManager] = buildSelector(
    selectUserRoles,
    (roles) => Boolean(roles?.includes(UserRole.MANAGER)),
);
