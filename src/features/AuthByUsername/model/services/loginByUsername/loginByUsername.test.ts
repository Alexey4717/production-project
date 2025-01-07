import { DeepPartial, type Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { StateSchema } from 'app/providers/StoreProvider';
import { type User, userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUsername } from './loginByUsername';

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true);

describe('loginByUsername.test', () => {
    // Старая логика для сравнения
    // объявили типы для моканных функций
    // let dispatch: Dispatch;
    // let getState: () => StateSchema;
    //
    // // Присваиваем моканные функции
    // beforeEach(() => {
    //     dispatch = jest.fn();
    //     getState = jest.fn();
    // });

    // test('success login', async () => {
    //     const userValue = {
    //         username: 'admin',
    //         password: '123',
    //     };
    //     const userPayload: User = {
    //         id: '1',
    //         ...userValue,
    //     };
    //
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userPayload }));
    //
    //     const action = loginByUsername(userValue);
    //
    //     const result = await action(dispatch, getState, undefined);
    //
    //     // Проверяем что был вызов диспатча именно с таким аргументом
    //     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userPayload));
    //     expect(dispatch).toHaveBeenCalledTimes(3); // Почему 3 описано в descriptions.md (36 пункт)
    //     expect(mockedAxios.post).toHaveBeenCalled();
    //     expect(result.meta.requestStatus).toBe('fulfilled');
    //     expect(result.payload).toEqual(userPayload);
    // });
    //
    // test('login with 403 error', async () => {
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
    //
    //     const action = loginByUsername({
    //         username: '123',
    //         password: '123',
    //     });
    //
    //     const result = await action(dispatch, getState, undefined);
    //
    //     expect(mockedAxios.post).toHaveBeenCalled();
    //     expect(dispatch).toHaveBeenCalledTimes(2);
    //     expect(result.meta.requestStatus).toBe('rejected');
    //     expect(result.payload).toBe('error');
    // });

    test('success login', async () => {
        const userValue = {
            username: 'admin',
            password: '123',
        };
        const userPayload: User = {
            id: '1',
            ...userValue,
        };

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: userPayload }));

        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk(userValue);

        // Проверяем что был вызов диспатча именно с таким аргументом
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userPayload));
        expect(thunk.dispatch).toHaveBeenCalledTimes(3); // Почему 3 описано в descriptions.md (36 пункт)
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userPayload);
    });

    test('login with 403 error', async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));

        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({
            username: '123',
            password: '123',
        });

        expect(mockedAxios.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });
});
