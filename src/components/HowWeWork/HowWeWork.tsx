import { useEffect, useRef, useState, useMemo } from 'react'
import { QrCode, Phone, Users, CheckCircle, ArrowRight, TrendingUp } from 'lucide-react'
import './HowWeWork.css'

interface Step {
  id: number
  icon: JSX.Element
  title: string
  description: string
}

function HowWeWork() {
  const [isVisible, setIsVisible] = useState(false)
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

  const particles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2
    }))
  }, [])

  const steps: Step[] = [
    {
      id: 1,
      icon: <QrCode size={32} />,
      title: 'Заполняете форму на сайте',
      description: 'Также можете позвонить нам по телефону для более быстрой консультации.'
    },
    {
      id: 2,
      icon: <Phone size={32} />,
      title: 'Менеджер связывается, помогает подобрать программу',
      description: 'Персональный менеджер звонит, консультирует и записывает на пробное занятие'
    },
    {
      id: 3,
      icon: <Users size={32} />,
      title: 'Ребёнок проходит пробное занятие',
      description: 'Бесплатное пробное занятие, вы получаете фото/видео и обратную связь от педагога'
    },
    {
      id: 4,
      icon: <CheckCircle size={32} />,
      title: 'Заключаем договор и оформляем абонемент',
      description: 'За вами закрепляется персональный менеджер, который будет курировать занятия вашего ребенка, и помогать отслеживать прогресс'
    },
    {
      id: 5,
      icon: <TrendingUp size={32} />,
      title: 'Видите прогресс и получаете регулярные отчёты',
      description: 'Вы видите прогресс вашего ребёнка и получаете регулярные отчёты о его развитии'
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className={`how-we-work ${isVisible ? 'how-we-work--visible' : ''}`}
      id="how-we-work"
    >
      <div className="how-we-work__background">
        <div className="how-we-work__overlay"></div>
        <div className="how-we-work__mesh"></div>
        <div className="how-we-work__particles">
          {particles.map((particle) => (
            <div 
              key={particle.id} 
              className="how-we-work__particle" 
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
        <div className="how-we-work__content">
          <div className="how-we-work__header">
            <h2 className="how-we-work__title">
              Как проходит путь от первого контакта до результата
            </h2>
            <p className="how-we-work__subtitle">
              Ключевой этап — пробное занятие. Вы ничего не теряете, но получаете честное понимание, "ваше" это или нет.
            </p>
          </div>

          <div className="how-we-work__timeline-wrapper">
            <div className="how-we-work__timeline-line"></div>
            <div className="how-we-work__steps">
              {steps.map((step, index) => (
                <div 
                  key={step.id}
                  className="how-we-work__step"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="how-we-work__step-marker">
                    <div className="how-we-work__step-number">{step.id}</div>
                    <div className="how-we-work__step-icon-wrapper">
                      {step.icon}
                    </div>
                  </div>
                  <div className="how-we-work__step-content">
                    <h3 className="how-we-work__step-title">{step.title}</h3>
                    <p className="how-we-work__step-description">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="how-we-work__cta">
            <button 
              className="how-we-work__button"
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
              Записаться на пробное
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowWeWork

