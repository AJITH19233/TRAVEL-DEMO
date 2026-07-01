import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaCompass, FaInstagram, FaFacebookF, FaTwitter, FaYoutube,
  FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope
} from 'react-icons/fa'
import { FiArrowRight, FiSend } from 'react-icons/fi'
import { useState } from 'react'
import { staggerContainer, fadeIn } from '../../animations/variants'

const quickLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/past-events', label: 'Past Events' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
]

const services = [
  'International Tours',
  'Honeymoon Packages',
  'Adventure Travel',
  'Group Tours',
  'Luxury Experiences',
  'Customized Itineraries',
]

const socials = [
  { icon: FaInstagram, href: '#', color: 'hover:bg-pink-600', label: 'Instagram' },
  { icon: FaFacebookF, href: '#', color: 'hover:bg-blue-600', label: 'Facebook' },
  { icon: FaTwitter, href: '#', color: 'hover:bg-sky-500', label: 'Twitter' },
  { icon: FaYoutube, href: '#', color: 'hover:bg-red-600', label: 'YouTube' },
  { icon: FaWhatsapp, href: '#', color: 'hover:bg-green-600', label: 'WhatsApp' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-dark-900 text-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="section-container relative z-10">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16 border-b border-white/10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center">
                <FaCompass className="text-white text-xl" />
              </div>
              <div>
                <span className="font-heading font-bold text-2xl text-white">
                  Wander<span className="text-amber-500">lux</span>
                </span>
                <p className="text-[10px] text-white/40 font-accent tracking-widest uppercase">
                  Premium Travel
                </p>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Crafting extraordinary travel experiences since 2009. Your dream journey is just one booking away.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 flex-wrap">
              {socials.map(({ icon: Icon, href, color, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm transition-all duration-300 ${color}`}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-sky-400 transition-colors flex items-center gap-2 text-sm group"
                  >
                    <FiArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-sky-400 text-xs" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-white/60 text-sm flex items-center gap-2 group cursor-pointer hover:text-emerald-400 transition-colors">
                  <FiArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-400 text-xs" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-white">Stay Connected</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <FaMapMarkerAlt className="text-sky-400 mt-0.5 shrink-0" />
                <span>3rd Floor, Prestige Tower, MG Road, Bangalore – 560001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <FaPhoneAlt className="text-emerald-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <FaEnvelope className="text-amber-400 shrink-0" />
                <a href="mailto:hello@wanderlux.in" className="hover:text-white transition-colors">hello@wanderlux.in</a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-sm font-accent font-semibold mb-3 text-white">Newsletter</p>
              {subscribed ? (
                <p className="text-emerald-400 text-sm flex items-center gap-2">
                  ✓ Thank you for subscribing!
                </p>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-10 h-10 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-xl flex items-center justify-center hover:shadow-glow-blue transition-all hover:scale-105"
                  >
                    <FiSend className="text-white text-sm" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 text-white/40 text-sm">
          <p>© 2024 Wanderlux Travel. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white/70 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white/70 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white/70 cursor-pointer transition-colors">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
