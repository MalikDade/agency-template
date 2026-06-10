<<<<<<< HEAD
import Hero from '../components/Hero'

export default function Home({ onStartTour }) {
  return <Hero onStartTour={onStartTour} />
=======
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import WhatWeBuild from '../components/WhatWeBuild'
import Pricing from '../components/Pricing'
import Maintenance from '../components/Maintenance'
import CaseStudy from '../components/CaseStudy'
import WhyMPM from '../components/WhyMPM'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  useEffect(() => {
    const classes = ['reveal', 'reveal-left', 'reveal-right']
    const selectors = classes.map(c => `.${c}`).join(',')
    const els = document.querySelectorAll(selectors)

    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ background: 'var(--black-rich)', minHeight: '100vh' }}>
      <Navbar />
      <main>
        <Hero />
        <WhatWeBuild />
        <Pricing />
        <Maintenance />
        <CaseStudy />
        <WhyMPM />
        <Contact />
      </main>
      <Footer />
    </div>
  )
>>>>>>> b89e58092111efe5732fce104d159b80ed7436d0
}
