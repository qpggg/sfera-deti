import { Check, Sparkles } from 'lucide-react'
import './Pricing.css'

interface PricingPlan {
  id: string
  name: string
  description: string
  price: number
  period: string
  features: string[]
  popular?: boolean
  badge?: string
}

const plans: PricingPlan[] = [
  {
    id: 'trial',
    name: 'Пробное занятие',
    description: 'Знакомство с пространством и методикой',
    price: 0,
    period: '1 занятие',
    features: [
      'Знакомство с педагогом',
      'Диагностика ребёнка',
      'Рекомендации по направлению',
      'Презентация программы'
    ],
    badge: 'Бесплатно'
  },
  {
    id: 'monthly',
    name: 'Месячный абонемент',
    description: 'Оптимальный вариант для начала',
    price: 4500,
    period: 'в месяц',
    features: [
      '4 занятия в месяц',
      'Малые группы до 8 человек',
      'Индивидуальный подход',
      'Еженедельный отчёт о прогрессе',
      'Доступ к онлайн-материалам'
    ],
    popular: true
  },
  {
    id: 'quarterly',
    name: 'Квартальный абонемент',
    description: 'Выгодно и удобно',
    price: 12000,
    period: '3 месяца',
    features: [
      '12 занятий (4 в месяц)',
      'Скидка 10%',
      'Приоритетная запись',
      'Бесплатная консультация психолога',
      'Доступ к онлайн-материалам',
      'Сертификат о прохождении курса'
    ]
  },
  {
    id: 'annual',
    name: 'Годовой абонемент',
    description: 'Максимальная выгода',
    price: 40000,
    period: 'год',
    features: [
      '48 занятий (4 в месяц)',
      'Скидка 20%',
      'Приоритетная запись',
      'Бесплатные консультации психолога',
      'Участие в мероприятиях центра',
      'Доступ ко всем онлайн-материалам',
      'Персональный куратор',
      'Сертификат о прохождении программы'
    ]
  }
]

function Pricing() {
  return (
    <section className="pricing">
      <div className="container">
        <div className="pricing__header">
          <h2 className="pricing__title">Стоимость обучения</h2>
          <p className="pricing__subtitle">
            Прозрачные цены без скрытых платежей. Выберите удобный формат занятий
          </p>
        </div>
        
        <div className="pricing__grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`pricing__card ${plan.popular ? 'pricing__card--popular' : ''}`}
            >
              {plan.popular && (
                <div className="pricing__badge">
                  <Sparkles size={16} />
                  <span>Популярный</span>
                </div>
              )}
              
              {plan.badge && (
                <div className="pricing__badge pricing__badge--free">
                  {plan.badge}
                </div>
              )}
              
              <div className="pricing__card-header">
                <h3 className="pricing__card-title">{plan.name}</h3>
                <p className="pricing__card-description">{plan.description}</p>
              </div>
              
              <div className="pricing__card-price">
                {plan.price === 0 ? (
                  <span className="pricing__price-amount">Бесплатно</span>
                ) : (
                  <>
                    <span className="pricing__price-amount">{plan.price.toLocaleString('ru-RU')} ₽</span>
                    <span className="pricing__price-period">/{plan.period}</span>
                  </>
                )}
              </div>
              
              <ul className="pricing__features">
                {plan.features.map((feature, index) => (
                  <li key={index} className="pricing__feature">
                    <Check size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="pricing__button">
                {plan.price === 0 ? 'Записаться бесплатно' : 'Выбрать план'}
              </button>
            </div>
          ))}
        </div>
        
        <div className="pricing__note">
          <p>
            * Все цены указаны за одно направление. При посещении нескольких направлений действует система скидок.
            <br />
            ** Первое пробное занятие всегда бесплатно для новых клиентов.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Pricing

