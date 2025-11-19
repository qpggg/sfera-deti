#!/bin/bash

# Скрипт деплоя для сервера
# Использование: ./deploy.sh

set -e

echo "🚀 Начинаем деплой..."

# Проверка версии Node.js
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Внимание: Node.js версии ниже 18.5 может вызвать ошибки сборки."
    echo "Рекомендуется обновить Node.js до версии 20 LTS"
    echo "См. BUILD_FIX.md для инструкций"
fi

# Переходим в директорию проекта
cd /root/sfera-deti || exit 1

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

