export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';
export { ArticleList } from './ui/ArticleList/ArticleList';
export { ArticleViewSelector } from './ui/ArticleViewSelector/ArticleViewSelector';

export {
    type Article,
    ArticleView,
} from './model/types/article';

export type {
    ArticleDetailsSchema,
} from './model/types/articleDetailsSchema';

export {
    articleDetailsActions,
    articleDetailsReducer,
} from './model/slice/articleDetailsSlice';

export {
    getArticleDetailsData,
    getArticleDetailsIsLoading,
    getArticleDetailsError,
} from './model/selectors/articleDetails';
