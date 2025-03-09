import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleDetails } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page/Page';
import cls from './ArticleDetailsPage.module.scss';
import {
    ArticleDetailsPageHeader,
} from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsComments } from '../ArticleDetailsComment/ArticleDetailsComments';

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const {
        className,
    } = props;

    const { id } = useParams<{ id: string; }>();
    const { t } = useTranslation('article-details'); // TODO убрать переводы

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <VStack gap="16" max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>

    );
};

export default memo(ArticleDetailsPage);
