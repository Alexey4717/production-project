import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';

type Selector<T> = (state: StateSchema) => T;
type Result<T> = [() => T, Selector<T>]

export function buildSelector<T>(selector: Selector<T>): Result<T> {
    const useSelectorHook = () => {
        return useSelector(selector);
    };

    return [useSelectorHook, selector];
}

// Тут так же можно реализовать механизм с релесектом
// Если прилетает 1 аргумент селектором, то его просто так же возвращаем.
// Если приходит несколько селекторов, можно сразу их оборачивать в createSelect и возвращать уже её.
