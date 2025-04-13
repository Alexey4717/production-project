export const getArticleDetailsData = (state: RootState) =>
    state?.articleDetails?.data;

export const getArticleDetailsIsLoading = (state: RootState) =>
    state?.articleDetails?.isLoading;

export const getArticleDetailsError = (state: RootState) =>
    state?.articleDetails?.error;
