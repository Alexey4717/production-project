import { selectLoginPassword } from './selectLoginPassword';

describe('selectLoginPassword.test', () => {
    test('should return password value', () => {
        const passwordString = '123';
        const state: DeepPartial<RootState> = {
            loginForm: {
                password: passwordString,
            },
        };

        expect(selectLoginPassword(state as RootState)).toEqual(passwordString);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<RootState> = {};
        expect(selectLoginPassword(state as RootState)).toEqual('');
    });
});
