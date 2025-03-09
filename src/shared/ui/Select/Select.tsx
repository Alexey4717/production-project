import {
    ChangeEvent,
    memo,
    useCallback,
    useMemo,
} from 'react';
import { classNames, type Mods } from '@/shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOption<T extends string = string> {
    value: T;
    content: string;
}

interface SelectProps<T extends string> {
    className?: string;
    label?: string;
    options?: SelectOption<T>[];
    value?: T; // Выбранное значение
    onChange?: (value: T) => void;
    readonly?: boolean;
}

const SelectComponent = <T extends string>(props: SelectProps<T>) => {
    const {
        className,
        label,
        options,
        value,
        onChange,
        readonly,
    } = props;

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target?.value as T);
    }, [onChange]);

    const optionsList = useMemo(() => (options ?? [])?.map((opt: SelectOption<T>) => (
        <option
            key={opt.value}
            value={opt.value}
            className={cls.option}
        >
            {opt.content}
        </option>
    )), [options]);

    const mods: Mods = {};

    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label && <span className={cls.label}>{`${label}>`}</span>}

            <select
                value={value}
                onChange={onChangeHandler}
                className={cls.select}
                disabled={readonly}
            >
                {optionsList}
            </select>
        </div>
    );
};

// из-за того, что теряются типы в memo
export const Select = memo(SelectComponent) as typeof SelectComponent;
