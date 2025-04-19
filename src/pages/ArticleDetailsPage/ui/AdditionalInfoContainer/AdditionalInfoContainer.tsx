import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { getArticleDetailsData } from '@/entities/Article';
import cls from './AdditionalInfoContainer.module.scss';
import { getRouteArticleEdit } from '@/shared/consts/router';

export const AdditionalInfoContainer = () => {
    const article = useSelector(getArticleDetailsData);

    const navigate = useNavigate();

    const onEditArticle = () => {
        if (article) {
            navigate(getRouteArticleEdit(article.id));
        }
    };

    if (!article) {
        return null;
    }

    return (
        <Card padding="24" border="partial" className={cls.card}>
            <ArticleAdditionalInfo
                onEdit={onEditArticle}
                author={article.user}
                createdAt={article.createdAt}
                views={article.views}
            />
        </Card>
    );
};
