# Введение в CI/CD

CI/CD (Continuous Integration / Continuous Delivery) — это практика автоматизации процессов разработки:
- **CI (Непрерывная интеграция)**:
    - Автоматический запуск тестов
    - Проверка стиля кода
    - Проверка типизации
    - Сборка приложения
- **CD (Непрерывная доставка)**:
    - Автоматический деплой на тестовые/продакшен окружения
    - Публикация релизов

Преимущества:
- Устранение человеческого фактора
- Раннее обнаружение ошибок
- Ускорение процесса разработки
- Избавление от ручного запуска скриптов проверки

### Как работает CI:
- Запускаются скрипты, описанные в package.json
- Проверяется корректность кода:
- - линтеры (eslint, stylelint)
- - юнит-тесты (jest, vitest)
- - сборка (webpack, vite)
- - проверка UI-скриншотов (loki)
- на каждый push, или только на pull request запускаются workflow
- блокируется возможность вмерджить ветку в main до тех пор, пока все процессы отработают без ошибок
- когда CI закончен без ошибок, мерджится код в main ветку, затем идёт сборка приложения (если это требуется)

### Как работает CD:
- После успешного CI дальнейшая публикация этой сборки на тестовое/прод окружение/GitHub Pages
- автоматизация на облачном сервере процессов pull свежей кодовой базы, запуск скрипта прод сборки, при необходимости выполнения скриптов переноса папки билда, перезапуска бэкенда
- обычно настройка этих процессов описана в docker или bash-script файле и выполняется на облачном сервере (хранится в папке .deploy)

----

## Настройка GitHub Actions

### 1. Создание workflow

В корне проекта создайте папку .github/workflows/

### 2. Добавьте файл `main.yml` с базовой конфигурацией:

```yaml
name: CI Pipeline
on:
push:
  branches: [ main ]
pull_request:
  branches: [ main ]
```

----

## Основные компоненты workflow

```yaml
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18.x
      - run: yarn install --frozen-lockfile
      - run: yarn build
      - run: yarn test
```

----

## Параллельное выполнение задач

Оптимизированный workflow с параллельными jobs:

```yaml
jobs:
  checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18.x
      - run: yarn install --frozen-lockfile
      - run: yarn lint:ts
      - run: yarn lint:scss

  build-and-test:
    runs-on: ubuntu-latest
    needs: checks
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18.x
      - run: yarn install --frozen-lockfile
      - run: yarn build:prod
      - run: yarn test:unit
      - run: yarn storybook:build
      - run: yarn test:ui:ci
```

if: always() — гарантирует выполнение шага, даже если предыдущий упал

----

## Интеграция инструментов

1. Линтеры

```yaml
- name: Run ESLint
  run: yarn lint:ts
  continue-on-error: false

- name: Run Stylelint
  run: yarn lint:scss
```

2. Тестирование

```yaml
- name: Unit tests
  run: yarn test:unit

- name: Screenshot tests (Loki)
  run: yarn test:ui:ci
```

3. Сборка Storybook

```yaml
- name: Build Storybook
  run: yarn storybook:build

- name: Upload Storybook
  uses: actions/upload-artifact@v3
  with:
    name: storybook
    path: storybook-static
```

----

## Деплой на GitHub Pages

```yaml
deploy:
  needs: build-and-test
  runs-on: ubuntu-latest
  environment:
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}
  steps:
    - uses: actions/checkout@v4
    - uses: actions/configure-pages@v2
    - uses: actions/upload-pages-artifact@v3
      with:
        path: 'dist'
    - uses: actions/deploy-pages@v1
      id: deployment
```

----

## Продвинутые настройки

1. Кеширование зависимостей

```yaml
- name: Cache node_modules
  uses: actions/cache@v3
  with:
    path: node_modules
    key: ${{ runner.os }}-modules-${{ hashFiles('yarn.lock') }}
```

2. Условное выполнение

```yaml
- name: Run expensive tests
  if: github.ref == 'refs/heads/main'
  run: yarn test:all
```

3. Матрица сборок

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest]
    node: [16.x, 18.x]
