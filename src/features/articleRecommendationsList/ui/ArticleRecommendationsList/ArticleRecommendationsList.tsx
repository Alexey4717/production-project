import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleList } from 'entities/Article';
import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');

    const { data: articles, isLoading, isError } = useArticleRecommendationsList(3);

    // TODO add loader
    if (isLoading || isError || !articles) return null;

    return (
        <VStack
            className={classNames('', {}, [className])}
            gap="8"
        >
            <Text
                size={TextSize.L}
                title={t('Рекомендуем')}
            />
            <ArticleList
                articles={articles}
                target="_blank"
                virtualized={false}
            />
        </VStack>
    );
});
