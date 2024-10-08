import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'shared/config/i18n/i18n'; // импорт нужен для работы i18n
import App from 'app/App';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';

render(
    <BrowserRouter>
        <ErrorBoundary>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </ErrorBoundary>
    </BrowserRouter>,
    document.getElementById('root'),
);
