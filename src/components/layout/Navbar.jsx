import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiPhone, FiMail } from 'react-icons/fi'
import { FaCompass } from 'react-icons/fa'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/past-events', label: 'Past Events' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark-900/95 backdrop-blur-xl shadow-2xl py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 15 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center shadow-glow-blue"
              >
                <FaCompass className="text-white text-xl" />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-white tracking-wide whitespace-nowrap">
                  Wander<span className="text-amber-500">lux</span>
                </span>
                <p className="text-[10px] text-white/50 font-accent tracking-widest uppercase -mt-0.5 whitespace-nowrap">
                  Premium Travel
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `nav-link font-body font-medium text-sm tracking-wide transition-colors duration-300 ${
                      isActive ? 'text-sky-400 active' : 'text-white/80 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-accent transition-colors"
              >
                <FiPhone className="text-sky-400" />
                +91 98765 43210
              </a>
              <Link
                to="/contact"
                className="btn-primary text-sm px-6 py-3"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-dark-900/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col h-full justify-center items-center gap-8 p-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `font-heading font-semibold text-3xl transition-colors ${
                        isActive ? 'text-sky-400' : 'text-white/80 hover:text-white'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-4"
              >
                <Link to="/contact" className="btn-primary">
                  Book Your Trip
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="flex flex-col items-center gap-2 text-white/50 text-sm"
              >
                <span className="flex items-center gap-2">
                  <FiPhone className="text-sky-400" /> +91 98765 43210
                </span>
                <span className="flex items-center gap-2">
                  <FiMail className="text-sky-400" /> hello@wanderlux.in
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
