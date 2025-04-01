import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox } from '@/shared/ui/Popups';
import { Currency } from '../../model/types/currency';

const options = [
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
    { value: Currency.RUB, content: Currency.RUB },
];

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const { className, value, onChange, readonly } = props;

    const { t } = useTranslation();

    return (
        <ListBox
            className={classNames('', {}, [className])}
            defaultValue={t('Укажите валюту')}
            value={value as string}
            onChange={onChange as (value: string) => void}
            label={t('Укажите валюту')}
            items={options}
            readonly={readonly}
        />
    );
});
