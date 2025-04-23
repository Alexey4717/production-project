# Документация по Redux

## Введение

Redux — это предсказуемый контейнер состояния для JavaScript-приложений.
Redux Toolkit (RTK) — официальный инструмент для эффективной работы с Redux, который:

- Уменьшает количество шаблонного кода
- Предоставляет встроенные лучшие практики (например поддержка redux-thunk)
- Включает полезные утилиты (например immer)
- тип DeepPartial из тулкита позволяет типизировать стейт с отдельным куском

## Установка

```bash
npm install @reduxjs/toolkit react-redux
```

## Базовая настройка

В FSD хранится в app/providers/StoreProvider

### Создание хранилища (Store)

```ts
// app/providers/StoreProvider/config/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
  return configureStore({
    reducer: rootReducer,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });
}
```

### Провайдер хранилища

```tsx
// app/providers/StoreProvider/ui/StoreProvider.tsx
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const store = createReduxStore();

  return <Provider store={store}>{children}</Provider>;
};
```
В app/providers/StoreProvider/config/store.ts задаются:

- корневые редьюсеры;
- middleware (включая thunk);
- devtools (включаем только в режиме разработки).

## Создание слайсов

### Пример слайса

```ts
// features/Counter/model/slice/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { actions: counterActions } = counterSlice;
export const { reducer: counterReducer } = counterSlice;
```

Создали shared/lib/store/buildSlice.ts для улучшенной работой со слайсами.

Можно создать слайс и вернуть оттуда хук useActions.
В компонентах использовать useActions, который возвращает экшены для использования без dispatch (меньше кода).
Нативные экшены так же остаются, чтоб использовать вне компонентов (для санок, тестов и т.п.).

## Работа с асинхронными операциями

### Создание асинхронной санки

```ts
// features/AuthByUsername/model/services/loginByUsername.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

export const loginByUsername = createAsyncThunk<
  User,
  LoginFormData,
  ThunkConfig<string>
>(
  'login/loginByUsername',
  async (authData, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    
    try {
      const response = await extra.api.post<User>('/login', authData);
      return response.data;
    } catch (e) {
      return rejectWithValue('Неверный логин или пароль');
    }
  }
);
```

В санке можно использовать из результата запроса метод unwrap() для разворачивания промиса (чтоб reject тоже обрабатывался в санке).

### Обработка состояний в слайсе

У каждого thunk есть три состояния:

- pending — запрос отправлен;
- fulfilled — получен ответ;
- rejected — произошла ошибка.

```ts
// features/AuthByUsername/model/slice/loginSlice.ts
extraReducers: (builder) => {
  builder
    .addCase(loginByUsername.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(loginByUsername.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authData = action.payload;
    })
    .addCase(loginByUsername.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
},
```

### Обработка ошибок через rejectWithValue

В thunk используем thunkAPI.rejectWithValue:

```ts
return thunkAPI.rejectWithValue('Ошибка при авторизации');
```

Можно получить доступ к dispatch, getState, extra, переданным в thunk.
Вообще в конфиге в extraArgument можно передать что угодно (api, navigate, apolloClient и т.п.),
чтоб обращаться к этому внутри санок.

### Типизация thunk и extra

Для корректной типизации thunk используем ThunkConfig:

```ts
interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
```

Передаётся в createAsyncThunk<T, Arg, ThunkConfig<ErrorType>>.

## Селекторы

### Базовые селекторы

Используем createSelector из RTK (основан на reselect) для:

- переиспользования логики;
- мемоизации значений;
- комбинирования селекторов.

```ts
// features/AuthByUsername/model/selectors/getLoginState.ts
import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginState = (state: StateSchema) => state?.loginForm;

export const getLoginUsername = createSelector(
  getLoginState,
  (loginForm) => loginForm?.username || ''
);
```

### Улучшенная работа с селекторами

Создали src/shared/lib/store/buildSelector.ts
который позволяет уменьшить количество бойлерплэйт кода:

Создание:

```ts
import { buildSelector } from '@/shared/lib/store';

export const [useFirstSelector, firstSelector] = buildSelector(
    (state) => state.counter.value,
);

export const [useSecondSelector, secondSelector] = buildSelector(
    firstSelector,
    (state) => {
        return state! + 5;
    },
);
```

Можно использовать хук в компонентах без useDispatch (меньше импортов).
Можно переиспользовать селектор в reselect, санках, тестах и т.д.

## Хуки useSelector и useDispatch

- Для доступа к стейту используем useSelector.
- Для отправки экшенов — useDispatch.

### Типизация dispatch

