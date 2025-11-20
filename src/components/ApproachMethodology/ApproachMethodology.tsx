import { useEffect, useRef, useState } from 'react'
import { useMemo } from 'react'
import { Heart, Users, Brain, Sparkles, ArrowRight, Activity, Palette, Zap } from 'lucide-react'
import './ApproachMethodology.css'

function ApproachMethodology() {
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

  const features = [
    {
      icon: <Users size={28} />,
      title: 'Мини-группы до 14 детей',
      description: 'Максимальное внимание каждому ребёнку'
    },
    {
      icon: <Brain size={28} />,
      title: 'Педагоги с профильным образованием',
      description: 'Опыт работы с детьми дошкольного и школьного возраста'
    },
    {
      icon: <Heart size={28} />,
      title: 'Куратор-психолог',
      description: 'Контроль за психоэмоциональным состоянием'
    },
    {
      icon: <Sparkles size={28} />,
      title: 'Занятия в школе или саду',
      description: 'Не нужно никуда водить — мы приходим к вам'
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className={`approach-methodology ${isVisible ? 'approach-methodology--visible' : ''}`}
      id="approach"
    >
      <div className="approach-methodology__background">
        <div className="approach-methodology__overlay"></div>
        <div className="approach-methodology__mesh"></div>
        <div className="approach-methodology__particles">
          {particles.map((particle) => (
            <div 
              key={particle.id} 
              className="approach-methodology__particle" 
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
        <div className="approach-methodology__content">
          <div className="approach-methodology__header">
            <h2 className="approach-methodology__title">
              <span className="approach-methodology__title-desktop">Единая методика развития личности, а не просто набор кружков</span>
              <div className="approach-methodology__title-mobile">
                <div className="approach-methodology__title-part1">Единая методика</div>
                <div className="approach-methodology__title-part2">развития личности,</div>
                <div className="approach-methodology__title-part3">а не просто</div>
                <div className="approach-methodology__title-part4">набор кружков</div>
              </div>
            </h2>
            
            <div className="approach-methodology__intro approach-methodology__intro--desktop">
              <div className="approach-methodology__intro-text">
                <span className="approach-methodology__highlight">В СФЕРЕ</span> ребёнок не "ходит на секцию" — 
                он проходит <span className="approach-methodology__highlight">путь развития личности</span>.
              </div>
            </div>

            <div className="approach-methodology__directions-info-block">
              <div className="approach-methodology__directions-info-content">
                <p className="approach-methodology__directions-info-text">
                  Мы развиваем детей через те направления, которые вам доступны
                </p>
                <div className="approach-methodology__directions-info-subtitle">
                  <span className="approach-methodology__directions-info-label">НАПРАВЛЕНИЯ:</span>
                  <span className="approach-methodology__directions-info-list">
                    Гимнастика, каратэ, танцы, шахматы, ИЗО-студия, логопед, подготовка к школе
                  </span>
                </div>
                <p className="approach-methodology__directions-info-cta">
                  выбирайте то, что решает ваши задачи.
                </p>
              </div>
              <div className="approach-methodology__directions-info-accent"></div>
            </div>

            <div className="approach-methodology__approach-block">
              <div className="approach-methodology__approach-label">Наш подход:</div>
              <div className="approach-methodology__approach-items">
                <span className="approach-methodology__approach-item">мягкая адаптация</span>
                <span className="approach-methodology__approach-divider">•</span>
                <span className="approach-methodology__approach-item">мини-группы</span>
                <span className="approach-methodology__approach-divider">•</span>
                <span className="approach-methodology__approach-item">психологический контроль</span>
              </div>
            </div>

            {/* Блок "Развитие в трёх направлениях" - только на десктопе */}
            <div className="approach-methodology__directions-block">
              <div className="approach-methodology__directions-label">
                Развитие в трёх направлениях:
              </div>
              <div className="approach-methodology__directions-list">
                <div className="approach-methodology__direction-item">
                  <div className="approach-methodology__direction-image-wrapper">
                    <img 
                      src="/16.jpg" 
                      alt="Движение"
                      className="approach-methodology__direction-image"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const placeholder = target.parentElement?.querySelector('.approach-methodology__direction-image-placeholder')
                        if (placeholder) {
                          (placeholder as HTMLElement).style.display = 'flex'
                        }
                      }}
                    />
                    <div className="approach-methodology__direction-image-placeholder" style={{ display: 'none' }}>
                      <Activity size={32} />
                    </div>
                  </div>
                  <div className="approach-methodology__direction-badge">Движение</div>
                </div>
                <div className="approach-methodology__direction-item">
                  <div className="approach-methodology__direction-image-wrapper">
                    <img 
                      src="/17.jpg" 
                      alt="Творчество"
                      className="approach-methodology__direction-image"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const placeholder = target.parentElement?.querySelector('.approach-methodology__direction-image-placeholder')
                        if (placeholder) {
                          (placeholder as HTMLElement).style.display = 'flex'
                        }
                      }}
                    />
                    <div className="approach-methodology__direction-image-placeholder" style={{ display: 'none' }}>
                      <Palette size={32} />
                    </div>
                  </div>
                  <div className="approach-methodology__direction-badge">Творчество</div>
                </div>
                <div className="approach-methodology__direction-item">
                  <div className="approach-methodology__direction-image-wrapper">
                    <img 
                      src="/18.jpg" 
                      alt="Мышление"
                      className="approach-methodology__direction-image"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const placeholder = target.parentElement?.querySelector('.approach-methodology__direction-image-placeholder')
                        if (placeholder) {
                          (placeholder as HTMLElement).style.display = 'flex'
                        }
                      }}
                    />
                    <div className="approach-methodology__direction-image-placeholder" style={{ display: 'none' }}>
                      <Brain size={32} />
                    </div>
                  </div>
                  <div className="approach-methodology__direction-badge">Мышление</div>
                </div>
              </div>
            </div>

            <div className="approach-methodology__cta">
              <button 
                className="approach-methodology__button"
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
                Посмотреть, какие направления подойдут вашему ребёнку
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Блок "Удобство для родителя" - только на десктопе */}
            <div className="approach-methodology__convenience">
              <h3 className="approach-methodology__convenience-title">Удобство для родителя</h3>
              <p className="approach-methodology__convenience-text">
                Занятия проходят прямо в вашей школе / детском саду
              </p>
              <p className="approach-methodology__convenience-description">
                Мы сами забираем детей из групп и классов, проводим занятия на территории учреждения и возвращаем обратно. Вам не нужно никуда ездить — всё происходит в привычной и безопасной среде ребёнка.
              </p>
            </div>

            <div className="approach-methodology__conclusion">
              <div className="approach-methodology__conclusion-icon">
                <Zap size={20} />
              </div>
              <p className="approach-methodology__conclusion-text">
                Направления (гимнастика, карате, танцы, шахматы, ИЗО и другие) — это 
                <span className="approach-methodology__conclusion-accent"> инструменты нашей методики</span>, 
                а не отдельные, разрозненные кружки.
              </p>
            </div>
            
            {/* Дубликат intro для мобильных - показывается после convenience */}
            <div className="approach-methodology__intro approach-methodology__intro--mobile">
              <div className="approach-methodology__intro-text">
                <span className="approach-methodology__highlight">В СФЕРЕ</span> ребёнок не "ходит на секцию" — 
                он проходит <span className="approach-methodology__highlight">путь развития личности</span>.
            </div>
          </div>

          <div className="approach-methodology__features">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="approach-methodology__feature"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="approach-methodology__feature-icon">
                  {feature.icon}
                </div>
                <h3 className="approach-methodology__feature-title">
                  {feature.title}
                </h3>
                <p className="approach-methodology__feature-description">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApproachMethodology

