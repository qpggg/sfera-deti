import { Heart, Target, Users, Sparkles, Award, BookOpen } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import Footer from '../components/Footer/Footer'
import './AboutPage.css'

function AboutPage() {
  return (
    <div className="about-page">
      <Helmet>
        <title>О нас — СФЕРА | Пространство развития детей</title>
        <meta name="description" content="СФЕРА — пространство развития детей, где каждый ребёнок может стать лучшей версией себя. Индивидуальный подход, мягкие методики, малые группы, комплексное развитие через движение, творчество и интеллект." />
        <meta name="keywords" content="о нас СФЕРА, детский центр, миссия, ценности, подход к развитию детей, индивидуальный подход, мягкие методики, малые группы, комплексное развитие" />
        <meta property="og:title" content="О нас — СФЕРА | Пространство развития детей" />
        <meta property="og:description" content="СФЕРА — пространство развития детей, где каждый ребёнок может стать лучшей версией себя. Индивидуальный подход, мягкие методики, малые группы." />
        <meta property="og:url" content="https://sfera-vrn.ru/about" />
        <link rel="canonical" href="https://sfera-vrn.ru/about" />
      </Helmet>
      <section className="about-hero">
        <div className="container">
          <div className="about-hero__content">
            <h1 className="about-hero__title">О СФЕРЕ</h1>
            <p className="about-hero__subtitle">
              Пространство развития детей, где каждый ребёнок может стать лучшей версией себя
            </p>
          </div>
        </div>
      </section>

      <section className="about-mission">
        <div className="container">
          <div className="about-mission__content">
            <div className="about-mission__text">
              <h2 className="about-mission__title">Наша миссия</h2>
              <p className="about-mission__description">
                СФЕРА — это не просто детский центр. Это пространство, где мы создаём условия 
                для гармоничного развития личности ребёнка через движение, творчество и интеллект.
              </p>
              <p className="about-mission__description">
                Мы не делаем чемпионов. Мы делаем уверенных, гармоничных и сильных детей, 
                которые умеют общаться, думать, творить и быть собой.
              </p>
            </div>
            <div className="about-mission__image">
              <div className="about-mission__placeholder">
                <Users size={64} />
                <p>Фото пространства</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <h2 className="about-values__title">Наши ценности</h2>
          <div className="about-values__grid">
            <div className="about-values__card">
              <div className="about-values__icon">
                <Heart size={32} />
              </div>
              <h3 className="about-values__card-title">Индивидуальный подход</h3>
              <p className="about-values__card-text">
                Каждый ребёнок уникален. Мы находим подход к каждому, учитывая особенности и потребности.
              </p>
            </div>
            
            <div className="about-values__card">
              <div className="about-values__icon">
                <Target size={32} />
              </div>
              <h3 className="about-values__card-title">Мягкие методики</h3>
              <p className="about-values__card-text">
                Без давления и стресса. Развитие через игру, движение и творчество в комфортной атмосфере.
              </p>
            </div>
            
            <div className="about-values__card">
              <div className="about-values__icon">
                <Users size={32} />
              </div>
              <h3 className="about-values__card-title">Малые группы</h3>
              <p className="about-values__card-text">
                До 8 человек в группе — это позволяет уделить внимание каждому ребёнку и создать доверительную атмосферу.
              </p>
            </div>
            
            <div className="about-values__card">
              <div className="about-values__icon">
                <Sparkles size={32} />
              </div>
              <h3 className="about-values__card-title">Комплексное развитие</h3>
              <p className="about-values__card-text">
                Движение + Творчество + Интеллект. Мы развиваем ребёнка гармонично, во всех направлениях.
              </p>
            </div>
            
            <div className="about-values__card">
              <div className="about-values__icon">
                <Award size={32} />
              </div>
              <h3 className="about-values__card-title">Профессионализм</h3>
              <p className="about-values__card-text">
                Наши педагоги имеют образование в области педагогики и психологии, постоянно повышают квалификацию.
              </p>
            </div>
            
            <div className="about-values__card">
              <div className="about-values__icon">
                <BookOpen size={32} />
              </div>
              <h3 className="about-values__card-title">Видимый прогресс</h3>
              <p className="about-values__card-text">
                Родители видят результаты каждую неделю. Мы отслеживаем прогресс и делимся наблюдениями.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-approach">
        <div className="container">
          <div className="about-approach__content">
            <h2 className="about-approach__title">Наш подход</h2>
            <div className="about-approach__text">
              <p>
                В СФЕРЕ мы верим, что каждый ребёнок рождается с огромным потенциалом. 
                Наша задача — создать пространство, где этот потенциал может раскрыться естественно и гармонично.
              </p>
              <p>
                Мы не ставим цели сделать из детей спортсменов или художников. Мы помогаем им 
                развить уверенность в себе, умение общаться, способность мыслить критически и творчески, 
                физическую силу и координацию.
              </p>
              <p>
                Занятия в СФЕРЕ — это не просто кружки. Это инструменты для развития личности. 
                Через движение ребёнок учится чувствовать своё тело и управлять им. Через творчество 
                он учится выражать эмоции и мысли. Через интеллектуальные игры развивает логику и стратегическое мышление.
              </p>
              <p>
                Мы создаём среду, где дети чувствуют себя безопасно, где их принимают такими, какие они есть, 
                где ошибки — это часть процесса обучения, а не повод для критики.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default AboutPage

