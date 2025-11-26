import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Activity, Music, Palette, Brain, Baby, ArrowRight, Clock, Users, Target } from 'lucide-react'
import Footer from '../components/Footer/Footer'
import './ProgramsPage.css'

interface Program {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  fullDescription: string
  age: string
  duration: string
  groupSize: string
  benefits: string[]
  whatDevelops: string[]
  schedule: string[]
  image?: string
}

const programs: Program[] = [
  {
    id: 'movement',
    icon: <Activity size={32} />,
    title: 'СФЕРА Движение',
    description: 'Физическое развитие через игру и движение',
    fullDescription: 'Программа направлена на развитие физических способностей, координации, силы и уверенности в себе. Через движение и игру дети учатся чувствовать своё тело, управлять им и использовать его как инструмент самовыражения.',
    age: '4–14 лет',
    duration: '60 минут',
    groupSize: '6–8 человек',
    benefits: ['Координация', 'Сила', 'Уверенность', 'Выносливость'],
    whatDevelops: [
      'Физическую силу и выносливость',
      'Координацию движений',
      'Пространственное мышление',
      'Уверенность в себе',
      'Умение работать в команде'
    ],
    schedule: ['Понедельник, Среда: 17:00–18:00', 'Суббота: 11:00–12:00']
  },
  {
    id: 'rhythm',
    icon: <Music size={32} />,
    title: 'СФЕРА Ритм',
    description: 'Развитие чувства ритма и музыкальности',
    fullDescription: 'Музыкальная программа, которая развивает чувство ритма, слух, координацию и творческое мышление. Дети учатся чувствовать музыку телом, создавать ритмы и выражать эмоции через движение и звук.',
    age: '3–10 лет',
    duration: '45 минут',
    groupSize: '6–8 человек',
    benefits: ['Ритм', 'Слух', 'Координация', 'Музыкальность'],
    whatDevelops: [
      'Чувство ритма и музыкальный слух',
      'Координацию движений',
      'Творческое мышление',
      'Эмоциональный интеллект',
      'Умение работать в группе'
    ],
    schedule: ['Вторник, Четверг: 16:30–17:15', 'Суббота: 10:00–10:45']
  },
  {
    id: 'art',
    icon: <Palette size={32} />,
    title: 'СФЕРА Арт',
    description: 'Творческое самовыражение и развитие моторики',
    fullDescription: 'Художественная программа, которая помогает детям раскрыть свой творческий потенциал. Через различные техники и материалы дети учатся выражать мысли и эмоции, развивают мелкую моторику и воображение.',
    age: '3–12 лет',
    duration: '60 минут',
    groupSize: '6–8 человек',
    benefits: ['Креативность', 'Моторика', 'Эмоции', 'Воображение'],
    whatDevelops: [
      'Творческое мышление и воображение',
      'Мелкую моторику рук',
      'Эмоциональный интеллект',
      'Умение выражать мысли визуально',
      'Уверенность в своих способностях'
    ],
    schedule: ['Понедельник, Среда: 16:00–17:00', 'Суббота: 12:00–13:00']
  },
  {
    id: 'mind',
    icon: <Brain size={32} />,
    title: 'СФЕРА Ум',
    description: 'Логика, стратегия и развитие интеллекта',
    fullDescription: 'Интеллектуальная программа, развивающая логическое мышление, стратегическое планирование и концентрацию внимания. Через игры и задачи дети учатся анализировать, планировать и принимать решения.',
    age: '5–14 лет',
    duration: '60 минут',
    groupSize: '6–8 человек',
    benefits: ['Логика', 'Концентрация', 'Стратегия', 'Анализ'],
    whatDevelops: [
      'Логическое и критическое мышление',
      'Концентрацию внимания',
      'Стратегическое планирование',
      'Умение анализировать и делать выводы',
      'Память и скорость мышления'
    ],
    schedule: ['Вторник, Четверг: 17:00–18:00', 'Суббота: 13:00–14:00']
  },
  {
    id: 'mini',
    icon: <Baby size={32} />,
    title: 'СФЕРА Mini',
    description: 'Комплексное развитие для самых маленьких',
    fullDescription: 'Специальная программа для малышей, которая сочетает элементы движения, творчества и интеллектуального развития. Мягкая адаптация к групповым занятиям, развитие базовых навыков и социализация.',
    age: '3–5 лет',
    duration: '45 минут',
    groupSize: '4–6 человек',
    benefits: ['Адаптация', 'Социализация', 'Развитие', 'Игра'],
    whatDevelops: [
      'Социальные навыки и адаптацию',
      'Базовые двигательные навыки',
      'Речь и коммуникацию',
      'Любознательность и интерес к обучению',
      'Уверенность в себе'
    ],
    schedule: ['Понедельник, Среда: 10:00–10:45', 'Суббота: 9:00–9:45']
  }
]

