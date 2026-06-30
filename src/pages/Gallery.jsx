import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition, scaleIn, staggerContainer, fadeIn } from '../animations/variants'
import { galleryImages, galleryCategories } from '../data/gallery'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { FaMapMarkerAlt, FaExpand } from 'react-icons/fa'

export default function Gallery() {
  const [category, setCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const filtered = category === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === category)

  const slides = filtered.map((img) => ({ src: img.src, alt: img.alt }))

  const openLightbox = useCallback((index) => setLightboxIndex(index), [])

  return (
    <motion.div {...pageTransition}>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&q=80" alt="Gallery hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-dark-900/40 to-dark-900/80" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="font-heading font-bold text-5xl lg:text-7xl mb-4">Gallery</h1>
            <p className="font-body text-white/70 text-xl max-w-2xl mx-auto">
              A visual journey through the world's most breathtaking destinations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-10 bg-white border-b border-gray-100 sticky top-[72px] z-40 shadow-sm">
        <div className="section-container flex items-center justify-center gap-3 flex-wrap">
          {galleryCategories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-accent font-semibold transition-all duration-300 ${
                category === cat
                  ? 'bg-gradient-to-r from-ocean-500 to-sky-500 text-white shadow-glow-blue'
                  : 'bg-gray-100 text-gray-500 hover:bg-sky-50 hover:text-sky-600'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Masonry gallery */}
      <section className="section-padding bg-soft-gray">
        <div className="section-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="masonry-grid"
            >
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  variants={scaleIn(i * 0.04)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                  className="masonry-item"
                >
                  <div
                    className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-500"
                    onClick={() => openLightbox(i)}
                  >
                    <img
                      src={img.thumb}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4">
                      <div className="flex items-center gap-2 text-white text-xs font-accent mb-1">
                        <FaMapMarkerAlt className="text-sky-400" />
                        {img.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-xs">{img.category}</span>
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                          <FaExpand className="text-xs" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        slides={slides}
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        styles={{
          container: { backgroundColor: 'rgba(13, 27, 42, 0.98)' },
        }}
      />
    </motion.div>
  )
}
