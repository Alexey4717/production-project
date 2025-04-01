import { type User, userActions } from '@/entities/User';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUsername } from './loginByUsername';

describe('loginByUsername.test', () => {
    test('success login', async () => {
        const userValue = {
            username: 'admin',
            password: '123',
        };
        const userPayload: User = {
            id: '1',
            ...userValue,
        };

        const thunk = new TestAsyncThunk(loginByUsername);

        thunk.api.post.mockReturnValue(Promise.resolve({ data: userPayload }));
        const result = await thunk.callThunk(userValue);

        // Проверяем что был вызов диспатча именно с таким аргументом
        expect(thunk.dispatch).toHaveBeenCalledWith(
            userActions.setAuthData(userPayload),
        );
        expect(thunk.dispatch).toHaveBeenCalledTimes(3); // Почему 3 описано в descriptions.md (36 пункт)
        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userPayload);
    });

    test('login with 403 error', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk({
            username: '123',
            password: '123',
        });

        expect(thunk.api.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });
});
