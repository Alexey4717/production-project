import { Country } from 'entities/Country/model/types/country';
import { Currency } from 'entities/Currency/model/types/currency';

export enum ValidateProfileError {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA', // некорректное имя или фамилия
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR',
}

export interface Profile {
    id?: string;
    first?: string;
    lastname?: string;
    age?: number,
    currency?: Currency,
    country?: Country;
    city?: string,
    username?: string;
    avatar?: string;
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
