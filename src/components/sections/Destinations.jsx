import { memo } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { FaStar, FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { destinations } from '../../data/destinations'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { staggerContainer, fadeIn } from '../../animations/variants'

function DestinationCard({ dest }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="premium-card group cursor-pointer h-[420px] relative overflow-hidden rounded-3xl"
    >
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          src={dest.image}
          alt={dest.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="overlay-gradient" />
      </div>

      {/* Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 rounded-full text-xs font-accent font-semibold bg-white/20 backdrop-blur-sm text-white border border-white/30">
          {dest.badge}
        </span>
      </div>

      {/* Rating */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/90 backdrop-blur-sm">
        <FaStar className="text-white text-xs" />
        <span className="text-white text-xs font-semibold">{dest.rating}</span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <div className="flex items-center gap-2 text-white/70 text-xs mb-2">
          <FaMapMarkerAlt className="text-sky-400" />
          {dest.country}
        </div>
        <h3 className="font-heading font-bold text-2xl text-white mb-2">{dest.name}</h3>
        <p className="text-white/70 text-sm mb-3 line-clamp-2">{dest.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-white/60">
            <span className="flex items-center gap-1"><FaClock className="text-emerald-400" />{dest.duration}</span>
            <span className="flex items-center gap-1"><FaUsers className="text-sky-400" />{dest.reviews} reviews</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-white/60">From</span>
            <p className="font-heading font-bold text-lg text-amber-400">{dest.price}</p>
          </div>
        </div>

        {/* Hover CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <Link to="/contact" className="btn-primary text-sm py-2.5 w-full justify-center">
            Book Now <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Destinations() {
  const { ref, controls } = useScrollAnimation()

  return (
    <section className="section-padding bg-soft-gray relative overflow-hidden" id="destinations">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-sky-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />

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
              <FaMapMarkerAlt className="text-ocean-500" />
              Popular Destinations
            </span>
          </motion.div>
          <motion.h2 variants={fadeIn('up', 0.1)} className="font-heading font-bold text-4xl lg:text-5xl text-dark-900 mb-4">
            Where Would You Like to <span className="gradient-text-ocean">Explore?</span>
          </motion.h2>
          <motion.p variants={fadeIn('up', 0.2)} className="font-body text-gray-500 text-lg max-w-2xl mx-auto">
            From sun-kissed beaches to snow-capped mountains, discover our most-loved destinations handpicked by our travel experts.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          animate={controls}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-14"
          >
            {destinations.map((dest) => (
              <SwiperSlide key={dest.id}>
                <DestinationCard dest={dest} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div
          variants={fadeIn('up', 0.4)}
          initial="hidden"
          animate={controls}
          className="flex justify-center mt-4"
        >
          <Link to="/contact" className="btn-outline">
            View All Destinations <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
