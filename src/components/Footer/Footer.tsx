import { MapPin, Phone, Mail } from 'lucide-react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__logo">СФЕРА</h3>
            <p className="footer__tagline">
              Пространство развития детей 3–17 лет
            </p>
            <p className="footer__description">
              Мы не делаем чемпионов. Мы делаем уверенных, гармоничных и сильных детей.
            </p>
          </div>
          
          <div className="footer__section">
            <h4 className="footer__title">Контакты</h4>
            <div className="footer__contact">
              <MapPin size={20} />
              <span>г. Воронеж, ул. Димитрова, 47 (офис)</span>
            </div>
            <div className="footer__contact">
              <Phone size={20} />
              <a href="tel:+79809650985">+7 (980) 965-09-85</a>
            </div>
            <div className="footer__contact">
              <Mail size={20} />
              <a href="mailto:sfera-deti@mail.ru">sfera-deti@mail.ru</a>
            </div>
          </div>
          
          <div className="footer__section">
            <h4 className="footer__title">Документы</h4>
            <div className="footer__links">
              <span className="footer__link">Лицензия</span>
              <span className="footer__link">Договор-оферта</span>
              <span className="footer__link">Политика конфиденциальности</span>
            </div>
          </div>
        </div>
        
        <div className="footer__map">
          <div className="footer__map-placeholder">
            <MapPin size={48} />
            <p>Карта будет здесь</p>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} СФЕРА. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

