# Stylelint

## Введение

Stylelint — это мощный современный линтер для CSS, который помогает:
- Поддерживать единый стиль кода
- Избегать ошибок в стилях
- Внедрять лучшие практики
- Автоматически исправлять проблемы форматирования

---

## Установка

Для базовой установки выполните:

```bash
npm install --save-dev stylelint stylelint-config-standard
```

Для проектов с:

SCSS:

```bash
npm install --save-dev stylelint-scss
```

CSS Modules: 

```bash
npm install --save-dev stylelint-config-css-modules
```

Prettier:

```bash
npm install --save-dev stylelint-config-prettier
```

----

## Базовая конфигурация

Создайте файл .stylelintrc.json в корне проекта:

```bash
{
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-prettier"
  ],
  "rules": {
    "selector-class-pattern": null,
    "keyframes-name-pattern": null,
    "custom-property-pattern": null
  }
}
```

### Расширенные конфигурации

Для SCSS:

```bash
{
  "extends": [
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-vue/scss"
  ]
}
```

Для CSS Modules:

```bash
{
  "extends": [
    "stylelint-config-css-modules",
    "stylelint-config-standard"
  ]
}
```

----

## Основные правила

Популярные правила форматирования

```bash
{
  "rules": {
    "indentation": 2,
    "number-leading-zero": "always",
    "string-quotes": "single",
    "selector-max-id": 0,
    "max-nesting-depth": 3
  }
}
```

Правила для SCSS

```bash
{
  "rules": {
    "scss/dollar-variable-pattern": "^foo",
    "scss/selector-no-redundant-nesting-selector": true
  }
}
```

Правила для порядка свойств

Установите плагин:

```bash
npm install --save-dev stylelint-order
```

Пример конфига:

```bash
{
  "plugins": ["stylelint-order"],
  "rules": {
    "order/properties-alphabetical-order": true
  }
}
```

----

## Игнорирование файлов

Создайте .stylelintignore:

```bash
**/node_modules/**
**/dist/**
**/vendor/**
*.js
*.ts
```

----

## Интеграция с Prettier

Установите конфиг:

```bash
npm install --save-dev stylelint-config-prettier
```

Добавьте в .stylelintrc.json

```bash
{
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-prettier"
  ]
}
```

----

## Использование

Проверка стилей

```bash
npx stylelint "**/*.css"
```

Проверка с авто исправлением

```bash
npx stylelint "**/*.scss" --fix
```

Проверка конкретного файла

```bash
npx stylelint src/components/Button.module.css
```

----

## Интеграция с IDE

### VS Code

1. Установите расширение stylelint.vscode-stylelint
2. Добавьте в настройки:

```bash
{
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  },
  "stylelint.validate": ["css", "scss", "vue"]
}
```

### WebStorm

1. Включите Stylelint в Settings > Languages & Frameworks > Style Sheets > Stylelint
2. Отметьте Automatic search

----

## Интеграция с Git Hooks

Добавьте в lint-staged:

```bash
{
  "lint-staged": {
    "**/*.{css,scss}": [
      "stylelint --fix",
      "git add"
    ]
  }
}
```

Или в .husky/pre-commit:

```bash
#!/bin/sh
npx stylelint "**/*.css" --fix
```

----

## Решение проблем

### Ошибки парсинга

Для нестандартных синтаксисов укажите:

```bash
{
  "customSyntax": "postcss-scss"
}
```

### Конфликты с Prettier

1. Убедитесь, что stylelint-config-prettier последний в extends
2. Отключите конфликтующие правила:

```bash
npx stylelint-config-prettier-check
```

----

## Полезные ссылки

1. [Официальная документация](https://stylelint.io/)
2. [Список правил](https://stylelint.io/user-guide/rules/)
3. [Примеры конфигов](https://github.com/stylelint/stylelint-config-standard)
