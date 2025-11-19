# Полный гайд по настройке Nginx для sfera-deti.ru

## Шаг 1: Проверка установки Nginx

```bash
# Проверка, установлен ли nginx
nginx -v

# Если не установлен, установите:
sudo apt update
sudo apt install -y nginx

# Проверка статуса
sudo systemctl status nginx
```

## Шаг 2: Подготовка конфигурации

```bash
# Перейдите в директорию проекта
cd /root/sfera-deti

# Убедитесь, что проект собран
ls -la dist/

# Если папки dist нет или она пустая, соберите проект:
npm run build
```

## Шаг 3: Копирование конфигурации Nginx

```bash
# Скопируйте файл конфигурации
sudo cp nginx.conf.example /etc/nginx/sites-available/sfera-deti

# Проверьте, что файл скопирован
sudo ls -la /etc/nginx/sites-available/sfera-deti
```

## Шаг 4: Временная конфигурация для получения SSL

Перед настройкой SSL нужно временно настроить HTTP версию без редиректа на HTTPS.

```bash
# Откройте файл для редактирования
sudo nano /etc/nginx/sites-available/sfera-deti
```

Замените содержимое на следующее (временно, только для получения SSL):

```nginx
# HTTP сервер - временно для получения SSL сертификата
server {
    listen 80;
    listen [::]:80;
    server_name sfera-deti.ru www.sfera-deti.ru;

    # Корневая директория со статическими файлами
    root /root/sfera-deti/dist;
    index index.html;

    # Логи
    access_log /var/log/nginx/sfera-deti-access.log;
    error_log /var/log/nginx/sfera-deti-error.log;

    # Gzip сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;

    # Основная локация
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Кеширование статических файлов
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Безопасность заголовков
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
```

Сохраните файл: `Ctrl+O`, `Enter`, `Ctrl+X`

## Шаг 5: Активация конфигурации

```bash
# Создайте симлинк для активации сайта
sudo ln -s /etc/nginx/sites-available/sfera-deti /etc/nginx/sites-enabled/sfera-deti

# Проверьте, что симлинк создан
ls -la /etc/nginx/sites-enabled/ | grep sfera-deti

# Удалите дефолтную конфигурацию (если есть)
sudo rm -f /etc/nginx/sites-enabled/default
```

## Шаг 6: Проверка конфигурации

```bash
# Проверка синтаксиса конфигурации
sudo nginx -t

# Если видите "syntax is ok" и "test is successful" - все хорошо
# Если есть ошибки - исправьте их в файле конфигурации
```

## Шаг 7: Перезагрузка Nginx

```bash
# Перезагрузите nginx для применения изменений
sudo systemctl reload nginx

# Или полный перезапуск (если reload не помог)
sudo systemctl restart nginx

# Проверьте статус
sudo systemctl status nginx
```

## Шаг 8: Проверка работы сайта

```bash
# Проверьте, что nginx слушает порт 80
sudo netstat -tlnp | grep :80

# Или
sudo ss -tlnp | grep :80

# Проверьте доступность сайта
curl -I http://sfera-deti.ru

# Должен вернуться HTTP 200 или 301
```

Откройте в браузере: `http://sfera-deti.ru` (без https)

## Шаг 9: Настройка SSL через Certbot

```bash
# Установите certbot (если еще не установлен)
sudo apt install -y certbot python3-certbot-nginx

# Получите SSL сертификат и автоматически настройте nginx
sudo certbot --nginx -d sfera-deti.ru -d www.sfera-deti.ru

# Certbot спросит:
# - Email для уведомлений (введите ваш email)
# - Согласие с условиями (Y)
# - Редирект HTTP на HTTPS (выберите 2 - Redirect)
```

Certbot автоматически:
- Получит SSL сертификат от Let's Encrypt
- Обновит конфигурацию nginx
- Настроит редирект с HTTP на HTTPS
- Настроит автообновление сертификата

## Шаг 10: Проверка финальной конфигурации

```bash
# Проверьте обновленную конфигурацию
sudo nginx -t

# Посмотрите финальную конфигурацию
sudo cat /etc/nginx/sites-available/sfera-deti

# Перезагрузите nginx (если нужно)
sudo systemctl reload nginx
```

## Шаг 11: Финальная проверка

```bash
# Проверьте HTTPS
curl -I https://sfera-deti.ru

# Проверьте редирект с HTTP на HTTPS
curl -I http://sfera-deti.ru

# Должен вернуться 301 редирект на https://
```

Откройте в браузере: **https://sfera-deti.ru**

## Шаг 12: Автообновление SSL сертификата

