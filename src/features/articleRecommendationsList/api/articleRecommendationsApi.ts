import { Article } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        ArticleRecommendationsList: build.query<Article[], number>({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                },
            }),
            // Можно создать мутацию
        }),
    }),
});

export const useArticleRecommendationsList =
    recommendationsApi.useArticleRecommendationsListQuery;
