import { User, GraduationCap, Award, Heart } from 'lucide-react'
import Footer from '../components/Footer/Footer'
import './TeamPage.css'

interface TeamMember {
  id: number
  name: string
  role: string
  specialization: string
  education: string
  experience: string
  quote: string
  philosophy: string
  photo?: string
  achievements?: string[]
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Анна Петрова',
    role: 'Педагог-психолог',
    specialization: 'СФЕРА Движение',
    education: 'МГПУ, факультет психологии и педагогики',
    experience: '8 лет работы с детьми',
    quote: 'Каждое движение — это шаг к уверенности в себе',
    philosophy: 'Я верю, что через движение дети учатся чувствовать своё тело, управлять им и выражать эмоции. Физическая активность — это не только здоровье, но и способ развития уверенности и силы характера.',
    achievements: ['Сертификат по детской кинезиологии', 'Опыт работы в спортивных школах']
  },
  {
    id: 2,
    name: 'Мария Сидорова',
    role: 'Педагог-психолог',
    specialization: 'СФЕРА Арт',
    education: 'МГАХИ, факультет художественного образования',
    experience: '10 лет работы с детьми',
    quote: 'Творчество помогает детям выразить то, что сложно сказать словами',
    philosophy: 'Творчество — это язык души. Через искусство дети учатся выражать свои чувства, мысли и переживания. Моя задача — создать безопасное пространство, где каждый ребёнок может быть собой и творить свободно.',
    achievements: ['Член Союза художников России', 'Автор методики арт-терапии для детей']
  },
  {
    id: 3,
    name: 'Елена Козлова',
    role: 'Педагог-психолог',
    specialization: 'СФЕРА Ум',
    education: 'МГУ, факультет психологии',
    experience: '12 лет работы с детьми',
    quote: 'Логика и игра — лучшие друзья детского развития',
    philosophy: 'Интеллектуальное развитие должно быть увлекательным. Через игры и задачи дети учатся думать, анализировать и принимать решения. Я создаю ситуации, где ребёнок сам открывает знания, а не получает их готовыми.',
    achievements: ['Кандидат психологических наук', 'Автор развивающих программ']
  },
  {
    id: 4,
    name: 'Ольга Новикова',
    role: 'Педагог-психолог',
    specialization: 'СФЕРА Ритм',
    education: 'МГК им. Чайковского, факультет музыкальной педагогики',
    experience: '9 лет работы с детьми',
    quote: 'Ритм — это язык, который понимает каждый ребёнок',
    philosophy: 'Музыка и ритм — универсальные языки, которые помогают детям развиваться гармонично. Через музыку мы развиваем не только слух, но и координацию, эмоциональный интеллект и способность работать в команде.',
    achievements: ['Дипломант международных конкурсов', 'Специалист по музыкальной терапии']
  },
  {
    id: 5,
    name: 'Ирина Волкова',
    role: 'Педагог-психолог',
    specialization: 'СФЕРА Mini',
    education: 'МПГУ, факультет дошкольной педагогики и психологии',
    experience: '11 лет работы с детьми',
    quote: 'Малыши учатся через игру, а мы создаём для этого пространство',
    philosophy: 'Ранний возраст — это фундамент всей дальнейшей жизни. Я создаю условия, где малыши чувствуют себя безопасно, могут исследовать мир и развиваться в своём темпе. Мягкая адаптация и индивидуальный подход — основа моей работы.',
    achievements: ['Сертификат Монтессори-педагогики', 'Специалист по раннему развитию']
  }
]

function TeamPage() {
  return (
    <div className="team-page">
      <section className="team-hero">
        <div className="container">
          <div className="team-hero__content">
            <h1 className="team-hero__title">Наша команда</h1>
            <p className="team-hero__subtitle">
              Профессионалы, которые верят в каждого ребёнка и создают пространство для его развития
            </p>
          </div>
        </div>
      </section>

      <section className="team-list">
        <div className="container">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-member-card">
              <div className="team-member-card__photo">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} />
                ) : (
                  <div className="team-member-card__placeholder">
                    <User size={64} />
                    <p>Фото педагога</p>
                  </div>
                )}
              </div>
              
              <div className="team-member-card__content">
                <div className="team-member-card__header">
                  <div>
                    <h2 className="team-member-card__name">{member.name}</h2>
                    <p className="team-member-card__role">{member.role}</p>
                    <p className="team-member-card__specialization">{member.specialization}</p>
                  </div>
                </div>
                
                <div className="team-member-card__quote">
                  <Heart size={20} />
                  <p>"{member.quote}"</p>
                </div>
                
                <div className="team-member-card__info">
                  <div className="team-member-card__info-item">
                    <GraduationCap size={20} />
                    <div>
                      <strong>Образование:</strong>
                      <span>{member.education}</span>
                    </div>
                  </div>
                  
                  <div className="team-member-card__info-item">
                    <Award size={20} />
                    <div>
                      <strong>Опыт работы:</strong>
                      <span>{member.experience}</span>
                    </div>
                  </div>
                </div>
                
                <div className="team-member-card__philosophy">
                  <h3 className="team-member-card__philosophy-title">Философия работы:</h3>
                  <p>{member.philosophy}</p>
                </div>
                
                {member.achievements && member.achievements.length > 0 && (
                  <div className="team-member-card__achievements">
                    <h3 className="team-member-card__achievements-title">Достижения:</h3>
                    <ul>
                      {member.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default TeamPage

