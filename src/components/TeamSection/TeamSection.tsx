import { useEffect, useRef, useState, useMemo } from 'react'
import { User, GraduationCap, Heart, Users, Sparkles, Award, Shield, ArrowRight } from 'lucide-react'
import './TeamSection.css'

function TeamSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
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
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2
    }))
  }, [])

  const teamFeatures = [
    {
      icon: <GraduationCap size={28} />,
      title: 'Все педагоги с профильным педагогическим образованием',
      description: 'Опыт работы с детьми дошкольного и школьного возраста',
      color: '#6bb3d0'
    },
    {
      icon: <Award size={28} />,
      title: 'Профессионалы в своём направлении',
      description: 'Спорт, творчество, логика — каждый педагог эксперт в своей области',
      color: '#5aabd0'
    },
    {
      icon: <Heart size={28} />,
      title: 'Работают под кураторством психолога',
      description: 'Контроль за психоэмоциональным состоянием детей',
      color: '#7db8d0'
    },
    {
      icon: <Users size={28} />,
      title: 'Персональный менеджер',
      description: 'Закреплён за каждым учреждением, курирует ежедневно каждого клиента',
      color: '#4a9bb8'
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className={`team-section ${isVisible ? 'team-section--visible' : ''}`}
      id="team"
    >
      <div className="team-section__background">
        <div className="team-section__overlay"></div>
        <div className="team-section__mesh"></div>
        <div className="team-section__gradient-orb team-section__gradient-orb--1"></div>
        <div className="team-section__gradient-orb team-section__gradient-orb--2"></div>
        <div className="team-section__particles">
          {particles.map((particle) => (
            <div 
              key={particle.id} 
              className="team-section__particle" 
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
        <div className="team-section__content">
          <div className="team-section__header">
            <h2 className="team-section__title">
              Кто работает с вашим ребёнком
            </h2>
            <p className="team-section__subtitle">
              Профессионалы, которые создают безопасное пространство для развития личности
            </p>
          </div>

          <div className="team-section__founder">
            <div className="team-section__founder-content">
              <div className="team-section__founder-avatar-wrapper">
                <div className="team-section__founder-avatar">
                  <User size={48} />
                </div>
                <div className="team-section__founder-avatar-glow"></div>
                <div className="team-section__founder-badge">
                  <Sparkles size={16} />
                </div>
              </div>
              <div className="team-section__founder-info">
                <div className="team-section__founder-role-badge">Основатель СФЕРЫ</div>
                <h3 className="team-section__founder-name">
                  Сафонова Екатерина Александровна
                </h3>
                <p className="team-section__founder-description">
                  Мама четырех детей, 5 лет опыта в детских развивающих проектах. 
                  Создала <span className="team-section__founder-sfera">СФЕРУ</span> как пространство, где ребёнка развивают без травм и давления.
                </p>
                <div className="team-section__founder-stats">
                  <div className="team-section__founder-stat">
                    <span className="team-section__founder-stat-value">4</span>
                    <span className="team-section__founder-stat-label">детей</span>
                  </div>
                  <div className="team-section__founder-stat">
                    <span className="team-section__founder-stat-value">5</span>
                    <span className="team-section__founder-stat-label">лет опыта</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="team-section__features">
            {teamFeatures.map((feature, index) => (
              <div 
                key={index}
                className={`team-section__feature ${hoveredFeature === index ? 'team-section__feature--hovered' : ''}`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  '--feature-color': feature.color
                } as React.CSSProperties}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="team-section__feature-icon-wrapper">
                  <div 
                    className="team-section__feature-icon"
                    style={{ background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%)` }}
                  >
                    {feature.icon}
                  </div>
                  <div className="team-section__feature-icon-glow"></div>
                </div>
                <div className="team-section__feature-content">
                  <h3 className="team-section__feature-title">
                    {feature.title}
                  </h3>
                  <p className="team-section__feature-description">
                    {feature.description}
                  </p>
                </div>
                <div className="team-section__feature-accent"></div>
              </div>
            ))}
          </div>

          <div className="team-section__psychologist">
            <div className="team-section__psychologist-content">
              <div className="team-section__psychologist-icon-wrapper">
                <Heart size={32} />
                <div className="team-section__psychologist-icon-glow"></div>
              </div>
              <div className="team-section__psychologist-text-wrapper">
                <div className="team-section__psychologist-badge">
                  <Shield size={16} />
                  <span>Партнёрство</span>
                </div>
                <h3 className="team-section__psychologist-title">
                  Партнёрство с детским психологом
                </h3>
                <p className="team-section__psychologist-text">
                  Мы работаем с опытным детским психологом, под контролем которого находится вся методика. 
                  Он помогает подбирать направление под особенности ребёнка, проводит диагностику и обеспечивает 
                  психологическое сопровождение на всех этапах развития. Это гарантирует безопасность и эффективность 
                  каждого занятия.
                </p>
              </div>
            </div>
          </div>
          
          <div className="team-section__cta">
            <button 
              className="team-section__cta-button"
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

export default TeamSection
