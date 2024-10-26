при создании репо
скопировать git remote add origin <название репо>
потом локально git init
и создать удаленный репо скопированной командой

Командой git status можно увидеть какие файлы распознает гит для отправки в удаленный репо

В какой-то момент я начал использовать yarn вместо npm, т.к. с ним комфортнее работать со старыми версиями пакетов.
Возникает меньше конфликтов версий, более стабильная работа.

18. Настройка eslint для ts файлов
К настройкам правил нужно относиться серьезно и основательно
npm install --save-dev eslint
npm init @eslint/config
Для настройки правил eslint, наводим на ошибку линта, копируем название правила и гуглим этот rule,
потом вставляем эти правила в .eslintrc.js в поле rules
Если мы знаем что это за правило и оно нам не нужно,
то можно просто указать его название в ключе rules со значением 'off'.
Либо можно сменить отображение на предупреждение (значение 'warn')
Команда eslint "**/*.{ts,tsx}" --fix должна фиксить все ошибки на проекте
Если осознанно хочется заблокировать правило в одном месте, можно над ним вставлять комментарий 
// eslint-disable-next-line <название правила>

19. Stylelint для настройки правил css файлов, конфиг в .stylelintrc.json
Для подсветки текста в jsx разметки для i18n (что нужен перевод) установлен eslint-plugin-i18next
в конфиге .eslintrc.js нужно добавить murkupOnly: true
в plugins: i18next
в extends: plugin:i18next/recommended

20. Jest - библиотека для тестирования js кода (jsdom)
Можно написать jest --init для автонастройки. Также нужно установить @types/jest.
Чтобы jest понимал ts, нужно установить @babel/preset-typescript. и обновить конфиг @babel
Для тестирования, рядом с тестируемыми файлами создаем файл с расширением .test.ts
Можно запускать тесты только для 1 файла через пробел после скрипта <название файла>

21. Несуществующий роут, page компонент для роута, которого нет в Routes
loader cкопирован с источника https://loading.io/css/

22. ErrorBoundary не отлавливает ошибки, которые происходят в асинхронном коде, в событиях,
при server-side rendering и ошибки, которые возникают в самом ErrorBoundary.
В componentDidCatch можно использовать свой сервис для логирования, а не console.log.
В классовом компоненте нужно испольщовать HOK withTranslation from react-i18next

23. Webpack Bundle Analyzer - пакет для анализа бандла вебпака
Нужно добавить плагин BundleAnalyzerPlugin в конфиг
После этого, при запуске приложения, во второй вкладке ана порту :8888 откроется страница с описаниями пакетов, 
которые используются в приложении.
Если запускать сборки run build:dev run build:prod, то так же будет открываться страница с пакетами билдов
Слева сверху можно посмотреть вес чанков в разных режимах

24. React testing library. Файлы с тестами желательно располагать рядом с компонентами или функциями
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

25. Storybook. Инициализация npx sb init --builder webpack5
После инициализации появится папка .storybook (конфиг).
И появятся 2 новых скрипта в package.json для запуска и сборки storybook.
Так же появится директория src/stories. В будущем будут писаться свои stories.
Можно будет передавать в компоненты разные пропсы.
Вынесли конфигурацию с src/.storybook в src/config/storybook
Изменили в конфиге относительные пути
добавили в скрипты флаг -c ./config/storybook с новым (не дефолтным) путем до конфига
Новые сторисы создаются в папке компонента рядом с файлом компонента 
с расширением <component-name>.stories.tsx (как в main конфиге для сторис)
Перенесли код из файла сторис примера в нащ новый файл, сгенеренную папку src/stories удалили
По сути большенство это копипаста и переписывание пропсов
в meta.title указывается путь и азвание файла (title: 'shared/Button') - shared слой и Button компонент
Так же storybook по-дефолту не понимает настроенные на проекте абсолютные пути в импортах, нужна доп настройка
У сторибука есть своя конфигурация для вебпака. На занятии создавали сами (файл webpack.config.ts), 
это обычный файл конфига для вебпак, но отдельный
Я поставил новую 8 версию и она была уже после инициализации сторибука (находится возле остальных файлов конфига)
У меня конфиг уже был рабочий, с настройкой абсолютных путей config.resolve.modules.push(paths.src);
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
Для pages так же сделали сторисы

