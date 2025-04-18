import AppSvg from '@/shared/assets/icons/app-image.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import { HStack } from '../Stack';

interface AppLogoProps {
    className?: string;
    size?: number;
}

export const AppLogo = ({ className, size = 50 }: AppLogoProps) => {
    return (
        <HStack
            max
            justify="center"
            className={classNames(cls.appLogoWrapper, {}, [className])}
        >
            <AppSvg
                width={size}
                height={size}
                color="black"
                className={cls.appLogo}
            />
            <div className={cls.gradientBig} />
            <div className={cls.gradientSmall} />
        </HStack>
    );
};
