import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import LoadingScreen from './components/LoadingScreen'
import DanWelcome from './components/DanWelcome'
import GuidedTour from './components/GuidedTour'
import PageTransition from './components/PageTransition'

import Home from './pages/Home'
import Services from './pages/Services'
import PricingPage from './pages/Pricing'
import CaseStudyPage from './pages/CaseStudy'
import WhyUsPage from './pages/WhyUs'
import BookPage from './pages/Book'
import Admin from './pages/Admin'

function AnimatedRoutes({ onStartTour }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home onStartTour={onStartTour} /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><PricingPage /></PageTransition>} />
        <Route path="/case-study" element={<PageTransition><CaseStudyPage /></PageTransition>} />
        <Route path="/why-us" element={<PageTransition><WhyUsPage /></PageTransition>} />
        <Route path="/book" element={<PageTransition><BookPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

function Shell() {
  const isFirst = !sessionStorage.getItem('mpm_visited')
  const [showLoader, setShowLoader] = useState(isFirst)
  const [showWelcome, setShowWelcome] = useState(false)
  const [tourActive, setTourActive] = useState(false)

  const handleLoaderDone = useCallback(() => {
    sessionStorage.setItem('mpm_visited', '1')
    setShowLoader(false)
    setShowWelcome(true)
  }, [])

  const handleWelcomeDone = useCallback(() => {
    setShowWelcome(false)
  }, [])

  const siteReady = !showLoader && !showWelcome

  return (
    <div style={{ background: 'var(--black-rich)', minHeight: '100vh' }}>
      <AnimatePresence>
        {showLoader && <LoadingScreen key="loader" onComplete={handleLoaderDone} />}
      </AnimatePresence>

      <AnimatePresence>
        {showWelcome && <DanWelcome key="welcome" onComplete={handleWelcomeDone} />}
      </AnimatePresence>

      <AnimatePresence>
        {siteReady && (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar onStartTour={() => setTourActive(true)} />
            <main>
              <AnimatedRoutes onStartTour={() => setTourActive(true)} />
            </main>
            <Footer />
            <BackToTop />
            <GuidedTour active={tourActive} onClose={() => setTourActive(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<Shell />} />
      </Routes>
    </BrowserRouter>
  )
}
