import { combineReducers } from '@reduxjs/toolkit';
import { articleDetailsCommentsReducer } from '../slices/articleDetailsCommentsSlice';
import { articleDetailsPageRecommendationsReducer } from '../slices/articleDetailsPageRecommendationsSlice';
import { ArticleDetailsPageSchema } from '../types';

export const articleDetailsPageReducer =
    combineReducers<ArticleDetailsPageSchema>({
        // TODO fixme
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        recommendations: articleDetailsPageRecommendationsReducer,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        comments: articleDetailsCommentsReducer,
    });
