import { useState, useEffect, useRef, useMemo } from 'react'
import { Phone, User, Calendar, MessageSquare, CheckCircle, Sparkles, ArrowRight, Clock, UserCircle, Info, Gift, Shield } from 'lucide-react'
import confetti from 'canvas-confetti'
import './BookingForm.css'

function BookingForm() {
  const [formData, setFormData] = useState({
    parentFullName: '',
    childFullName: '',
    childAge: '',
    phone: '',
    source: '',
    comment: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Вычисляем прогресс заполнения формы
  const formProgress = useMemo(() => {
    const requiredFields = ['parentFullName', 'childFullName', 'childAge', 'phone', 'source']
    const filledFields = requiredFields.filter(field => formData[field as keyof typeof formData].trim() !== '')
    return (filledFields.length / requiredFields.length) * 100
  }, [formData])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'parentFullName':
        if (!value.trim()) return 'Введите ФИО родителя'
        if (value.trim().split(' ').length < 2) return 'Введите полное ФИО'
        return ''
      case 'childFullName':
        if (!value.trim()) return 'Введите ФИО ребёнка'
        if (value.trim().split(' ').length < 2) return 'Введите полное ФИО'
        return ''
      case 'childAge':
        if (!value.trim()) return 'Укажите возраст ребёнка'
        const age = parseInt(value)
        if (isNaN(age) || age < 3 || age > 14) return 'Возраст должен быть от 3 до 14 лет'
        return ''
      case 'phone':
        if (!value.trim()) return 'Введите номер телефона'
        const cleanPhone = value.replace(/\D/g, '')
        if (cleanPhone.length < 10) return 'Введите корректный номер телефона'
        return ''
      case 'source':
        if (!value.trim()) return 'Укажите источник информации'
        return ''
      default:
        return ''
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    if (error) {
      setErrors({
        ...errors,
        [name]: error
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Валидация всех обязательных полей
    const newErrors: Record<string, string> = {}
    const requiredFields = ['parentFullName', 'childFullName', 'childAge', 'phone', 'source']
    
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData])
      if (error) {
        newErrors[field] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      // Прокрутка к первому полю с ошибкой
      const firstErrorField = document.querySelector(`[name="${Object.keys(newErrors)[0]}"]`)
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' })
        ;(firstErrorField as HTMLElement).focus()
      }
      return
    }

    setIsSubmitting(true)
    
    // Здесь будет интеграция с CRM
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setErrors({})
    
    // Запускаем конфетти
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, colors: ['#6bb3d0', '#5aabd0', '#7db8d0', '#9dd0e8'] }
    
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min
    
    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now()
      
      if (timeLeft <= 0) {
        return clearInterval(interval)
      }
      
      const particleCount = 50 * (timeLeft / duration)
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)
    
    // Сброс формы через 5 секунд
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        parentFullName: '',
        childFullName: '',
        childAge: '',
        phone: '',
        source: '',
        comment: ''
      })
    }, 5000)
  }

  return (
    <section 
      ref={sectionRef}
      id="booking-form" 
      className={`booking-form ${isVisible ? 'booking-form--visible' : ''}`}
    >
      <div className="booking-form__background">
        <div className="booking-form__overlay"></div>
        <div className="booking-form__mesh"></div>
        <div className="booking-form__gradient-orb booking-form__gradient-orb--1"></div>
        <div className="booking-form__gradient-orb booking-form__gradient-orb--2"></div>
      </div>

      <div className="container">
        <div className="booking-form__content">
          <div className="booking-form__header">
            <div className="booking-form__header-badge">
              <Sparkles size={18} />
              <span>Начните прямо сейчас</span>
            </div>
            <h2 className="booking-form__title">
              Найти свою школу или детский сад
            </h2>
            <p className="booking-form__subtitle">
              Оставьте заявку, и мы свяжемся с вами в течение 15 минут
            </p>
            <div className="booking-form__trust-indicators">
              <div className="booking-form__trust-item">
                <Gift size={18} />
                <span>Бесплатно</span>
              </div>
              <div className="booking-form__trust-item">
                <Clock size={18} />
                <span>Ответим за 15 минут</span>
              </div>
              <div className="booking-form__trust-item">
                <Shield size={18} />
                <span>Без обязательств</span>
              </div>
            </div>
            {/* Прогресс-бар заполнения формы */}
            {formProgress > 0 && formProgress < 100 && (
              <div className="booking-form__progress-bar">
                <div 
                  className="booking-form__progress-fill"
                  style={{ width: `${formProgress}%` }}
                >
                  <span className="booking-form__progress-text">{Math.round(formProgress)}%</span>
                </div>
              </div>
            )}
          </div>
          
          <form className="booking-form__form" onSubmit={handleSubmit}>
            <div className="booking-form__form-header">
              <h3 className="booking-form__form-title">Заполните форму</h3>
              <p className="booking-form__form-subtitle">Мы подберём идеальное направление для вашего ребёнка</p>
            </div>

            <div className="booking-form__fields">
              <div className="booking-form__field booking-form__field--full">
                <label htmlFor="parentFullName" className="booking-form__label">
                  <div className="booking-form__label-icon">
                    <User size={18} />
                  </div>
                  <span>ФИО родителя <span className="booking-form__required">*</span></span>
                </label>
                <input
                  type="text"
                  id="parentFullName"
                  name="parentFullName"
                  value={formData.parentFullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`booking-form__input ${errors.parentFullName ? 'booking-form__input--error' : ''}`}
                  placeholder="Иванов Иван Иванович"
                  required
                />
                {errors.parentFullName && (
                  <span className="booking-form__error">{errors.parentFullName}</span>
                )}
              </div>

              <div className="booking-form__field booking-form__field--half">
                <label htmlFor="childFullName" className="booking-form__label">
                  <div className="booking-form__label-icon">
                    <UserCircle size={18} />
                  </div>
                  <span>ФИО ребёнка <span className="booking-form__required">*</span></span>
                </label>
                <input
                  type="text"
                  id="childFullName"
                  name="childFullName"
                  value={formData.childFullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`booking-form__input ${errors.childFullName ? 'booking-form__input--error' : ''}`}
                  placeholder="Иванов Петр Иванович"
                  required
                />
                {errors.childFullName && (
                  <span className="booking-form__error">{errors.childFullName}</span>
                )}
              </div>
              
              <div className="booking-form__field booking-form__field--half">
                <label htmlFor="childAge" className="booking-form__label">
                  <div className="booking-form__label-icon">
                    <Calendar size={18} />
                  </div>
                  <span>Возраст ребёнка <span className="booking-form__required">*</span></span>
                </label>
                <input
                  type="text"
                  id="childAge"
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`booking-form__input ${errors.childAge ? 'booking-form__input--error' : ''}`}
                  placeholder="Например: 5"
                  required
                />
                {errors.childAge && (
                  <span className="booking-form__error">{errors.childAge}</span>
                )}
              </div>
              
              <div className="booking-form__field booking-form__field--half">
                <label htmlFor="phone" className="booking-form__label">
                  <div className="booking-form__label-icon">
                    <Phone size={18} />
                  </div>
                  <span>Телефон <span className="booking-form__required">*</span></span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`booking-form__input ${errors.phone ? 'booking-form__input--error' : ''}`}
                  placeholder="+7 (___) ___-__-__"
                  required
                />
                {errors.phone && (
                  <span className="booking-form__error">{errors.phone}</span>
                )}
              </div>

              <div className="booking-form__field booking-form__field--half">
                <label htmlFor="source" className="booking-form__label">
                  <div className="booking-form__label-icon">
                    <Info size={18} />
                  </div>
                  <span>Откуда узнали <span className="booking-form__required">*</span></span>
                </label>
                <input
                  type="text"
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`booking-form__input ${errors.source ? 'booking-form__input--error' : ''}`}
                  placeholder="например: сад №1"
                  required
                />
                {errors.source && (
                  <span className="booking-form__error">{errors.source}</span>
                )}
              </div>
              
              <div className="booking-form__field booking-form__field--full">
                <label htmlFor="comment" className="booking-form__label">
                  <div className="booking-form__label-icon">
                    <MessageSquare size={18} />
                  </div>
                  <span>Комментарий <span className="booking-form__optional">(необязательно)</span></span>
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  className="booking-form__textarea"
                  placeholder="Расскажите о ваших пожеланиях или вопросах"
                  rows={4}
                />
              </div>
            </div>
            
            {isSubmitted ? (
              <div className="booking-form__success">
                <div className="booking-form__success-icon">
                  <CheckCircle size={48} />
                </div>
                <h3 className="booking-form__success-title">Спасибо за заявку!</h3>
                <p className="booking-form__success-text">
                  Мы свяжемся с вами в течение 15 минут и подберём идеальное направление для вашего ребёнка.
                </p>
              </div>
            ) : (
              <button 
                type="submit" 
                className="booking-form__submit"
                disabled={isSubmitting}
              >
                <span className="booking-form__submit-text">
                  {isSubmitting ? (
                    'Отправка...'
                  ) : (
                    <>
                      Отправить заявку
                      <ArrowRight size={20} />
                    </>
                  )}
                </span>
                <div className="booking-form__submit-shine"></div>
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default BookingForm
