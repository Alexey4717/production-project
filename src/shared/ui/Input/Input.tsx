import {
    memo,
    useRef,
    useState,
    useEffect,
    type InputHTMLAttributes,
    type ChangeEvent,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    autofocus?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        autofocus,
        type = 'text',
        placeholder,
        ...otherProps
    } = props;

    const ref = useRef<HTMLInputElement>(null);

    const [isFocused, setIsFocused] = useState(false);
    const [carriagePosition, setCarriagePosition] = useState(0);

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setCarriagePosition(e.target.value.length);
    };

    // выход из инпута
    const onBlur = () => {
        setIsFocused(false);
    };

    // фокусировка на инпуте
    const onFocus = () => {
        setIsFocused(true);
    };

    // Для перемещения каретки в произвольную область внутри текста
    const onSelect = (e: any) => {
        setCarriagePosition(e?.target?.selectionStart || 0);
    };

    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            {placeholder && (
                <div className={cls.placeholder}>
                    {`${placeholder}>`}
                </div>
            )}

            <div className={cls.carriageWrapper}>
                <input
                    ref={ref}
                    value={value}
                    type={type}
                    onChange={onChangeHandler}
                    className={cls.input}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onSelect={onSelect}
                    {...otherProps}
                />
                {isFocused && (
                    <span className={cls.carriage} style={{ left: `${carriagePosition * 9}px` }} />
                )}
            </div>
        </div>
    );
});
