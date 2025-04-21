# Документация по хостингу React-приложения на облачном сервере

## Введение

В этом руководстве мы рассмотрим процесс развертывания React-приложения на собственном облачном сервере с использованием:

- Ubuntu Server
- Nginx (веб-сервер)
- PM2 (менеджер процессов для Node.js)
- Let's Encrypt (SSL сертификаты)

----

## Подготовка сервера

### 1. Создание сервера
   
- Зарегистрируйтесь на Selectel или другом облачном провайдере
- Создайте новый виртуальный сервер (VPS) с Ubuntu
- Запомните IP-адрес сервера

### 2. Подключение к серверу

```bash
ssh root@ваш_ip_адрес
# Введите пароль при запросе
```

### 3. Настройка окружения

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install git-all -y

# Установка Node.js через nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc
nvm install 18  # Установите версию Node.js, используемую в проекте
nvm use 18
```

----

## Развертывание приложения

### 1. Клонирование проекта

```bash
git clone https://github.com/ваш_username/ваш_репозиторий.git
cd ваш_репозиторий
```

### 2. Установка зависимостей

```bash
npm install -g yarn
yarn install
```

### 3. Сборка проекта

```bash
yarn build:prod
```

----

## Настройка Nginx

### 1. Установка Nginx

```bash
sudo apt install nginx -y
```

### 2. Базовая конфигурация

Отредактируйте файл конфигурации:

```bash
sudo vim /etc/nginx/sites-available/default
```

Пример конфигурации:

```nginx
server {
    listen 80;
    server_name ваш_домен.ru www.ваш_домен.ru;
    
    root /var/www/ваш_проект/html;
    index index.html;
    
    location / {
        try_files $uri /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. Размещение статики

```bash
sudo mkdir -p /var/www/ваш_проект/html
sudo cp -r build/* /var/www/ваш_проект/html/
sudo chown -R www-data:www-data /var/www/ваш_проект
```

### 4. Проверка и перезапуск Nginx

```bash
sudo nginx -t  # Проверка конфигурации
sudo systemctl restart nginx
```

----

## Настройка домена

1. Купите домен на reg.ru или другом регистраторе
2. В настройках DNS добавьте A-записи:
- @ → IP вашего сервера
- www → IP вашего сервера
3. В панели управления Selectel добавьте домен и настройте DNS-серверы

Может занять от 15 минут до 24 часов для активации DNS.

----

## Настройка HTTPS (Let's Encrypt)

### 1. Установка Certbot

```bash
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

### 2. Получение сертификата

```bash
sudo certbot --nginx -d ваш_домен.ru -d www.ваш_домен.ru
```

### 3. Автоматическое обновление

```bash
sudo certbot renew --dry-run
```

----

## Запуск бэкенда с PM2

### 1. Установка PM2

```bash
npm install -g pm2
```

### 2. Запуск сервера

```bash
pm2 start ваш_серверный_файл.js
pm2 save
pm2 startup
```

### 3. Полезные команды PM2

```bash
pm2 list      # Список процессов
pm2 logs      # Просмотр логов
pm2 restart 0 # Перезапуск процесса (0 - ID процесса)
```

----

## Автоматизация деплоя

Создайте файл .deploy/deploy.sh:

```bash
#!/bin/bash

# Обновление кода
cd /root/ваш_репозиторий
git pull origin main

# Установка зависимостей
yarn install

# Сборка проекта
yarn build:prod

# Копирование статики
sudo rm -rf /var/www/ваш_проект/html/*
sudo cp -r build/* /var/www/ваш_проект/html/

# Перезапуск Nginx
sudo systemctl restart nginx
```

Дайте права на выполнение:

```bash
chmod +x .deploy/deploy.sh
```

----

## Дополнительно: gzip-сжатие в Nginx

Для ускорения загрузки:

### 1. Открываем основной конфиг:

```bash
sudo vim /etc/nginx/nginx.conf
```

### 2. Добавляем или раскомментируем:

```nginx
gzip on;
gzip_comp_level 5;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

### 3. Перезапускаем:

```bash
sudo service nginx restart
```

## Решение проблем

### 1. Страницы не обновляются

Убедитесь, что в конфиге Nginx есть:

```nginx
location / {
    try_files $uri /index.html;
}
```

### 2. Ошибки CORS

Добавьте заголовки в Nginx:

```nginx
add_header 'Access-Control-Allow-Origin' '*';
add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
```

### 3. Проблемы с HTTPS

Проверьте конфигурацию Certbot:

```bash
sudo certbot renew --dry-run
```

----

## Полезные ссылки

1. [Официальная документация Nginx](https://nginx.org/en/docs/)
2. [Certbot инструкции](https://certbot.eff.org/instructions)
3. [PM2 документация](https://pm2.keymetrics.io/docs/usage/quick-start/)
4. [Let's Encrypt](https://letsencrypt.org/)

----

## Заключение

Теперь ваше React-приложение:

- Доступно по доменному имени
- Защищено HTTPS
- Автоматически обновляется при изменениях
- Работает в фоне и стабильно благодаря PM2

Для дальнейшего развития можно рассмотреть:

- Настройку CI/CD (GitHub Actions, GitLab CI)
- Использование Docker для изоляции окружения
- Настройку мониторинга (например, UptimeRobot)
