# Локализация в проекте с помощью i18next

Для реализации мультиязычности в проекте используется библиотека [i18next](https://www.i18next.com/)
и ее адаптация для React — [react-i18next](https://react.i18next.com/).

----

## Установка

```bash
yarn add i18next react-i18next
```

### Конфигурация i18n

Создайте файл i18n.ts в shared/config/i18n:

```ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// use - использование разных плагинов (можно писать свои)
i18n.use(Backend) // для асинхронной подгрузки чанков, только нужного языка, а не всех пакетов сразу
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en', // язык по-умолчанию
        debug: __IS_DEV__, // выбрасывание в консоль ворнингов для дебага (указать false если не нужны)
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
    });

export default i18n;
```

### Структура переводов

```sourcegraph
public/
  locales/
    en/
      translation.json
    ru/
      translation.json
```

Также рекомендуется установить [ESLint-плагин](https://github.com/edvardchen/eslint-plugin-i18next),
чтобы подсвечивать строки в JSX, которые не обернуты в перевод:

```bash
yarn add -D eslint-plugin-i18next
```

----

## Настройка ESLint

Для работы плагина eslint-plugin-i18next нужно внести изменения в .eslintrc.js:

```js
plugins: ['i18next'],
extends: ['plugin:i18next/recommended'],
rules: {
  'i18next/no-literal-string': [
    'error',
    {
      markupOnly: true, // Проверять только в JSX/TSX
      ignoreAttribute: ['data-testid'], // Игнорировать атрибуты
    },
  ],
}
```

----

## Основы использования

### Оборачиваем приложение в провайдер

```tsx
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

<React.StrictMode>
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
</React.StrictMode>
```

### В функциональных компонентах:

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  return <h1>{t('welcome_message')}</h1>;
};
```

Переключение языков: i18n.changeLanguage('en')

### В классовых компонентах используется HOC:

```tsx
import { withTranslation } from 'react-i18next';

class MyComponent extends React.Component {
  render() {
    const { t } = this.props;
    return <h1>{t('welcome_message')}</h1>;
  }
}

export default withTranslation()(MyComponent);
```

----

## Использование в тестах

Чтобы компоненты в тестах корректно отображались с переводами, создана отдельная конфигурация i18nForTests:

<b>shared/config/i18n/i18nForTests.ts</b>

```ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    lng: 'ru',
    fallbackLng: 'ru',
    debug: false,
    interpolation: {
        escapeValue: false, // not needed for react!!
    },
    resources: { ru: { translations: {} } },
});

export default i18n;
```

Примерная структура (взята и адаптирована с [официального гида](https://react.i18next.com/misc/testing)).

Также создан вспомогательный хелпер:

<b>shared/lib/test/renderWithTranslation.ts</b>

```tsx
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/i18n/i18nForTests';

export function renderWithTranslation(component: ReactNode) {
    return render(<I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>);
}
```

Эта функция оборачивает тестируемый компонент в обертку и добавляет нужную конфигурация для переводов.

----

## Интеграция в Storybook

Чтобы переводы корректно работали в Storybook, создан специальный декоратор:

<b>shared/config/storybook/TranslationDecorator.tsx</b>

```tsx
import { I18nextProvider } from 'react-i18next';
import { Story } from '@storybook/react';
import i18n from 'shared/config/i18n/i18n';

export const TranslationDecorator = (StoryComponent: Story) => (
  <I18nextProvider i18n={i18n}>
    <StoryComponent />
  </I18nextProvider>
);
```

Добавляем декоратор в preview.ts:

```ts
import { TranslationDecorator } from 'shared/config/storybook/TranslationDecorator';
...
decorators = [TranslationDecorator];
...
```

Чуть позже вынесли логику в ComponentRender
Будем её везде для unit-тестов использовать.
Т.к. зачем 2 разные функции работающие отдельно.
Если в случае с декораторами это ещё можно понять, то в случае рендера это избыточно.

----

## Добавление переводов в production-сборку

Переводческие файлы (.json) хранятся в public/locales.
Однако, при сборке (yarn build:prod) они по умолчанию не копируются в build.
Чтобы это исправить:

1. Установим плагин для Webpack:

```bash
yarn add -D copy-webpack-plugin
```

2. В файле config/build/types/config.ts:

```ts
export interface BuildPaths {
  ...
  locales: string; // путь до исходных файлов переводов
  buildLocales: string; // путь куда нужно их скопировать
}
```

3. В webpack.config.ts передаем locales и buildLocales в paths.

4. В config/build/buildPlugins.ts:

```ts
import CopyPlugin from 'copy-webpack-plugin';

