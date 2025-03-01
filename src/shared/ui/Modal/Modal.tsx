import { useTheme } from 'app/providers/ThemeProvider';
import {
    type ReactNode,
    type MouseEvent,
    useState,
    useRef,
    useCallback,
    useEffect,
} from 'react';
import { classNames, type Mods } from 'shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import { Portal } from '../Portal/Portal';

const ANIMATION_DELAY = 300;

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    // Если в модалку будет помещаться асинхронный компонент
    lazy?: boolean;
}

export const Modal = ({
    className,
    children,
    isOpen,
    onClose,
    lazy = false,
}: ModalProps) => {
    const { theme } = useTheme();
    // Это нужно для создания анимации плавного закрытия, т.к. css не справится
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    const closeHandler = useCallback(() => {
        if (typeof onClose === 'function') {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onContentClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    const onKeyDown = useCallback((event: globalThis.KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    useEffect(() => {
        // Закрытие модалки на кнопку Esc
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) return null;

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                {/* Это бэкграунд обложка, при нажатии на которую модалка закрывается */}
                <div className={cls.overlay} onClick={closeHandler}>
                    {/* это содержимое модалки */}
                    <div
                        className={cls.content}
                        onClick={onContentClick}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
