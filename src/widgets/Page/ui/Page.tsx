import {
    memo,
    type MutableRefObject,
    type ReactNode,
    type UIEvent,
    useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toggleFeatures } from '@/shared/lib/features';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getUIScrollByPath, uiActions } from '@/features/UI';
import { TestProps } from '@/shared/types/tests';
import { PAGE_ID } from '@/shared/consts/page';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfinityScroll } from '@/shared/lib/hooks/useInfinityScroll/useInfinityScroll';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import cls from './Page.module.scss';

interface PageProps extends TestProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
    const { className, children, onScrollEnd } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: StateSchema) =>
        getUIScrollByPath(state, pathname),
    );

    useInfinityScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(
            uiActions.setScrollPosition({
                position: e.currentTarget.scrollTop,
                path: pathname,
            }),
        );
    }, 500);

    return (
        <main
            ref={wrapperRef}
            className={classNames(
                toggleFeatures({
                    name: 'isAppRedesigned',
                    on: () => cls.PageRedesigned,
                    off: () => cls.Page,
                }),
                {},
                [className],
            )}
            onScroll={onScroll}
            id={PAGE_ID}
            data-testid={props['data-testid'] ?? 'Page'}
        >
            {children}
            {onScrollEnd ? (
                <div className={cls.trigger} ref={triggerRef} />
            ) : null}
        </main>
    );
});
