// Функция для отправки email через Web3Forms (без регистрации)
export interface EmailData {
  parentFullName: string
  childFullName: string
  childAge: string
  phone: string
  source: string
  comment?: string
}

export async function sendEmailWeb3Forms(data: EmailData): Promise<boolean> {
  // Access Key получается на сайте web3forms.com (бесплатно, без регистрации)
  const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || ''
  const TO_EMAIL = import.meta.env.VITE_WEB3FORMS_TO_EMAIL || ''

  if (!ACCESS_KEY || !TO_EMAIL) {
    console.error('Web3Forms настройки не найдены')
    return false
  }

  // Форматируем сообщение
  const message = `
🎯 Новая заявка с сайта СФЕРА

👤 Родитель: ${data.parentFullName}
👶 Ребёнок: ${data.childFullName}
🎂 Возраст: ${data.childAge} лет
📞 Телефон: ${data.phone}
🏫 Сад/Школа: ${data.source}
${data.comment ? `💬 Комментарий: ${data.comment}` : ''}

⏰ Дата: ${new Date().toLocaleString('ru-RU')}
  `.trim()

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: 'Новая заявка с сайта СФЕРА',
        from_name: 'Сайт СФЕРА',
        email: TO_EMAIL,
        message: message,
        // Дополнительные поля для удобства
        'Родитель': data.parentFullName,
        'Ребёнок': data.childFullName,
        'Возраст': data.childAge,
        'Телефон': data.phone,
        'Сад/Школа': data.source,
        'Комментарий': data.comment || 'Не указано'
      })
    })

    const result = await response.json()

    if (result.success) {
      return true
    } else {
      console.error('Ошибка отправки через Web3Forms:', result)
      return false
    }
  } catch (error) {
    console.error('Ошибка при отправке email:', error)
    return false
  }
}




