# Исправление ошибки сборки: crypto.hash is not a function

## Проблема
Ошибка возникает из-за несовместимости версии Node.js с Vite 7.x

## Решение 1: Обновить Node.js (рекомендуется)

Vite 7 требует Node.js версии 18.5 или выше (лучше 20.x LTS).

### Проверка текущей версии:
```bash
node --version
```

### Обновление Node.js через nvm (рекомендуется):
```bash
# Установка nvm (если еще не установлен)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Установка Node.js 20 LTS
nvm install 20
nvm use 20
nvm alias default 20

# Проверка
node --version
npm --version
```

### Или обновление через пакетный менеджер:
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Проверка
node --version
```

### После обновления Node.js:
```bash
cd /var/www/sfera-deti
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Решение 2: Понизить версию Vite (если нельзя обновить Node.js)

Если Node.js версии ниже 18.5, можно понизить версию Vite:

```bash
cd /var/www/sfera-deti
npm install vite@^5.4.0 --save-dev
npm run build
```

## Решение 3: Исправить путь к изображению в CSS

Если проблема в обработке URL, можно изменить путь в Hero.css:

Вместо:
```css
background-image: url('/23.jpg');
```

Использовать:
```css
background-image: url('./23.jpg');
```

Или переместить изображение в src/assets и импортировать через JS.

## Проверка после исправления

```bash
npm run build
```

Сборка должна завершиться успешно.

