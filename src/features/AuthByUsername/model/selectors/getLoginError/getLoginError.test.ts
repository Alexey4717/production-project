import { getLoginError } from './getLoginError';

describe('getLoginError.test', () => {
    test('should return error', () => {
        const errorString = 'error';
        const state: DeepPartial<RootState> = {
            loginForm: {
                error: errorString,
            },
        };

        expect(getLoginError(state as RootState)).toEqual(errorString);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<RootState> = {};
        expect(getLoginError(state as RootState)).toEqual(undefined);
    });
});
