import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('article');

    const str = 'ARTICLE_DETAILS_PAGE';

    return (
        <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            {str}
        </div>
    );
};

export default memo(ArticleDetailsPage);
