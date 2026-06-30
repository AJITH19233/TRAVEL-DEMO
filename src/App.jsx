import { Suspense, lazy, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/effects/LoadingScreen'
import ScrollProgress from './components/effects/ScrollProgress'
import BackToTop from './components/effects/BackToTop'
import CustomCursor from './components/effects/CustomCursor'

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const PastEvents = lazy(() => import('./pages/PastEvents'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Contact = lazy(() => import('./pages/Contact'))

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-12 h-12 rounded-full border-2 border-sky-500/30 border-t-sky-500 animate-spin"
          style={{ willChange: 'transform' }}
        />
        <p className="font-accent text-gray-400 text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Suspense fallback={<PageFallback />}><Home /></Suspense>} />
          <Route path="/about" element={<Suspense fallback={<PageFallback />}><About /></Suspense>} />
          <Route path="/past-events" element={<Suspense fallback={<PageFallback />}><PastEvents /></Suspense>} />
          <Route path="/gallery" element={<Suspense fallback={<PageFallback />}><Gallery /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<PageFallback />}><Contact /></Suspense>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const isDesktop = typeof window !== 'undefined' && !window.matchMedia('(pointer: coarse)').matches

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
      ) : (
        <Router key="app">
          {isDesktop && <CustomCursor />}
          <ScrollProgress />
          <Navbar />
          <main>
            <AnimatedRoutes />
          </main>
          <Footer />
          <BackToTop />
        </Router>
      )}
    </AnimatePresence>
  )
}
