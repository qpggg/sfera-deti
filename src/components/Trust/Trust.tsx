import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { Award, FileCheck, Users, Building2, Shield, ArrowRight } from 'lucide-react'
import './Trust.css'

interface TrustItem {
  icon: JSX.Element
  value: string
  label: string
  description: string
  numericValue?: number
  suffix?: string
}

function Trust() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState<Record<number, number>>({})
  const sectionRef = useRef<HTMLElement>(null)

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

  const trustItems: TrustItem[] = useMemo(() => [
    {
      icon: <Award size={28} />,
      value: '5 лет',
      label: 'опыта',
      description: 'Работаем с 2019 года, нашу программу прошли более 2500 детей',
      numericValue: 5
    },
    {
      icon: <Building2 size={28} />,
      value: '10+',
      label: 'филиалов',
      description: 'Мы не "кружок в одном подъезде" — сеть программ в школах и садах города'
    },
    {
      icon: <Users size={28} />,
      value: 'Подход',
      label: 'Персональный к каждому',
      description: 'Работа педагогов под контролем психолога.'
    },
    {
      icon: <Shield size={28} />,
      value: 'Статус',
      label: 'социального предпринимателя',
      description: 'Отмечены государством за вклад в развитие детей'
    },
    {
      icon: <FileCheck size={28} />,
      value: 'Лицензия',
      label: 'на образовательную деятельность',
      description: 'От Министерства образования Воронежской области № Л035-01244-36/00287227'
    }
  ], [])

  const animateNumber = useCallback((target: number, index: number, duration: number = 2000) => {
    if (!isVisible) return
    
    const startTime = Date.now()
    const startValue = 0
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart)
      
      setAnimatedValues(prev => ({ ...prev, [index]: currentValue }))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setAnimatedValues(prev => ({ ...prev, [index]: target }))
      }
    }
    
    requestAnimationFrame(animate)
  }, [isVisible])

  useEffect(() => {
    if (isVisible) {
      trustItems.forEach((item, index) => {
        if (item.numericValue !== undefined) {
          setTimeout(() => {
            animateNumber(item.numericValue!, index)
          }, index * 150)
        }
      })
    }
  }, [isVisible, animateNumber, trustItems])

  const particles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2
    }))
  }, [])

  return (
    <section 
      ref={sectionRef}
      className={`trust ${isVisible ? 'trust--visible' : ''}`}
      id="trust"
    >
      <div className="trust__background">
        <div className="trust__overlay"></div>
        <div className="trust__mesh"></div>
        <div className="trust__particles">
          {particles.map((particle) => (
            <div 
              key={particle.id} 
              className="trust__particle" 
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
        <div className="trust__content">
          <div className="trust__header">
            <h2 className="trust__title">
              Почему родители доверяют нам детей
            </h2>
          </div>

          <div className="trust__grid">
            {trustItems.slice(0, 3).map((item, index) => {
              const displayValue = item.numericValue !== undefined 
                ? (animatedValues[index] !== undefined ? animatedValues[index] : 0)
                : item.value
              
              return (
                <div 
                  key={index}
                  className="trust__card"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="trust__card-icon-wrapper">
                    <div className="trust__card-icon">
                      {item.icon}
                    </div>
                    <div className="trust__card-icon-glow"></div>
                  </div>
                  <div className="trust__card-content">
                    <div className="trust__card-value-wrapper">
                      <div className="trust__card-value">
                        {item.numericValue !== undefined && index === 0 ? (
                          `${displayValue} лет`
                        ) : item.numericValue !== undefined ? (
                          displayValue
                        ) : (
                          item.value
                        )}
                      </div>
                      {item.label && (
                        <div className="trust__card-label">{item.label}</div>
                      )}
                    </div>
                    {item.description && (
                      <p className="trust__card-description">{item.description}</p>
                    )}
                  </div>
                  <div className="trust__card-accent"></div>
                </div>
              )
            })}
          </div>
          
          {trustItems.length > 3 && (
            <div className="trust__grid-bottom">
              {trustItems.slice(3).map((item, index) => {
                const actualIndex = index + 3
                
                return (
                  <div 
                    key={actualIndex}
                    className="trust__card"
                    style={{ animationDelay: `${actualIndex * 0.08}s` }}
                  >
                    <div className="trust__card-icon-wrapper">
                      <div className="trust__card-icon">
                        {item.icon}
                      </div>
                      <div className="trust__card-icon-glow"></div>
                    </div>
                    <div className="trust__card-content">
                      <div className="trust__card-value-wrapper">
                        <div className="trust__card-value">
                          {item.value}
                        </div>
                        {item.label && (
                          <div className="trust__card-label">{item.label}</div>
                        )}
                      </div>
                      <p className="trust__card-description">{item.description}</p>
                    </div>
                    <div className="trust__card-accent"></div>
                  </div>
                )
              })}
            </div>
          )}
          
          <div className="trust__cta">
            <button 
              className="trust__cta-button"
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
        </div>
      </div>
    </section>
  )
}

export default Trust

