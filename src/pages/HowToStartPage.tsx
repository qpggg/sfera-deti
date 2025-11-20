import { Link } from 'react-router-dom'
import { Calendar, FileText, Users, CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react'
import Footer from '../components/Footer/Footer'
import './HowToStartPage.css'

function HowToStartPage() {
  return (
    <div className="how-to-start-page">
      <section className="how-to-start-hero">
        <div className="container">
          <div className="how-to-start-hero__content">
            <h1 className="how-to-start-hero__title">Как начать</h1>
            <p className="how-to-start-hero__subtitle">
              Простой путь к развитию вашего ребёнка в СФЕРЕ
            </p>
          </div>
        </div>
      </section>

      <section className="how-to-start-steps">
        <div className="container">
          <h2 className="how-to-start-steps__title">Процесс поступления</h2>
          
          <div className="steps">
            <div className="step">
              <div className="step__number">1</div>
              <div className="step__content">
                <div className="step__icon">
                  <Calendar size={32} />
                </div>
                <h3 className="step__title">Записаться на пробное занятие</h3>
                <p className="step__description">
                  Оставьте заявку на сайте или позвоните нам. Мы свяжемся с вами в течение дня 
                  и согласуем удобное время для пробного занятия.
                </p>
                <Link to="/#booking-form" className="step__button">
                  Записаться
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
            
            <div className="step">
              <div className="step__number">2</div>
              <div className="step__content">
                <div className="step__icon">
                  <Users size={32} />
                </div>
                <h3 className="step__title">Посетить пробное занятие</h3>
                <p className="step__description">
                  Приходите на бесплатное пробное занятие вместе с ребёнком. Это возможность 
                  познакомиться с педагогом, пространством и методикой. Ребёнок попробует занятия, 
                  а вы увидите, как всё происходит.
                </p>
              </div>
            </div>
            
            <div className="step">
              <div className="step__number">3</div>
              <div className="step__content">
                <div className="step__icon">
                  <FileText size={32} />
                </div>
                <h3 className="step__title">Консультация с педагогом</h3>
                <p className="step__description">
                  После занятия педагог проведёт краткую консультацию, расскажет о наблюдениях, 
                  даст рекомендации по направлению развития и ответит на ваши вопросы.
                </p>
              </div>
            </div>
            
            <div className="step">
              <div className="step__number">4</div>
              <div className="step__content">
                <div className="step__icon">
                  <CheckCircle size={32} />
                </div>
                <h3 className="step__title">Принять решение</h3>
                <p className="step__description">
                  У вас будет время подумать. Если решите продолжить, мы оформим договор и 
                  подберём удобное расписание. Никакого давления — только ваше решение.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-to-start-requirements">
        <div className="container">
          <h2 className="how-to-start-requirements__title">Что нужно для записи</h2>
          
          <div className="requirements-grid">
            <div className="requirement-card">
              <h3 className="requirement-card__title">Возраст ребёнка</h3>
              <p className="requirement-card__text">
                От 3 до 14 лет. Мы подберём программу, соответствующую возрасту и развитию вашего ребёнка.
              </p>
            </div>
            
            <div className="requirement-card">
              <h3 className="requirement-card__title">Медицинские документы</h3>
              <p className="requirement-card__text">
                Справка от педиатра о том, что ребёнок может посещать групповые занятия. 
                Обычно это стандартная справка для детских кружков.
              </p>
            </div>
            
            <div className="requirement-card">
              <h3 className="requirement-card__title">Желание развиваться</h3>
              <p className="requirement-card__text">
                Главное — это желание ребёнка и ваша поддержка. Мы поможем с остальным!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-to-start-faq">
        <div className="container">
          <h2 className="how-to-start-faq__title">Частые вопросы</h2>
          
          <div className="faq-list">
            <div className="faq-item">
              <h3 className="faq-item__question">Сколько стоит пробное занятие?</h3>
              <p className="faq-item__answer">
                Пробное занятие абсолютно бесплатно для новых клиентов. Это возможность 
                познакомиться с нами без обязательств.
              </p>
            </div>
            
            <div className="faq-item">
              <h3 className="faq-item__question">Можно ли присутствовать на занятии?</h3>
              <p className="faq-item__answer">
                На первом пробном занятии родители могут присутствовать, чтобы увидеть, 
                как проходят занятия. В дальнейшем мы рекомендуем не присутствовать, 
                чтобы ребёнок мог полностью погрузиться в процесс.
              </p>
            </div>
            
            <div className="faq-item">
              <h3 className="faq-item__question">Что если ребёнку не понравится?</h3>
              <p className="faq-item__answer">
                Ничего страшного! Мы можем попробовать другое направление или подождать, 
                пока ребёнок будет готов. Мы не настаиваем и не давим.
              </p>
            </div>
            
            <div className="faq-item">
              <h3 className="faq-item__question">Как часто проходят занятия?</h3>
              <p className="faq-item__answer">
                Обычно занятия проходят 2 раза в неделю. Расписание зависит от выбранной программы 
                и группы. Мы стараемся подобрать удобное время для всех.
              </p>
            </div>
            
            <div className="faq-item">
              <h3 className="faq-item__question">Можно ли посещать несколько направлений?</h3>
              <p className="faq-item__answer">
                Конечно! Многие дети посещают 2–3 направления. При этом действует система скидок 
                на дополнительные программы.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-to-start-cta">
        <div className="container">
          <div className="cta-box">
            <h2 className="cta-box__title">Готовы начать?</h2>
            <p className="cta-box__text">
              Запишитесь на бесплатное пробное занятие прямо сейчас
            </p>
            <div className="cta-box__actions">
              <Link to="/#booking-form" className="cta-box__button cta-box__button--primary">
                Записаться на пробное занятие
                <ArrowRight size={20} />
              </Link>
              <a href="tel:+79809650985" className="cta-box__button cta-box__button--secondary">
                <Phone size={20} />
                Позвонить нам
              </a>
            </div>
            <div className="cta-box__contacts">
              <a href="tel:+79809650985" className="cta-box__contact">
                <Phone size={20} />
                +7 (980) 965-09-85
              </a>
              <a href="mailto:info@sfera.ru" className="cta-box__contact">
                <Mail size={20} />
                info@sfera.ru
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default HowToStartPage

