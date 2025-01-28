import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleList } from 'entities/Article';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('articles');

    return (
        <div className={classNames(cls.ArticlesPage, {}, [className])}>
            <ArticleList articles={[]} />
        </div>
    );
};

export default memo(ArticlesPage);
