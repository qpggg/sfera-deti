import { useState } from 'react'
import { Activity, Music, Palette, Brain, Baby, TrendingUp, Focus, Users, Activity as ActivityIcon, Heart, Sparkles } from 'lucide-react'
import Footer from '../components/Footer/Footer'
import './ProgressPage.css'

interface Program {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  progress: {
    confidence: number
    focus: number
    socialization: number
    coordination: number
    emotional: number
    independence: number
  }
}

const programs: Program[] = [
  {
    id: 'movement',
    icon: <Activity size={32} />,
    title: 'СФЕРА Движение',
    description: 'Физическое развитие через игру и движение',
    progress: {
      confidence: 95,
      focus: 85,
      socialization: 90,
      coordination: 98,
      emotional: 88,
      independence: 92
    }
  },
  {
    id: 'rhythm',
    icon: <Music size={32} />,
    title: 'СФЕРА Ритм',
    description: 'Развитие чувства ритма и музыкальности',
    progress: {
      confidence: 88,
      focus: 92,
      socialization: 85,
      coordination: 95,
      emotional: 90,
      independence: 87
    }
  },
  {
    id: 'art',
    icon: <Palette size={32} />,
    title: 'СФЕРА Арт',
    description: 'Творческое самовыражение и развитие моторики',
    progress: {
      confidence: 90,
      focus: 88,
      socialization: 92,
      coordination: 85,
      emotional: 95,
      independence: 90
    }
  },
  {
    id: 'mind',
    icon: <Brain size={32} />,
    title: 'СФЕРА Ум',
    description: 'Логика, стратегия и развитие интеллекта',
    progress: {
      confidence: 87,
      focus: 98,
      socialization: 88,
      coordination: 82,
      emotional: 85,
      independence: 93
    }
  },
  {
    id: 'mini',
    icon: <Baby size={32} />,
    title: 'СФЕРА Mini',
    description: 'Комплексное развитие для самых маленьких',
    progress: {
      confidence: 92,
      focus: 85,
      socialization: 95,
      coordination: 90,
      emotional: 93,
      independence: 88
    }
  }
]

const progressLabels = [
  { key: 'confidence', label: 'Уверенность', icon: <TrendingUp size={20} /> },
  { key: 'focus', label: 'Фокус', icon: <Focus size={20} /> },
  { key: 'socialization', label: 'Социализация', icon: <Users size={20} /> },
  { key: 'coordination', label: 'Координация', icon: <ActivityIcon size={20} /> },
  { key: 'emotional', label: 'Эмоциональная стабильность', icon: <Heart size={20} /> },
  { key: 'independence', label: 'Самостоятельность', icon: <Sparkles size={20} /> }
]

function ProgressPage() {
  const [selectedProgram, setSelectedProgram] = useState<string>(programs[0].id)

  const currentProgram = programs.find(p => p.id === selectedProgram) || programs[0]

  return (
    <div className="progress-page">
      <section className="progress-hero">
        <div className="container">
          <div className="progress-hero__content">
            <h1 className="progress-hero__title">Прогресс за 3 месяца</h1>
            <p className="progress-hero__subtitle">
              Выберите направление и узнайте, какие результаты достигнет ваш ребёнок
            </p>
          </div>
        </div>
      </section>

      <section className="progress-content">
        <div className="container">
          <div className="progress-layout">
            <div className="progress-programs">
              <h2 className="progress-programs__title">Выберите направление</h2>
              <div className="progress-programs__list">
                {programs.map((program) => (
                  <div
                    key={program.id}
                    className={`progress-program-card ${selectedProgram === program.id ? 'progress-program-card--active' : ''}`}
                    onClick={() => setSelectedProgram(program.id)}
                  >
                    <div className="progress-program-card__icon">
                      {program.icon}
                    </div>
                    <div className="progress-program-card__content">
                      <h3 className="progress-program-card__title">{program.title}</h3>
                      <p className="progress-program-card__description">{program.description}</p>
                    </div>
                    {selectedProgram === program.id && (
                      <div className="progress-program-card__check">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="10" fill="currentColor"/>
                          <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="progress-stats">
              <div className="progress-stats__header">
                <div className="progress-stats__program-icon">
                  {currentProgram.icon}
                </div>
                <div>
                  <h2 className="progress-stats__title">{currentProgram.title}</h2>
                  <p className="progress-stats__subtitle">Прогресс за 3 месяца</p>
                </div>
              </div>

              <div className="progress-stats__list">
                {progressLabels.map((item) => {
                  const value = currentProgram.progress[item.key as keyof typeof currentProgram.progress]
                  return (
                    <div key={item.key} className="progress-stat-item">
                      <div className="progress-stat-item__header">
                        <div className="progress-stat-item__icon">
                          {item.icon}
                        </div>
                        <span className="progress-stat-item__label">{item.label}</span>
                        <span className="progress-stat-item__value">{value}%</span>
                      </div>
                      <div className="progress-stat-item__bar">
                        <div 
                          className="progress-stat-item__fill"
                          style={{ width: `${value}%` }}
                        >
                          <div className="progress-stat-item__shine"></div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="progress-stats__note">
                <p>
                  * Статистика основана на оценках родителей и наблюдениях педагогов за последние 3 месяца
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ProgressPage

