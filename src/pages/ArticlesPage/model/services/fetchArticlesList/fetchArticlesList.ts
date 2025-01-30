import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { getArticlesPageLimit } from '../../selectors/articlesPagesSelectors';

interface FetchArticlesListProps {
    page?: number;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>(
    'articlesPage/fetchArticlesList',
    async (args, thunkAPI) => {
        const { page = 1 } = args;
        const { extra, rejectWithValue, getState } = thunkAPI;

        const state = getState();
        const limit = getArticlesPageLimit(state);

        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user', // для view.big
                    _limit: limit,
                    _page: page,
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
    },
);
