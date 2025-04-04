import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode; // Что телепортируем
    element?: HTMLElement; // Куда телепортируем
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Portal = (props: PortalProps) => {
    const {
        children,
        element = document.body, // Если не указано куда, то телепорт в самый корень (body)
    } = props;
    // TODO
    // @ts-ignore
    return createPortal(children, element);
};
