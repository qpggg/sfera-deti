import { useEffect, useRef, useState, useMemo } from 'react'
import { Activity, Shield, Music, Brain, Palette, ArrowRight, BookOpen, MessageSquare, Globe, Target, Users, Heart, Sparkles } from 'lucide-react'
import './ChooseDirection.css'

interface Direction {
  id: string
  name: string
  icon: JSX.Element
  pains: string[]
  results: string[]
  color: string
  image?: string
}

function ChooseDirection() {
  const [isVisible, setIsVisible] = useState(false)
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2
    }))
  }, [])

  const directions: Direction[] = [
    {
      id: 'gymnastics',
      name: 'Гимнастика',
      icon: <Activity size={32} />,
      pains: ['Слабая моторика', 'Плохая осанка', 'Мало движения', 'Низкая выносливость', 'Плохая координация'],
      results: ['Лёгкость движений', 'Уверенность в теле', 'Крепкая спина', 'Дисциплина без давления'],
      color: '#0097B8',
      image: '/7.jpg'
    },
    {
      id: 'karate',
      name: 'Каратэ',
      icon: <Shield size={32} />,
      pains: ['Стеснительность', 'Страх перед ровесниками', 'Плохая концентрация', 'Низкая сила воли'],
      results: ['Уверенность', 'Самоконтроль', 'Уважение к правилам', 'Способность держать удар без агрессии'],
      color: '#00A3C8',
      image: '/8.jpg'
    },
    {
      id: 'dance',
      name: 'Танцы',
      icon: <Music size={32} />,
      pains: ['Скованность', 'Плохая пластика', 'Проблемы с самооценкой'],
      results: ['Раскрепощение', 'Чувство ритма', 'Уверенность перед публикой'],
      color: '#00A3C8',
      image: '/9.jpg'
    },
    {
      id: 'chess',
      name: 'Шахматы / Логика',
      icon: <Brain size={32} />,
      pains: ['Нет концентрации', 'Плохо думает наперёд', 'Отсутствие усидчивости'],
      results: ['Стратегическое мышление', 'Внимание', 'Терпение'],
      color: '#006D8F',
      image: '/10.jpg'
    },
    {
      id: 'art',
      name: 'ИЗО-студия',
      icon: <Palette size={32} />,
      pains: ['Проблемы с моторикой', 'Зажатые эмоции', 'Слабое креативное мышление'],
      results: ['Развитие мелкой моторики', 'Экологичный выход эмоций', 'Творческое мышление'],
      color: '#00B8D4',
      image: '/11.jpg'
    },
    {
      id: 'school-prep',
      name: 'Подготовка к школе',
      icon: <BookOpen size={32} />,
      pains: ['Не готов к школе', 'Слабая усидчивость', 'Проблемы с концентрацией', 'Недостаток знаний'],
      results: ['Готовность к школе', 'Усидчивость', 'Концентрация внимания', 'Базовые знания'],
      color: '#0097B8',
      image: '/12.jpg'
    },
    {
      id: 'speech',
      name: 'Логопед',
      icon: <MessageSquare size={32} />,
      pains: ['Нарушения речи', 'Проблемы с произношением', 'Задержка речевого развития'],
      results: ['Правильная речь', 'Чёткое произношение', 'Развитие речи'],
      color: '#00A3C8',
      image: '/13.jpg'
    },
    {
      id: 'english',
      name: 'Английский язык',
      icon: <Globe size={32} />,
      pains: ['Нет интереса к языку', 'Сложности с запоминанием', 'Боязнь говорить'],
      results: ['Интерес к языку', 'Хорошая память', 'Уверенность в общении'],
      color: '#00A3C8',
      image: '/14.jpg'
    },
    {
      id: 'football',
      name: 'Футбол',
      icon: <Target size={32} />,
      pains: ['Мало движения', 'Слабая координация', 'Проблемы в команде'],
      results: ['Физическая активность', 'Координация', 'Командная работа'],
      color: '#006D8F',
      image: '/15.jpg'
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className={`choose-direction ${isVisible ? 'choose-direction--visible' : ''}`}
      id="directions"
    >
      <div className="choose-direction__background">
        <div className="choose-direction__overlay"></div>
        <div className="choose-direction__mesh"></div>
        <div className="choose-direction__particles">
          {particles.map((particle) => (
            <div 
              key={particle.id} 
              className="choose-direction__particle" 
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="choose-direction__content">
          <div className="choose-direction__header">
            <h1 className="choose-direction__title-main">СФЕРА</h1>
            <h2 className="choose-direction__title">
              Выберите направление под задачи вашего ребёнка
            </h2>
            <p className="choose-direction__subtitle">
              Мы развиваем личность через разные форматы — от гимнастики до шахмат. 
              Каждый продукт закрывает конкретные запросы родителей.
            </p>
          </div>

          <div className="choose-direction__grid">
            {directions.map((direction, index) => (
              <div
                key={direction.id}
                className="choose-direction__card"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  '--card-color': direction.color
                } as React.CSSProperties}
                onClick={() => {
                  const element = document.querySelector('#booking-form')
                  if (element) {
                    const headerHeight = 70
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                    const offsetPosition = elementPosition - headerHeight
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    })
                  }
                }}
              >
                {/* Фото сверху карточки */}
                <div className="choose-direction__card-image-wrapper">
                  {direction.image ? (
                    <>
                      <img 
                        src={direction.image} 
                        alt={direction.name}
                        className="choose-direction__card-image"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const placeholder = target.parentElement?.querySelector('.choose-direction__card-image-placeholder')
                          if (placeholder) {
                            (placeholder as HTMLElement).style.display = 'flex'
                          }
                        }}
                      />
                      <div className="choose-direction__card-image-placeholder" style={{ display: 'none' }}>
                        <div className="choose-direction__card-image-icon">
                          {direction.icon}
                        </div>
                        <p>Фото занятий</p>
                      </div>
                    </>
                  ) : (
                    <div className="choose-direction__card-image-placeholder">
                      <div className="choose-direction__card-image-icon">
                        {direction.icon}
                      </div>
                      <p>Фото занятий</p>
                    </div>
                  )}
                </div>

                <div className="choose-direction__card-header">
                  <div className="choose-direction__card-info">
                    <h3 className="choose-direction__card-title">{direction.name}</h3>
                  </div>
                </div>

                <div 
                  className={`choose-direction__card-content ${expandedCards.has(direction.id) ? 'choose-direction__card-content--expanded' : ''}`}
                >
                  <div className="choose-direction__card-section">
                    <h4 className="choose-direction__card-section-title">Какие задачи решаем:</h4>
                    <ul className="choose-direction__card-list">
                      {direction.pains.map((pain, i) => (
                        <li key={i}>{pain}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="choose-direction__card-section">
                    <h4 className="choose-direction__card-section-title">Что в итоге получает ребёнок:</h4>
                    <ul className="choose-direction__card-list choose-direction__card-list--results">
                      {direction.results.map((result, i) => (
                        <li key={i}>{result}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {isMobile && expandedCards.has(direction.id) ? (
                  <div className="choose-direction__card-buttons-expanded">
                    <button 
                      className="choose-direction__card-button choose-direction__card-button--primary"
                      onClick={(e) => {
                        e.stopPropagation()
                        const element = document.querySelector('#booking-form')
                        if (element) {
                          const headerHeight = 70
                          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                          const offsetPosition = elementPosition - headerHeight
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          })
                        }
                      }}
                    >
                      Записаться
                      <ArrowRight size={18} />
                    </button>
                    <button 
                      className="choose-direction__card-button choose-direction__card-button--secondary"
                      onClick={(e) => {
                        e.stopPropagation()
                        const newExpanded = new Set(expandedCards)
                        newExpanded.delete(direction.id)
                        setExpandedCards(newExpanded)
                      }}
                    >
                      Свернуть
                      <ArrowRight 
                        size={18} 
                        className="choose-direction__card-button-icon choose-direction__card-button-icon--rotated"
                      />
                    </button>
                  </div>
                ) : (
                <button 
                  className="choose-direction__card-button"
                  onClick={(e) => {
                    e.stopPropagation()
                    // На мобильных открываем аккордеон, на десктопе скроллим к форме
                    if (isMobile) {
                      const newExpanded = new Set(expandedCards)
                        newExpanded.add(direction.id)
                      setExpandedCards(newExpanded)
                    } else {
                      const element = document.querySelector('#booking-form')
                      if (element) {
                        const headerHeight = 70
                        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                        const offsetPosition = elementPosition - headerHeight
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        })
                      }
                    }
                  }}
                >
                    {isMobile ? 'Узнать подробнее' : 'Получить консультацию'}
                  <ArrowRight 
                    size={18} 
                      className="choose-direction__card-button-icon"
                  />
                </button>
                )}
              </div>
            ))}
          </div>
          
          <div className="choose-direction__cta">
            <button 
              className="choose-direction__cta-button"
              onClick={() => {
                const element = document.querySelector('#booking-form')
                if (element) {
                  const headerHeight = 70
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                  const offsetPosition = elementPosition - headerHeight
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  })
                }
              }}
            >
              Записаться на пробное занятие
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Блок "Удобство для родителя" и features - только на мобильных */}
          <div className="choose-direction__mobile-extra">
            <div className="choose-direction__convenience">
              <h3 className="choose-direction__convenience-title">Удобство для родителя</h3>
              <p className="choose-direction__convenience-text">
                Занятия проходят прямо в вашей школе / детском саду
              </p>
              <p className="choose-direction__convenience-description">
                Мы сами забираем детей из групп и классов, проводим занятия на территории учреждения и возвращаем обратно. Вам не нужно никуда ездить — всё происходит в привычной и безопасной среде ребёнка.
              </p>
              <p className="choose-direction__convenience-extra">
                Мы развиваем личность через разные форматы - от гимнастики до шахмат.
              </p>
              <p className="choose-direction__convenience-extra">
                Каждый продукт закрывает запросы родителей
              </p>
            </div>

            <div className="choose-direction__features">
              <div className="choose-direction__feature" style={{ animationDelay: '0s' }}>
                <div className="choose-direction__feature-icon">
                  <Users size={28} />
                </div>
                <h3 className="choose-direction__feature-title">
                  Мини-группы до 14 детей
                </h3>
                <p className="choose-direction__feature-description">
                  Максимальное внимание каждому ребёнку
                </p>
              </div>
              <div className="choose-direction__feature" style={{ animationDelay: '0.1s' }}>
                <div className="choose-direction__feature-icon">
                  <Brain size={28} />
                </div>
                <h3 className="choose-direction__feature-title">
                  Педагоги с профильным образованием
                </h3>
                <p className="choose-direction__feature-description">
                  Опыт работы с детьми дошкольного и школьного возраста
                </p>
              </div>
              <div className="choose-direction__feature" style={{ animationDelay: '0.2s' }}>
                <div className="choose-direction__feature-icon">
                  <Heart size={28} />
                </div>
                <h3 className="choose-direction__feature-title">
                  Куратор-психолог
                </h3>
                <p className="choose-direction__feature-description">
                  Контроль за психоэмоциональным состоянием
                </p>
              </div>
              <div className="choose-direction__feature" style={{ animationDelay: '0.3s' }}>
                <div className="choose-direction__feature-icon">
                  <Sparkles size={28} />
                </div>
                <h3 className="choose-direction__feature-title">
                  Занятия в школе или саду
                </h3>
                <p className="choose-direction__feature-description">
                  Не нужно никуда водить — мы приходим к вам
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChooseDirection

