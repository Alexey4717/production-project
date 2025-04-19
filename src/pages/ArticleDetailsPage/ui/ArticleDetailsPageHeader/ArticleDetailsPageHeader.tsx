import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/consts/router';
import { getArticleDetailsData } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { getCanEditArticle } from '../../model/selectors/article';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = (
    props: ArticleDetailsPageHeaderProps,
) => {
    const { className } = props;

    const { t } = useTranslation('article-details');
    const navigate = useNavigate();

    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    const handleBackToList = () => {
        navigate(getRouteArticles());
    };

    const handleEditArticle = () => {
        if (!article?.id) return;
        navigate(getRouteArticleEdit(article.id));
    };

    return (
        <HStack
            className={classNames('', {}, [className])}
            justify="between"
            max
        >
            <Button theme={ButtonTheme.OUTLINE} onClick={handleBackToList}>
                {t('Назад к списку')}
            </Button>
            {canEdit && (
                <Button theme={ButtonTheme.OUTLINE} onClick={handleEditArticle}>
                    {t('Редактировать')}
                </Button>
            )}
        </HStack>
    );
};
