import { selectLoginError } from './selectLoginError';

describe('selectLoginError.test', () => {
    test('should return error', () => {
        const errorString = 'error';
        const state: DeepPartial<RootState> = {
            loginForm: {
                error: errorString,
            },
        };

        expect(selectLoginError(state as RootState)).toEqual(errorString);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<RootState> = {};
        expect(selectLoginError(state as RootState)).toEqual(undefined);
    });
});
