import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername.test', () => {
    test('should return username value', () => {
        const usernameString = 'admin';
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: usernameString,
            },
        };

        expect(getLoginUsername(state as StateSchema)).toEqual(usernameString);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginUsername(state as StateSchema)).toEqual('');
    });
});
