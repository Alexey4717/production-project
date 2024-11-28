export interface User {
    id: string;
    username: string;
}

// интерфейс для стэйта
// Если в authData хранятся данные, значит пользователь авторизован
// Если нет, то не авторизован
export interface UserSchema {
    authData: User;
}
