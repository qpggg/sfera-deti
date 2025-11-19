# Быстрый деплой на сервер

## На сервере выполните:

```bash
# 1. Установка зависимостей (если еще не установлены)
sudo apt update
sudo apt install -y git nodejs npm nginx certbot python3-certbot-nginx

# 2. Создание директории
sudo mkdir -p /var/www/sfera-deti
sudo chown -R $USER:$USER /var/www/sfera-deti

# 3. Клонирование проекта
cd /var/www/sfera-deti
git clone https://github.com/qpggg/sfera-deti.git .

# 4. Установка зависимостей и сборка
npm install
npm run build

# 5. Настройка nginx
sudo cp nginx.conf.example /etc/nginx/sites-available/sfera-deti
sudo ln -s /etc/nginx/sites-available/sfera-deti /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 6. Настройка SSL
sudo certbot --nginx -d sfera-deti.ru -d www.sfera-deti.ru

# 7. Делаем скрипт деплоя исполняемым
chmod +x deploy.sh
```

## После каждого обновления на сервере:

```bash
cd /var/www/sfera-deti
./deploy.sh
```

## PM2 (опционально, только если нужен Node.js сервер)

Для статического сайта PM2 не нужен - nginx отдает файлы напрямую.

Если все же нужен PM2:
```bash
npm install -g pm2
pm2 start npm --name "sfera" -- run preview -- --port 4173
pm2 save
pm2 startup
```

