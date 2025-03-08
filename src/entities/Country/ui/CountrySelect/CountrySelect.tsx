import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ListBox } from 'shared/ui/Popups/ui/ListBox/ListBox';
import { Select } from 'shared/ui/Select/Select';
import { Country } from '../../model/types/country';

const options = [
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Ukraine, content: Country.Ukraine },
];

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

export const CountrySelect = memo((props: CountrySelectProps) => {
    const {
        className,
        value,
        onChange,
        readonly,
    } = props;

    const { t } = useTranslation();

    return (
        <ListBox
            className={classNames('', {}, [className])}
            defaultValue={t('Укажите страну')}
            value={value as string}
            onChange={onChange as ((value: string) => void)}
            label={t('Укажите страну')}
            items={options}
            readonly={readonly}
        />
    );
});
