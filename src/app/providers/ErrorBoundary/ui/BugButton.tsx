import { useEffect, useState } from 'react';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';

// Компонент для тестирования ErrorBoundary
export const BugButton = () => {
    const [error, setError] = useState(false);

    const onThrow = () => setError(true);
    const { t } = useTranslation();

    useEffect(() => {
        if (error) {
            throw new Error('Преднамеренная ошибка для тестирования');
        }
    }, [error]);

    return (
        <Button
            onClick={onThrow}
        >
            {t('создать ошибку')}
        </Button>
    );
};
