import { Country, CountrySelect } from 'entities/Country';
import { useTranslation } from 'react-i18next';
import { Currency, CurrencySelect } from 'entities/Currency';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
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
            <div className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            {data?.avatar && (
                <div className={cls.avatarWrapper}>
                    <Avatar src={data?.avatar} />
                </div>
            )}

            <Input
                className={cls.input}
                value={data?.first}
                readonly={readonly}
                onChange={onChangeFirstName}
                placeholder={t('Ваше имя')}
            />
            <Input
                className={cls.input}
                value={data?.lastname}
                readonly={readonly}
                onChange={onChangeLastName}
                placeholder={t('Ваше фамилия')}
            />
            <Input
                className={cls.input}
                value={data?.age}
                readonly={readonly}
                onChange={onChangeAge}
                placeholder={t('Ваш возраст')}
            />
            <Input
                className={cls.input}
                value={data?.city}
                readonly={readonly}
                onChange={onChangeCity}
                placeholder={t('Город')}
            />
            <Input
                className={cls.input}
                value={data?.username}
                readonly={readonly}
                onChange={onChangeUsername}
                placeholder={t('Введите имя пользователя')}
            />
            <Input
                className={cls.input}
                value={data?.avatar}
                readonly={readonly}
                onChange={onChangeAvatar}
                placeholder={t('Введите ссылку на аватар')}
            />
            <CurrencySelect
                className={cls.input}
                value={data?.currency}
                onChange={onChangeCurrency}
                readonly={readonly}
            />
            <CountrySelect
                className={cls.input}
                value={data?.country}
                onChange={onChangeCountry}
                readonly={readonly}
            />
        </div>
    );
};
