import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { getUserInited, userActions } from '@/entities/User';
import { Navbar } from '@/widgets/Navbar';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Sidebar } from '@/widgets/Sidebar';
import { AppRouter } from './providers/router';

const App = () => {
    const { theme } = useTheme();

    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

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
