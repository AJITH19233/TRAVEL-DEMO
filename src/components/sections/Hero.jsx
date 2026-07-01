import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowDown, FiPlay } from 'react-icons/fi'
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa'
import gsap from 'gsap'

const typingWords = ['Adventures', 'Memories', 'Experiences', 'Journeys', 'Dreams']

const floatingCards = [
  { flag: '🇬🇷', name: 'Santorini', tag: 'Most Popular', rating: '4.9', color: 'from-sky-500/80 to-ocean-500/80', top: '22%', left: '3%', delay: 0 },
  { flag: '🇮🇩', name: 'Bali', tag: 'Trending Now', rating: '4.8', color: 'from-emerald-500/80 to-sky-500/80', top: '58%', left: '2%', delay: 0.5 },
  { flag: '🇯🇵', name: 'Japan', tag: "Editor's Pick", rating: '4.9', color: 'from-coral-500/80 to-amber-500/80', top: '22%', right: '2%', delay: 0.3 },
]

const heroStats = [
  { value: '12K+', label: 'Happy Travelers' },
  { value: '85+', label: 'Destinations' },
  { value: '15+', label: 'Years Exp.' },
  { value: '98%', label: 'Satisfaction' },
]

export default function Hero() {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const headingRef = useRef(null)
  const [wordIndex, setWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const { scrollYProgress } = useScroll({ target: heroRef })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  // Typing effect
  useEffect(() => {
    const currentWord = typingWords[wordIndex]
    let timeout

    if (!isDeleting && displayText === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setWordIndex((i) => (i + 1) % typingWords.length)
    } else {
      const speed = isDeleting ? 55 : 95
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentWord.slice(0, displayText.length - 1)
            : currentWord.slice(0, displayText.length + 1)
        )
      }, speed)
    }
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, wordIndex])

  // GSAP heading animation
  useEffect(() => {
    if (headingRef.current) {
      gsap.from(headingRef.current.querySelectorAll('.gsap-line'), {
        opacity: 0,
        y: 70,
        duration: 1,
        stagger: 0.18,
        ease: 'power3.out',
        delay: 0.6,
      })
    }
  }, [])

  // Force video play on mount (browsers sometimes block until interaction)
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    vid.muted = true
    vid.defaultMuted = true
    
    const playVideo = () => {
      vid.play().catch((err) => {
        console.warn('Autoplay prevented:', err)
      })
    }
    if (vid.readyState >= 2) {
      playVideo()
    } else {
      vid.addEventListener('canplay', playVideo, { once: true })
    }
    return () => vid.removeEventListener('canplay', playVideo)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden bg-dark-900"
      id="hero"
    >
      {/* ── Video layer (parallax wrapper) ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        {/* Actual video — NO sibling div covering it */}
        <video
          ref={videoRef}
          src="/ASSETS1.mp4?v=2"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Dark overlay ON TOP of video for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/55 via-dark-900/35 to-dark-900/85 z-10" />

        {/* Subtle animated glows (behind text, on top of video) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: '2s' }}
          />
        </div>
      </motion.div>

      {/* ── Floating destination cards ── */}
      {floatingCards.map((card, i) => (
        <motion.div
          key={card.name}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.6 + card.delay, type: 'spring', stiffness: 100 }}
          style={{ top: card.top, left: card.left, right: card.right }}
          className="absolute z-20 hidden lg:block"
        >
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{
              duration: 3.5 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.6,
            }}
            className={`rounded-2xl px-4 py-3 bg-gradient-to-br ${card.color} backdrop-blur-md border border-white/30 shadow-glass min-w-[150px]`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{card.flag}</span>
              <span className="text-white font-heading font-semibold text-sm">{card.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/75 text-xs">{card.tag}</span>
              <span className="flex items-center gap-1 text-amber-300 text-xs font-semibold">
                <FaStar className="text-[10px]" /> {card.rating}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* ── Main content ── */}
      <motion.div
        className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto w-full pt-24 md:pt-0"
        style={{ opacity }}
      >
        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-accent mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Premium Travel Experiences Since 2009
        </motion.div>

        {/* Heading with GSAP stagger */}
        <div ref={headingRef} className="overflow-hidden mb-8">
          <h1 className="gsap-line font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] mb-1">
            Discover
          </h1>
          <h1 className="gsap-line font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] mb-1">
            Extraordinary
          </h1>
          <h1 className="gsap-line font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-amber-400 to-emerald-400 min-h-[1.1em]">
            <span>{displayText}</span>
            <span className="typing-cursor" />
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="font-body text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Crafting bespoke journeys to 85+ destinations worldwide. Where luxury meets
          adventure and every moment becomes a masterpiece.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Link to="/contact" className="btn-primary text-base px-10 py-4 shadow-glow-blue">
            Plan My Journey
          </Link>
          <button className="btn-secondary text-base px-10 py-4 flex items-center gap-2">
            <FiPlay className="text-sm" />
            Watch Our Story
          </button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-2xl mx-auto"
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading font-bold text-2xl sm:text-3xl text-white mb-1">
                {stat.value}
              </div>
              <div className="font-accent text-xs text-white/55 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-accent tracking-widest uppercase text-white/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiArrowDown className="text-xl text-sky-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
