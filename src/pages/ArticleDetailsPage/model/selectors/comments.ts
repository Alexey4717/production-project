export const getArticleCommentsIsLoading = (state: RootState) =>
    state?.articleDetailsPage?.comments?.isLoading;

export const getArticleCommentsError = (state: RootState) =>
    state?.articleDetailsPage?.comments?.error;
