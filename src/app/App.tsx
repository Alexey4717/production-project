import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { getUserInited, initAuthData } from '@/entities/User';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Sidebar } from '@/widgets/Sidebar';
import { AppRouter } from './providers/router';

const App = () => {
    const { theme } = useTheme();

    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!inited) {
        return <PageLoader />;
    }

    return (
        <div className={classNames('app', {}, [theme])}>
            {/* Suspense нужен для i18n-backend, т.к. перевод асинхронный */}
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
};

export default App;
