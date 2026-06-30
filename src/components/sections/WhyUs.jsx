import { motion } from 'framer-motion'
import {
  FaShieldAlt, FaHeadset, FaCertificate, FaGlobe, FaUmbrellaBeach, FaUsers
} from 'react-icons/fa'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { staggerContainer, fadeIn, scaleIn } from '../../animations/variants'

const reasons = [
  {
    icon: FaShieldAlt,
    title: 'Trusted & Secure',
    description: 'Your money, safety, and privacy are our top priorities. We\'re fully licensed and insured.',
    gradient: 'from-sky-500 to-ocean-500',
    glow: 'shadow-glow-blue',
  },
  {
    icon: FaHeadset,
    title: '24/7 Support',
    description: 'Our travel experts are always a call away, no matter where you are in the world.',
    gradient: 'from-emerald-500 to-sky-500',
    glow: 'shadow-glow-emerald',
  },
  {
    icon: FaCertificate,
    title: 'Award Winning',
    description: 'Recognized by India\'s top travel bodies for excellence in service and customer satisfaction.',
    gradient: 'from-amber-500 to-coral-500',
    glow: 'shadow-glow-orange',
  },
  {
    icon: FaGlobe,
    title: '85+ Destinations',
    description: 'From the Maldives to the Swiss Alps — we cover every corner of the globe.',
    gradient: 'from-ocean-500 to-emerald-500',
    glow: 'shadow-glow-blue',
  },
  {
    icon: FaUmbrellaBeach,
    title: 'Luxury Experience',
    description: 'Only premium hotels, hand-selected experiences, and bespoke itineraries.',
    gradient: 'from-coral-500 to-amber-500',
    glow: 'shadow-glow-orange',
  },
  {
    icon: FaUsers,
    title: '12,000+ Happy Clients',
    description: 'Over a decade of creating unforgettable memories for thousands of travelers.',
    gradient: 'from-sky-500 to-emerald-500',
    glow: 'shadow-glow-emerald',
  },
]

export default function WhyUs() {
  const { ref, controls } = useScrollAnimation()

  return (
    <section className="section-padding bg-white relative overflow-hidden" id="why-us">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 to-emerald-50/30" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-sky-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-emerald-100 rounded-full blur-3xl opacity-40" />

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
              <FaCertificate className="text-ocean-500" />
              Why Choose Us
            </span>
          </motion.div>
          <motion.h2 variants={fadeIn('up', 0.1)} className="font-heading font-bold text-4xl lg:text-5xl text-dark-900 mb-4">
            The Wanderlux <span className="gradient-text-ocean">Difference</span>
          </motion.h2>
          <motion.p variants={fadeIn('up', 0.2)} className="font-body text-gray-500 text-lg max-w-2xl mx-auto">
            We don't just plan trips — we craft extraordinary experiences that stay with you forever.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                variants={scaleIn(i * 0.08)}
                initial="hidden"
                animate={controls}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 15 } }}
                className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-500 relative overflow-hidden"
              >
                {/* Gradient bg on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 ${item.glow} transition-shadow duration-300 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white text-2xl" />
                </div>

                <h3 className="font-heading font-bold text-xl text-dark-900 mb-3 group-hover:text-ocean-500 transition-colors">
                  {item.title}
                </h3>
                <p className="font-body text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${item.gradient} opacity-5 rounded-bl-full`} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
