import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginError } from './getLoginError';

describe('getLoginError.test', () => {
    test('should return error', () => {
        const errorString = 'error';
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                error: errorString,
            },
        };

        expect(getLoginError(state as StateSchema)).toEqual(errorString);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginError(state as StateSchema)).toEqual(undefined);
    });
});
