#!/bin/bash

# Скрипт деплоя для сервера
# Использование: ./deploy.sh

set -e

echo "🚀 Начинаем деплой..."

# Переходим в директорию проекта
cd /var/www/sfera-deti || exit 1

# Получаем последние изменения из git
echo "📥 Получаем изменения из git..."
git fetch origin
git reset --hard origin/main

# Устанавливаем зависимости (если нужно)
echo "📦 Устанавливаем зависимости..."
npm ci --production=false

# Собираем проект (файлы будут в dist/)
echo "🔨 Собираем проект..."
npm run build

# Перезапускаем nginx
echo "🔄 Перезапускаем nginx..."
sudo systemctl reload nginx

echo "✅ Деплой завершен успешно!"

