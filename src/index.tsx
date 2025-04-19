import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { ForceUpdateProvider } from '@/shared/lib/render/forceUpdate';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { ErrorPage } from '@/widgets/ErrorPage';
import App from '@/app/App';
import '@/app/styles/index.scss';
import '@/shared/config/i18n/i18n';

const container = document.getElementById('root');

if (!container) {
    throw new Error(
        'Контейнер root не найден. НЕ удалось вмонтировать реакт приложение',
    );
}

const errorFallback = (
    <Suspense fallback={<Loader />}>
        <ErrorPage />
    </Suspense>
);

const root = createRoot(container, {
    onUncaughtError: (error, errorInfo) => {
        // Ошибки не перехваченные ErrorBoundary
        // (ошибки, не обрабатываемые в компонентах React, или неожиданные ошибки, возникшие при асинхронных операциях)
        console.error('error: ', error);
        console.error('errorInfo: ', errorInfo);
        return errorFallback;
    },
    onCaughtError: (error, errorInfo) => {
        // ошибка перехвачена любым компонентом ErrorBoundary
        // тут можно показывать fallback UI или отправлять ошибку на сервер
        console.error('error: ', error);
        console.error('errorInfo: ', errorInfo);
        return errorFallback;
    },
});

root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ForceUpdateProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </ForceUpdateProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
export { Theme } from '@/shared/consts/theme';
