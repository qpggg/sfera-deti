import { useState, useEffect, useRef, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import './Reviews.css'

interface Review {
  name: string
  childAge: string
  program: string
  text: string
  rating: number
  photo?: string
  date?: string
  source?: string
}

const reviews: Review[] = [
  {
    name: 'Елена М.',
    childAge: '6 лет',
    program: 'СФЕРА Движение',
    text: 'Мой сын стал намного увереннее в себе. Педагоги находят подход к каждому ребёнку, атмосфера очень тёплая и поддерживающая. Ребёнок с удовольствием ходит на занятия и ждёт каждую встречу.',
    rating: 5,
    date: '15 ноября 2024',
    source: 'Яндекс.Карты'
  },
  {
    name: 'Анна К.',
    childAge: '4 года',
    program: 'СФЕРА Mini',
    text: 'Дочь с нетерпением ждёт каждое занятие. Вижу реальный прогресс в социализации и развитии. Спасибо команде СФЕРЫ! Особенно хочу отметить мягкий подход педагогов и индивидуальное внимание к каждому ребёнку.',
    rating: 5,
    date: '10 ноября 2024',
    source: 'Сайт'
  },
  {
    name: 'Мария С.',
    childAge: '8 лет',
    program: 'СФЕРА Арт',
    text: 'Ребёнок раскрылся творчески, стал более открытым и эмоционально стабильным. Методики действительно мягкие, без давления. Вижу, как растёт уверенность в себе и развивается креативность.',
    rating: 5,
    date: '5 ноября 2024',
    source: 'Яндекс.Карты'
  },
  {
    name: 'Ольга В.',
    childAge: '7 лет',
    program: 'СФЕРА Ум',
    text: 'Заметно улучшилась концентрация и логическое мышление. Занятия проходят в игровой форме, что очень нравится ребёнку. Педагоги умеют заинтересовать и поддерживают интерес к обучению.',
    rating: 5,
    date: '1 ноября 2024',
    source: 'Сайт'
  },
  {
    name: 'Ирина П.',
    childAge: '5 лет',
    program: 'СФЕРА Ритм',
    text: 'Отличное развитие чувства ритма и координации. Малые группы позволяют уделить внимание каждому ребёнку. Атмосфера очень дружелюбная, дочь чувствует себя комфортно и раскрепощённо.',
    rating: 5,
    date: '28 октября 2024',
    source: 'Яндекс.Карты'
  },
  {
    name: 'Дмитрий Б.',
    childAge: '6 лет',
    program: 'СФЕРА Движение',
    text: 'Хочу выразить огромную благодарность всем педагогам! Для меня важно абсолютно всё: доброе отношение, терпение, понимание и конечно же учебный процесс. Моя дочь учится и каждый день я вижу её горящие глаза и желание поделиться новыми открытиями.',
    rating: 5,
    date: '25 октября 2024',
    source: 'Сайт'
  }
]

function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
  // Адаптивное количество элементов в зависимости от размера экрана
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1
      if (window.innerWidth < 1024) return 2
      return 3
    }
    return 3
  }
  
  const [itemsPerView, setItemsPerView] = useState(() => {
    if (typeof window !== 'undefined') {
      return getItemsPerView()
    }
    return 3
  })

  // Обновление количества элементов при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerView = getItemsPerView()
      setItemsPerView(newItemsPerView)
      setCurrentIndex(0) // Сброс при изменении размера
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const particles = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2
    }))
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= reviews.length ? 0 : prev + itemsPerView
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, reviews.length - itemsPerView) : prev - itemsPerView
    )
  }

  const visibleReviews = reviews.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section 
      ref={sectionRef}
      className={`reviews ${isVisible ? 'reviews--visible' : ''}`}
      id="reviews"
    >
      <div className="reviews__background">
        <div className="reviews__overlay"></div>
        <div className="reviews__mesh"></div>
        <div className="reviews__particles">
          {particles.map((particle) => (
            <div 
              key={particle.id} 
              className="reviews__particle" 
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="container">
        <div className="reviews__header">
          <h2 className="reviews__title">Отзывы родителей</h2>
          <p className="reviews__subtitle">
            Реальные истории семей, которые доверяют нам развитие своих детей
          </p>
        </div>
        
        <div className="reviews__slider">
          <button 
            className="reviews__nav reviews__nav--prev"
            onClick={prevSlide}
            aria-label="Предыдущий слайд"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="reviews__grid">
            {visibleReviews.map((review, index) => (
              <div 
                key={index}
                className="reviews__card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="reviews__quote-icon">
                  <Quote size={24} />
                </div>
                
                <div className="reviews__rating">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                
                <p className="reviews__text">"{review.text}"</p>
                
                <div className="reviews__author">
                  <div className="reviews__author-avatar">
                    {review.photo ? (
                      <img src={review.photo} alt={review.name} />
                    ) : (
                      <div className="reviews__author-initials">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="reviews__name">{review.name}</p>
                    <p className="reviews__info">
                      Ребёнок {review.childAge}, {review.program}
                    </p>
                    {review.date && (
                      <p className="reviews__date">{review.date}</p>
                    )}
                    {review.source && (
                      <p className="reviews__source">{review.source}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="reviews__nav reviews__nav--next"
            onClick={nextSlide}
            aria-label="Следующий слайд"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="reviews__dots">
          {Array.from({ length: Math.ceil(reviews.length / itemsPerView) }).map((_, index) => (
            <button
              key={index}
              className={`reviews__dot ${Math.floor(currentIndex / itemsPerView) === index ? 'reviews__dot--active' : ''}`}
              onClick={() => setCurrentIndex(index * itemsPerView)}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews

