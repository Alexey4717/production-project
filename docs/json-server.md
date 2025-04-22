# Документация по JSON Server

## Введение

Есть сервис jsonplaceholder, с помощью которого можно получать разные данные (https://jsonplaceholder.typicode.com/).
Он спроектирован на базе https://github.com/typicode/json-server, который можно быстро настроить и поднять.

JSON Server — это полноценный фейковый REST API, который можно развернуть за 30 секунд. Он идеально подходит для:

- Прототипирования фронтенда без бэкенда
- Тестирования API-запросов
- Обучения работе с REST API
- Мока данных для разработки

## Установка

Глобальная установка

```bash
npm install -g json-server
```

Локальная установка (как dev-зависимость)

```bash
npm install json-server --save-dev
```

## Быстрый старт

### 1. Создайте файл db.json в корне проекта:

```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

### 2. Запустите сервер:

```bash
json-server --watch db.json --port 8000
```

Теперь доступны стандартные REST-эндпоинты:

- GET /posts
- GET /posts/1
- POST /posts
- PUT /posts/1
- PATCH /posts/1
- DELETE /posts/1

## Расширенная настройка

### Кастомный сервер с авторизацией

Создайте json-server/index.js:

```js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Имитация авторизации
server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    const { username, password } = req.body;
    const db = router.db.getState();
    const user = db.users.find(u => u.username === username && u.password === password);
    
    if (user) {
      return res.json({ id: user.id, token: 'fake-jwt-token' });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Проверка токена для защищенных роутов
  if (req.headers.authorization !== 'Bearer fake-jwt-token') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
});

server.use(middlewares);
server.use(router);
server.listen(8000, () => {
  console.log('JSON Server is running on port 8000');
});
```

Добавьте в package.json:

```json
"scripts": {
  "start:dev:server": "node ./json-server/index.js"
}
```

## Основные возможности

### Фильтрация

```bash
GET /posts?title=json-server
GET /posts?id=1&id=2
GET /posts?author.name=aleksei  # фильтр по вложенным полям
```

### Пагинация

```bash
GET /posts?_page=2&_limit=10
```

Ответ включает заголовки:

- X-Total-Count - общее количество элементов
- Link - ссылки на первую, предыдущую, следующую и последнюю страницы

### Сортировка

```bash
GET /posts?_sort=views&_order=asc
```

### Операторы

```bash
GET /posts?views_gte=100  # views >= 100
GET /posts?views_lte=50   # views <= 50
GET /posts?title_ne=test  # title != "test"
```

### Полнотекстовый поиск

```bash
GET /posts?q=react
```

### Связи между сущностями

```bash
GET /posts/1/comments  # все комментарии к посту с id=1
GET /comments?postId=1 # альтернативный вариант
```

## Интеграция с фронтендом

### Пример запроса на авторизацию

```js
const login = async (username, password) => {
  const response = await fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  if (!response.ok) throw new Error('Auth failed');
  return response.json();
};
```

### Защищенные запросы

```js
const getProfile = async (token) => {
  const response = await fetch('http://localhost:8000/profile', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  if (!response.ok) throw new Error('Request failed');
  return response.json();
};
```

## Продвинутые сценарии

### Генерация тестовых данных

Используйте faker.js для создания реалистичных данных:

```js
// generate-data.js
const { faker } = require('@faker-js/faker');
const fs = require('fs');

const generatePosts = (count) => {
  return Array(count).fill().map(() => ({
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(3),
    author: faker.name.fullName(),
    views: faker.datatype.number(1000),
    createdAt: faker.date.past()
  }));
};

const db = {
  posts: generatePosts(100),
  users: [
    { id: 1, username: 'admin', password: 'admin' }
  ]
};

fs.writeFileSync('db.json', JSON.stringify(db));
```

### Кастомные роуты

Добавьте в index.js перед server.use(router):

```js
server.get('/custom-route', (req, res) => {
  const db = router.db.getState();
  res.json({
    totalPosts: db.posts.length,
    lastPost: db.posts[db.posts.length - 1]
  });
});
```

### Задержка ответа (имитация сети)

```js
server.use((req, res, next) => {
  setTimeout(next, 1000); // 1 секунда задержки
});
```

## Best Practices

- Не коммитьте реальные данные - добавьте db.json в .gitignore
- Используйте разные порты для dev и production-like серверов
- Создавайте сценарии для генерации тестовых данных
- Документируйте API с помощью Swagger или Postman
- Мокайте ошибки для тестирования обработки ошибок на фронтенде

## Полезные ссылки

- [Официальная документация](https://github.com/typicode/json-server)
- [Примеры API-запросов](https://github.com/typicode/json-server#routes)
- [Faker.js для генерации данных](https://fakerjs.dev/)
