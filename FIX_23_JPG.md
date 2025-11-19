# Исправление проблемы с загрузкой 23.jpg

## Проблема
Vite обрабатывает URL в CSS и добавляет `/public/` к пути, поэтому nginx ищет файл по пути `/root/sfera-deti/dist/public/23.jpg` вместо `/root/sfera-deti/dist/23.jpg`.

## Быстрое решение на сервере

Создайте симлинк или директорию public:

```bash
# Вариант 1: Создать директорию public и скопировать файл
cd /root/sfera-deti/dist
mkdir -p public
cp 23.jpg public/23.jpg

# Вариант 2: Создать симлинк
cd /root/sfera-deti/dist
mkdir -p public
ln -s ../23.jpg public/23.jpg

# Проверьте
ls -la /root/sfera-deti/dist/public/23.jpg
```

## Постоянное решение

После каждого деплоя нужно будет создавать эту директорию. Можно добавить это в скрипт деплоя:

```bash
# Добавьте в deploy.sh после npm run build:
mkdir -p /root/sfera-deti/dist/public
cp /root/sfera-deti/dist/23.jpg /root/sfera-deti/dist/public/23.jpg
```

## Альтернативное решение: Исправить путь в CSS

Изменить путь в CSS на относительный, но это может не сработать правильно.


