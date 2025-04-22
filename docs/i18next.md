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

- Поддержка lazy-namespace loading (ленивая подгрузка переводов)
- Хранение переводов в отдельных неймспейсах (common, mainPage, profilePage)
- Переключение языков: i18n.changeLanguage('en')

## Best Practices

1. Дефолтный язык - всегда указывайте fallbackLng
2. Именование файлов - используйте стандартные имена (translation.json)
3. Разделение переводов - разбивайте по namespaces для больших приложений
4. Автоматизация - рассмотрите инструменты вроде Lokalise для управления переводами

для удобной работы с i18n можно установить плагины в редактор кода
для vscode - i18n-ally
для webstorm - i18n support
с помощью них можно видеть, какие ключи используются в схемах,
так же автоматически создавать ключи в других схемах
