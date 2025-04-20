import { buildSelector } from '@/shared/lib/store';

export const [useArticleDetailsDataSelector, selectArticleDetailsData] =
    buildSelector((state) => state?.articleDetails?.data);

export const [
    useArticleDetailsIsLoadingSelector,
    selectArticleDetailsIsLoading,
] = buildSelector((state) => state?.articleDetails?.isLoading);

export const [useArticleDetailsErrorSelector, selectArticleDetailsError] =
    buildSelector((state) => state?.articleDetails?.error);
