при создании репо
скопировать git remote add origin <название репо>
потом локально git init
и создать удаленный репо скопированной командой

Команжой git status можно увидеть какие файлы распознает гит для отправки в удаленный репо

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
