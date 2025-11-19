# Исправление проблемы с загрузкой изображения 23.jpg

## Проблема
Изображение `23.jpg` не загружается после деплоя. Файл используется в `Hero.css` как фоновое изображение.

## Решение на сервере

### Шаг 1: Проверьте, есть ли файл в dist

```bash
# Проверьте наличие файла 23.jpg в dist
ls -la /root/sfera-deti/dist/23.jpg

# Если файла нет, проверьте все файлы в dist
ls -la /root/sfera-deti/dist/
```

### Шаг 2: Если файла нет в dist

```bash
# Пересоберите проект
cd /root/sfera-deti
npm run build

# Проверьте снова
ls -la /root/sfera-deti/dist/23.jpg
```

### Шаг 3: Проверьте права доступа

```bash
# Установите правильные права
sudo chmod 644 /root/sfera-deti/dist/23.jpg
sudo chown root:root /root/sfera-deti/dist/23.jpg

# Или для всех файлов в dist
sudo chmod -R 644 /root/sfera-deti/dist/*
sudo chown -R root:root /root/sfera-deti/dist/*
```

### Шаг 4: Проверьте конфигурацию nginx

Убедитесь, что nginx правильно обрабатывает статические файлы. В конфигурации должна быть секция:

```nginx
# Кеширование статических файлов
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Шаг 5: Проверьте логи nginx

```bash
# Проверьте логи на ошибки загрузки изображения
sudo tail -50 /var/log/nginx/sfera-deti-error.log | grep 23.jpg

# Или проверьте access лог
sudo tail -50 /var/log/nginx/sfera-deti-access.log | grep 23.jpg
```

### Шаг 6: Проверьте доступность файла через браузер

Откройте в браузере: `https://sfera-deti.ru/23.jpg`

Если файл не открывается, проверьте:
1. Существует ли файл в dist
2. Правильные ли права доступа
3. Правильно ли настроен nginx

### Шаг 7: Очистите кеш браузера

Если файл есть на сервере, но не загружается:
- Очистите кеш браузера (Ctrl+Shift+Delete)
- Или откройте в режиме инкогнито
- Или добавьте параметр к URL: `https://sfera-deti.ru/23.jpg?v=1`

## Альтернативное решение: Проверка пути в CSS

Если проблема в пути, можно проверить собранный CSS:

```bash
# Найдите упоминание 23.jpg в собранных файлах
grep -r "23.jpg" /root/sfera-deti/dist/

# Проверьте, как Vite обработал путь в CSS
grep "23.jpg" /root/sfera-deti/dist/assets/*.css
```

Если путь изменился после сборки, возможно нужно обновить путь в исходном CSS файле.


