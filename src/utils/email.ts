// Функция для отправки email через EmailJS
import emailjs from '@emailjs/browser'

export interface EmailData {
  parentFullName: string
  childFullName: string
  childAge: string
  phone: string
  source: string
  comment?: string
}

export async function sendEmail(data: EmailData): Promise<boolean> {
  // Получаем настройки из переменных окружения
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''

  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.error('EmailJS настройки не найдены. Проверьте переменные окружения.')
    return false
  }

  // Инициализируем EmailJS с публичным ключом
  emailjs.init(PUBLIC_KEY)

  // Подготавливаем параметры для шаблона
  const templateParams = {
    parent_full_name: data.parentFullName,
    child_full_name: data.childFullName,
    child_age: data.childAge,
    phone: data.phone,
    source: data.source,
    comment: data.comment || 'Не указано',
    date: new Date().toLocaleString('ru-RU'),
    subject: 'Новая заявка с сайта СФЕРА'
  }

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    )

    if (response.status === 200) {
      return true
    }

    return false
  } catch (error) {
    console.error('Ошибка при отправке email:', error)
    return false
  }
}


