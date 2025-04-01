import { type ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from '@/shared/config/i18n/i18nForTests';

// Эта функция оборачивает тестируемый компонент в обертку и добавляет нужную конфигурация для переводов
export const renderWithTranslation = (component: ReactNode) =>
    render(<I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>);
