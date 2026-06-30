import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'
import { testimonials } from '../../data/testimonials'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { staggerContainer, fadeIn } from '../../animations/variants'

function TestimonialCard({ item }) {
  return (
    <div className="p-8 bg-white rounded-3xl shadow-card border border-gray-100 h-full flex flex-col">
      {/* Quote icon */}
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500/10 to-ocean-500/10 flex items-center justify-center mb-6">
        <FaQuoteLeft className="text-sky-500 text-xl" />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: item.rating }).map((_, i) => (
          <FaStar key={i} className="text-amber-400 text-sm" />
        ))}
      </div>

      {/* Tour badge */}
      <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-accent font-semibold mb-4 w-fit">
        {item.tour}
      </div>

      {/* Review */}
      <p className="font-body text-gray-600 text-sm leading-relaxed flex-1 mb-6 italic">
        "{item.text}"
      </p>

      {/* Reviewer */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        <img
          src={item.avatar}
          alt={item.name}
          loading="lazy"
          className="w-12 h-12 rounded-full object-cover ring-2 ring-sky-500/30"
        />
        <div>
          <h4 className="font-heading font-semibold text-dark-900 text-sm">{item.name}</h4>
          <p className="text-gray-400 text-xs">{item.location} · {item.date}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const { ref, controls } = useScrollAnimation()

  return (
    <section className="section-padding relative overflow-hidden" id="testimonials">
      {/* Dark gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-ocean-500/5 via-sky-50 to-emerald-50/50" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={controls}
          className="text-center mb-14"
        >
          <motion.div variants={fadeIn('up')} className="flex justify-center mb-4">
            <span className="section-badge">
              <FaStar className="text-ocean-500" />
              Client Stories
            </span>
          </motion.div>
          <motion.h2 variants={fadeIn('up', 0.1)} className="font-heading font-bold text-4xl lg:text-5xl text-dark-900 mb-4">
            What Our Travelers <span className="gradient-text-ocean">Say</span>
          </motion.h2>
          <motion.p variants={fadeIn('up', 0.2)} className="font-body text-gray-500 text-lg max-w-2xl mx-auto">
            Real experiences from real travelers. These stories are our greatest achievement.
          </motion.p>
        </motion.div>

        <motion.div variants={fadeIn('up', 0.3)} initial="hidden" animate={controls}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-14"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <TestimonialCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
