import { loginActions, loginReducer } from './loginSlice';
import { type LoginSchema } from '../types/loginSchema';

describe('loginSlice.test', () => {
    test('test set username', () => {
        const state: DeepPartial<LoginSchema> = {
            username: '123',
        };

        const usernameString = '123456';

        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setUsername(usernameString),
            ),
        ).toEqual({ username: usernameString });
    });

    test('test set password', () => {
        const state: DeepPartial<LoginSchema> = {
            password: '123',
        };

        const passwordString = '123456';

        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setPassword(passwordString),
            ),
        ).toEqual({ password: passwordString });
    });
});
