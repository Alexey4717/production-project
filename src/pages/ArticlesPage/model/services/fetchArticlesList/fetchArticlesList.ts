import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleType } from '@/entities/Article';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import {
    getArticlesPageLimit,
    getArticlesPageNum,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
} from '../../selectors/articlesPagesSelectors';

interface FetchArticlesListProps {
    replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>(
    'articlesPage/fetchArticlesList',
    async (args, thunkAPI) => {
        const { replace } = args;
        const { extra, rejectWithValue, getState } = thunkAPI;

        const state = getState();
        const limit = getArticlesPageLimit(state);
        const page = getArticlesPageNum(state);
        const order = getArticlesPageOrder(state);
        const sort = getArticlesPageSort(state);
        const search = getArticlesPageSearch(state);
        const type = getArticlesPageType(state);

        try {
            addQueryParams({
                sort,
                order,
                search,
                type,
            });

            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user', // для view.big
                    _limit: limit,
                    _page: page,
                    _sort: sort,
                    _order: order,
                    q: search,
                    type: type === ArticleType.ALL ? undefined : type,
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
