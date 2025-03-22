import {
    memo,
    type MutableRefObject,
    type ReactNode,
    type UIEvent,
    useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getUIScrollByPath, uiActions } from '@/features/UI';
import { PAGE_ID } from '@/shared/consts/page';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfinityScroll } from '@/shared/lib/hooks/useInfinityScroll/useInfinityScroll';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
    const {
        className,
        children,
        onScrollEnd,
    } = props;

    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const scrollPosition = useSelector(
        // Стрелочная функция, т.к. хук useSelect может работать только с функцией с 1 аргументом
        (state: StateSchema) => getUIScrollByPath(state, pathname),
    );

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfinityScroll({
        callback: onScrollEnd,
        wrapperRef,
        triggerRef,
    });

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    const onScroll = useThrottle((event: UIEvent<HTMLDivElement>) => {
        dispatch(
            uiActions.setScrollPosition({
                path: pathname,
                position: event.currentTarget.scrollTop,
            }),
        );
    }, 500);

    return (
        <main
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
            onScroll={onScroll}
            id={PAGE_ID}
        >
            {children}
            {onScrollEnd ? <div ref={triggerRef} className={cls.trigger} /> : null}
        </main>
    );
});
