import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { selectArticleDetailsData } from '@/entities/Article';
import { Comment } from '@/entities/Comment';
import { selectUserAuthData } from '@/entities/User';
import { fetchCommentsByArticleId } from '../../services/fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>('articleDetails/addCommentForArticle', async (text, thunkAPI) => {
    const { extra, dispatch, rejectWithValue, getState } = thunkAPI;
    const state = getState();
    const userData = selectUserAuthData(state);
    const article = selectArticleDetailsData(state);

    if (!userData || !article || !text) {
        return rejectWithValue('no data');
    }

    try {
        const response = await extra.api.post<Comment>('/comments', {
            articleId: article.id,
            userId: userData.id,
            text,
        });

        if (!response.data) {
            throw new Error();
        }

        dispatch(fetchCommentsByArticleId(article.id));

        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue('error');
    }
});
