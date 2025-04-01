import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '../../types/article';

export const fetchArticleById = createAsyncThunk<
    Article,
    string | undefined,
    ThunkConfig<string>
>('articleDetails/fetchArticleById', async (articleId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        if (!articleId) {
            throw new Error('Ошибка определения articleId');
        }

        const response = await extra.api.get<Article>(
            `/articles/${articleId}`,
            {
                params: {
                    _expand: 'user', // нужна инфа о пользователя для определения возможности редактирования статьи
                },
            },
        );

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue('error');
    }
});
