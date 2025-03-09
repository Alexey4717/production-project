import { Profile } from '@/entities/Profile';
import { ValidateProfileError } from '../consts/editableProfileCardConsts';

// Схема хранения данных профиля в стейте
export interface ProfileSchema {
    data?: Profile;
    form?: Profile; // Тут хранятся данные для формы
    isLoading: boolean;
    error?: string;
    readonly: boolean; // Для определения доступности редактирования (я или другой пользователь)
    validateErrors?: ValidateProfileError[];
}
