import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import {
    getArticlesPageHasMore,
    getArticlesPageIsLoading,
    getArticlesPageNum,
} from '../../selectors/articlesPagesSelectors';

export const fetchNextArticlesPage = createAsyncThunk<
    void,
    undefined,
    ThunkConfig<string>
>('articlesPage/fetchNextArticlesPage', async (_, thunkAPI) => {
    const { getState, dispatch } = thunkAPI;

    const state = getState();
    const hasMore = getArticlesPageHasMore(state);
    const page = getArticlesPageNum(state);
    const isLoading = getArticlesPageIsLoading(state);

    if (hasMore && !isLoading) {
        dispatch(fetchArticlesList({}));
        dispatch(articlesPageActions.setPage(page + 1));
    }
});