useDispatch не знает о типах thunk'ов. Создаем кастомный хук useAppDispatch.
Например, подтянутся типы для result.meta.requestStatus, можно будет делать проверку по нему.

## Динамическая загрузка редьюсеров

Редьюсеры по умолчанию подключаются к корневому стору и попадают в главный бандл. Это плохо для производительности.

### ReducerManager

В app/providers/StoreProvider/config/reducerManager.ts реализован менеджер,
который используется для асинхронного инжектирования редьюсеров и выпиливания из стора.
Технически редьюсеры подгружаются отдельными чанками.

### DynamicModuleLoader

В src/shared/lib/components/DynamicModuleLoader реализован компонент-обертка,
который имплементирует функционал reducerManager в компонентах.

Использование в компонентах:

```tsx
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const reducers: ReducersList = {
    someReducerKey: someReducer,
    // Произвольное количество редьюсеров для инжектирования
};

const Component = () => {
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            {content}
        </DynamicModuleLoader>
    );
};
```

Опция removeAfterUnmount позволяет управлять поведением динамического удаления редьюсера при размонтировании компонента.

## Нормализация данных

### Проблема: дублирование сущностей

#### Пример 1.
Допустим есть 4 списками товаров (все, измененные, черновик, на модерации).
При изменении состояния одной сущности из списка "все", она улетает в "измененные" и т.д.
Это та же сушность по сути. Дублировать её для нескольких списков это избыточно.
Плюс необходимо, чтобы все эти дублируемые данные были одинаковыми (реально частая проблема, которая возникает на практике).

#### Пример 2.
Допустим есть массив объектов и нам надо изменить одно из полей объекта.
Чтобы это сделать, нужно проитерироваться по всему массиву, найти нужный объект, заменить у него поле, а во всех остальных случаях возвращается старый объект.
Здесь приходит на помощь нормализация. Тут нужно относитья к данным на клиенте примерно так же, как к данным, хранящимся в БД на сервере.
При нормализации у объектов не хранятся вложенные объекты, хранятся только идентификаторы (foreign_key как в БД).
Так мы избавляемся от дублирования данных и плюс, при изменении в одном месте, изменения произойдут везде, где используется ссылка-id.
Так же данные хранятся не в массиве, а в объекте, где ключ это id. Уменьшается константное время допуска к объекту.
В redux-tooklit есть обстракция, с помощью которой можно делать нормализацию с минимумом строк кода.

### Решение: createEntityAdapter

```ts
const commentsAdapter = createEntityAdapter<Comment>();
```

Он создаёт:

- объект entities по id;
- массив ids;
- базовые экшены (addOne, removeMany, и др.);
- селекторы (selectAll, selectById).

```ts
adapter.setAll(state, action.payload); // нормализует массив
adapter.addMany(state, newItems);      // добавляет новые
```

### Использование EntityAdapter

```ts
// entities/Article/model/slice/articleDetailsCommentsSlice.ts
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
  sortComparer: (a, b) => a.text.localeCompare(b.text),
});

export const articleDetailsCommentsSlice = createSlice({
  name: 'articleDetailsComments',
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByArticleId.fulfilled, (state, action) => {
        commentsAdapter.setAll(state, action.payload);
        state.isLoading = false;
      });
  },
});

export const { selectAll: selectArticleComments } = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsComments || commentsAdapter.getInitialState()
);
```

### Использование в компонентах

```ts
useSelector(getArticleComments.selectAll)
```

## RTK Query

### Настройка API

```ts
// shared/api/rtkApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rtkApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
  }),
  endpoints: () => ({}),
});
```

### Инжектирование эндпоинтов в api rtk-query и код сплиттинг в разные части приложения

```ts
import { rtkApi } from '@/shared/api/rtkApi';
import { Notification } from '../model/types/notification';

const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<Notification[], null>({
            query: () => ({
                url: '/notifications',
            }),
        }),
    }),
});

export const useNotifications = notificationApi.useGetNotificationsQuery; // генерация хуков
export const getNotificationsQuery = notificationApi.endpoints.getNotifications.initiate; // генерация функции для отправки запроса вне компонента
```

Но при такой реализации нужно в корневом файле rtk-api указывать типы
tagTypes: ['Notification']

### Использование в компонентах

```tsx
// entities/Article/ui/ArticleRecommendationsList/ArticleRecommendationsList.tsx
import { useArticleRecommendationsListQuery } from '../../api/articleRecommendationsApi';

export const ArticleRecommendationsList = () => {
  const { data, isLoading, error } = useArticleRecommendationsListQuery(3);

  if (isLoading || error || !data) {
    return null;
  }

  return (
    <div>
      {data.map((article) => (
        <ArticleView key={article.id} article={article} />
      ))}
    </div>
  );
};
```

