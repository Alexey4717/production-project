import { type MutableRefObject, useRef } from 'react';

/**
 * Хук, который позволяет отменять предыдущий вызов функции пока не истечет delay
 * @param callback
 * @param delay - задержка в мс
 */
export function useDebounce(callback: (...args: any[]) => void, delay: number) {
    const timer = useRef(undefined) as MutableRefObject<any>;

    return (...args: any[]) => {
        if (timer.current) {
            // Пока таймер очищается колбек вызван не будет
            clearTimeout(timer.current);
        }
        // когда очистка прекращается - вызывается колбек
        timer.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}
