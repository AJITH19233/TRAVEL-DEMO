import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition, fadeIn, staggerContainer, scaleIn } from '../animations/variants'
import EnquiryForm from '../components/forms/EnquiryForm'
import {
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock,
  FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp,
  FaYoutube, FaChevronDown
} from 'react-icons/fa'

const faqs = [
  { q: 'How far in advance should I book?', a: 'We recommend booking 4–8 weeks in advance for domestic tours and 3–6 months for international packages to get the best rates and availability.' },
  { q: 'Do you offer customized packages?', a: 'Absolutely! Every itinerary we create can be tailored to your preferences, budget, group size, and travel style. Just fill our enquiry form.' },
  { q: 'What is your cancellation policy?', a: 'We offer free cancellation up to 30 days before departure. Between 15–30 days, a 25% cancellation fee applies. Within 14 days, 50% of the package cost is retained.' },
  { q: 'Is travel insurance included?', a: 'Travel insurance is available as an add-on for all our packages at competitive rates. We highly recommend it for international travel.' },
  { q: 'Do you provide visa assistance?', a: 'Yes! Our visa assistance team handles documentation, application submission, and follow-up for 50+ countries.' },
  { q: 'What payment methods do you accept?', a: 'We accept credit/debit cards, bank transfers, UPI, EMI options, and secure online payments. Installment plans are available for packages above ₹50,000.' },
]

const businessHours = [
  { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM' },
  { day: 'Saturday', time: '10:00 AM – 6:00 PM' },
  { day: 'Sunday', time: '11:00 AM – 4:00 PM' },
  { day: 'Public Holidays', time: 'Emergency Support Only' },
]

const socials = [
  { icon: FaInstagram, label: 'Instagram', handle: '@wanderlux.travel', color: 'hover:bg-pink-600', href: '#' },
  { icon: FaFacebookF, label: 'Facebook', handle: 'Wanderlux Travel', color: 'hover:bg-blue-600', href: '#' },
  { icon: FaTwitter, label: 'Twitter', handle: '@wanderlux', color: 'hover:bg-sky-500', href: '#' },
  { icon: FaWhatsapp, label: 'WhatsApp', handle: '+91 98765 43210', color: 'hover:bg-green-600', href: '#' },
  { icon: FaYoutube, label: 'YouTube', handle: 'WanderluxTV', color: 'hover:bg-red-600', href: '#' },
]

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      variants={fadeIn('up', index * 0.05)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="faq-item"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-heading font-semibold text-dark-900 text-sm md:text-base">{item.q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <FaChevronDown className="text-sky-500 shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <p className="pb-5 font-body text-gray-500 text-sm leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Contact() {
  return (
    <motion.div {...pageTransition}>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80" alt="Contact hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-dark-900/40 to-dark-900/80" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="font-heading font-bold text-5xl lg:text-7xl mb-4">Contact Us</h1>
            <p className="font-body text-white/70 text-xl max-w-2xl mx-auto">
              Ready to plan your dream vacation? Let's talk.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main contact section */}
      <section className="section-padding bg-soft-gray">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Info + Map */}
            <div className="space-y-8">
              {/* Company info cards */}
              <div className="space-y-4">
                {[
                  { icon: FaPhoneAlt, color: 'from-sky-500 to-ocean-500', glow: 'shadow-glow-blue', label: 'Call Us', value: '+91 98765 43210', sub: '+91 87654 32109 (Alternate)', href: 'tel:+919876543210' },
                  { icon: FaEnvelope, color: 'from-emerald-500 to-sky-500', glow: 'shadow-glow-emerald', label: 'Email Us', value: 'hello@wanderlux.in', sub: 'bookings@wanderlux.in', href: 'mailto:hello@wanderlux.in' },
                  { icon: FaMapMarkerAlt, color: 'from-amber-500 to-coral-500', glow: 'shadow-glow-orange', label: 'Visit Us', value: '3rd Floor, Prestige Tower', sub: 'MG Road, Bangalore – 560001', href: '#map' },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      variants={fadeIn('left', i * 0.1)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-5 p-5 bg-white rounded-2xl shadow-card border border-gray-100 hover:shadow-card-hover transition-all duration-300 group"
                    >
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 ${item.glow} group-hover:scale-110 transition-transform`}>
                        <Icon className="text-white text-xl" />
                      </div>
                      <div>
                        <p className="text-xs font-accent font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                        <p className="font-heading font-bold text-dark-900 text-sm">{item.value}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{item.sub}</p>
                      </div>
                    </motion.a>
                  )
                })}
              </div>

              {/* Business Hours */}
              <motion.div
                variants={fadeIn('up', 0.3)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-card border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-ocean-500 flex items-center justify-center">
                    <FaClock className="text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-dark-900">Business Hours</h3>
                </div>
                <div className="space-y-3">
                  {businessHours.map((item) => (
                    <div key={item.day} className="flex items-center justify-between text-sm border-b border-gray-50 pb-2 last:border-0">
                      <span className="font-accent font-semibold text-gray-600">{item.day}</span>
                      <span className="text-sky-600 font-semibold font-body">{item.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Social media */}
              <motion.div
                variants={fadeIn('up', 0.4)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-card border border-gray-100"
              >
                <h3 className="font-heading font-bold text-lg text-dark-900 mb-5">Follow Us</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {socials.map(({ icon: Icon, label, handle, color, href }) => (
                    <a
                      key={label}
                      href={href}
                      className={`flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:text-white transition-all duration-300 group ${color}`}
                    >
                      <div className={`w-9 h-9 rounded-lg bg-gray-200 group-hover:bg-white/20 flex items-center justify-center text-gray-600 group-hover:text-white transition-all`}>
                        <Icon />
                      </div>
                      <div>
                        <p className="text-xs font-accent font-semibold text-gray-700 group-hover:text-white">{label}</p>
                        <p className="text-xs text-gray-400 group-hover:text-white/80">{handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Google Maps */}
              <motion.div
                id="map"
                variants={fadeIn('up', 0.5)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden shadow-card h-64"
              >
                <iframe
                  title="Wanderlux Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9850895185997!2d77.6031523148233!3d12.97210479085546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sMG%20Road%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1634555678901!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </div>

            {/* Right: Enquiry Form */}
            <motion.div
              variants={fadeIn('right', 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <EnquiryForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="section-container max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-4xl text-dark-900 mb-4">
              Frequently Asked <span className="gradient-text-ocean">Questions</span>
            </h2>
            <p className="font-body text-gray-500">Have questions? We've got answers.</p>
          </div>
          <div className="divide-y divide-gray-100">
            {faqs.map((faq, i) => (
              <FAQItem key={i} item={faq} index={i} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
