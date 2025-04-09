import { memo } from 'react';
import { Icon } from '@/shared/ui/redesigned/Icon';
import CircleIcon from '@/shared/assets/icons/circle-up.svg';

interface ScrollToTopButtonProps {
    className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
    const { className } = props;

    const onCLick = () => {
        // Тут нет эффекта smooth, т.к. (насколько я понял) скролит не body, а другой внутренний контейнер
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Icon
            className={className}
            Svg={CircleIcon}
            clickable
            onClick={onCLick}
            width={32}
            height={32}
        />
    );
});
