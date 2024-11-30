import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// для удобной работы с i18n можно установить плагины в редактор кода
// для vscode - i18n-ally
// для webstorm - i18n support
// с помощью них можно видеть, какие ключи используются в схемах,
// так же автоматически создавать ключи в других схемах

// use - использование разных плагинов (можно писать свои)
i18n
    .use(Backend) // для асинхронной подгрузки чанков, только нужного языка, а не всех пакетов сразу
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en', // язык по-умолчанию
        debug: __IS_DEV__, // выбрасывание в консоль ворнингов для дебага

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },

        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
    });

export default i18n;