```

----

## Пример полного workflow

```yaml
name: Full CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18.x
      - run: yarn install --frozen-lockfile
      - run: yarn lint:ts
      - run: yarn lint:scss

  build:
    needs: lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18.x
      - run: yarn install --frozen-lockfile
      - run: yarn build:prod
      - run: yarn storybook:build
      - uses: actions/upload-artifact@v3
        with:
          name: production-build
          path: build

  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18.x
      - run: yarn install --frozen-lockfile
      - run: yarn test:unit
      - run: yarn test:ui:ci

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18.x
      - run: yarn install --frozen-lockfile
      - run: yarn build:prod
      - uses: actions/upload-pages-artifact@v3
        with:
          path: build
      - uses: actions/deploy-pages@v1
```

----

## Решение проблем

1. Проблема: Workflow не запускается. Для решения, проверьте:

- Правильность пути к файлу workflow
- Наличие триггеров (push/pull_request)
- Права доступа к репозиторию

2. Проблема: Тесты падают случайным образом. Для решения добавьте повторный запуск:

```yaml
- name: Run flaky tests
  run: yarn test:unit
  continue-on-error: true
```

3. Проблема: Долгая установка зависимостей. Для решения добавьте кеширование (см. выше).

----

## Полезные ссылки

1. [Официальная документация GitHub Actions](https://docs.github.com/ru/actions)
2. [Примеры workflow](https://github.com/actions/starter-workflows)
3. [Настройка Node.js в Actions](https://github.com/actions/setup-node)
4. [Документация Loki для CI](https://loki.js.org/continuous-integration.html)

----

## На нашем проекте

Старый скрипт main.yml

<pre>
name: linting, testing, building
on:
    push:
        branches: [ master ]
    pull_request:
        branches: [ master ]
jobs:
    pipeline:
        runs-on: ubuntu-latest
        strategy:
            matrix:
                node-version: [ 18.x ]

        steps:
            - uses: actions/checkout@v2
            - name: Staring Node.js ${{ matrix.node-version }}
                uses: actions/setup-node@v1
                with:
                    node-version: ${{ matrix.node-version }}
            - name: install modules
                run: yarn install --frozen-lockfile
            - name: build production project
                run: yarn build:prod
                if: always()
            - name: linting typescript
                run: yarn lint:ts
                if: always()
            - name: linting css
                run: yarn lint:scss
                if: always()
            - name: unit testing
                run: yarn test:unit
                if: always()
            - name: build storybook
                run: yarn storybook:build
            # Use it, if need to update reference loki screens with errors
            - name: Update Loki reference files
                run: yarn loki update --reactUri="file:./storybook-static"
            - name: screenshot testing
                run: yarn test:ui:ci
</pre>

Новый скрипт main.yml с распараллеливанием процессов

<pre>
name: linting, testing, building
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]
permissions:
  contents: write
  pages: write
  id-token: write
concurrency:
  group: "pages"
  cancel-in-progress: true
jobs:
  build-and-ui-testing:
    runs-on: ubuntu-latest
    concurrency: ci-${{ github.ref }}
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    strategy:
      matrix:
        node-version: [ 18.x ]
    steps:
      - uses: actions/checkout@v4
      - name: Staring Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - name: install modules
        run: yarn install --frozen-lockfile
      - name: build production project
        run: yarn build:prod
        if: always()
      - name: build storybook
        run: yarn storybook:build
        if: always()
      - name: screenshot testing
        run: yarn test:ui:ci
        if: always()
      - name: unit testing
        if: always()
        run: yarn run test:unit
      - name: Generate HTML report
        run: yarn run test:ui:report
        if: always()
      - name: move loki
        run: mv .loki reports/
        if: always()
      - name: Setup Pages
        uses: actions/configure-pages@v2
        if: always()
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        if: always()
        with:
          name: build-artifact
          path: 'reports'
      - name: Deploy to GitHub Pages
        id: deployment
        if: always()
        uses: actions/deploy-pages@v1

  checks:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [ 18.x ]
    steps:
      - uses: actions/checkout@v4
      - name: Staring Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - name: install modules
        run: yarn install --frozen-lockfile
      - name: linting typescript
        run: yarn run lint:ts
        if: always()
      - name: linting css
        run: yarn run lint:scss
</pre>
