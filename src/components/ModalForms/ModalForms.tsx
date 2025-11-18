import { useState } from 'react'
import Modal from '../Modal/Modal'
import { Phone, FileText, Calendar } from 'lucide-react'
import './ModalForms.css'

interface ModalFormsProps {
  type?: 'booking' | 'presentation' | 'consultation' | 'excursion'
  onClose: () => void
}

function ModalForms({ type = 'booking', onClose }: ModalFormsProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    childAge: '',
    comment: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const modalConfig = {
    booking: {
      title: 'Записаться на пробное занятие',
      icon: <Calendar size={24} />,
      description: 'Оставьте заявку, и мы свяжемся с вами в ближайшее время'
    },
    presentation: {
      title: 'Получить презентацию о СФЕРЕ',
      icon: <FileText size={24} />,
      description: 'Мы пришлём вам подробную презентацию о нашем пространстве развития'
    },
    consultation: {
      title: 'Получить консультацию',
      icon: <Phone size={24} />,
      description: 'Запишитесь на консультацию с руководителем центра'
    },
    excursion: {
      title: 'Записаться на экскурсию',
      icon: <Calendar size={24} />,
      description: 'Приходите посмотреть наше пространство своими глазами'
    }
  }

  const config = modalConfig[type]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Здесь будет интеграция с CRM
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
      setFormData({
        name: '',
        phone: '',
        email: '',
        childAge: '',
        comment: ''
      })
    }, 2000)
  }

  return (
    <Modal isOpen={true} onClose={onClose} title={config.title} size="medium">
      <div className="modal-form">
        <div className="modal-form__icon">
          {config.icon}
        </div>
        <p className="modal-form__description">{config.description}</p>
        
        {isSubmitted ? (
          <div className="modal-form__success">
            <div className="modal-form__success-icon">✓</div>
            <p>Спасибо! Мы свяжемся с вами в ближайшее время.</p>
          </div>
        ) : (
          <form className="modal-form__form" onSubmit={handleSubmit}>
            <div className="modal-form__field">
              <label htmlFor="name">Ваше имя *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Имя родителя"
                required
              />
            </div>
            
            <div className="modal-form__field">
              <label htmlFor="phone">Телефон *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7 (___) ___-__-__"
                required
              />
            </div>
            
            {(type === 'presentation' || type === 'consultation') && (
              <div className="modal-form__field">
                <label htmlFor="email">Email {type === 'presentation' && '*'}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="mail@example.ru"
                  required={type === 'presentation'}
                />
              </div>
            )}
            
            {type === 'booking' && (
              <div className="modal-form__field">
                <label htmlFor="childAge">Возраст ребёнка *</label>
                <input
                  type="text"
                  id="childAge"
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleChange}
                  placeholder="Например: 5 лет"
                  required
                />
              </div>
            )}
            
            <div className="modal-form__field">
              <label htmlFor="comment">Комментарий</label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Ваши вопросы или пожелания"
                rows={3}
              />
            </div>
            
            <div className="modal-form__privacy">
              <input type="checkbox" id="privacy" required />
              <label htmlFor="privacy">
                Я согласен с <a href="#" onClick={(e) => e.preventDefault()}>политикой конфиденциальности</a>
              </label>
            </div>
            
            <button 
              type="submit" 
              className="modal-form__submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </button>
          </form>
        )}
      </div>
    </Modal>
  )
}

export default ModalForms

