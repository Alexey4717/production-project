import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';
import cls from './ArticleTypeTabs.module.scss';
import { ArticleType } from '../../model/consts/articleConsts';

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChange: (tab: TabItem<ArticleType>) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const {
        className,
        value,
        onChange,
    } = props;

    const { t } = useTranslation('articles');

    const typeTabs = useMemo<TabItem<ArticleType>[]>(() => ([
        {
            value: ArticleType.ALL,
            content: t('Все статьи'),
        },
        {
            value: ArticleType.IT,
            content: t('Айти'),
        },
        {
            value: ArticleType.ECONOMICS,
            content: t('Экономика'),
        },
        {
            value: ArticleType.SCIENCE,
            content: t('Наука'),
        },
    ]), [t]);

    return (
        <Tabs<ArticleType>
            className={classNames(cls.ArticleTypeTabs, {}, [className])}
            tabs={typeTabs}
            value={value}
            onTabClick={onChange}
        />
    );
});
