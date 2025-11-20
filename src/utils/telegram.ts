// Функция для открытия чата в Telegram с предзаполненным текстом заявки
export interface TelegramMessage {
  parentFullName: string
  childFullName: string
  childAge: string
  phone: string
  source: string
  comment?: string
}

export function openTelegramChat(data: TelegramMessage): boolean {
  // Username получателя в Telegram
  const TELEGRAM_USERNAME = 'skrudj_verif'

  // Форматируем сообщение
  const message = `🎯 Новая заявка с сайта СФЕРА

👤 Родитель: ${data.parentFullName}
👶 Ребёнок: ${data.childFullName}
🎂 Возраст: ${data.childAge} лет
📞 Телефон: ${data.phone}
🏫 Сад/Школа: ${data.source}${data.comment ? `\n💬 Комментарий: ${data.comment}` : ''}

⏰ ${new Date().toLocaleString('ru-RU')}`

  // Кодируем сообщение для URL
  const encodedMessage = encodeURIComponent(message)
  
  // Формируем ссылку на чат с предзаполненным текстом
  const telegramUrl = `https://t.me/${TELEGRAM_USERNAME}?text=${encodedMessage}`
  
  // Открываем чат в новой вкладке
  window.open(telegramUrl, '_blank')
  
  return true
}

