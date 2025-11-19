import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import ModalForms from '../ModalForms/ModalForms'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [modalType, setModalType] = useState<'booking' | 'presentation' | 'consultation' | 'excursion' | null>(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // Отслеживание активной секции при скроллинге
  useEffect(() => {
    if (location.pathname !== '/') return

    const sections = [
      { id: 'approach', anchor: '#approach' },
      { id: 'booking-form', anchor: '#booking-form' },
      { id: 'directions', anchor: '#directions' },
      { id: 'how-we-work', anchor: '#how-we-work' },
      { id: 'trust', anchor: '#trust' },
      { id: 'team', anchor: '#team' },
      { id: 'gallery', anchor: '#gallery' }
    ]

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 150 // Учитываем высоту header + отступ

      // Проверка для Hero секции
      const heroElement = document.querySelector('.hero')
      if (heroElement) {
        const heroRect = heroElement.getBoundingClientRect()
        const heroBottom = heroRect.bottom + window.scrollY
        if (scrollPosition < heroBottom - 200) {
          setActiveSection(null) // Главная активна
          return
        }
      }

      // Находим секцию, которая находится в viewport и выше всего
      let activeAnchor: string | null = null
      let minDistance = Infinity

      sections.forEach((section) => {
        const element = document.getElementById(section.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = elementTop + rect.height

          // Если секция видна в viewport
          if (elementTop <= scrollPosition && elementBottom >= scrollPosition - 200) {
            const distance = Math.abs(elementTop - scrollPosition)
            if (distance < minDistance) {
              minDistance = distance
              activeAnchor = section.anchor
            }
          }
        }
      })

      if (activeAnchor !== null) {
        setActiveSection(activeAnchor)
      }
    }

    // Throttle для оптимизации производительности
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateActiveSection() // Проверка при монтировании

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [location.pathname])

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        setActiveSection(hash)
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    handleHashChange() // Проверка при монтировании
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const menuItems = [
    { path: '/', label: 'Главная', anchor: null },
    { path: '/', label: 'О подходе', anchor: '#approach' },
    { path: '/', label: 'Направления', anchor: '#directions' },
    { path: '/', label: 'Как мы работаем', anchor: '#how-we-work' },
    { path: '/', label: 'Команда', anchor: '#team' },
    { path: '/', label: 'Галерея', anchor: '#gallery' }
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string | null) => {
    if (anchor) {
      e.preventDefault()
      const element = document.querySelector(anchor)
      if (element) {
        const headerHeight = 70
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
      setIsMenuOpen(false)
    }
  }

  const isActive = (anchor: string | null) => {
    if (location.pathname !== '/') return false
    
    // Если это главная ссылка (без anchor)
    if (!anchor) {
      return activeSection === null || activeSection === ''
    }
    
    // Используем активную секцию из состояния или hash
    const isCurrentlyActive = activeSection === anchor || window.location.hash === anchor
    
    // Когда пользователь находится в секции "Почему доверяют", подсвечиваем "Как мы работаем"
    if (anchor === '#how-we-work') {
      return isCurrentlyActive || activeSection === '#trust' || window.location.hash === '#trust'
    }
    
    return isCurrentlyActive
  }

  return (
    <>
      <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
        <div className="container">
          <div className="header__content">
            <Link 
              to="/" 
              className="header__logo" 
              onClick={(e) => {
                setIsMenuOpen(false)
                // Если мы на главной странице, скроллим вверх
                if (location.pathname === '/') {
                  e.preventDefault()
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  })
                }
                // Если мы не на главной странице, переходим на неё (скролл произойдет автоматически)
              }}
            >
              <img src="/logo.png" alt="СФЕРА" className="header__logo-img" />
            </Link>
            
            <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.anchor || item.path}
                  onClick={(e) => handleNavClick(e, item.anchor)}
                  className={`header__nav-link ${isActive(item.anchor) ? 'header__nav-link--active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
              {/* Кнопка "Записаться" в мобильном меню */}
              <button
                className="header__nav-button"
                onClick={() => {
                  setIsMenuOpen(false)
                  if (location.pathname === '/') {
                    const element = document.querySelector('#booking-form')
                    if (element) {
                      const headerHeight = 70
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                      const offsetPosition = elementPosition - headerHeight
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      })
                    }
                  } else {
                    window.location.href = '/#booking-form'
                  }
                }}
              >
                Записаться
              </button>
            </nav>
            
            <div className="header__actions">
              <button
                className="header__button header__button--primary"
                onClick={() => {
                  if (location.pathname === '/') {
                    const element = document.querySelector('#booking-form')
                    if (element) {
                      const headerHeight = 70
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                      const offsetPosition = elementPosition - headerHeight
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      })
                    }
                  } else {
                    window.location.href = '/#booking-form'
                  }
                }}
              >
                Записаться
              </button>
              <button
                className="header__menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Меню"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay для мобильного меню */}
      {isMenuOpen && (
        <div 
          className="header__overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {modalType && (
        <ModalForms
          type={modalType}
          onClose={() => setModalType(null)}
        />
      )}
    </>
  )
}

export default Header

