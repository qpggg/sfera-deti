import { User } from 'lucide-react'
import './Team.css'

interface TeamMember {
  name: string
  role: string
  quote: string
  photo?: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Анна Петрова',
    role: 'Педагог-психолог, СФЕРА Движение',
    quote: 'Каждое движение — это шаг к уверенности в себе'
  },
  {
    name: 'Мария Сидорова',
    role: 'Педагог-психолог, СФЕРА Арт',
    quote: 'Творчество помогает детям выразить то, что сложно сказать словами'
  },
  {
    name: 'Елена Козлова',
    role: 'Педагог-психолог, СФЕРА Ум',
    quote: 'Логика и игра — лучшие друзья детского развития'
  },
  {
    name: 'Ольга Новикова',
    role: 'Педагог-психолог, СФЕРА Ритм',
    quote: 'Ритм — это язык, который понимает каждый ребёнок'
  },
  {
    name: 'Ирина Волкова',
    role: 'Педагог-психолог, СФЕРА Mini',
    quote: 'Малыши учатся через игру, а мы создаём для этого пространство'
  }
]

function Team() {
  return (
    <section className="team">
      <div className="container">
        <div className="team__header">
          <h2 className="team__title">Наша команда</h2>
          <p className="team__subtitle">
            Профессионалы, которые верят в каждого ребёнка
          </p>
        </div>
        
        <div className="team__grid">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="team__card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="team__photo">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} />
                ) : (
                  <div className="team__photo-placeholder">
                    <User size={48} />
                  </div>
                )}
              </div>
              
              <div className="team__content">
                <h3 className="team__name">{member.name}</h3>
                <p className="team__role">{member.role}</p>
                <p className="team__quote">"{member.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team

