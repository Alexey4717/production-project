# Storybook

В проекте для каждого компонента описываются стори-кейсы.
Запросы на сервер мокаются с помощью storybook-addon-mock.

Файл со сторикейсами создает рядом с компонентом с расширением .stories.tsx

Запустить сторибук можно командой:
- `yarn storybook`

Подробнее о [Storybook](/docs/storybook.md)

Пример:

```typescript jsx
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ButtonSize, ButtonTheme } from './Button';
import { Theme } from '@/shared/consts/theme';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    theme: ButtonTheme.CLEAR,
};
```

Инициализация npx sb init --builder webpack5
После инициализации появится папка .storybook (конфиг).
И появятся 2 новых скрипта в package.json для запуска и сборки storybook.
Так же появится директория src/stories. В будущем будут писаться свои stories.
Можно будет передавать в компоненты разные пропсы.
Вынесли конфигурацию с src/.storybook в src/config/storybook
Изменили в конфиге относительные пути
добавили в скрипты флаг -c ./config/storybook с новым (не дефолтным) путем до конфига
Новые сторисы создаются в папке компонента рядом с файлом компонента
с расширением <component-name>.stories.tsx (как в main конфиге для сторис)
Перенесли код из файла сторис примера в наш новый файл, сгенеренную папку src/stories удалили.
По сути большенство это копипаста и переписывание пропсов
в meta.title указывается путь и азвание файла (title: 'shared/Button') - shared слой и Button компонент
Так же storybook по-дефолту не понимает настроенные на проекте абсолютные пути в импортах, нужна доп настройка
У сторибука есть своя конфигурация для вебпака. На занятии создавали сами (файл webpack.config.ts),
это обычный файл конфига для вебпак, но отдельный.

Так же нужна настройка CSS модулей для сторибука (по-дефолту был импорт в конфиге, но не адаптирован под мой конфиг)
В config/build/buildLoaders.ts есть cssLoader. Решили вынести лоадеры в отдельную папку config/build/loaders
Вынесли туда в файл buildCssLoader.ts

Если верстка компонента в сторибуке не соответствует, можно так же открыть девтулзы и посмотреть DOM
Storybook не подтягиев ссылки на переменные препроцессора стилей по дефолту.
Чтоб не импортировать в каждый сторис файл с переменными в стилях
нужно в конфиге сторибука preview.ts добавить decorator,
который будет глобально оборачивать каждый сторибук компонент
В shared/config создаем папку storybook.
Добавили декоратор темы в preview.ts (Глобадьно применяется LIGHT, но в каждый сторис можно добавлять другой).
Так же в вебпак конфиг сторис нужно добавлять svg модуль (т.к. это отдельный конфиг).
Сторибук будет полезен разработчикам, они могут ознакомиться с компонентами
Так же с помощью сторибука можно снимать скриншотные тесты и делать регрессионное тестирование интерфейса на изменение
Добавили декоратор роутера
Для pages так же сделали сторисы.

Чтоб фича авторизации была в сторибуке, нужно подключить провайдер редакса (shared/config/storybook/StoreDecorator);
Так же в конфиг для сборки сторибука нужно определить IS_DEV переменную
config.plugins.push(new DefinePlugin({ __IS_DEV__: true }));
Всегда true, т.к. storybook используется только в режиме разработки. Кто-то использует и для прода, но тут не так.
Для i18n так же сделан декоратор TranslationDecorator
в config/storybook/preview.ts добавлен

Переменная __API__ будет задаваться на этапе сборки приложения (config/builds/).
Для сторибука, при создании нового инстанса new webpack.DefinePlugin добавили __API__. (__API__: '', в config.plugins.push).

Для тестирования или отображения в стрибуке изображений, лучше использовать локальный asset, чтобы не грузить её с сервера.
Поместили такие картинки в shared/assets/tests.

