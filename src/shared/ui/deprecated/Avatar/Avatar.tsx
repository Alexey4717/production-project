import { CSSProperties } from 'react';
import { classNames, type Mods } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../../redesigned/AppImage';
import { Skeleton } from '../../redesigned/Skeleton';
import UserIcon from '../../../assets/icons/user-filled.svg';
import { Icon } from '../Icon';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
    fallbackInverted?: boolean; // На случай, если используем аватар где-то в сайдбаре, навбаре или другом месте, где инвертированные цвета
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Avatar = (props: AvatarProps) => {
    const { className, src, size = 100, alt, fallbackInverted } = props;

    const mods: Mods = {};

    const styles: CSSProperties = {
        width: size,
        height: size, // Одинаковые, т.к. иконка будет круглая
    };

    const fallback = <Skeleton width={size} height={size} border="50%" />;
    const errorFallback = (
        <Icon
            inverted={fallbackInverted}
            Svg={UserIcon}
            width={size}
            height={size}
        />
    );

    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            src={src}
            alt={alt}
            className={classNames(cls.Avatar, mods, [className])}
            style={styles}
        />
    );
};
