# Настройка переменных окружения на сервере

## Команды для создания .env файла на сервере

Выполните следующие команды на сервере (через SSH):

```bash
cd ~/sfera-deti

# Создаем .env файл с переменными окружения
cat > .env << 'EOF'
# EmailJS настройки (для отправки email через EmailJS)
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here

# FormSubmit настройки (альтернативный способ отправки email)
VITE_FORM_SUBMIT_EMAIL=your_email@example.com

# Web3Forms настройки (еще один способ отправки email)
VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
VITE_WEB3FORMS_TO_EMAIL=your_email@example.com

# Telegram настройки (опционально, если используется)
VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
VITE_TELEGRAM_CHAT_ID=your_chat_id_here
EOF

# Устанавливаем правильные права доступа (только чтение для владельца)
chmod 600 .env

# Проверяем, что файл создан
cat .env
```

## Альтернативный способ (редактирование через nano/vim)

Если предпочитаете редактировать файл вручную:

```bash
cd ~/sfera-deti
nano .env
```

Затем вставьте содержимое:

```
# EmailJS настройки
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here

# FormSubmit настройки
VITE_FORM_SUBMIT_EMAIL=your_email@example.com

# Web3Forms настройки
VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
VITE_WEB3FORMS_TO_EMAIL=your_email@example.com

# Telegram настройки
VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
VITE_TELEGRAM_CHAT_ID=your_chat_id_here
```

Сохраните файл: `Ctrl+O`, затем `Enter`, затем `Ctrl+X` (для nano).

## Важно!

1. **Замените все значения** `your_*_here` на реальные значения
2. **Не коммитьте** `.env` файл в git (он должен быть в `.gitignore`)
3. После изменения `.env` файла **пересоберите проект**:
   ```bash
   npm run build
   ```
4. Если используется PM2, **перезапустите приложение**:
   ```bash
   pm2 restart sfera-deti
   ```

## Проверка переменных

После создания файла можно проверить, что переменные загружаются:

```bash
# В режиме разработки
npm run dev

# Или в собранном проекте проверьте в браузере через консоль разработчика
```




