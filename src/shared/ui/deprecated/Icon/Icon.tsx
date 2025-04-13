import type { SVGProps, JSX } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps extends SVGProps<SVGSVGElement> {
    className?: string;
    Svg: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    inverted?: boolean;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Icon = (props: IconProps) => {
    const { className, Svg, inverted, ...otherProps } = props;

    return (
        <Svg
            className={classNames(inverted ? cls.inverted : cls.Icon, {}, [
                className,
            ])}
            {...otherProps}
        />
    );
};
