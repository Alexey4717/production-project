import { combineReducers } from '@reduxjs/toolkit';
import { articleDetailsCommentsReducer } from '../slices/articleDetailsCommentsSlice';
import {
    articleDetailsPageRecommendationsReducer,
} from '../slices/articleDetailsPageRecommendationsSlice';
import { ArticleDetailsPageSchema } from '../types';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    recommendations: articleDetailsPageRecommendationsReducer,
    comments: articleDetailsCommentsReducer,
});
