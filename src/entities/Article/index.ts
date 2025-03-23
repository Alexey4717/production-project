export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';
export { ArticleList } from './ui/ArticleList/ArticleList';

export type { Article } from './model/types/article';

export type {
    ArticleDetailsSchema,
} from './model/types/articleDetailsSchema';

export {
    ArticleSortField, ArticleView, ArticleType, ArticleBlockType,
} from './model/consts/articleConsts';

export {
    articleDetailsActions,
    articleDetailsReducer,
} from './model/slice/articleDetailsSlice';

export {
    getArticleDetailsData,
    getArticleDetailsIsLoading,
    getArticleDetailsError,
} from './model/selectors/articleDetails';
