import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { type User, userActions } from '@/entities/User';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>('login/loginByUsername', async (authData, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.post<User>('/login', authData);
        if (!response.data) {
            throw new Error();
        }

        dispatch(userActions.setAuthData(response.data));
        // extra?.navigate?.('/about');
        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue('error');
    }
});
