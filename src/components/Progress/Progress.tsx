import { TrendingUp, Focus, Users, Activity, Heart, Sparkles } from 'lucide-react'
import './Progress.css'

interface ProgressItem {
  icon: React.ReactNode
  title: string
  percentage: number
}

const progressItems: ProgressItem[] = [
  { icon: <TrendingUp size={32} />, title: 'Уверенность', percentage: 95 },
  { icon: <Focus size={32} />, title: 'Фокус', percentage: 90 },
  { icon: <Users size={32} />, title: 'Социализация', percentage: 92 },
  { icon: <Activity size={32} />, title: 'Координация', percentage: 88 },
  { icon: <Heart size={32} />, title: 'Эмоциональная стабильность', percentage: 93 },
  { icon: <Sparkles size={32} />, title: 'Самостоятельность', percentage: 87 }
]

function Progress() {
  return (
    <section className="progress">
      <div className="container">
        <div className="progress__header">
          <h2 className="progress__title">Прогресс за 3 месяца</h2>
          <p className="progress__subtitle">
            Результаты, которые видят родители и чувствуют дети
          </p>
        </div>
        
        <div className="progress__grid">
          {progressItems.map((item, index) => (
            <div 
              key={index}
              className="progress__card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="progress__icon-wrapper">
                <div className="progress__icon">
                  {item.icon}
                </div>
              </div>
              
              <h3 className="progress__card-title">{item.title}</h3>
              
              <div className="progress__bar-wrapper">
                <div className="progress__bar">
                  <div 
                    className="progress__bar-fill"
                    style={{ 
                      width: `${item.percentage}%`,
                      animationDelay: `${index * 0.2}s`
                    }}
                  ></div>
                </div>
                <span className="progress__percentage">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="progress__note">
          <p>* Статистика основана на оценках родителей и наблюдениях педагогов</p>
        </div>
      </div>
    </section>
  )
}

export default Progress

