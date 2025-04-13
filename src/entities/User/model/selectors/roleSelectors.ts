import { createSelector } from '@reduxjs/toolkit';
import { UserRole } from '../consts/userConsts';

export const getUserRoles = (state: RootState) => state.user.authData?.roles;

export const isUserAdmin = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(UserRole.ADMIN)),
);
export const isUserManager = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(UserRole.MANAGER)),
);
