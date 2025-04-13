import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername.test', () => {
    test('should return username value', () => {
        const usernameString = 'admin';
        const state: DeepPartial<RootState> = {
            loginForm: {
                username: usernameString,
            },
        };

        expect(getLoginUsername(state as RootState)).toEqual(usernameString);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<RootState> = {};
        expect(getLoginUsername(state as RootState)).toEqual('');
    });
});
