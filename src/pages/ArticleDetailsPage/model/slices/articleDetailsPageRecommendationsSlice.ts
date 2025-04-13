import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Article } from '@/entities/Article';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';
import { ArticleDetailsRecommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema';

const recommendationsAdapter = createEntityAdapter({
    selectId: (article: Article) => article.id,
});

export const getArticleRecommendations =
    recommendationsAdapter.getSelectors<RootState>((state) => {
        return (
            state.articleDetailsPage?.recommendations ||
            recommendationsAdapter.getInitialState()
        );
    });

const articleDetailsPageRecommendationsSlice = createSlice({
    name: 'articleDetailsPageRecommendationsSlice',
    initialState:
        recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>(
            {
                isLoading: false,
                error: undefined,
                ids: [],
                entities: {},
            },
        ),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleRecommendations.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
                state.isLoading = false;
                recommendationsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: articleDetailsPageRecommendationsReducer } =
    articleDetailsPageRecommendationsSlice;
