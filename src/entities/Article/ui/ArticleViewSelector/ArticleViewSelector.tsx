import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import ListIcon from '@/shared/assets/icons/list-24-24.svg';
import TiledIcon from '@/shared/assets/icons/tiled-24-24.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '../../model/consts/articleConsts';

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: TiledIcon,
    },
    {
        view: ArticleView.BIG,
        icon: ListIcon,
    },
];

interface ArticleViewSelectorProps {
    className?: string;
    currentView: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const {
        className,
        currentView,
        onViewClick,
    } = props;

    const { t } = useTranslation();

    const handleViewClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map(({ view, icon }) => (
                <Button
                    key={view}
                    theme={ButtonTheme.CLEAR}
                    onClick={handleViewClick(view)}
                >
                    <Icon
                        className={classNames('', { [cls.notSelected]: currentView !== view })}
                        Svg={icon}
                    />
                </Button>
            ))}
        </div>
    );
});
