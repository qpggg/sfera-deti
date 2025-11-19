# Решение проблем с Nginx

## Проблема: "500 Internal Server Error"

Если вы видите ошибку 500, это обычно означает проблемы с:
- Отсутствием файлов в директории
- Неправильными правами доступа
- Ошибками в конфигурации

### Решение:

```bash
# 1. Проверьте, что директория dist существует и содержит файлы
ls -la /root/sfera-deti/dist/

# 2. Если директории нет или она пустая, соберите проект
cd /root/sfera-deti
npm run build

# 3. Проверьте права доступа
ls -la /root/sfera-deti/dist/

# 4. Установите правильные права (nginx работает от пользователя www-data)
sudo chown -R www-data:www-data /root/sfera-deti/dist
sudo chmod -R 755 /root/sfera-deti/dist

# 5. Проверьте логи nginx для деталей ошибки
sudo tail -50 /var/log/nginx/sfera-deti-error.log
sudo tail -50 /var/log/nginx/error.log

# 6. Перезагрузите nginx
sudo systemctl reload nginx

# 7. Проверьте снова
curl -I http://sfera-deti.ru
```

### Решение: Изменить пользователя nginx (для проекта в /root)

Если проект находится в `/root`, нужно изменить пользователя nginx:

```bash
# 1. Отредактируйте главный конфиг nginx
sudo nano /etc/nginx/nginx.conf

# 2. Найдите строку в начале файла (обычно строка 1-2):
# user www-data;

# 3. Измените на:
# user root;

# 4. Сохраните файл (Ctrl+O, Enter, Ctrl+X)

# 5. Проверьте конфигурацию
sudo nginx -t

# 6. Перезапустите nginx
sudo systemctl restart nginx

# 7. Проверьте статус
sudo systemctl status nginx

# 8. Проверьте сайт
curl -I https://sfera-deti.ru
```

**Важно:** Это решение работает, но менее безопасно. Для продакшена лучше переместить проект в `/var/www/sfera-deti`.

## Проблема: "File exists" при создании симлинка

Если вы видите ошибку:
```
ln: failed to create symbolic link '/etc/nginx/sites-enabled/sfera-deti': File exists
```

### Решение 1: Удалить существующий файл/симлинк

```bash
# Проверьте, что там есть
ls -la /etc/nginx/sites-enabled/ | grep sfera-deti

# Удалите существующий файл или симлинк
sudo rm /etc/nginx/sites-enabled/sfera-deti

# Теперь создайте симлинк заново
sudo ln -s /etc/nginx/sites-available/sfera-deti /etc/nginx/sites-enabled/sfera-deti
```

### Решение 2: Проверить, что конфигурация правильная

```bash
# Проверьте содержимое существующего файла
cat /etc/nginx/sites-enabled/sfera-deti

# Если это уже правильный симлинк, просто проверьте конфигурацию
sudo nginx -t
```

### Решение 3: Если файл существует, но это не симлинк

```bash
# Проверьте тип файла
file /etc/nginx/sites-enabled/sfera-deti

# Если это обычный файл (не симлинк), удалите его
sudo rm /etc/nginx/sites-enabled/sfera-deti

# Создайте симлинк
sudo ln -s /etc/nginx/sites-available/sfera-deti /etc/nginx/sites-enabled/sfera-deti
```

## Проверка текущей конфигурации

```bash
# Посмотрите все активные сайты
ls -la /etc/nginx/sites-enabled/

# Посмотрите все доступные конфигурации
ls -la /etc/nginx/sites-available/

# Проверьте содержимое вашей конфигурации
sudo cat /etc/nginx/sites-available/sfera-deti
```

## Полная проверка и настройка

```bash
# 1. Удалите старый симлинк/файл (если есть)
sudo rm -f /etc/nginx/sites-enabled/sfera-deti

# 2. Убедитесь, что конфигурация существует
ls -la /etc/nginx/sites-available/sfera-deti

# 3. Создайте симлинк
sudo ln -s /etc/nginx/sites-available/sfera-deti /etc/nginx/sites-enabled/sfera-deti

# 4. Проверьте конфигурацию
sudo nginx -t

# 5. Если все ОК, перезагрузите nginx
sudo systemctl reload nginx
```

