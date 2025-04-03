export { userReducer, userActions } from './model/slice/userSlice';

export type { User, UserSchema } from './model/types/user';

export { UserRole } from './model/consts/userConsts';

export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
export { getUserInited } from './model/selectors/getUserInited/getUserInited';
export { useJsonSettings } from './model/selectors/jsonSettings';

export { saveJsonSettings } from './model/services/saveJsonSettings';

export {
    getUserRoles,
    isUserAdmin,
    isUserManager,
} from './model/selectors/roleSelectors';
