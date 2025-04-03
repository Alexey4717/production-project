import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getFeatureFlag, toggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/Card';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleDetails } from '@/entities/Article';
import { ArticleRating } from '@/features/articleRating';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsComments } from '../ArticleDetailsComment/ArticleDetailsComments';

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;

    const { t } = useTranslation('article-details');
    const { id } = useParams<{ id: string }>();

    const isArticleDetailsEnabled = getFeatureFlag('isArticleRatingEnabled');

    if (!id) {
        return null;
    }

    const articleRating = toggleFeatures<ReactNode>({
        name: 'isArticleRatingEnabled',
        on: () => <ArticleRating articleId={id} />,
        off: () => <Card>{t('Оценка статей скоро появится')}</Card>, // старая фича
    });

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <VStack gap="16" max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    {articleRating}
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
