export { ArticleDetailsSkeleton } from './ui/ArticleDetails/ArticleDetails';

export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';

export type { Article } from './model/types/article';

export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';

export { ArticleList } from './ui/ArticleList/ArticleList';
export {
    useArticleDetailsDataSelector,
    selectArticleDetailsData,
} from './model/selectors/selectArticleDetails';
export {
    ArticleView,
    ArticleType,
    ArticleSortField,
    ArticleBlockType,
} from './model/consts/articleConsts';
