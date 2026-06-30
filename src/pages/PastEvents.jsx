import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition, fadeIn, staggerContainer, scaleIn } from '../animations/variants'
import { events } from '../data/events'
import { useState } from 'react'
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaTag, FaChevronDown } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

function EventCard({ event, index }) {
  const [expanded, setExpanded] = useState(false)
  const isLeft = index % 2 === 0

  return (
    <motion.div
      variants={fadeIn(isLeft ? 'right' : 'left', index * 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={`relative flex items-start gap-8 mb-16 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content card */}
      <div className={`flex-1 ${isLeft ? 'md:pr-10' : 'md:pl-10'}`}>
        <motion.div
          whileHover={{ y: -4 }}
          className="premium-card overflow-hidden rounded-3xl cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          {/* Image */}
          <div className="relative h-56 overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              src={event.image}
              alt={event.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
            {/* Category badge */}
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-accent font-semibold bg-sky-500/90 text-white">
              {event.category}
            </span>
            {/* Year */}
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-accent font-semibold bg-white/20 backdrop-blur-sm text-white">
              {event.year}
            </span>
          </div>

          <div className="p-6">
            <h3 className="font-heading font-bold text-xl text-dark-900 mb-3">{event.title}</h3>
            <div className="flex flex-wrap gap-3 mb-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-sky-500" />{event.location}</span>
              <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-emerald-500" />{event.date}</span>
              <span className="flex items-center gap-1.5"><FaUsers className="text-amber-500" />{event.participants} travelers</span>
            </div>
            <p className="font-body text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{event.description}</p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-2 mb-4">
              {event.highlights.map((h) => (
                <span key={h} className="px-2.5 py-1 rounded-full text-xs bg-sky-50 text-sky-600 font-accent font-medium flex items-center gap-1">
                  <FaTag className="text-[9px]" /> {h}
                </span>
              ))}
            </div>

            <button className="flex items-center gap-1.5 text-ocean-500 text-sm font-accent font-semibold hover:text-sky-500 transition-colors">
              {expanded ? 'Show Less' : 'See Photos & Details'}
              <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <FaChevronDown className="text-xs" />
              </motion.div>
            </button>

            {/* Expanded Photos */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 grid grid-cols-3 gap-3">
                    {event.photos.map((photo, pi) => (
                      <motion.div
                        key={pi}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: pi * 0.1 }}
                        className="rounded-xl overflow-hidden h-24"
                      >
                        <img src={photo} alt={`${event.title} photo ${pi + 1}`} loading="lazy" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mt-4">{event.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Timeline connector (desktop) */}
      <div className="hidden md:flex flex-col items-center">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 border-4 border-white shadow-glow-blue z-10" />
        <div className="w-0.5 h-full bg-gradient-to-b from-sky-500/50 to-transparent" />
      </div>

      {/* Spacer */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  )
}

export default function PastEvents() {
  const years = [...new Set(events.map((e) => e.year))].sort((a, b) => b - a)
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? events : events.filter((e) => String(e.year) === filter)

  return (
    <motion.div {...pageTransition}>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1400&q=80" alt="Past Events" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-dark-900/40 to-dark-900/80" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="font-heading font-bold text-5xl lg:text-7xl mb-4">Past Events</h1>
            <p className="font-body text-white/70 text-xl max-w-2xl mx-auto">
              Memories, milestones, and adventures we've shared with our travelers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="section-container flex items-center justify-center gap-3 flex-wrap">
          {['All', ...years.map(String)].map((y) => (
            <button
              key={y}
              onClick={() => setFilter(y)}
              className={`px-5 py-2 rounded-full text-sm font-accent font-semibold transition-all duration-300 ${
                filter === y
                  ? 'bg-gradient-to-r from-ocean-500 to-sky-500 text-white shadow-glow-blue'
                  : 'bg-gray-100 text-gray-500 hover:bg-sky-50 hover:text-sky-600'
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </section>

      {/* Events timeline */}
      <section className="section-padding bg-gradient-to-b from-sky-50 to-white">
        <div className="section-container">
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical line (desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-500/40 via-emerald-500/30 to-transparent -translate-x-1/2" />

            <AnimatePresence mode="wait">
              <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {filtered.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
