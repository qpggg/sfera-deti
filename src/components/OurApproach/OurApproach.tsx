import { Activity, Palette, Brain } from 'lucide-react'
import './OurApproach.css'

interface Approach {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

const approaches: Approach[] = [
  {
    icon: <Activity size={40} />,
    title: 'Движение',
    description: 'Тело, уверенность, сила',
    color: 'var(--color-accent)'
  },
  {
    icon: <Palette size={40} />,
    title: 'Творчество',
    description: 'Эмоции, самовыражение, моторика',
    color: 'var(--color-sand)'
  },
  {
    icon: <Brain size={40} />,
    title: 'Интеллект',
    description: 'Логика, стратегия, концентрация',
    color: 'var(--color-accent-dark)'
  }
]

function OurApproach() {
  return (
    <section className="approach">
      <div className="container">
        <div className="approach__header">
          <h2 className="approach__title">Как мы работаем</h2>
          <p className="approach__subtitle">
            Три направления, которые формируют гармоничную личность
          </p>
        </div>
        
        <div className="approach__grid">
          {approaches.map((item, index) => (
            <div 
              key={index}
              className="approach__card"
              style={{ 
                '--card-color': item.color,
                animationDelay: `${index * 0.15}s`
              } as React.CSSProperties}
            >
              <div className="approach__icon-wrapper">
                <div className="approach__icon">
                  {item.icon}
                </div>
                <div className="approach__circle approach__circle--1"></div>
                <div className="approach__circle approach__circle--2"></div>
              </div>
              <h3 className="approach__card-title">{item.title}</h3>
              <p className="approach__card-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurApproach

