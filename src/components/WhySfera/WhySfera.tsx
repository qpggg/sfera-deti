import { Users, Heart, UsersRound, TrendingUp, Sparkles, Gamepad2 } from 'lucide-react'
import './WhySfera.css'

interface Advantage {
  icon: React.ReactNode
  title: string
  description: string
}

const advantages: Advantage[] = [
  {
    icon: <Users size={28} />,
    title: 'Профессиональные педагог-психологи',
    description: 'Наши специалисты имеют педагогическое и психологическое образование'
  },
  {
    icon: <Heart size={28} />,
    title: 'Мягкие методики без давления',
    description: 'Мы не создаём стресс, а помогаем ребёнку раскрыться естественно'
  },
  {
    icon: <UsersRound size={28} />,
    title: 'Малые группы',
    description: 'До 8 человек в группе — индивидуальный подход к каждому'
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'Еженедельный прогресс',
    description: 'Родители видят результаты развития ребёнка каждую неделю'
  },
  {
    icon: <Sparkles size={28} />,
    title: 'Современная эстетика и пространство',
    description: 'Красивые, светлые залы с современным оборудованием'
  },
  {
    icon: <Gamepad2 size={28} />,
    title: 'Развитие через игру',
    description: 'Движение + творчество + интеллект в гармоничном сочетании'
  }
]

function WhySfera() {
  return (
    <section className="why-sfera">
      <div className="container">
        <div className="why-sfera__header">
          <h2 className="why-sfera__title">Почему СФЕРА</h2>
          <p className="why-sfera__subtitle">
            Мы создаём пространство, где каждый ребёнок может стать лучшей версией себя
          </p>
        </div>
        
        <div className="why-sfera__grid">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="why-sfera__card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="why-sfera__icon">
                {advantage.icon}
              </div>
              <h3 className="why-sfera__card-title">{advantage.title}</h3>
              <p className="why-sfera__card-description">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhySfera

