import { useCallback, useRef } from 'react';

export function useThrottle(callback: (...args: any[]) => void, delay: number) {
    // boolean показывает, можно ли сейчас вызывать событие callback или нет
    const throttlingRef = useRef(false);
    return useCallback((...args: any[]) => {
        if (!throttlingRef.current) {
            callback(...args);
            throttlingRef.current = true;

            const timeout = setTimeout(() => {
                throttlingRef.current = false;
                clearTimeout(timeout);
            }, delay);
        }
    }, [callback, delay]);
}
