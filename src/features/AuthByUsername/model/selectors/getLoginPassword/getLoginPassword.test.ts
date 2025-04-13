import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword.test', () => {
    test('should return password value', () => {
        const passwordString = '123';
        const state: DeepPartial<RootState> = {
            loginForm: {
                password: passwordString,
            },
        };

        expect(getLoginPassword(state as RootState)).toEqual(passwordString);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<RootState> = {};
        expect(getLoginPassword(state as RootState)).toEqual('');
    });
});
