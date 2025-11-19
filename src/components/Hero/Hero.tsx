import { useState, useEffect, useMemo, useRef } from 'react'
import { ArrowRight, Clock, Zap, Star, Users } from 'lucide-react'
import ModalForms from '../ModalForms/ModalForms'
import './Hero.css'

function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [modalType, setModalType] = useState<'booking' | 'presentation' | 'consultation' | 'excursion' | null>(null)
  const rafRef = useRef<number>()
  const lastUpdateRef = useRef(0)

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      // Throttle обновления до 60fps (16ms)
      if (now - lastUpdateRef.current < 16) return
      lastUpdateRef.current = now
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100
        })
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  // Мемоизируем частицы, чтобы они не пересоздавались при каждом рендере
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2
    }))
  }, [])

  return (
    <section className={`hero ${isVisible ? 'hero--visible' : ''}`}>
      <div className="hero__background">
        <div 
          className="hero__gradient-orb hero__gradient-orb--1"
          style={{
            transform: `translate(calc(-50% + ${(mousePosition.x - 50) * 0.1}%), calc(-50% + ${(mousePosition.y - 50) * 0.1}%))`
          }}
        ></div>
        <div 
          className="hero__gradient-orb hero__gradient-orb--2"
          style={{
            transform: `translate(calc(-50% + ${(50 - mousePosition.x) * 0.15}%), calc(-50% + ${(50 - mousePosition.y) * 0.15}%))`
          }}
        ></div>
        <div className="hero__overlay"></div>
        <div className="hero__mesh"></div>
        <div className="hero__particles">
          {particles.map((particle) => (
            <div 
              key={particle.id} 
              className="hero__particle" 
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
        <div className="hero__content">
          <div className="hero__badge">
            <Zap size={16} />
            <span>Центр дополнительного образования для детей 3–17 лет</span>
          </div>
          
          <h1 className="hero__title">
            <span className="hero__title-line">
              <span className="hero__title-highlight">СФЕРА</span> — пространство
            </span>
            <span className="hero__title-line hero__title-line--accent">
              развития личности
            </span>
          </h1>
          
          <div className="hero__description-block">
            <div className="hero__description-content">
              <p className="hero__description-tagline">
                Мы не делаем чемпионов.
              </p>
              <p className="hero__description-text">
                Мы помогаем детям расти уверенными, быть гармоничнее, дисциплинированнее и сильнее.
              </p>
              <p className="hero__description-subtitle">
                Каждое направление — проверенная методика развития личности, а не спорт ради спорта.
              </p>
              <button 
                className="hero__button hero__button--secondary hero__description-button"
                onClick={() => {
                  const element = document.querySelector('#directions')
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
                <span>Выберите, через какое направление это сделать</span>
                <ArrowRight size={20} className="hero__description-button-icon" />
                <div className="hero__description-button-shine"></div>
                <div className="hero__description-button-glow"></div>
              </button>
            </div>
            <div className="hero__description-accent"></div>
          </div>
          
          <div className="hero__trust">
            <div className="hero__trust-item">
              <Clock size={16} />
              <span>Бесплатное пробное занятие</span>
            </div>
            <div className="hero__trust-item">
              <Star size={16} />
              <span>Опытные педагог-психологи</span>
            </div>
            <div className="hero__trust-item">
              <Users size={16} />
              <span>Малые группы до 8 человек</span>
            </div>
          </div>
        </div>
      </div>

      {modalType && (
        <ModalForms
          type={modalType}
          onClose={() => setModalType(null)}
        />
      )}
    </section>
  )
}

export default Hero