plugins.push(
    // locales хранятся в public и нужно чтобы в папке build они были.
    new CopyPlugin({
        patterns: [
            { from: paths.locales, to: paths.buildLocales },
        ],
    }),
);
```

5. Т.к. в конфигурации i18next (i18n.ts) указан путь к файлам:

```ts
loadPath: '/locales/{{lng}}/{{ns}}.json',
```

То после сборки в папке build будут присутствовать переводы.

----

## Поддержка плюральных форм

Многие языки (включая русский) имеют множественные формы слов в зависимости от количества.
Например:

- 1 просмотр
- 2 просмотра
- 5 просмотров

Для этого используем встроенную поддержку плюралей в i18next:

```tsx
t('{{count}} просмотров', { count: views });
```

В JSON-переводах:

```json
{
  "{{count}} просмотров_zero": "{{count}} просмотров",
  "{{count}} просмотров_one": "{{count}} просмотр",
  "{{count}} просмотров_few": "{{count}} просмотра",
  "{{count}} просмотров_many": "{{count}} просмотров"
}
```

Параметр count обязателен, так как он используется для определения формы.
Количество форм и их названия зависят от языка и автоматически подставляются на основе локали.

----

## Дополнительно

### i18next-http-backend: загрузка переводов с сервера

i18next-http-backend - это плагин для i18next, который загружает файлы переводов с сервера через HTTP-запросы.

Основные функции:

- Динамическая загрузка переводов при необходимости
- Поддержка разделения на namespaces (пространства имен)
- Кеширование загруженных переводов

Конфигурация:

```js
import i18next from 'i18next';
import Backend from 'i18next-http-backend';

i18next
  .use(Backend)
  .init({
    backend: {
      // Путь для загрузки переводов
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      
      // Дополнительные параметры:
      crossDomain: true, // для CORS
      requestOptions: { // параметры запроса
        mode: 'cors',
        credentials: 'same-origin',
        cache: 'default'
      }
    }
  });
```

### Особенности работы

При инициализации загружаются только базовые переводы
Дополнительные namespaces загружаются по мере необходимости
Поддерживает .json и .json5 форматы

## i18next-browser-languagedetector: автоматическое определение языка

Этот плагин автоматически определяет предпочитаемый язык пользователя на основе:

- Параметра URL (?lng=ru)
- Cookie (i18next=ru)
- LocalStorage (i18nextLng: "ru")
- Заголовка Accept-Language
- HTML-атрибута (<html lang="ru">)
- Навигатора (navigator.language)

### Конфигурация

```js
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(LanguageDetector)
  .init({
    detection: {
      // Порядок проверки источников
      order: ['querystring', 'cookie', 'localStorage', 'htmlTag'],
      
      // Ключи, где хранится язык
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      
      // Настройки кеша
      caches: ['localStorage', 'cookie'],
      excludeCacheFor: ['cimode'],
      
      // Cookie options
      cookieMinutes: 10,
      cookieDomain: 'myDomain.com'
    }
  });
```

## Бэкенд-интеграция: полный цикл интернационализации

### 1. Серверная часть (Node.js пример)

Структура проекта:

```sourcegraph
server/
  locales/
    en/
      common.json
      validation.json
    ru/
      common.json
      validation.json
  i18n.js
  server.js
