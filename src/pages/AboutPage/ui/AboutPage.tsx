import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
    const { t } = useTranslation('about'); // в аргументах можно передать название файла, чтобы подгружать только чанку переводов страницы
    return <div>{t('О сайте')}</div>;
};

export default AboutPage;
