import { motion } from 'framer-motion'
import { FaPlane, FaHotel, FaPassport, FaMap, FaCameraRetro, FaUmbrellaBeach } from 'react-icons/fa'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { staggerContainer, fadeIn, scaleIn } from '../../animations/variants'

const services = [
  {
    icon: FaPlane,
    title: 'Flight Booking',
    description: 'Best deals on international and domestic flights with flexible rescheduling options.',
    color: 'from-sky-400 to-ocean-500',
    bg: 'bg-sky-50',
  },
  {
    icon: FaHotel,
    title: 'Hotel Reservations',
    description: 'Handpicked 4 and 5-star hotels with exclusive member benefits and upgrades.',
    color: 'from-emerald-400 to-sky-500',
    bg: 'bg-emerald-50',
  },
  {
    icon: FaPassport,
    title: 'Visa Assistance',
    description: 'Hassle-free visa application support for 50+ countries with documentation guidance.',
    color: 'from-amber-400 to-coral-500',
    bg: 'bg-amber-50',
  },
  {
    icon: FaMap,
    title: 'Custom Itineraries',
    description: 'Tailor-made travel plans crafted around your preferences, budget, and travel style.',
    color: 'from-coral-400 to-amber-500',
    bg: 'bg-red-50',
  },
  {
    icon: FaCameraRetro,
    title: 'Guided Tours',
    description: 'Expert local guides providing immersive cultural and historical experiences.',
    color: 'from-ocean-400 to-emerald-500',
    bg: 'bg-blue-50',
  },
  {
    icon: FaUmbrellaBeach,
    title: 'Honeymoon Packages',
    description: 'Romantic escapes with surprise elements, private dinners, and luxury accommodations.',
    color: 'from-pink-400 to-coral-500',
    bg: 'bg-pink-50',
  },
]

export default function Services() {
  const { ref, controls } = useScrollAnimation()

  return (
    <section className="section-padding bg-soft-gray relative overflow-hidden" id="services">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-soft-gray" />

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
              <FaPlane className="text-ocean-500" />
              Our Services
            </span>
          </motion.div>
          <motion.h2 variants={fadeIn('up', 0.1)} className="font-heading font-bold text-4xl lg:text-5xl text-dark-900 mb-4">
            Everything You Need for a <span className="gradient-text-ocean">Perfect Trip</span>
          </motion.h2>
          <motion.p variants={fadeIn('up', 0.2)} className="font-body text-gray-500 text-lg max-w-2xl mx-auto">
            From flight booking to personalized itineraries — we handle every detail so you can focus on the experience.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                variants={scaleIn(i * 0.07)}
                initial="hidden"
                animate={controls}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-500 relative overflow-hidden"
              >
                {/* Corner decoration */}
                <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${service.color} opacity-10 group-hover:opacity-20 group-hover:scale-150 transition-all duration-700`} />

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${service.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-md`}>
                    <Icon className="text-white text-lg" />
                  </div>
                </div>

                <h3 className="font-heading font-bold text-lg text-dark-900 mb-3 group-hover:text-ocean-500 transition-colors">
                  {service.title}
                </h3>
                <p className="font-body text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
