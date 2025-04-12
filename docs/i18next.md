Для подсветки текста в jsx разметки для i18n (что нужен перевод) установлен eslint-plugin-i18next
в конфиге .eslintrc.js нужно добавить murkupOnly: true
в plugins: i18next
в extends: plugin:i18next/recommended

В классовом компоненте нужно использовать HOK withTranslation from react-i18next

Для тестов:
В shared/config/i18n дабавили i18nForTests.ts (скопировали из https://react.i18next.com/misc/testing#example-configuration-for-testing  и немного изменили)
создали в shared/lib/test/renderWithTranslation helper
Эта функция оборачивает тестируемый компонент в обертку и добавляет нужную конфигурация для переводов.

Для работы i18n в сторибуке так же сделан декоратор TranslationDecorator
в config/storybook/preview.ts добавлен

Если сделать yarn build:prod, потом открыть файл со сборкой (build), то там есть js, html, css файлы, но нет json с переводами.
Файлы хранятся в public и нужно что-то сделать чтобы в билде они оказались.
Для этого возпользовались плагином CopyWebpackPlugin (установили copy-webpack-plugin в dev-deps).
В файле config/build/types/config.ts в интерфейс BuildPaths добавили поле locales (путь до файлов с переводами).
И также buildLocales (путь куда переводы необходимо перемещать).
В webpack.config.ts указываем в paths оба поля.
Мы этот путь указывали в src/shared/config/i18n/i18n.ts в поле loadPath.
В config/build/buildPlugins.ts добавляем new CopyPlugin.
После этого, если сделать снова сборку прод, то в build появятся папки с json файлами переводов.

## Плюральные формы.
Можно загуглить i18n plural.
Плюральные формы - это когда в зависимости от числа, которое мы передаём, отображается разный текст.
Например, 1 просмотр, 2 просмотра, 5 просмотров.
Юзается так: t('{{count}} просмотров', { count: views }).
Обязательно определять как count (возможно это можно перенастроить в настройках).
В переводах json так:
"{{count}} просмотров_zero": "{{count}} просмотров",
"{{count}} просмотров_one": "{{count}} просмотр",
"{{count}} просмотров_few": "{{count}} просмотра",
"{{count}} просмотров_many": "{{count}} просмотров"
