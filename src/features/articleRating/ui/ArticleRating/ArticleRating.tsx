import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import {
    useGetArticleRating,
    useRateArticle,
} from '../../api/articleRatingApi';

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = (props: ArticleRatingProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation('article-details');
    const userData = useSelector(getUserAuthData);

    const { data, isLoading } = useGetArticleRating({
        articleId,
        userId: userData?.id ?? '',
    });
    const [rateArticleMutation] = useRateArticle();

    const handleRateArticle = (starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                userId: userData?.id ?? '',
                articleId,
                rate: starsCount,
                feedback,
            });
        } catch (e) {
            console.error(e);
        }
    };

    const onAccept = (starsCount: number, feedback?: string) => {
        handleRateArticle(starsCount, feedback);
    };

    const onCancel = (starsCount: number) => {
        handleRateArticle(starsCount);
    };

    if (isLoading) {
        return <Skeleton width="100%" height={120} />;
    }

    const rating = data?.[0];

    return (
        <RatingCard
            onCancel={onCancel}
            onAccept={onAccept}
            rate={rating?.rate}
            className={className}
            title={t('Оцените статью')}
            feedbackTitle={t(
                'Оставьте свой отзыв о статье, это поможет улучшить качество',
            )}
            hasFeedback
        />
    );
};

export default ArticleRating;
