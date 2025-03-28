import { UserRole } from '../consts/userConsts';

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
}

// интерфейс для стэйта
// Если в authData хранятся данные, значит пользователь авторизован
// Если нет, то не авторизован
export interface UserSchema {
    authData?: User;

    _inited: boolean; // флаг, который показывает, что пользователь проинициализирован (в редьюсере initAuthData)
}
