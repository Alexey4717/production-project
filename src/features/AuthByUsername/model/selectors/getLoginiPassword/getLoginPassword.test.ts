import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword.test', () => {
    test('should return password value', () => {
        const passwordString = '123';
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                password: passwordString,
            },
        };

        expect(getLoginPassword(state as StateSchema)).toEqual(passwordString);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginPassword(state as StateSchema)).toEqual('');
    });
});