```

Настройка i18next на сервере:

```js
// server/i18n.js
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en', 'ru'],
    ns: ['common', 'validation'],
    defaultNS: 'common',
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json',
      addPath: './locales/{{lng}}/{{ns}}.missing.json'
    },
    detection: {
      order: ['header', 'cookie'],
      caches: ['cookie']
    }
  });

module.exports = i18next;
```

Интеграция с Express:

```js
// server/server.js
const express = require('express');
const i18n = require('./i18n');
const i18nMiddleware = require('i18next-http-middleware');

const app = express();

app.use(i18nMiddleware.handle(i18n));

app.get('/api/data', (req, res) => {
  // Использование в роуте
  const message = req.t('common:welcome_message');
  res.json({ message });
});
```

### 2. Клиент-серверное взаимодействие

Вариант 1: Отдельные файлы переводов

- Бэкенд отдает статические JSON-файлы
- Клиент загружает их через i18next-http-backend

Вариант 2: API для переводов

```js
// Серверный роут
app.get('/api/translations/:lng/:ns', (req, res) => {
  const { lng, ns } = req.params;
  const translations = i18n.getResourceBundle(lng, ns);
  res.json(translations);
});

// Клиентская конфигурация
i18n.use(Backend).init({
  backend: {
    loadPath: '/api/translations/{{lng}}/{{ns}}'
  }
});
```

### 3. Синхронизация языков

Сервер передает клиенту:

```jsx
// В шаблоне HTML
<script>
  window.initialI18nStore = {{i18nStore}};
  window.initialLanguage = '{{lng}}';
</script>

// Клиентская инициализация
i18n.init({
  lng: window.initialLanguage,
  resources: window.initialI18nStore
});
```

Через HTTP-заголовки:

```js
// Сервер устанавливает cookie
res.cookie('i18next', req.language);

// Клиент использует тот же язык
i18n.use(LanguageDetector).init({
  detection: {
    order: ['cookie']
  }
});
```

### Продвинутые сценарии

1. Динамическое обновление переводов

```js
// Серверная часть
app.post('/api/translations', async (req, res) => {
  await i18n.reloadResources(['en', 'ru'], ['common']);
  res.sendStatus(200);
});

// Клиентская часть
i18n.reloadResources(['en', 'ru'], ['common']);
```

2. Локализация API ошибок

```js
// Сервер
app.get('/api/data', (req, res) => {
  if (error) {
    return res.status(400).json({
      error: req.t('validation:invalid_input')
    });
  }
});

// Клиент
try {
  const response = await api.get('/data');
} catch (err) {
  const errorMessage = i18n.t(`api_errors:${err.code}`);
}
```

3. SSR с Next.js

```jsx
// next-i18next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    localeDetection: false
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development'
};

// pages/_app.js
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
```

## Best Practices

1. Дефолтный язык - всегда указывайте fallbackLng
2. Именование файлов - используйте стандартные имена (translation.json)
3. Разделение переводов - разбивайте по namespaces для больших приложений
4. Синхронизация ключей - используйте одинаковые namespaces на клиенте и сервере
5. Кеширование - настройте Cache-Control для переводов
6. Мониторинг - отслеживайте отсутствующие переводы
7. Безопасность - валидируйте входные параметры языка
8. Автоматизация - рассмотрите инструменты вроде Lokalise для управления переводами

для удобной работы с i18n можно установить плагины в редактор кода
для vscode - i18n-ally
для webstorm - i18n support
с помощью них можно видеть, какие ключи используются в схемах,
так же автоматически создавать ключи в других схемах

## Проблемы и решения

- Проблема: Задержка при загрузке переводов
- Решение: Предзагрузка критичных namespaces + скелетоны интерфейса


- Проблема: Расхождение версий переводов
- Решение: Версионирование файлов переводов (/locales/en/common.v2.json)


- Проблема: XSS при динамических переводах
- Решение: Всегда используйте escapeValue: true в production

Полная интеграция i18next между клиентом и сервером обеспечивает:

- Согласованный пользовательский опыт
- Централизованное управление переводами
- Гибкость в разработке мультиязычных приложений
