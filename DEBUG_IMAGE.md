# Диагностика проблемы с изображением 23.jpg

## Шаг 1: Проверка файлов на сервере

```bash
# Проверьте наличие файла в dist
ls -la /root/sfera-deti/dist/23.jpg

# Проверьте наличие файла в dist/public
ls -la /root/sfera-deti/dist/public/23.jpg

# Если файла в public нет, создайте его
cd /root/sfera-deti/dist
mkdir -p public
cp 23.jpg public/23.jpg
ls -la public/23.jpg
```

## Шаг 2: Проверка доступа через браузер

```bash
# Проверьте доступность файла напрямую
curl -I https://sfera-deti.ru/23.jpg
curl -I https://sfera-deti.ru/public/23.jpg

# Проверьте содержимое ответа
curl https://sfera-deti.ru/23.jpg | head -20
curl https://sfera-deti.ru/public/23.jpg | head -20
```

## Шаг 3: Проверка пути в собранном CSS

```bash
# Найдите, какой путь используется в собранном CSS
grep -r "23.jpg" /root/sfera-deti/dist/assets/*.css

# Или проверьте все CSS файлы
find /root/sfera-deti/dist/assets -name "*.css" -exec grep -l "23.jpg" {} \;
```

## Шаг 4: Проверка логов nginx

```bash
# Проверьте логи на ошибки загрузки изображения
sudo tail -100 /var/log/nginx/sfera-deti-error.log | grep -i "23.jpg\|public"

# Проверьте access лог
sudo tail -100 /var/log/nginx/sfera-deti-access.log | grep "23.jpg"
```

## Шаг 5: Проверка конфигурации nginx

```bash
# Проверьте конфигурацию nginx
sudo cat /etc/nginx/sites-available/sfera-deti | grep -A 5 "location"
```

## Шаг 6: Очистка кеша и пересборка

```bash
# Пересоберите проект
cd /root/sfera-deti
rm -rf dist
npm run build

# Создайте директорию public и скопируйте файл
mkdir -p dist/public
cp dist/23.jpg dist/public/23.jpg

# Проверьте права доступа
sudo chmod 644 /root/sfera-deti/dist/23.jpg
sudo chmod 644 /root/sfera-deti/dist/public/23.jpg

# Перезагрузите nginx
sudo systemctl reload nginx
```

## Шаг 7: Проверка в браузере

1. Откройте DevTools (F12)
2. Перейдите на вкладку Network
3. Обновите страницу (Ctrl+Shift+R для жесткой перезагрузки)
4. Найдите запрос к 23.jpg или public/23.jpg
5. Посмотрите статус ответа и URL

## Альтернативное решение: Использовать другой путь

Если проблема продолжается, можно изменить путь в CSS на относительный или использовать другой способ:

```css
/* Вместо url('/23.jpg') использовать */
background-image: url('./23.jpg');
/* или */
background-image: url('../23.jpg');
```

Но это может не сработать из-за структуры CSS файлов.

## Быстрое решение: Создать симлинк для всех путей

```bash
# Создайте симлинки для всех возможных путей
cd /root/sfera-deti/dist
mkdir -p public
ln -sf ../23.jpg public/23.jpg

# Также создайте в корне, если нужно
# (файл уже должен быть там)
ls -la 23.jpg
```


