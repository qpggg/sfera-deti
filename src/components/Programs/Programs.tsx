import { Activity, Music, Palette, Brain, Baby } from 'lucide-react'
import './Programs.css'

interface Program {
  icon: React.ReactNode
  title: string
  description: string
  age: string
  benefits: string[]
  color: string
}

const programs: Program[] = [
  {
    icon: <Activity size={32} />,
    title: 'СФЕРА Движение',
    description: 'Физическое развитие через игру и движение',
    age: '4–14 лет',
    benefits: ['Координация', 'Сила', 'Уверенность'],
    color: 'var(--color-accent)'
  },
  {
    icon: <Music size={32} />,
    title: 'СФЕРА Ритм',
    description: 'Развитие чувства ритма и музыкальности',
    age: '3–10 лет',
    benefits: ['Ритм', 'Слух', 'Координация'],
    color: 'var(--color-sand)'
  },
  {
    icon: <Palette size={32} />,
    title: 'СФЕРА Арт',
    description: 'Творческое самовыражение и развитие моторики',
    age: '3–12 лет',
    benefits: ['Креативность', 'Моторика', 'Эмоции'],
    color: 'var(--color-accent-dark)'
  },
  {
    icon: <Brain size={32} />,
    title: 'СФЕРА Ум',
    description: 'Логика, стратегия и развитие интеллекта',
    age: '5–14 лет',
    benefits: ['Логика', 'Концентрация', 'Стратегия'],
    color: 'var(--color-accent)'
  },
  {
    icon: <Baby size={32} />,
    title: 'СФЕРА Mini',
    description: 'Комплексное развитие для самых маленьких',
    age: '3–5 лет',
    benefits: ['Адаптация', 'Социализация', 'Развитие'],
    color: 'var(--color-sand)'
  }
]

function Programs() {
  return (
    <section id="programs" className="programs">
      <div className="container">
        <div className="programs__header">
          <h2 className="programs__title">Наши программы</h2>
          <p className="programs__subtitle">
            Школы внутри СФЕРЫ — комплексное развитие личности
          </p>
        </div>
        
        <div className="programs__grid">
          {programs.map((program, index) => (
            <div 
              key={index}
              className="programs__card"
              style={{ 
                '--card-color': program.color,
                animationDelay: `${index * 0.1}s`
              } as React.CSSProperties}
            >
              <div className="programs__icon-wrapper">
                <div className="programs__icon">
                  {program.icon}
                </div>
              </div>
              
              <div className="programs__content">
                <h3 className="programs__card-title">{program.title}</h3>
                <p className="programs__card-description">{program.description}</p>
                
                <div className="programs__age">
                  <span>{program.age}</span>
                </div>
                
                <div className="programs__benefits">
                  {program.benefits.map((benefit, i) => (
                    <span key={i} className="programs__benefit">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="programs__gradient"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Programs

