TODO описать работу со скриптами (для работы с файлами и другими).

В корне файлового хранилища создали папку scripts. Там будут храниться все скрипты, которые связаны с приложением (генератор бандлов, генератор отчетов и т.п.).
Создали там файл generate-visual-json-report.js. Нужно понимать что он находится вне src, поэтому через babel не проходит.
Нужно писать js в чистом виде (require вместо import и т.п.). Так же могут быть не доступны некоторые веб апи.

запуск js файлов через команду npx node
запуск ts файлов через команду npx ts-node

после путь до файла скрипта ./scripts/script.js

В работе со скриптами можно пользоваться AST (абстрактное синтаксическое дерево).
Пример в astexplorer.net. Туда вставляется слева код.
Если выделять куски кода слева, то справа будет появляться информация о парсинге (ноды).
Например, можно слева добавить импорт и справа посмотреть формирование нод.
Пример создания плагина https://eslint.org/docs/latest/extend/custom-rules

Использовалась библиотека ts-morph.
Она предназначена для изменения ts-кода.
Создали scripts/updateImports.ts
В нем будет получение файлов (ts, tsx) из src. Определение наличия абсолютных импортов слоёв FSD через importDeclarations.
И добавление к импортам алиаса. В конце обязательно project.save() чтоб сохранить изменения.
