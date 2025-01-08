import { Country, Currency } from 'shared/consts/common';

export interface Profile {
    first: string;
    lastname: string;
    age: number;
    currency: Currency;
    country: Country;
    city: string;
    username: string;
    avatar: string;
}

// Схема хранения данных профиля в стейте
export interface ProfileSchema {
    data?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean; // Для определения доступности редактирования (я или другой пользователь)
}