Если запускать хук с одним и тем же запросом в нескольких местах, то запрос технически будет отправляться один,
т.к. данные сохраняются в хранилище. Rtk-query сам кеширует и своевременно обновляет данные.
В хуках так же есть longPulling, чтобы с интервалом отправлять запросы.

Хуки бывают query (запрос при инициализации компонента, управление через skip) и lazyQuery (запрос через явный запуск функции).

## Адаптация со сторибуком

Есть Addon decorator для сторибука (storybook mock api).
Установили пакет [storybook-addon-mock](https://storybook.js.org/addons/storybook-addon-mock)

В конфиге сторибука (main.ts) передать api в DefinePlugin.

```ts
config!.plugins!.push(
    new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('https://testapi.ru'), // тестовое апи для моканных запросов
        __PROJECT__: JSON.stringify('storybook'), // Определение значения для глобальной переменной, можно использовать в разных местах приложения для определения текущей сборки
    }),
);
```

Для сторисов если есть мок rtk-query запросов обязательно нужно добавлять StoreDecorator
Для мока запросов установили пакеты msw и msw-storybook-addon, так же создали сервис воркер в public.

Пример использования в сторисах:

```tsx
import { http, HttpResponse } from 'msw';
import type { Meta, StoryObj } from '@storybook/react';
import { Article } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleRecommendationsList } from './ArticleRecommendationsList';

const meta: Meta<typeof ArticleRecommendationsList> = {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof ArticleRecommendationsList>;

export default meta;
type Story = StoryObj<typeof meta>;

const article: Article = {
    id: '1',
    img: '',
    createdAt: '',
    views: 123,
    user: { id: '1', username: '123' },
    blocks: [],
    type: [],
    title: '123',
    subtitle: 'asfsa',
};

export const Normal: Story = {
    args: {},
    parameters: {
        msw: {
            handlers: [
                http.get(`${__API__}/articles?_limit=3`, () => {
                    return HttpResponse.json(
                        [
                            { ...article, id: '1' },
                            { ...article, id: '2' },
                            { ...article, id: '3' },
                        ],
                        { status: 200 },
                    );
                }),
            ],
        },
    },
};
```

## Тестирование через jest

TODO написать про тестирование в jest

## Best Practices

### 1. Структура FSD:

Обычно хранится в model, где описывается бизнес-логика
- model/slice - редьюсеры и экшены
- model/selectors - селекторы
- model/services - асинхронные операции (санки)
- model/types - типы, схемы

### 2. Типизация:

- Используйте StateSchema для типизации всего состояния
- PayloadAction для типизации экшенов
- ThunkConfig для типизации санок
- Типизируйте useDispatch для более глубокого подхватывания типов (пример в useAppDispatch)
- Допускается декларировать в global.d.ts схему стора, чтоб не импортировать везде из App

### 3. Оптимизация:

- Динамическая загрузка редьюсеров
- Мемоизация селекторов
- Использование EntityAdapter для нормализации

### 4. Тестирование:

- Тестируйте редьюсеры и селекторы
- Проверяйте все состояния санок (pending/fulfilled/rejected)

### 5. Инструменты:

- Redux DevTools для отладки
- RTK Query для API-запросов
- Immer для иммутабельных обновлений

### 6. Храните бизнес-логику в редаксе (model)

- Выносите множество условий, вычислений, формирований данных в селекторы
- Храните бизнес-логику в папке model (отдельно от UI), т.к. UI может меняться часто, бизнес логика гораздо реже

## Проблемы и решения

- Redux DevTools теряют историю при переходах — проблема в повторной инициализации стора.
Нужно следить за ререндерами в провайдере, например передача navigate из роутера, заставляла лишний раз ререндериться).
- Падают скриншотные тесты — нужно передавать asyncReducers в StoreProvider.
- Ошибки при совпадении названия редьюсера — используем строгую типизацию ключей.

## Полезные ссылки

- [Официальная документация Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query документация](https://redux-toolkit.js.org/rtk-query/overview)
- [Примеры использования](https://github.com/reduxjs/redux-toolkit/tree/master/examples)
- [Immer.js](https://immerjs.github.io/immer/)
- [Code splitting redux](https://redux.js.org/usage/code-splitting)
- [Code splitting redux-toolkit](https://redux-toolkit.js.org/rtk-query/usage/code-splitting)
