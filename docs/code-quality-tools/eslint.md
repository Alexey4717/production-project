# ESLint

---

## 1. Введение в ESLint
ESLint — это инструмент для статического анализа кода, который помогает:
- Находить и исправлять ошибки
- Поддерживать единый стиль кода
- Избегать потенциальных проблем

К настройкам правил нужно относиться серьезно и основательно

---

## 2. Установка и базовая настройка

### Установка ESLint
```bash
npm install --save-dev eslint
npm init @eslint/config
```

Следуйте инструкциям, выбрав нужные опции (например, поддержка TypeScript, React и т.д.).
После установки ESLint создаст конфигурационный файл (.eslintrc.js или eslint.config.js в новых версиях).

----

## 3. Работа с правилами ESLint

### Настройка правил

1. Наведите курсор на ошибку линтера, чтобы увидеть название правила
2. Скопируйте название правила и найдите его в официальной документации
3. Добавьте правило в конфиг:

```bash
// .eslintrc.js
module.exports = {
  rules: {
    'no-console': 'warn', // выдаёт предупреждение
    'no-debugger': 'error', // ошибка
    'some-unused-rule': 'off', // выключено
  }
}
```

Временное отключение правил

```bash
// eslint-disable-next-line rule-name
код, который нарушает правило
```

----

## 4. Популярные плагины

### i18next

Для подсветки текста в JSX разметке, требующего перевода:

```bash
npm install --save-dev eslint-plugin-i18next
```

### React Hooks

Правила для работы с React хуками (уже включены в CRA):

```bash
'react-hooks/exhaustive-deps': 'error' // Проверка массивов зависимостей
```

### Unused Imports

Для поиска неиспользуемых импортов:

```bash
npm install --save-dev eslint-plugin-unused-imports
```

Конфигурация:

```bash
plugins: ['unused-imports'],
rules: {
  'unused-imports/no-unused-imports': 'error',
}
```

### Import Order

Для сортировки импортов:

```bash
npm install --save-dev eslint-plugin-import
```

Позволяет:
- группировать импорты (библиотеки, абсолютные пути, относительные).
- сортировать импорты по алфавиту.
- добавлять пустые строки между группами.

----

## 5. Глобальные переменные

Если переменная доступна глобально (например, на этапе сборки), её можно объявить.
Чтобы ESLint не ругался (no-undef) на кастомные глобальные переменные:

```bash
// .eslintrc.js
module.exports = {
  globals: {
    __API__: true,
    __PROJECT__: true
  }
}
```

Есть свойство "no-undef" в eslint. Это свойство предотвращает использование каких-то глобальных переменных, типов.
Отключили это правило, т.к. оно в основном используется с var, а мы его не используем.

----

## 6. Создание собственных плагинов ESLint

### Инициализация плагина

1. Создайте новую директорию
2. Инициализируйте проект:

```bash
npm init -y
npm install -g yo
npm install -g generator-eslint
yo eslint:plugin
```

### Создание правила

```bash
yo eslint:rule
```

### Структура плагина

```bash
your-plugin/
├── lib/
│   ├── index.js       # Экспорт всех правил
│   └── rules/         # Папка с правилами
├── tests/             # Тесты
└── package.json
```

### Пример правила

```bash
// lib/rules/your-rule.js
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Описание правила'
    },
    fixable: 'code'
  },
  create(context) {
    return {
      // Логика правила
    }
  }
}
```

### Публикация плагина

1. Создайте аккаунт на npmjs.com
2. Войдите через CLI:

```bash
npm login
```

3. Опубликуйте плагин:

```bash
npm publish
```

4. Установите себе на проект

```bash
npm install --save-dev <your-plugin-name>
```

5. Используйте в .eslintrc.js:

```bash
plugins: ['<your-plugin>'],
rules: {
  '<your-plugin>/your-rule': 'error'
}
```

### Пример плагина path-checker

Создано правило, проверяющее корректность импортов:

- Запрещает относительные импорты между слоями проекта.
- В тестах и стори разрешаются нестандартные импорты через testing.ts.

Для фильтрации тестовых файлов используем настройку:

```bash
settings: {
  testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx']
}
```

Используется библиотека micromatch для работы с globs.

Добавьте свойство fixable: 'code' в метаданные, если правило можно исправить автоматически.

----

## 7. Работа с AST

Для разработки сложных правил используйте [AST Explorer](https://astexplorer.net/):

1. Вставьте код в левую панель
2. Выделяйте элементы кода
3. Изучайте соответствующую AST-ноду справа

----

## 8. ESLint v9+ (Flat Config)

ESLint 9 отказался от .eslintrc.js. Новая конфигурация в eslint.config.js:

```bash
import somePlugin from 'eslint-plugin-some';

export default [
  {
    files: ['**/*.js'],
    ignores: ['**/dist/**'],
    languageOptions: {
      ecmaVersion: 'latest'
    },
    plugins: {
      some: somePlugin
    },
    rules: {
      'some/rule': 'error'
    }
  }
];
```

Для отладки:

```bash
npx eslint . --debug
```

Для автоматического исправления большинства ошибок:

```bash
npx eslint "**/*.{ts,tsx}" --fix
```

----

## 9. Полезные ссылки

1. [Официальная документация ESLint](https://eslint.org/)
2. [React Hooks Rules](https://legacy.reactjs.org/docs/hooks-rules.html)
3. [Создание кастомных правил](https://eslint.org/docs/latest/extend/custom-rules)
4. [AST Explorer](https://astexplorer.net/)
