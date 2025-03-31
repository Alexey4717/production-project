import { useTranslation } from 'react-i18next';
import { Country, CountrySelect } from '@/entities/Country';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar';
import { Input } from '@/shared/ui/Input';
import { Loader } from '@/shared/ui/Loader';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text';
import cls from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly?: boolean;
    onChangeFirstName?: (val?: string) => void;
    onChangeLastName?: (val?: string) => void;
    onChangeCity?: (val?: string) => void;
    onChangeAge?: (val?: string) => void;
    onChangeUsername?: (val?: string) => void;
    onChangeAvatar?: (val?: string) => void;
    onChangeCurrency?: (val?: Currency) => void;
    onChangeCountry?: (val?: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        readonly,
        onChangeFirstName,
        onChangeLastName,
        onChangeCity,
        onChangeAge,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
    } = props;

    const { t } = useTranslation('profile');

    if (isLoading) {
        return (
            <HStack
                className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}
                justify="center"
                max
                data-testid="ProfileCard"
            >
                <Loader />
            </HStack>
        );
    }

    if (error) {
        return (
            <HStack
                className={classNames(cls.ProfileCard, {}, [className, cls.error])}
                justify="center"
                max
                data-testid="ProfileCard"
            >
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                    align={TextAlign.CENTER}
                />
            </HStack>
        );
    }

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <VStack
            className={classNames(cls.ProfileCard, mods, [className])}
            gap="8"
            max
            data-testid="ProfileCard"
        >
            {data?.avatar && (
                <HStack justify="center">
                    <Avatar src={data?.avatar} />
                </HStack>
            )}

            <Input
                value={data?.first}
                readonly={readonly}
                onChange={onChangeFirstName}
                placeholder={t('Ваше имя')}
                data-testid="ProfileCard.firstname"
            />
            <Input
                value={data?.lastname}
                readonly={readonly}
                onChange={onChangeLastName}
                placeholder={t('Ваше фамилия')}
                data-testid="ProfileCard.lastname"
            />
            <Input
                value={data?.age}
                readonly={readonly}
                onChange={onChangeAge}
                placeholder={t('Ваш возраст')}
            />
            <Input
                value={data?.city}
                readonly={readonly}
                onChange={onChangeCity}
                placeholder={t('Город')}
            />
            <Input
                value={data?.username}
                readonly={readonly}
                onChange={onChangeUsername}
                placeholder={t('Введите имя пользователя')}
            />
            <Input
                value={data?.avatar}
                readonly={readonly}
                onChange={onChangeAvatar}
                placeholder={t('Введите ссылку на аватар')}
            />
            <CurrencySelect
                value={data?.currency}
                onChange={onChangeCurrency}
                readonly={readonly}
            />
            <CountrySelect
                value={data?.country}
                onChange={onChangeCountry}
                readonly={readonly}
            />
        </VStack>
    );
};
