import { useState, useEffect, useRef, useMemo } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import './Gallery.css'

interface GalleryImage {
  id: number
  src: string
  alt: string
  category: string
}

interface GalleryProps {
  images: GalleryImage[]
  title?: string
}

function Gallery({ images, title = 'Галерея' }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = ''
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'Escape') closeLightbox()
        if (e.key === 'ArrowRight') nextImage()
        if (e.key === 'ArrowLeft') prevImage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

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

  return (
    <>
      <section 
        ref={sectionRef}
        className={`gallery ${isVisible ? 'gallery--visible' : ''}`}
        id="gallery"
      >
        <div className="gallery__background">
          <div className="gallery__overlay-bg"></div>
          <div className="gallery__mesh"></div>
          <div className="gallery__particles">
            {particles.map((particle) => (
              <div 
                key={particle.id} 
                className="gallery__particle" 
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
          {title && (
            <div className="gallery__header">
              <h2 className="gallery__title">{title}</h2>
            </div>
          )}
          
          <div className="gallery__grid">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="gallery__item"
                onClick={() => openLightbox(index)}
              >
                <div className="gallery__image-wrapper">
                  {image.src.startsWith('/placeholder') ? (
                    <div className="gallery__placeholder">
                      <div className="gallery__placeholder-icon">📷</div>
                      <p>{image.alt}</p>
                    </div>
                  ) : (
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="gallery__image"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const placeholder = target.parentElement?.querySelector('.gallery__placeholder')
                        if (placeholder) {
                          (placeholder as HTMLElement).style.display = 'flex'
                        }
                      }}
                    />
                  )}
                  <div className="gallery__item-overlay">
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage !== null && (
        <div className="gallery-lightbox" onClick={closeLightbox}>
          <button
            className="gallery-lightbox__close"
            onClick={closeLightbox}
            aria-label="Закрыть"
          >
            <X size={32} />
          </button>
          <button
            className="gallery-lightbox__nav gallery-lightbox__nav--prev"
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            aria-label="Предыдущее"
          >
            <ChevronLeft size={32} />
          </button>
          <div className="gallery-lightbox__content" onClick={(e) => e.stopPropagation()}>
            {images[selectedImage].src.startsWith('/placeholder') ? (
              <div className="gallery-lightbox__placeholder">
                <div className="gallery-lightbox__placeholder-icon">📷</div>
                <p>{images[selectedImage].alt}</p>
              </div>
            ) : (
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="gallery-lightbox__image"
              />
            )}
            <div className="gallery-lightbox__info">
              <p className="gallery-lightbox__caption">{images[selectedImage].alt}</p>
              <p className="gallery-lightbox__counter">
                {selectedImage + 1} / {images.length}
              </p>
            </div>
          </div>
          <button
            className="gallery-lightbox__nav gallery-lightbox__nav--next"
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            aria-label="Следующее"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </>
  )
}

export default Gallery

