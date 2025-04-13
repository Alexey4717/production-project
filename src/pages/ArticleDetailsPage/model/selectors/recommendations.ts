export const getArticleRecommendationsIsLoading = (state: RootState) =>
    state?.articleDetailsPage?.recommendations?.isLoading;

export const getArticleRecommendationsError = (state: RootState) =>
    state?.articleDetailsPage?.recommendations?.error;
