import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle } from 'lucide-react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__logo">СФЕРА</h3>
            <p className="footer__tagline">
              Пространство развития детей 3–14 лет
            </p>
            <p className="footer__description">
              Мы не делаем чемпионов. Мы делаем уверенных, гармоничных и сильных детей.
            </p>
          </div>
          
          <div className="footer__section">
            <h4 className="footer__title">Контакты</h4>
            <div className="footer__contact">
              <MapPin size={20} />
              <span>г. Москва, ул. Примерная, д. 1</span>
            </div>
            <div className="footer__contact">
              <Phone size={20} />
              <a href="tel:+79809650985">+7 (980) 965-09-85</a>
            </div>
            <div className="footer__contact">
              <Mail size={20} />
              <a href="mailto:info@sfera.ru">info@sfera.ru</a>
            </div>
          </div>
          
          <div className="footer__section">
            <h4 className="footer__title">Социальные сети</h4>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href="#" className="footer__social-link" aria-label="WhatsApp">
                <MessageCircle size={24} />
              </a>
            </div>
          </div>
          
          <div className="footer__section">
            <h4 className="footer__title">Навигация</h4>
            <div className="footer__links">
              <Link to="/about" className="footer__link">О нас</Link>
              <Link to="/programs" className="footer__link">Программы</Link>
              <Link to="/team" className="footer__link">Команда</Link>
              <Link to="/progress" className="footer__link">Прогресс</Link>
              <Link to="/how-to-start" className="footer__link">Как начать</Link>
            </div>
          </div>
          
          <div className="footer__section">
            <h4 className="footer__title">Документы</h4>
            <div className="footer__links">
              <a href="#" className="footer__link">Лицензия</a>
              <a href="#" className="footer__link">Договор-оферта</a>
              <a href="#" className="footer__link">Политика конфиденциальности</a>
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

