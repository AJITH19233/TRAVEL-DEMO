import { motion } from 'framer-motion'
import { pageTransition, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from '../animations/variants'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { team, achievements, timeline } from '../data/team'
import { stats } from '../data/team'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { FaLinkedinIn, FaInstagram, FaTwitter, FaTrophy, FaHeart, FaGlobe, FaLeaf } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function PageHero({ title, subtitle, bg }) {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={bg} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-900/50 to-dark-900/80" />
      </div>
      <div className="relative z-10 text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-heading font-bold text-5xl lg:text-7xl mb-4">{title}</h1>
          <p className="font-body text-white/70 text-xl max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>
      </div>
    </section>
  )
}

export default function About() {
  const { ref: missionRef, controls: missionControls } = useScrollAnimation()
  const { ref: teamRef, controls: teamControls } = useScrollAnimation()
  const { ref: timelineRef, controls: timelineControls } = useScrollAnimation()
  const { ref: achieveRef, controls: achieveControls } = useScrollAnimation()
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <motion.div {...pageTransition}>
      <PageHero
        title="About Wanderlux"
        subtitle="15 years of passion, expertise, and unforgettable journeys."
        bg="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&q=80"
      />

      {/* Intro section */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              ref={missionRef}
              variants={slideInLeft()}
              initial="hidden"
              animate={missionControls}
            >
              <span className="section-badge mb-6 inline-flex">
                <FaHeart className="text-ocean-500" /> Our Story
              </span>
              <h2 className="font-heading font-bold text-4xl lg:text-5xl text-dark-900 mb-6 leading-tight">
                We Believe Travel Changes <span className="gradient-text-ocean">Everything</span>
              </h2>
              <p className="font-body text-gray-500 text-lg leading-relaxed mb-4">
                Founded in 2009 in Mumbai, Wanderlux started with a simple dream — to make extraordinary travel accessible. What began with 3 passionate travel lovers has grown into India's most trusted premium travel company.
              </p>
              <p className="font-body text-gray-500 leading-relaxed mb-8">
                We believe that travel isn't just about visiting places — it's about transforming perspectives, building connections, and creating memories that last a lifetime. Every journey we craft is a labor of love.
              </p>
              <Link to="/contact" className="btn-primary">
                Start Your Journey <FiArrowRight />
              </Link>
            </motion.div>
            <motion.div
              variants={slideInRight()}
              initial="hidden"
              animate={missionControls}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" alt="Beach" className="rounded-3xl h-56 w-full object-cover shadow-card" />
                <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80" alt="Hotel" className="rounded-3xl h-56 w-full object-cover shadow-card mt-10" />
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" alt="Mountains" className="rounded-3xl h-56 w-full object-cover shadow-card -mt-10" />
                <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80" alt="Temple" className="rounded-3xl h-56 w-full object-cover shadow-card" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-4 flex items-center gap-3 border border-sky-200">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-ocean-500 flex items-center justify-center text-white font-bold text-xl">15</div>
                <div>
                  <div className="font-heading font-bold text-dark-900 text-sm">Years of</div>
                  <div className="text-ocean-500 text-xs font-accent font-semibold">Excellence</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding bg-gradient-to-br from-sky-50 to-emerald-50">
        <div className="section-container">
          <div className="text-center mb-14">
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-dark-900 mb-4">
              Our <span className="gradient-text-ocean">Core Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FaHeart, label: 'Mission', color: 'from-coral-500 to-amber-500', text: 'To craft exceptional travel experiences that transform lives, inspire curiosity, and create lasting bonds between travelers and the world.' },
              { icon: FaGlobe, label: 'Vision', color: 'from-sky-500 to-ocean-500', text: 'To become South Asia\'s most trusted luxury travel brand by 2030, redefining premium travel for the modern Indian traveler.' },
              { icon: FaLeaf, label: 'Values', color: 'from-emerald-500 to-sky-500', text: 'Integrity, excellence, sustainability, and heartfelt hospitality — these aren\'t just words. They guide every decision we make.' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.label}
                  variants={scaleIn(i * 0.1)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className="p-8 bg-white rounded-3xl shadow-card text-center group hover:shadow-card-hover hover:-translate-y-2 transition-all duration-500"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="text-white text-2xl" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-dark-900 mb-4">{item.label}</h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-ocean-500 to-dark-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div ref={statsRef} className="section-container grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading font-bold text-5xl text-white mb-2">
                {statsInView ? <CountUp start={0} end={stat.value} duration={2.5} delay={i * 0.2} suffix={stat.suffix} /> : `0${stat.suffix}`}
              </div>
              <div className="text-white/60 text-sm font-accent uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <motion.div
            ref={teamRef}
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate={teamControls}
            className="text-center mb-14"
          >
            <motion.div variants={fadeIn('up')} className="flex justify-center mb-4">
              <span className="section-badge"><FaHeart className="text-ocean-500" /> Our Team</span>
            </motion.div>
            <motion.h2 variants={fadeIn('up', 0.1)} className="font-heading font-bold text-4xl lg:text-5xl text-dark-900 mb-4">
              Meet the <span className="gradient-text-ocean">Experts</span>
            </motion.h2>
            <motion.p variants={fadeIn('up', 0.2)} className="font-body text-gray-500 text-lg max-w-2xl mx-auto">
              Our team of passionate travel enthusiasts is dedicated to making every journey extraordinary.
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.id}
                variants={scaleIn(i * 0.1)}
                initial="hidden"
                animate={teamControls}
                whileHover={{ y: -8 }}
                className="group text-center"
              >
                <div className="relative mb-5 inline-block">
                  <div className="w-40 h-40 rounded-3xl overflow-hidden mx-auto shadow-card group-hover:shadow-card-hover transition-shadow">
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Social overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-ocean-500/80 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[FaLinkedinIn, FaInstagram, FaTwitter].map((Icon, j) => (
                      <a key={j} href={Object.values(member.social)[j]} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-ocean-500 transition-all text-sm">
                        <Icon />
                      </a>
                    ))}
                  </div>
                </div>
                <h3 className="font-heading font-bold text-lg text-dark-900 mb-1">{member.name}</h3>
                <p className="text-sky-500 font-accent text-sm font-semibold mb-2">{member.role}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gradient-to-br from-sky-50 to-white relative overflow-hidden">
        <div className="section-container">
          <motion.div
            ref={timelineRef}
            initial="hidden"
            animate={timelineControls}
            variants={staggerContainer(0.1)}
            className="text-center mb-14"
          >
            <motion.h2 variants={fadeIn('up')} className="font-heading font-bold text-4xl lg:text-5xl text-dark-900 mb-4">
              Our <span className="gradient-text-ocean">Journey</span>
            </motion.h2>
            <motion.p variants={fadeIn('up', 0.1)} className="font-body text-gray-500 text-lg max-w-xl mx-auto">
              From a small dream in Mumbai to one of India's leading travel companies.
            </motion.p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="timeline-line hidden md:block" />
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                variants={fadeIn(i % 2 === 0 ? 'right' : 'left', i * 0.1)}
                initial="hidden"
                animate={timelineControls}
                className={`relative flex md:items-center gap-8 mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 hover:shadow-card-hover transition-shadow">
                    <span className="text-sky-500 font-heading font-bold text-2xl">{item.year}</span>
                    <h3 className="font-heading font-bold text-lg text-dark-900 mt-1 mb-2">{item.title}</h3>
                    <p className="font-body text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
                {/* Center dot */}
                <div className="hidden md:flex w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 items-center justify-center shrink-0 z-10 shadow-glow-blue">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <motion.div
            ref={achieveRef}
            initial="hidden"
            animate={achieveControls}
            variants={staggerContainer(0.1)}
            className="text-center mb-14"
          >
            <motion.div variants={fadeIn('up')} className="flex justify-center mb-4">
              <span className="section-badge"><FaTrophy className="text-ocean-500" /> Awards</span>
            </motion.div>
            <motion.h2 variants={fadeIn('up', 0.1)} className="font-heading font-bold text-4xl lg:text-5xl text-dark-900 mb-4">
              Our <span className="gradient-text-sunset">Achievements</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {achievements.map((a, i) => (
              <motion.div
                key={a.title}
                variants={scaleIn(i * 0.08)}
                initial="hidden"
                animate={achieveControls}
                whileHover={{ y: -4 }}
                className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-amber-100 shadow-card hover:shadow-card-hover transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-coral-500 flex items-center justify-center shrink-0 shadow-glow-orange group-hover:scale-110 transition-transform">
                  <FaTrophy className="text-white text-xl" />
                </div>
                <div>
                  <span className="text-xs font-accent font-semibold text-amber-500 uppercase tracking-wider">{a.year}</span>
                  <h3 className="font-heading font-bold text-dark-900 text-sm mt-0.5 mb-1">{a.title}</h3>
                  <p className="text-gray-400 text-xs">{a.org}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