Certbot автоматически настроит автообновление через systemd timer.

```bash
# Проверьте статус автообновления
sudo systemctl status certbot.timer

# Проверьте, когда будет следующее обновление
sudo systemctl list-timers | grep certbot

# Тестовое обновление (не обновит, если не нужно)
sudo certbot renew --dry-run
```

## Полезные команды для управления Nginx

```bash
# Проверка статуса
sudo systemctl status nginx

# Запуск
sudo systemctl start nginx

# Остановка
sudo systemctl stop nginx

# Перезапуск
sudo systemctl restart nginx

# Перезагрузка конфигурации без остановки
sudo systemctl reload nginx

# Проверка конфигурации
sudo nginx -t

# Просмотр логов ошибок
sudo tail -f /var/log/nginx/sfera-deti-error.log

# Просмотр логов доступа
sudo tail -f /var/log/nginx/sfera-deti-access.log

# Просмотр всех логов nginx
sudo tail -f /var/log/nginx/error.log
```

## Решение проблем

### Проблема: "nginx: [emerg] bind() to 0.0.0.0:80 failed"

```bash
# Проверьте, что порт 80 не занят другим процессом
sudo lsof -i :80
# Или
sudo netstat -tlnp | grep :80

# Остановите процесс, который занимает порт, или измените конфигурацию
```

### Проблема: "502 Bad Gateway"

```bash
# Проверьте, что файлы в dist/ существуют
ls -la /root/sfera-deti/dist/

# Проверьте права доступа
sudo chown -R www-data:www-data /root/sfera-deti/dist
# Или
sudo chmod -R 755 /root/sfera-deti/dist
```

### Проблема: "403 Forbidden"

```bash
# Проверьте права доступа к директории
ls -la /root/sfera-deti/dist/

# Установите правильные права
sudo chown -R www-data:www-data /root/sfera-deti/dist
sudo chmod -R 755 /root/sfera-deti/dist
```

### Проблема: Сайт не открывается

```bash
# Проверьте, что DNS записи настроены
nslookup sfera-deti.ru

# Проверьте, что nginx запущен
sudo systemctl status nginx

# Проверьте конфигурацию
sudo nginx -t

# Проверьте логи
sudo tail -50 /var/log/nginx/error.log
```

### Проблема: SSL сертификат не работает

```bash
# Проверьте сертификат
sudo certbot certificates

# Обновите сертификат вручную
sudo certbot renew

# Проверьте конфигурацию SSL в nginx
sudo nginx -t
```

## Оптимизация производительности

### Увеличение лимитов

Добавьте в `/etc/nginx/nginx.conf` в блок `http`:

```nginx
http {
    # Увеличение лимитов
    client_max_body_size 20M;
    client_body_buffer_size 128k;
    
    # Таймауты
    client_body_timeout 12;
    client_header_timeout 12;
    keepalive_timeout 15;
    send_timeout 10;
}
```

### Кеширование

Конфигурация уже включает кеширование статических файлов на 1 год.

## Безопасность

### Ограничение доступа к скрытым файлам

Добавьте в блок `server`:

```nginx
# Запрет доступа к скрытым файлам
location ~ /\. {
    deny all;
    access_log off;
    log_not_found off;
}
```

### Защита от DDoS

Добавьте лимиты:

```nginx
# Лимиты запросов
limit_req_zone $binary_remote_addr zone=one:10m rate=10r/s;

server {
    limit_req zone=one burst=20 nodelay;
    # ... остальная конфигурация
}
```

## Мониторинг

### Просмотр статистики

```bash
# Количество запросов за последний час
sudo grep $(date +%d/%b/%Y:%H) /var/log/nginx/sfera-deti-access.log | wc -l

# Топ IP адресов
sudo awk '{print $1}' /var/log/nginx/sfera-deti-access.log | sort | uniq -c | sort -rn | head -10

# Топ страниц
sudo awk '{print $7}' /var/log/nginx/sfera-deti-access.log | sort | uniq -c | sort -rn | head -10
```

## Резервное копирование конфигурации

```bash
# Создайте резервную копию конфигурации
sudo cp /etc/nginx/sites-available/sfera-deti /etc/nginx/sites-available/sfera-deti.backup

# Восстановление из резервной копии
sudo cp /etc/nginx/sites-available/sfera-deti.backup /etc/nginx/sites-available/sfera-deti
sudo nginx -t
sudo systemctl reload nginx
```

## Готово!

После выполнения всех шагов ваш сайт будет доступен по адресу:
- **https://sfera-deti.ru** (с SSL)
- **http://sfera-deti.ru** (автоматически редиректит на HTTPS)

