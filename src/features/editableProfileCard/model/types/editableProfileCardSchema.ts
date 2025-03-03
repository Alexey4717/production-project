import { Profile } from 'entities/Profile';

export enum ValidateProfileError {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA', // некорректное имя или фамилия
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR',
}

// Схема хранения данных профиля в стейте
export interface ProfileSchema {
    data?: Profile;
    form?: Profile; // Тут хранятся данные для формы
    isLoading: boolean;
    error?: string;
    readonly: boolean; // Для определения доступности редактирования (я или другой пользователь)
    validateErrors?: ValidateProfileError[];
}
