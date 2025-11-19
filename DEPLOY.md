# Инструкция по деплою на сервер

## Требования
- Ubuntu/Debian сервер
- Установленные: git, node.js, npm, nginx
- Доступ по SSH к серверу
- Домен настроен на IP сервера

## Шаг 1: Подготовка сервера

### Установка необходимых пакетов
```bash
sudo apt update
sudo apt install -y git nodejs npm nginx certbot python3-certbot-nginx
```

### Создание директории для проекта
```bash
sudo mkdir -p /var/www/sfera-deti
sudo chown -R $USER:$USER /var/www/sfera-deti
```

## Шаг 2: Клонирование репозитория

```bash
cd /var/www/sfera-deti
git clone https://github.com/qpggg/sfera-deti.git .
```

## Шаг 3: Установка зависимостей и сборка

```bash
npm install
npm run build
```

## Шаг 4: Настройка Nginx

### Копирование конфигурации
```bash
sudo cp nginx.conf.example /etc/nginx/sites-available/sfera-deti
```

### Редактирование конфигурации
```bash
sudo nano /etc/nginx/sites-available/sfera-deti
```

Замените `your-domain.com` на ваш домен.

### Активация конфигурации
```bash
sudo ln -s /etc/nginx/sites-available/sfera-deti /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Шаг 5: Настройка SSL (Let's Encrypt)

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Certbot автоматически:
- Получит SSL сертификат
- Обновит конфигурацию nginx
- Настроит автообновление сертификата

## Шаг 6: Настройка автоматического деплоя

### Делаем скрипт исполняемым
```bash
chmod +x deploy.sh
```

### Настройка автоматического деплоя через git hook (опционально)

Создайте файл на сервере:
```bash
nano /var/www/sfera-deti/.git/hooks/post-receive
```

Содержимое:
```bash
#!/bin/bash
cd /var/www/sfera-deti
git reset --hard origin/main
npm ci
npm run build
sudo systemctl reload nginx
```

Сделайте исполняемым:
```bash
chmod +x /var/www/sfera-deti/.git/hooks/post-receive
```

## Шаг 7: Ручной деплой

После каждого `git push`, на сервере выполните:
```bash
cd /var/www/sfera-deti
./deploy.sh
```

## Шаг 8: Настройка PM2 (если нужен Node.js сервер)

Если вы хотите использовать PM2 для запуска preview сервера:

```bash
npm install -g pm2
pm2 start npm --name "sfera-preview" -- run preview
pm2 save
pm2 startup
```

Но для статического сайта PM2 не обязателен - nginx отдает статические файлы напрямую.

## Проверка

Откройте в браузере: `https://your-domain.com`

## Обновление сайта

1. Внесите изменения локально
2. `git add .`
3. `git commit -m "описание изменений"`
4. `git push`
5. На сервере: `cd /var/www/sfera-deti && ./deploy.sh`

## Полезные команды

- Проверка статуса nginx: `sudo systemctl status nginx`
- Просмотр логов nginx: `sudo tail -f /var/log/nginx/sfera-deti-error.log`
- Проверка SSL сертификата: `sudo certbot certificates`
- Обновление SSL сертификата: `sudo certbot renew`