По-хорошему в сторибуке не должно быть спама запросами, нужно подтягивать моканные данные.
Есть разные способы предотвращения запросов в компонентах (в useEffect).
Мы использовали один из способов. Разделили среды, в которых исполняется код.
Для buildPlugins расширили входные аргументы, передали project: 'storybook' | 'frontend' | 'jest'.
Для всех трёх сред своя конфигурация. Аргумент project для каждой среды можно переопределить.
В файле buildPlugins определили новую глобальную переменную __PROJECT__: JSON.stringify(project).
То же самое для конфига storybook в файле webpack.config.ts (__PROJECT__: JSON.stringify('storybook')).
В ProfilePage в useEffect делается запрос dispatch(fetchProfileData()) только если __PROJECT__ !== 'storybook'.
После этого в сторибуке запрос не отправляется, данные подтягиваются моканные, прописанные в сторисах ProfileCard.

Конструкция запроса в useEffect без учета сторибука начала часто использоваться, вынесли в кастомный хук.
shared/lib/hooks/useInitialEffect.
По методологии FSD эти эндпоинты должны располагаться в сегменте api слоя (вместе с определением хука).

Нужно оборачивать сторисы в провайдер. Например, так, Normal.decorators = [StoreDecorator({})];
Можно указывать инициализационные данные в сторе в объекте.

Бывают лэйзи компоненты, обернутые в Suspense, т.к. в сторибуке при первой загрузки (инициализации) может упасть ошибка, если сторис уже открыт.
Зачастую прийдется тестировать компоненты с lazy подгрузкой. Чтоб это все не выискивать сделали декоратор.
Создали shared/config/storybook/SuspenseDecorator.
Надо добавить его в config/storybook/preview.js

Так же на проекте используется rtk-query, который надо так же адаптировать под storybook.
Есть Addon decorator для сторибука (storybook mock api).
Установили пакет storybook-addon-mock в devDeps (он для 6 версии или выше сторибука).
https://storybook.js.org/addons/storybook-addon-mock
В конфиге сторибука передать api в DefinePlugin.
Пример использования в сторисах ArticleRecommendationsList.stories.tsx.

После реализации алиасов для импортов, сломалась сборка сторибука.
Т.к. там свой вебпак конфиг и нужно его донастроить.
В файле config/storybook/webpack.config.ts
Добавили config!.resolve!.alias (развернули старые алиасы которые могли быть в вебпаковском конфиге сторибука и добавили новый).

В config/storybook/preview.ts добавили layout: 'fullscreen' чтоб не было лишних пэддингов и разницы в цветах темы.
Можно сделать свой декоратор для сторибука, чтоб компоненты не прилеплялись к углу, чтоб были небольшие пэддинги и т.п.

## Storybook addon theme.
По-умолчанию в сторибук зашит аддон, который может переключать цвет заднего фона.
Но так же есть аддон, который позволяет навешивать классы, которые отвечают за темы.
На корень storybook/preview. Называется storybook-addon-themes. Он понадобится чтобы удобно переключать наши темы в свитчере.
Установили аддон на проект. добавили его в config/storybook/main.ts.
В сторибуке будет иконка сверху (похожая на 2 горы), там можно переключать темы (но сначала они не будут работать).
Нужно в config/storybook/preview.ts добавить параметры themes.
Так же для addon-essentials нужно выключить аддон для переключения бэкграунда (расширили конфиг в main).
После этого если перезапустить сторибук, то будут переключаться темы на этой иконке.
Дефолтную тему можно так же при желании поменять.

## Поддерживаем feature flags в сторибуке.
Создали новый декоратор в сторибуке для работы с фиче флагами shared/config/storybook/FeaturesFlagsDecorator
Пример работы в src/entities/Comment/ui/CommentCard/CommentCard.stories.tsx
В config/storybook/preview.ts добавили addDecorator(FeaturesFlagsDecorator({})); чтобы фиче флаг сбрасывался для каждого сториса.
Потом если надо, можно эти значения переопределять в сторисах.
Так же пример использования в src/entities/Profile/ui/ProfileCard/ProfileCard.stories.tsx
