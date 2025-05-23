import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = (props: ArticleEditPageProps) => {
    const { className } = props;

    const { t } = useTranslation('article-management');
    const { id } = useParams<{ id: string }>();

    const isEdit = Boolean(id);

    return (
        <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
            {isEdit
                ? `${t('Редактирование статьи с id = ')}${id}`
                : t('Создание новой статьи')}
        </Page>
    );
};

export default ArticleEditPage;
