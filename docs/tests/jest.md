## Jest
Jest - библиотека для тестирования js кода (jsdom).
Можно написать jest --init для автонастройки. Также нужно установить @types/jest.
Чтобы jest понимал ts, нужно установить @babel/preset-typescript. и обновить конфиг @babel
Для тестирования, рядом с тестируемыми файлами создаем файл с расширением .test.ts
Можно запускать тесты только для 1 файла через пробел после скрипта <название файла>

Чтобы jest тесты работали с абсолютными импортами добавили в jest.config modulePaths: ['<rootDir>src']
возле jest config создали файл setupTests.ts (при create-react-app он так и называется)
в jest.config добавили setupFilesAfterEnv: ['<rootDir>config/jest/setupTests.ts'],
в tsconfig добавили "include": ["./config/jest/setupTests.ts"],
после этого TS подхватывает все методы при написании кода в рантайме
так же нужно установить пресет для парсинга tsx - @babel/preset-typescript и @babel/preset-react(эта версия не нашлась, возможна ошибка)
Для парсинга jest`ом css модулей установили identity-obj-proxy
в конфиге jest добавили moduleNameMapper: { '\\.s?css$': 'identity-obj-proxy' }
В babel конфиге изменили ["@babel/preset-react", {"runtime": "automatic"}]
Можно добавить в тестах screen.debug(); Тогда в консоли отобразятся атрибуты элемента
Для парсинга svg в jest.config в поле moduleNameMapper добавили '\\.svg': path.resolve(__dirname, 'jestEmptyComponent.tsx'),
Грубо говоря это мок, который будет использоваться для всех импортов в которых используется svg. Создали рядом с конфигом этот компонент
в setupTests.ts добавили import 'regenerator-runtime/runtime'; и установили зависимость regenerator-runtime
В shared/config/i18n дабавили i18nForTests.ts (скопировали из https://react.i18next.com/misc/testing#example-configuration-for-testing  и немного изменили)
создали в shared/lib/test/renderWithTranslation helper
Эта функция оборачивает тестируемый компонент в обертку и добавляет нужную конфигурация для переводов

Примерно такая же проблема решалась для сторибука, делался декоратор с роутером.
Сделали похожую штуку для jest (unit) тестов.
В папке shared/lib/tests создали файл componentRender/componentRender.ts.
ComponentRender - одна единственную функцию. Будем её везде для unit-тестов использовать.

При использовании redux, для каждого редьюса, слайса пишутся тесты.
Если какое-то поле кто-то поменяет, то тест упадет, может предотвратиться баг.

Добавили в componentRender обертку StoreProvider, чтоб мы смогли тестировать компоненты использующие стор.
Добавили в jest.config globals, для определения __IS_DEV__ глобальной переменной, т.к. jest этого не видет.
Не видит потому, что тестовая среда отличается от среды, которую настраивали в webpack.
Поэтому глобальные переменные, настройки и т.п. надо делать отдельно.

Так же на asyncThunk loginByUsername. Там нужно мокать запросы (jest.mock('axios') и потом использовать модуль axios).
jest для замоканных модулей добавляет функции (например axios.post.mockReturnValue()), которые позволяют замокать какое-то
возвращаемое значение. Но TS по-умолчанию эти типы не подхватывает, поэтому можно воспользоваться конструкцией:
const mockedAxios = jest.mocked(axios, { shallow: false }).
1 аргумент это модуль, который хотим замокать.
2 (true) - это флаг с глубоким моком (т.е. мокаем не только сам модуль, но и внутренние поля).
asyncThunk это actionCreator, который по итогу вызова возвращает action.
Как отрабатывают диспатчи в asyncThunk:
- 1 вызов диспатча отрабатывает когда вызван сам экшен loginByUsername
- 2 вызов диспатча - когда вызывается экшен setAuthData с передачей response.data отработанного запроса
- 3 вызов диспатча - когда происходит fullfilled, т.е. когда экшен успешно выполняется (после return в конце).
  В случае ошибки диспатч вызовется 2 раза (т.к. не будет setAuthData).
  Эта логика для тестирования asyncThunk будет переиспользоваться, чтобы не дублировать.
  Вынесли её в shared/lib/tests/TestAsyncThunk/TestAsyncThunk.ts
  Это класс, в котором будет изолирована эта логика.

Переменная __API__ будет задаваться на этапе сборки приложения (config/builds/).
В jest.config.ts определил глобально __API__: ''

В файле buildPlugins определили новую глобальную переменную __PROJECT__: JSON.stringify(project).
То же самое сделали для тестовой среды jest.config.ts (в globals __PROJECT__: 'jest').

На реальных проектах редьюсеры редко покрываются тестами, только если там есть условия, циклы, какая-то сложная логика.

Для того чтоб jest понимал алиасы, в config/jest/jest.config.ts в опции moduleNameMapper добавили '^@/(.*)$': '<rootDir>/src/$1'
