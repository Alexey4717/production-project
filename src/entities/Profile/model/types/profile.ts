import { Country } from 'entities/Country/model/types/country';
import { Currency } from 'entities/Currency/model/types/currency';

export interface Profile {
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
}
