export {
    userReducer,
    userActions,
    useUserActions,
} from './model/slice/userSlice';

export type { User, UserSchema } from './model/types/user';

export { UserRole } from './model/consts/userConsts';

export {
    useUserAuthDataSelector,
    selectUserAuthData,
} from './model/selectors/selectUserData';
export { useJsonSettingsSelector } from './model/selectors/selectJsonSettings';

export { saveJsonSettings } from './model/services/saveJsonSettings';

export {
    useUserRolesSelector,
    useIsUserAdminSelector,
    useIsUserManagerSelector,
} from './model/selectors/selectRoles';

export { initAuthData } from './model/services/initAuthData';
export { useUserInitedSelector } from '@/entities/User/model/selectors/selectUserData';
