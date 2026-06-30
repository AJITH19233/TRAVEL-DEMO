import { motion } from 'framer-motion'
import { FaStar, FaClock, FaUsers, FaTag, FaCheck, FaFire } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { packages } from '../../data/packages'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { staggerContainer, fadeIn } from '../../animations/variants'

function PackageCard({ pkg, featured }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className={`premium-card relative overflow-hidden rounded-3xl ${featured ? 'ring-2 ring-sky-500/50' : ''}`}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6 }}
          src={pkg.image}
          alt={pkg.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 to-transparent" />
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
          {pkg.featured && (
            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500 text-white">
              <FaFire className="text-amber-300" /> Featured
            </span>
          )}
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-coral-500/90 text-white">
            {pkg.discount}
          </span>
        </div>
        {/* Rating */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm">
          <FaStar className="text-amber-400 text-xs" />
          <span className="text-white text-xs font-semibold">{pkg.rating}</span>
          <span className="text-white/60 text-xs">({pkg.reviews})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
          <span className="px-2 py-0.5 rounded-full bg-sky-50 text-sky-600 font-accent font-semibold">{pkg.category}</span>
          <span className="flex items-center gap-1"><FaClock className="text-emerald-500" />{pkg.duration}</span>
          <span className="flex items-center gap-1"><FaUsers className="text-sky-500" />{pkg.groupSize}</span>
        </div>

        <h3 className="font-heading font-bold text-xl text-dark-900 mb-2 hover:text-ocean-500 transition-colors">
          {pkg.title}
        </h3>

        {/* Destinations */}
        <p className="text-xs text-gray-400 mb-4">
          📍 {pkg.destinations.join(' → ')}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-5">
          {pkg.highlights.slice(0, 3).map((h) => (
            <span key={h} className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 rounded-full px-3 py-1">
              <FaCheck className="text-emerald-500 text-[10px]" />{h}
            </span>
          ))}
          {pkg.highlights.length > 3 && (
            <span className="text-xs text-sky-500 font-semibold bg-sky-50 rounded-full px-3 py-1">
              +{pkg.highlights.length - 3} more
            </span>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-bold text-2xl text-dark-900">{pkg.price}</span>
              <span className="text-sm text-gray-400 line-through">{pkg.originalPrice}</span>
            </div>
            <span className="text-xs text-gray-400">Per person</span>
          </div>
          <Link
            to="/contact"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-ocean-500 to-sky-500 text-white rounded-xl text-sm font-semibold hover:shadow-glow-blue hover:scale-105 transition-all duration-300"
          >
            Book <FiArrowRight />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function Packages() {
  const { ref, controls } = useScrollAnimation()
  const featured = packages.filter((p) => p.featured)
  const others = packages.filter((p) => !p.featured)

  return (
    <section className="section-padding bg-white relative overflow-hidden" id="packages">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-emerald-500 to-amber-500" />

      <div className="section-container">
        <motion.div
          ref={ref}
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={controls}
          className="text-center mb-14"
        >
          <motion.div variants={fadeIn('up')} className="flex justify-center mb-4">
            <span className="section-badge">
              <FaTag className="text-ocean-500" />
              Featured Packages
            </span>
          </motion.div>
          <motion.h2 variants={fadeIn('up', 0.1)} className="font-heading font-bold text-4xl lg:text-5xl text-dark-900 mb-4">
            Curated Tour <span className="gradient-text-ocean">Packages</span>
          </motion.h2>
          <motion.p variants={fadeIn('up', 0.2)} className="font-body text-gray-500 text-lg max-w-2xl mx-auto">
            Every package is carefully crafted to balance adventure, culture, comfort, and exceptional value.
          </motion.p>
        </motion.div>

        {/* Featured packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {featured.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              variants={fadeIn('up', i * 0.1)}
              initial="hidden"
              animate={controls}
            >
              <PackageCard pkg={pkg} featured />
            </motion.div>
          ))}
        </div>

        {/* Other packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {others.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              variants={fadeIn('up', (featured.length + i) * 0.1)}
              initial="hidden"
              animate={controls}
            >
              <PackageCard pkg={pkg} />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link to="/contact" className="btn-golden">
            Enquire for Custom Package <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}
