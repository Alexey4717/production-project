import { type MutableRefObject, useEffect } from 'react';

interface UseInfinityScrollOptions {
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLElement>; // ссылка на элемент, после пересечения которого будет вызываться callback
    wrapperRef: MutableRefObject<HTMLElement>; // враппер, внутри которого находится скролл (Page или document)
}

export function useInfinityScroll({
    callback,
    triggerRef,
    wrapperRef,
}: UseInfinityScrollOptions) {
    useEffect(() => {
        let observer: IntersectionObserver | null = null;
        // Нужно замкнуть domNodes внутри колбека в useEffect;
        // Так они будут доступны и в случае когда компонент демонтировался.
        const wrapperElement = wrapperRef.current;
        const triggerElement = triggerRef.current;

        if (callback) {
            const options = {
                root: wrapperElement,
                rootMargin: '0px',
                threshold: 1.0,
            };

            // Объект наблюдатель
            observer = new IntersectionObserver(
                // колбек вызывается в тот момент, когда на экране появляется элемент за которым мы следим
                (
                    [entry], // массив элементов за которыми наблюдаем (мы только за 1-м)
                    observer,
                ) => {
                    // колбек отрабатывает 2-жды (при скроле вниз/вверх), чтобы этого избежать проверка
                    // Т.е. будет только один запуск за появление в области видимости
                    // После изчезания из поля видимости isIntersecting сбрасывается и при повторном скроле будет отрабатывать снова
                    if (entry.isIntersecting) {
                        callback(); // объект появился в области видимости
                    }
                },
                options,
            );

            // При появлении в поле видимости будет тригериться колбек
            observer.observe(triggerElement); // то зачем наблюдать
        }

        // Для избежания утечек памяти
        return () => {
            if (observer && triggerElement) {
                // тут ts не понимает что передается объект, ссылка на который никогда не поменяется
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(triggerElement);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}
