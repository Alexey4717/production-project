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