26. Скриншотные тесты. Есть платные и бесплатные библиотеки. Тут используется Loki. 
Инициализация - Сначала установка пакета loki в devDep, потом npx loki init --config <путь до конфига storybook>
В package.json добавится конфигурация loki
Скрины будут сниматься на ноуте в хроме и iphone на хроме (судя по конфигам)
Меняем там в target с docker на app (Если работа в linux или macOS)
На винде могут быть проблемы с запуском (если так, то нужно вернуть target docker и запустить приложение docker на ПК)
Мне так же пришлось поднять версию loki до 0.29.0, т.к. под капотом 0.28.0 использовала 16 версию react и были конфликты
Для работы с loki сначала нужно запустить storybook
Для скриншотного тестирования необходимо выполнить команду npx loki test
После успешного выполнения тестов появится папка .loki со скриншотами в виде png разных компонентов в разных состояниях
При изменении чего-то в компонентах и прогоне повторных тестов, часть тестов упадет, т.к. они будут сравниваться со старыми скриншотами
в папке difference. Регрессионное тестирование - когда мы убеждаемся, что новый функционал не сломал старый.
Скриншоты отправляются в удаленный репозиторий.
Добавили скрипт test:ui для скриншотных тестов и test:ui:ok для одобрения скриншотов (т.е. когда loki отловил ожидаемые изменения,
изменения которые осознанно сделаны и мы их подтверждаем)

27. У нас стало появляться много скриптов (линтеры, сборка, разные виды тестирования, сборка сторибука).
Запускать это вручную становится неудобно. Хочется автоматизировать процесс запуска этих скриптов.
Будем использовать Github-actions для настройки CI/CD.

CI/CD переводится как непрерывная интеграция и непрерывное развертывание (доставка).
Это конвейер, который позволяет автоматизировать рутинные процессы
(сборка приложения, прогон тестов, прогон линтеров, проверка типизации (CI) / деплой, релиз (CD) и т.д.).

Сначала CI.
CI процессы обычно запускаются скриптами, описанными в package.json.
Нужна автоматизация чтобы:
- Не делегировать эту ответственность (ручной запуск скриптов) на разработчика и нивелировать человеческий фактор
- Не загружать разработчика лишней работой (т.к. она стоит дорого)
- Повышение надежности приложения в целом
Хотелось бы, чтобы при создании pull request (PR) и при последующих коммитах в ветку
автоматически запускались бы все эти процессы (сборка, тесты, линтеры и пр. проверки (CI), которые необходимы в нашем приложении)
и чтобы мы не могли вмерджить ветку в main до тех пор, пока мы не убедились, что все эти процессы отработали без ошибок.
И если хотябы 1 из таких проверок упала, то нам нужно запретить merge в основную (main) ветку, чтобы не сломать код.

Настройка:
Примеры для настройки можно брать из guthub, либо сделать запрос github actions frontend, chat-gpt и т.д.
Создали папку .github в корне приложения, а внутри неё папку workflows (рабочий процесс).
Далее нужно внутри этой папки создать файл с расширением .yml (название любое).
Скопируем пример кода для файла из https://docs.github.com/ru/actions/writing-workflows/quickstart
Далее отдельным коммитов нужно запушить yml файл в github (commit m: "add main pipeline github actions")
Потом заходим в github репозиторий / actions.
Там будет этот workflow, в который можно провалиться и посмотреть на процессы, описанные в yml файле.
В начале скрипты будут в виде echo (т.е. логи текстов, моки для проверки). 
Там могут быть любые сложные скрипты, например npm run build.
В файле main.yml поменяли name: linting, testing, building.
В начале укажем что все проверки будут запускаться на push в ветку master и при создании pull_request.
Далее нужно описать jobs. Удаляем старую.
Создадим новую с названием pipeline (можно называть как угодно).
В поле runs-on указывается ОС, в которой будет запускаться job.
Затем необходимо указать версию NodeJS, которая будет использоваться
Для работы с фронтом, нужно всегда устанавливать в первую очень NodeJS, чтобы код мог работать.
В steps указаны наши скрипты
Там (после стэпов по установке NodeJS) первым делом нужно установить node_modules.
Далее можно например запускать сборку
Потом сделаем запуск скрипта линтера для ts, потом линтер для css, потом все виды тестов, потом сборку storybook.
Далее пушим в репозиторий, наблюдаем как выполняются jobs. (появится желтая точка в репозитории, из неё перейти быстрее).
Bundle-analyser отключил, т.к. он не дает завершиться процессу сборки.


Далее когда CI закончен без ошибок, мы мерджим код в main ветку, затем идёт сборка приложения (если это требуется).
И дальнейшая публикация этой сборки на тестовое или прод окружение (CD).
Т.е. CI/CD касается как ежедневных процессов (для тестирования), так и еженедельных (смотря какой спринт, релиз на прод).
Так же можно отдельно ознакомиться с темой CI/CD тут https://www.youtube.com/watch?v=ANj7qUgzNq4
