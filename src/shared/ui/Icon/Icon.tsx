import { FunctionComponent, memo, type SVGProps } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps {
    className?: string;
    Svg: FunctionComponent<SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}

export const Icon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        inverted,
    } = props;

    return (
        <Svg className={classNames(inverted ? cls.inverted : cls.Icon, {}, [className])} />
    );
});
