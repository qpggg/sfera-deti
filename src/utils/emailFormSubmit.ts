// Функция для отправки email через FormSubmit (самый простой вариант)
export interface EmailData {
  parentFullName: string
  childFullName: string
  childAge: string
  phone: string
  source: string
  comment?: string
}

export async function sendEmailFormSubmit(data: EmailData): Promise<boolean> {
  // Email получателя (просто укажите ваш email)
  const TO_EMAIL = import.meta.env.VITE_FORM_SUBMIT_EMAIL || ''

  if (!TO_EMAIL) {
    console.error('Email получателя не указан')
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

  // Формируем данные для отправки
  const formData = new FormData()
  formData.append('email', TO_EMAIL)
  formData.append('subject', 'Новая заявка с сайта СФЕРА')
  formData.append('message', message)
  formData.append('_next', window.location.href) // Редирект после отправки (опционально)

  try {
    const response = await fetch(`https://formsubmit.co/${TO_EMAIL}`, {
      method: 'POST',
      body: formData
    })

    // FormSubmit возвращает редирект, но мы обрабатываем как успех
    if (response.ok || response.status === 200 || response.status === 302) {
      return true
    }

    return false
  } catch (error) {
    console.error('Ошибка при отправке email:', error)
    return false
  }
}




