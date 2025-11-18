import { Heart, Activity, Users, Brain, Navigation, Target } from 'lucide-react'
import './ParentPainPoints.css'

interface PainPoint {
  icon: React.ReactNode
  problem: string
  solution: string
}

const painPoints: PainPoint[] = [
  {
    icon: <Heart size={32} />,
    problem: 'Ребёнок стесняется',
    solution: 'У нас мягкая адаптация'
  },
  {
    icon: <Activity size={32} />,
    problem: 'Мало двигается',
    solution: 'Правильная физическая активность через игру'
  },
  {
    icon: <Users size={32} />,
    problem: 'Трудно социализируется',
    solution: 'Групповые занятия + педагог-психолог'
  },
  {
    icon: <Brain size={32} />,
    problem: 'Нет концентрации',
    solution: 'Развитие внимания через движение/ритм/логику'
  },
  {
    icon: <Navigation size={32} />,
    problem: 'Родители не знают «куда вести»',
    solution: 'СФЕРА даёт комплексное развитие'
  },
  {
    icon: <Target size={32} />,
    problem: 'Нет уверенности в себе',
    solution: 'Развитие через успех и поддержку'
  }
]

function ParentPainPoints() {
  return (
    <section className="pain-points">
      <div className="container">
        <div className="pain-points__header">
          <h2 className="pain-points__title">Мы решаем ваши задачи</h2>
          <p className="pain-points__subtitle">
            Каждая проблема ребёнка — это возможность для роста
          </p>
        </div>
        
        <div className="pain-points__grid">
          {painPoints.map((point, index) => (
            <div 
              key={index} 
              className="pain-points__card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="pain-points__icon">
                {point.icon}
              </div>
              <div className="pain-points__content">
                <h3 className="pain-points__problem">{point.problem}</h3>
                <p className="pain-points__solution">{point.solution}</p>
              </div>
              <div className="pain-points__arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ParentPainPoints

