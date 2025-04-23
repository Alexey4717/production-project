# Документация по React Router

## Введение

React Router — это стандартная библиотека для маршрутизации в React-приложениях. Версии 6 и 7 предоставляют:

- Упрощенный API
- Лучшую производительность
- Улучшенную поддержку TypeScript
- Гибкую систему защищенных маршрутов

## Установка

```bash
npm install react-router-dom // для v6
npm install react-router     // для v7
```

## Базовая настройка

### Конфигурация роутера

```tsx
// app/providers/RouterProvider/ui/RouterProvider.tsx
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);

export const RouterProvider = () => {
  return <RouterProvider router={router} />;
};
```

Все маршруты были вынесены в конфигурацию, которая хранится в shared/config/routeConfig.ts.
Это позволяет централизованно управлять навигацией.

Конфиг экспортируется и используется в AppRouter, где передается в RouterProvider.
Чтобы не нарушать архитектуру, типы, константы и enum'ы роутов хранятся отдельно в shared/types и shared/consts/router.ts.

Почему это важно?
Централизация маршрутов облегчает масштабирование, навигацию и тестирование.
Также упрощает использование авторизации, ролей и формирования URL в одном стиле.

## Защищенные маршруты

Создан компонент app/providers/router/ui/RequireAuth.tsx

Использование:

```tsx
import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { AppRoutesProps } from '@/shared/types/router';
import { PageLoader } from '@/widgets/PageLoader';
import { RequireAuth } from './RequireAuth';
import { RouteConfig } from '../config/routeConfig';

const AppRouter = () => {
    const renderWithWrapper = (route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? (
                        <RequireAuth roles={route?.roles}>
                            {element}
                        </RequireAuth>
                    ) : (
                        element
                    )
                }
            />
        );
    };

    return <Routes>{Object.values(RouteConfig).map(renderWithWrapper)}</Routes>;
};

export default AppRouter;
```

## Навигация по ролям

### Пример:

- Добавлена страница AdminPanelPage.
- Только для пользователей с ролью admin.

### Как реализовано:

- В AppRoutesProps добавлено поле roles.
- В компоненте RequireAuth реализована проверка на роли.
- Если доступа нет — показываем ForbiddenPage.

## Динамические маршруты

### Создание маршрутов

```ts
{
  path: 'articles',
  children: [
    { index: true, element: <ArticlesPage /> },
    { path: ':id', element: <ArticleDetailsPage /> }
  ]
}
```

### Генерация путей

Чтобы не склеивать URL вручную, созданы функции:

```ts
export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
```

Использование в конфиге:

```ts
export const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteAbout()]: AppRoutes.ABOUT,
    [getRouteProfile(':id')]: AppRoutes.PROFILE,
};
```

Использование в других местах

```ts
test('Редирект неавторизованного пользователя на главную', async () => {
    componentRender(<AppRouter />, {
        route: getRouteProfile('1'),
    });

    const page = await screen.findByTestId('MainPage');
    expect(page).toBeInTheDocument();
});
```

Это:
- Удобнее и надёжнее, чем ${RoutePaths.profile}/${id}
- Помогает избежать лишних слешей, опечаток и повторений.

## Работа с параметрами URL

### Хук useParams

```tsx
import { useParams } from 'react-router-dom';

const ArticleDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  // ...
};
```

### Хук useSearchParams

```tsx
import { useSearchParams } from 'react-router-dom';

const ArticlesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const sort = searchParams.get('sort') || 'createdAt';
  const order = searchParams.get('order') || 'asc';

  const onChangeSort = (newSort: string) => {
    setSearchParams({ sort: newSort, order });
  };
};
```

##  Использование query-параметров (поисковых)

### Пример:

Список статей с фильтрацией по author.name=aleksei

### Что реализовано:

- useSearchParams из react-router-dom
- Вспомогательные хелперы в shared/lib/url/
- При изменении фильтра — обновляется строка запроса через window.history.pushState

### Кастомный хук useRouteChange

В shared/lib/router/useRouteChange хук, который следит за изменением маршрута
и возвращает семантически понятное название текущего маршрута.

### Почему это важно:

Страница можно поделиться с сохранёнными фильтрами.
После обновления страницы фильтры сохраняются.

## Апгрейд сайдбара

При переходе в профиль генерируется путь /profile, а нужен /profile/:id.

Решение:
- Селектор в Redux возвращает текущий ID пользователя.
- В селекторе создается массив ссылок для Sidebar.
- Используется createSelector для переиспользования логики.

## Тестирование

```tsx
// AppRouter.test.tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('AppRouter', () => {
  test('Should render main page', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(await screen.findByTestId('MainPage')).toBeInTheDocument();
  });
```

- Используем @testing-library/react
- Добавлены data-testid к компонентам страниц.

Тестируем:
- Защищённые маршруты
- 404 страницу
- Страницу без доступа (ForbiddenPage)

findByTestId вместо getByTestId, т.к. рендер асинхронный.

## Интеграция со Storybook

Создали декоратор с оберткой в BrowserRouter

```tsx
import { type ComponentType } from 'react';
import { BrowserRouter } from 'react-router';

export const RouterDecorator = (StoryComponent: ComponentType) => (
    <BrowserRouter>
        <StoryComponent />
    </BrowserRouter>
);
```

Использовали глобально в preview.ts

```ts
decorators: [RouterDecorator]
```

## Лучшие практики

1. Структура маршрутов:

- Группируйте связанные маршруты
- Используйте ленивую загрузку
- Разделяйте публичные и приватные маршруты
- Именуйте маршруты подобно rest-api, через kebab-case, во множественном числе сущностей (/articles, /articles/:id)
  Множественное число для единичной сущности лучше масштабируется и следует правилам rest

2. Типизация:

- Создайте enum для путей
- Используйте TypeScript для параметров

3. Производительность:

- Ленивая загрузка страниц
- Предзагрузка данных для маршрутов

4. UX:

- Обработка 404 и Forbidden страниц (Для пользователя редиректы, при отсутствии права и т.п., крайне неочевидны)
- Плавные переходы между маршрутами
- Сохранение состояния фильтров в URL

## Проблемы и решения

1. При первой загрузке AppRouter монтировался до получения данных пользователя. Это приводило к ложному редиректу или 404.

- Добавлен флаг _inited в стейт пользователя.
- Роутер отображается только после инициализации пользователя (_inited === true).

2. При переходе на роут /articles/123 была проблема, что браузер пытается запросить чанк,
   т.е. в строке запроса появляется лишний articles (должен запросить из корня, а запрашивает из articles, а у нас такой папки нет).
   Т.е. такие статические файлы по факту запрашиваются из папки build, в которую мы делаем сборку.
   Просто в dev режиме эта папка не создается, эти файлы все хранятся в памяти.
   В buildWebpackConfig.ts нужно добавить publicPath в output
```ts
output: {
    ...
    publicPath: '/', // Указывает корень для загрузки всех статических файлов, для обеспечения корректного определение пути независимо от текущего URL
},
```

3. На хостинге (например, при использовании nginx) переход на вложенный роут /about и обновление страницы может вызывать 404.

- SPA имеет только один файл index.html. Сервер должен отдавать его на любой URL.
- Настроить nginx.conf так, чтобы все пути переадресовывались на index.html.
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Полезные ссылки

- [Официальная документация](https://reactrouter.com/)
- [Примеры использования](https://github.com/remix-run/react-router/tree/main/examples)
