import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero/Hero'
import ApproachMethodology from '../components/ApproachMethodology/ApproachMethodology'
import ChooseDirection from '../components/ChooseDirection/ChooseDirection'
import HowWeWork from '../components/HowWeWork/HowWeWork'
import Trust from '../components/Trust/Trust'
import TeamSection from '../components/TeamSection/TeamSection'
import Gallery from '../components/Gallery/Gallery'
import BookingForm from '../components/BookingForm/BookingForm'
import Footer from '../components/Footer/Footer'
import ModalForms from '../components/ModalForms/ModalForms'
import './HomePage.css'

function HomePage() {
  const [modalType, setModalType] = useState<'booking' | 'presentation' | 'consultation' | 'excursion' | null>(null)

  // Изображения галереи
  const galleryImages = [
    { id: 1, src: '/1.png', alt: 'Зал для занятий', category: 'Пространство' },
    { id: 2, src: '/2.png', alt: 'Дети на занятии', category: 'Занятия' },
    { id: 3, src: '/3.png', alt: 'Творческая мастерская', category: 'Творчество' },
    { id: 4, src: '/4.png', alt: 'Игровая зона', category: 'Пространство' },
    { id: 5, src: '/5.png', alt: 'Групповое занятие', category: 'Занятия' },
    { id: 6, src: '/6.png', alt: 'Рабочее место', category: 'Пространство' },
    { id: 24, src: '/24.jpg', alt: 'Фото 24', category: 'Галерея' },
    { id: 25, src: '/25.jpg', alt: 'Фото 25', category: 'Галерея' },
    { id: 26, src: '/26.jpg', alt: 'Фото 26', category: 'Галерея' },
    { id: 27, src: '/27.jpg', alt: 'Фото 27', category: 'Галерея' },
    { id: 28, src: '/28.jpg', alt: 'Фото 28', category: 'Галерея' },
    { id: 29, src: '/29.jpg', alt: 'Фото 29', category: 'Галерея' }
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "СФЕРА",
    "description": "Центр дополнительного образования для детей 3-17 лет. Развитие личности через движение, творчество и интеллект.",
    "url": "https://sfera-deti.ru",
    "logo": "https://sfera-deti.ru/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Воронеж",
      "addressCountry": "RU"
    },
    "telephone": "+79809650985",
    "email": "info@sfera.ru",
    "sameAs": [],
    "offers": {
      "@type": "Offer",
      "description": "Бесплатное пробное занятие"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Дети 3-17 лет"
    }
  }

  return (
    <div className="home-page">
      <Helmet>
        <title>СФЕРА — пространство развития детей | Центр дополнительного образования</title>
        <meta name="description" content="Центр дополнительного образования для детей 3-17 лет. Развитие личности через движение, творчество и интеллект. Бесплатное пробное занятие. Опытные педагоги-психологи. Малочисленные группы." />
        <meta name="keywords" content="детский центр, дополнительное образование, развитие детей, детские кружки, занятия для детей, развитие личности, детский центр Воронеж, СФЕРА, движение, творчество, интеллект, детские программы, педагоги-психологи, малочисленные группы" />
        <meta property="og:title" content="СФЕРА — пространство развития детей" />
        <meta property="og:description" content="Центр дополнительного образования для детей 3-17 лет. Развитие личности через движение, творчество и интеллект. Бесплатное пробное занятие." />
        <meta property="og:url" content="https://sfera-deti.ru/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://sfera-deti.ru/logo.png" />
        <link rel="canonical" href="https://sfera-deti.ru/" />
      </Helmet>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Hero />
      <div id="approach">
        <ApproachMethodology />
      </div>
      <div id="booking-form">
        <BookingForm />
      </div>
      <div id="directions">
        <ChooseDirection />
      </div>
      {/* <div id="branches">
        <Branches />
      </div> */}
      <div id="how-we-work">
        <HowWeWork />
      </div>
      <div id="trust">
        <Trust />
      </div>
      <div id="team">
        <TeamSection />
      </div>
      {/* <div id="reviews">
        <Reviews />
      </div> */}
      <div id="gallery">
        <Gallery images={galleryImages} title="Галерея" />
      </div>
      <Footer />

      {modalType && (
        <ModalForms
          type={modalType}
          onClose={() => setModalType(null)}
        />
      )}
    </div>
  )
}

export default HomePage