function ProgramsPage() {
  return (
    <div className="programs-page">
      <Helmet>
        <title>Программы — СФЕРА | Движение, Творчество, Интеллект</title>
        <meta name="description" content="Программы развития для детей 3-17 лет: СФЕРА Движение, СФЕРА Ритм, СФЕРА Арт, СФЕРА Ум, СФЕРА Mini. Комплексное развитие личности через движение, творчество и интеллект. Малочисленные группы, опытные педагоги." />
        <meta name="keywords" content="программы для детей, детские программы, СФЕРА Движение, СФЕРА Ритм, СФЕРА Арт, СФЕРА Ум, СФЕРА Mini, развитие детей, детские кружки, занятия для детей" />
        <meta property="og:title" content="Программы — СФЕРА | Движение, Творчество, Интеллект" />
        <meta property="og:description" content="Программы развития для детей 3-17 лет: СФЕРА Движение, СФЕРА Ритм, СФЕРА Арт, СФЕРА Ум, СФЕРА Mini. Комплексное развитие личности." />
        <meta property="og:url" content="https://sfera-deti.ru/programs" />
        <link rel="canonical" href="https://sfera-deti.ru/programs" />
      </Helmet>
      <section className="programs-hero">
        <div className="container">
          <div className="programs-hero__content">
            <h1 className="programs-hero__title">Наши программы</h1>
            <p className="programs-hero__subtitle">
              Школы внутри СФЕРЫ — комплексное развитие личности через движение, творчество и интеллект
            </p>
          </div>
        </div>
      </section>

      <section className="programs-list">
        <div className="container">
          {programs.map((program) => (
            <div key={program.id} className="program-card">
              <div className="program-card__image">
                {program.image ? (
                  <img src={program.image} alt={program.title} />
                ) : (
                  <div className="program-card__placeholder">
                    {program.icon}
                    <p>Фото занятий</p>
                  </div>
                )}
              </div>
              
              <div className="program-card__content">
                <div className="program-card__header">
                  <div className="program-card__icon">{program.icon}</div>
                  <div>
                    <h2 className="program-card__title">{program.title}</h2>
                    <p className="program-card__description">{program.description}</p>
                  </div>
                </div>
                
                <p className="program-card__full-description">{program.fullDescription}</p>
                
                <div className="program-card__info">
                  <div className="program-card__info-item">
                    <Users size={20} />
                    <span>Возраст: {program.age}</span>
                  </div>
                  <div className="program-card__info-item">
                    <Clock size={20} />
                    <span>Длительность: {program.duration}</span>
                  </div>
                  <div className="program-card__info-item">
                    <Target size={20} />
                    <span>Группа: {program.groupSize}</span>
                  </div>
                </div>
                
                <div className="program-card__sections">
                  <div className="program-card__section">
                    <h3 className="program-card__section-title">Что развивает:</h3>
                    <ul className="program-card__list">
                      {program.whatDevelops.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="program-card__section">
                    <h3 className="program-card__section-title">Расписание:</h3>
                    <ul className="program-card__schedule">
                      {program.schedule.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="program-card__benefits">
                  {program.benefits.map((benefit, index) => (
                    <span key={index} className="program-card__benefit">{benefit}</span>
                  ))}
                </div>
                
                <Link to="/#booking-form" className="program-card__button">
                  Записаться на пробное занятие
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default ProgramsPage

