import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { stats } from '../../data/team'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { staggerContainer, fadeIn } from '../../animations/variants'

export default function Stats() {
  const { ref: sectionRef, controls } = useScrollAnimation()
  const [countRef, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section className="py-20 relative overflow-hidden" id="stats">
      {/* Gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-r from-ocean-500 via-ocean-600 to-dark-800" />
      {/* Animated mesh */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="section-container relative z-10">
        <motion.div
          ref={sectionRef}
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={controls}
          className="text-center mb-14"
        >
          <motion.h2 variants={fadeIn('up')} className="font-heading font-bold text-4xl lg:text-5xl text-white mb-4">
            Our Journey in <span className="text-amber-400">Numbers</span>
          </motion.h2>
          <motion.p variants={fadeIn('up', 0.1)} className="font-body text-white/70 text-lg max-w-xl mx-auto">
            15 years of making dreams come true — one journey at a time.
          </motion.p>
        </motion.div>

        <div ref={countRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeIn('up', i * 0.1)}
              initial="hidden"
              animate={controls}
              className="text-center group"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="text-4xl mb-4 inline-block"
              >
                {stat.icon}
              </motion.div>

              {/* Counter */}
              <div className="font-heading font-bold text-5xl lg:text-6xl text-white mb-2 counter-value">
                {inView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    delay={i * 0.2}
                    suffix={stat.suffix}
                    useEasing
                  />
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>
              <div className="font-accent text-white/60 text-sm uppercase tracking-wider">
                {stat.label}
              </div>

              {/* Underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: i * 0.15 + 0.5, duration: 0.6 }}
                className="h-0.5 w-16 mx-auto mt-3 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
