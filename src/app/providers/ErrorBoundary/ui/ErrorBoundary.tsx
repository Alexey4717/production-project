import { Component, type ReactNode, type ErrorInfo, Suspense } from 'react';
import { ErrorPage } from '@/widgets/ErrorPage';
import { Loader } from '@/shared/ui/deprecated/Loader';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Можно использовать другой свой сервис для логирования
        console.log(error, errorInfo);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            // You can render any custom fallback UI
            return (
                <Suspense fallback={<Loader />}>
                    <ErrorPage />
                </Suspense>
            );
        }

        return children;
    }
}

// export default withTranslation()(ErrorBoundary); // Для интернационализации классовых компонентов
export default ErrorBoundary;
