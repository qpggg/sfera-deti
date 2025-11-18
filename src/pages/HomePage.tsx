import { useState } from 'react'
import Hero from '../components/Hero/Hero'
import ApproachMethodology from '../components/ApproachMethodology/ApproachMethodology'
import ChooseDirection from '../components/ChooseDirection/ChooseDirection'
import Branches from '../components/Branches/Branches'
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
    { id: 6, src: '/6.png', alt: 'Рабочее место', category: 'Пространство' }
  ]

  return (
    <div className="home-page">
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
      <div id="branches">
        <Branches />
      </div>
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

