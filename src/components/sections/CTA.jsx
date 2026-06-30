import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { FaPlane } from 'react-icons/fa'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { staggerContainer, fadeIn } from '../../animations/variants'

export default function CTA() {
  const { ref, controls } = useScrollAnimation()

  return (
    <section className="py-20 relative overflow-hidden" id="cta">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
          alt="Travel CTA"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-500/90 via-dark-900/80 to-ocean-700/90" />
      </div>

      {/* Animated particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          className="absolute w-2 h-2 rounded-full bg-white/20"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
        />
      ))}

      <div className="section-container relative z-10 text-center">
        <motion.div
          ref={ref}
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={controls}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeIn('up')} className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
            >
              <FaPlane className="text-white text-3xl" />
            </motion.div>
          </motion.div>

          <motion.h2 variants={fadeIn('up', 0.1)} className="font-heading font-bold text-4xl lg:text-5xl xl:text-6xl text-white mb-6 leading-tight">
            Ready for Your <span className="text-amber-400">Dream</span> Vacation?
          </motion.h2>
          <motion.p variants={fadeIn('up', 0.2)} className="font-body text-white/80 text-xl mb-10 leading-relaxed">
            Let us plan a bespoke journey tailored just for you. Fill out our enquiry form and our travel experts will reach out within 24 hours.
          </motion.p>
          <motion.div variants={fadeIn('up', 0.3)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary text-lg px-12 py-5 shadow-glow-blue">
              Plan My Journey <FiArrowRight />
            </Link>
            <a href="tel:+919876543210" className="btn-secondary text-lg px-12 py-5">
              Call Us Now
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={fadeIn('up', 0.4)} className="flex items-center justify-center gap-6 mt-12 flex-wrap">
            {['✓ No Hidden Fees', '✓ Free Cancellation', '✓ 24/7 Support', '✓ Best Price Guarantee'].map((badge) => (
              <span key={badge} className="text-white/70 text-sm font-accent">
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
