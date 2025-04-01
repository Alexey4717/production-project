import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    string | undefined,
    ThunkConfig<string>
>('articleDetails/fetchCommentsByArticleId', async (articleId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    if (!articleId) {
        throw new Error('Error articleId definition');
    }

    try {
        const response = await extra.api.get<Comment[]>('/comments', {
            params: {
                articleId,
                _expand: 'user', // т.к. хотим расширить запрос и получить юзера
            },
        });

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue('error');
    }
});
