import { selectLoginUsername } from './selectLoginUsername';

describe('selectLoginUsername.test', () => {
    test('should return username value', () => {
        const usernameString = 'admin';
        const state: DeepPartial<RootState> = {
            loginForm: {
                username: usernameString,
            },
        };

        expect(selectLoginUsername(state as RootState)).toEqual(usernameString);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<RootState> = {};
        expect(selectLoginUsername(state as RootState)).toEqual('');
    });
});
