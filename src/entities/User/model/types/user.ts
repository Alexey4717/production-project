import { FeatureFlags } from '@/shared/types/featureFlags';
import { JsonSettings } from '../types/jsonSettings';
import { UserRole } from '../consts/userConsts';

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
    features?: FeatureFlags;
    jsonSettings?: JsonSettings;
}

// интерфейс для стэйта
// Если в authData хранятся данные, значит пользователь авторизован
// Если нет, то не авторизован
export interface UserSchema {
    authData?: User;

    _inited: boolean; // флаг, который показывает, что пользователь проинициализирован (в редьюсере initAuthData)
}
