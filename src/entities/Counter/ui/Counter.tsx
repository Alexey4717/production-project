import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/deprecated/Button';
import {
    useCounterValue,
    useCounterValue2,
    useCounterValue3,
    useCounterValue4,
} from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';

export const Counter = () => {
    const { t } = useTranslation();

    const counterValue = useCounterValue();
    const counterValue2 = useCounterValue2();
    const counterValue3 = useCounterValue3();
    const counterValue4 = useCounterValue4();
    const { increment, decrement } = useCounterActions();

    // Обертка в функцию нужна, т.к. если передать в кнопку в чистом виде как increment
    // То будет ворнинг в консоли передача несериализуемого значения (из-за event)
    // Если в аргументах ничего не передается, то можно юзать в чистом виде
    const handleIncrement = () => {
        increment();
    };

    const handleDecrement = () => {
        decrement();
    };

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <h1 data-testid="value-title">{counterValue2}</h1>
            <h1 data-testid="value-title">{counterValue3}</h1>
            <h1 data-testid="value-title">{counterValue4}</h1>
            <Button onClick={handleIncrement} data-testid="increment-btn">
                {t('increment')}
            </Button>
            <Button onClick={handleDecrement} data-testid="decrement-btn">
                {t('decrement')}
            </Button>
        </div>
    );
};
