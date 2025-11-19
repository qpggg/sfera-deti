# Настройка PM2 для сайта sfera-deti.ru

## Важно

Для статического сайта (React + Vite) PM2 **не обязателен** - nginx отдает файлы напрямую из директории `dist/`. 

PM2 может быть полезен только если:
- Вы хотите запустить preview сервер Vite
- Или у вас есть Node.js бэкенд

## Если все же нужен PM2 для preview сервера

### Шаг 1: Установка PM2

```bash
# Установите PM2 глобально
npm install -g pm2

# Проверьте установку
pm2 --version
```

### Шаг 2: Настройка PM2 для Vite preview

```bash
# Перейдите в директорию проекта
cd /root/sfera-deti

# Создайте файл конфигурации PM2
nano ecosystem.config.js
```

Содержимое `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'sfera-deti',
    script: 'npm',
    args: 'run preview',
    cwd: '/root/sfera-deti',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 4173
    }
  }]
}
```

### Шаг 3: Запуск через PM2

```bash
# Запустите приложение
pm2 start ecosystem.config.js

# Или напрямую
pm2 start npm --name "sfera-deti" -- run preview

# Проверьте статус
pm2 status

# Посмотрите логи
pm2 logs sfera-deti

# Сохраните конфигурацию для автозапуска
pm2 save
pm2 startup
```

### Шаг 4: Настройка nginx для проксирования на PM2

Если используете PM2, нужно изменить конфигурацию nginx для проксирования на порт 4173:

```bash
# Отредактируйте конфигурацию nginx
sudo nano /etc/nginx/sites-available/sfera-deti
```

Измените блок `location /`:

```nginx
location / {
    proxy_pass http://localhost:4173;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Или оставьте статическую отдачу файлов (рекомендуется):

```nginx
location / {
    try_files $uri $uri/ /index.html;
    root /root/sfera-deti/dist;
}
```

### Шаг 5: Управление через PM2

```bash
# Остановить
pm2 stop sfera-deti

# Перезапустить
pm2 restart sfera-deti

# Удалить из PM2
pm2 delete sfera-deti

# Мониторинг
pm2 monit

# Логи в реальном времени
pm2 logs sfera-deti --lines 50

# Перезапуск всех приложений
pm2 restart all
```

## Рекомендация

**Для статического сайта лучше использовать только nginx** без PM2:
- Быстрее (нет промежуточного слоя)
- Меньше потребление ресурсов
- Проще настройка
- Стандартная практика для статических сайтов

PM2 нужен только если:
- У вас есть Node.js бэкенд API
- Вы хотите запустить preview сервер для тестирования
- У вас есть другие Node.js процессы

## Обновление сайта с PM2

Если используете PM2:

```bash
cd /root/sfera-deti
git pull
npm install
npm run build
pm2 restart sfera-deti
```

Но проще использовать только nginx и обновлять файлы в `dist/`:

```bash
cd /root/sfera-deti
./deploy.sh
```

