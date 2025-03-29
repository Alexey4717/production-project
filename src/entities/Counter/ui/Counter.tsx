import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';

export const Counter = () => {
    const { t } = useTranslation();

    const counterValue = useCounterValue();
    const { increment, decrement } = useCounterActions();

    // Обертка в функцию нужна, т.к. если передать в кнопку в чистом виде как increment
    // То будет ворнинг в консоли передача несериализуемого значения (из-за event)
    // Если в аргументах ничего не передается, то можно юзать в чистом виде
    const handleIncrement = useCallback(() => {
        increment();
    }, [increment]);

    const handleDecrement = useCallback(() => {
        decrement();
    }, [decrement]);

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button
                onClick={handleIncrement}
                data-testid="increment-btn"
            >
                {t('increment')}
            </Button>
            <Button
                onClick={handleDecrement}
                data-testid="decrement-btn"
            >
                {t('decrement')}
            </Button>
        </div>
    );
};
