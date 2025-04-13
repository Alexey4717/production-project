import { ArticleView, ArticleSortField, ArticleType } from '@/entities/Article';

export const getArticlesPageIsLoading = (state: RootState) =>
    state?.articlesPage?.isLoading ?? false;
export const getArticlesPageError = (state: RootState) =>
    state?.articlesPage?.error;
export const getArticlesPageView = (state: RootState) =>
    state?.articlesPage?.view ?? ArticleView.SMALL;

export const getArticlesPageLimit = (state: RootState) =>
    state?.articlesPage?.limit || 9;
export const getArticlesPageNum = (state: RootState) =>
    state?.articlesPage?.page || 1;
export const getArticlesPageHasMore = (state: RootState) =>
    state?.articlesPage?.hasMore;
export const getArticlesPageInited = (state: RootState) =>
    state?.articlesPage?._inited;
export const getArticlesPageOrder = (state: RootState) =>
    state?.articlesPage?.order ?? 'asc';
export const getArticlesPageSort = (state: RootState) =>
    state?.articlesPage?.sort ?? ArticleSortField.CREATED;
export const getArticlesPageSearch = (state: RootState) =>
    state?.articlesPage?.search ?? '';
export const getArticlesPageType = (state: RootState) =>
    state?.articlesPage?.type ?? ArticleType.ALL;
