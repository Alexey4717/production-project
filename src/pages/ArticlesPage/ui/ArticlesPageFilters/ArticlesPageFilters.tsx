import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
    ArticleView,
    ArticleViewSelector,
    ArticleSortSelector,
    ArticleSortField,
    ArticleTypeTabs,
    ArticleType,
} from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types';
import { Card } from '@/shared/ui/Card/Card';
import { Input } from '@/shared/ui/Input/Input';
import { TabItem } from '@/shared/ui/Tabs/Tabs';
import cls from './ArticlesPageFilters.module.scss';
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
    getArticlesPageView,
} from '../../model/selectors/articlesPagesSelectors';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';

interface ArticlesPageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('articles');
    const dispatch = useAppDispatch();

    const view = useSelector(getArticlesPageView);
    const order = useSelector(getArticlesPageOrder);
    const sort = useSelector(getArticlesPageSort);
    const search = useSelector(getArticlesPageSearch);
    const type = useSelector(getArticlesPageType);

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 1000);

    const handleChangeView = useCallback((newView: ArticleView) => {
        dispatch(articlesPageActions.setView(newView));
    }, [dispatch]);

    const handleChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(articlesPageActions.setOrder(newOrder));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const handleChangeSort = useCallback((newSort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(newSort));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const handleChangeSearch = useCallback((newSearch: string) => {
        dispatch(articlesPageActions.setSearch(newSearch));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchData();
    }, [dispatch, debouncedFetchData]);

    const handleChangeType = useCallback((tab: TabItem<ArticleType>) => {
        dispatch(articlesPageActions.setType(tab.value));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    return (
        <div className={classNames('', {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeOrder={handleChangeOrder}
                    onChangeSort={handleChangeSort}
                />
                <ArticleViewSelector
                    currentView={view}
                    onViewClick={handleChangeView}
                />
            </div>
            <Card className={cls.search}>
                <Input
                    placeholder={t('Поиск')}
                    value={search}
                    onChange={handleChangeSearch}
                />
            </Card>
            <ArticleTypeTabs value={type} onChange={handleChangeType} />
        </div>
    );
});
