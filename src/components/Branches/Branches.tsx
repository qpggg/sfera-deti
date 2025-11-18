import { useEffect, useRef, useState, useMemo } from 'react'
import { MapPin, Check, Building2, Sparkles, ArrowRight, MessageCircle, Navigation, Clock } from 'lucide-react'
import './Branches.css'

interface Branch {
  id: string
  name: string
  address: string
  directions: string[]
}

function Branches() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null)
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

  const branches: Branch[] = [
    {
      id: 'branch1',
      name: 'Школа №1',
      address: 'Центральный район',
      directions: ['Гимнастика', 'Каратэ', 'Шахматы', 'ИЗО-студия']
    },
    {
      id: 'branch2',
      name: 'Детский сад "Радуга"',
      address: 'Северный район',
      directions: ['Танцы', 'Подготовка к школе', 'Логопед', 'ИЗО-студия']
    },
    {
      id: 'branch3',
      name: 'Школа №5',
      address: 'Южный район',
      directions: ['Футбол', 'Гимнастика', 'Английский язык', 'Шахматы']
    }
  ]

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
      className={`branches ${isVisible ? 'branches--visible' : ''}`}
      id="branches"
    >
      <div className="branches__background">
        <div className="branches__gradient-orb branches__gradient-orb--1"></div>
        <div className="branches__gradient-orb branches__gradient-orb--2"></div>
        <div className="branches__particles">
          {particles.map((particle) => (
            <div 
              key={particle.id} 
              className="branches__particle" 
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
        <div className="branches__content">
          <div className="branches__header">
            <div className="branches__header-badge">
              <Building2 size={18} />
              <span>Наши филиалы</span>
            </div>
            <h2 className="branches__title">
              Филиалы и направления
            </h2>
            <p className="branches__subtitle">
              В каждом филиале — свой набор программ.
            </p>
            <div className="branches__convenience">
              <h3 className="branches__convenience-title">Удобство для родителя</h3>
              <p className="branches__convenience-text">
                Занятия проходят прямо в вашей школе / детском саду
              </p>
              <p className="branches__convenience-description">
                Мы сами забираем детей из групп и классов, проводим занятия на территории учреждения и возвращаем обратно. Вам не нужно никуда ездить — всё происходит в привычной и безопасной среде ребёнка.
              </p>
            </div>
          </div>

          <div className="branches__wrapper">
            <div className="branches__list">
              {branches.map((branch, index) => (
                <button
                  key={branch.id}
                  className={`branches__branch-item ${selectedBranch === branch.id ? 'branches__branch-item--active' : ''}`}
                  onClick={() => setSelectedBranch(branch.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="branches__branch-icon-wrapper">
                    <MapPin size={22} />
                  </div>
                  <div className="branches__branch-info">
                    <span className="branches__branch-name">{branch.name}</span>
                    <span className="branches__branch-address">{branch.address}</span>
                  </div>
                  {selectedBranch === branch.id && (
                    <div className="branches__branch-check">
                      <Check size={18} />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="branches__directions">
              {selectedBranch ? (
                <div className="branches__directions-content">
                  <div className="branches__directions-header">
                    <Sparkles size={24} />
                    <h3 className="branches__directions-title">
                      В {branches.find(b => b.id === selectedBranch)?.name} доступны:
                    </h3>
                  </div>
                  <div className="branches__directions-grid">
                    {branches.find(b => b.id === selectedBranch)?.directions.map((direction, index) => (
                      <div 
                        key={index}
                        className="branches__direction-card"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="branches__direction-icon">
                          <Check size={18} />
                        </div>
                        <span>{direction}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="branches__directions-placeholder">
                  <div className="branches__placeholder-icon">
                    <MapPin size={48} />
                  </div>
                  <p>Выберите филиал, чтобы увидеть доступные направления</p>
                </div>
              )}
            </div>
          </div>

          <div className="branches__cta">
            <div className="branches__cta-content">
              <div className="branches__cta-icon-wrapper">
                <MapPin size={32} />
                <div className="branches__cta-icon-glow"></div>
              </div>
              <h3 className="branches__cta-title">
                Не нашли свою школу?
              </h3>
              <p className="branches__cta-text">
                Оставьте заявку — мы подскажем ближайший филиал и поможем выбрать подходящее направление для вашего ребёнка.
              </p>
              <div className="branches__cta-features">
                <div className="branches__cta-feature">
                  <MessageCircle size={18} />
                  <span>Бесплатная консультация</span>
                </div>
                <div className="branches__cta-feature">
                  <Navigation size={18} />
                  <span>Подбор ближайшего филиала</span>
                </div>
                <div className="branches__cta-feature">
                  <Clock size={18} />
                  <span>Ответ в течение 15 минут</span>
                </div>
              </div>
              <button 
                className="branches__cta-button"
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
                <span>Оставить заявку</span>
                <ArrowRight size={20} />
                <div className="branches__cta-button-shine"></div>
              </button>
            </div>
            <div className="branches__cta-accent"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Branches

