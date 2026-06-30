import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import {
  FiUser, FiMail, FiPhone, FiMapPin, FiCalendar,
  FiClock, FiUsers, FiDollarSign, FiMessageSquare,
  FiSend, FiCheckCircle, FiAlertCircle, FiLoader
} from 'react-icons/fi'
import { FaChild, FaPlus, FaMinus } from 'react-icons/fa'
import { fadeIn, staggerContainer } from '../../animations/variants'

import { EMAILJS_CONFIG } from '../../utils/emailjs'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  destinationFrom: '',
  destinationTo: '',
  travelDate: '',
  numberOfDays: '',
  adults: 1,
  children: 0,
  budget: '',
  specialRequirements: '',
}

function Counter({ label, value, onChange, icon: Icon, min = 0 }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="block text-sm font-accent font-semibold text-gray-600 flex items-center gap-2">
        <Icon className="text-ocean-500" /> {label}
      </label>
      <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 rounded-lg bg-ocean-500/10 text-ocean-500 flex items-center justify-center hover:bg-ocean-500 hover:text-white transition-all"
        >
          <FaMinus className="text-xs" />
        </button>
        <span className="flex-1 text-center font-heading font-bold text-xl text-dark-900">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-8 h-8 rounded-lg bg-ocean-500/10 text-ocean-500 flex items-center justify-center hover:bg-ocean-500 hover:text-white transition-all"
        >
          <FaPlus className="text-xs" />
        </button>
      </div>
    </div>
  )
}

function InputField({ label, icon: Icon, children, required, className = '' }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="block text-sm font-accent font-semibold text-gray-600 flex items-center gap-2">
        <Icon className="text-ocean-500" />
        {label} {required && <span className="text-coral-500">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-dark-900 font-body text-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all duration-300"

export default function EnquiryForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const totalPeople = form.adults + form.children

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))
  const handleChange = (e) => set(e.target.name, e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    const templateParams = {
      from_name: form.fullName,
      from_email: form.email,
      phone: form.phone,
      destination_from: form.destinationFrom,
      destination_to: form.destinationTo,
      travel_date: form.travelDate,
      number_of_days: form.numberOfDays,
      adults: form.adults,
      children: form.children,
      total_people: totalPeople,
      budget: form.budget || 'Not specified',
      special_requirements: form.specialRequirements || 'None',
    }

    try {
      await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams, EMAILJS_CONFIG.PUBLIC_KEY)
      setStatus('success')
      setForm(initialForm)
      setTimeout(() => setStatus('idle'), 6000)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <motion.div
      variants={staggerContainer(0.05)}
      initial="hidden"
      animate="show"
      className="bg-white rounded-3xl shadow-premium p-8 lg:p-10 border border-gray-100"
    >
      <motion.div variants={fadeIn('up')} className="mb-8">
        <h3 className="font-heading font-bold text-2xl text-dark-900 mb-2">
          Send Us Your Enquiry
        </h3>
        <p className="font-body text-gray-500 text-sm">
          Fill in the details below and our travel expert will contact you within 24 hours.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {status === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <FiCheckCircle className="text-emerald-500 text-4xl" />
            </div>
            <h4 className="font-heading font-bold text-2xl text-dark-900 mb-2">Enquiry Sent! 🎉</h4>
            <p className="text-gray-500 text-sm max-w-sm">
              Thank you for reaching out! Our travel expert will contact you within 24 hours to plan your perfect journey.
            </p>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 mb-6"
          >
            <FiAlertCircle className="text-xl shrink-0" />
            <p className="text-sm">Something went wrong. Please try again or call us directly at +91 98765 43210.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {status !== 'success' && (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: Full Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField label="Full Name" icon={FiUser} required>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                placeholder="Rahul Sharma"
                className={inputClass}
              />
            </InputField>
            <InputField label="Email Address" icon={FiMail} required>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="rahul@example.com"
                className={inputClass}
              />
            </InputField>
          </div>

          {/* Row 2: Phone + Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField label="Phone Number" icon={FiPhone} required>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="+91 98765 43210"
                className={inputClass}
              />
            </InputField>
            <InputField label="Approx. Budget (Optional)" icon={FiDollarSign}>
              <input
                name="budget"
                value={form.budget}
                onChange={handleChange}
                placeholder="e.g. ₹1,00,000 per person"
                className={inputClass}
              />
            </InputField>
          </div>

          {/* Row 3: From → To */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField label="Travelling From" icon={FiMapPin} required>
              <input
                name="destinationFrom"
                value={form.destinationFrom}
                onChange={handleChange}
                required
                placeholder="Mumbai, India"
                className={inputClass}
              />
            </InputField>
            <InputField label="Destination" icon={FiMapPin} required>
              <input
                name="destinationTo"
                value={form.destinationTo}
                onChange={handleChange}
                required
                placeholder="Santorini, Greece"
                className={inputClass}
              />
            </InputField>
          </div>

          {/* Row 4: Date + Days */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField label="Travel Date" icon={FiCalendar} required>
              <input
                type="date"
                name="travelDate"
                value={form.travelDate}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </InputField>
            <InputField label="Number of Days" icon={FiClock} required>
              <input
                type="number"
                name="numberOfDays"
                value={form.numberOfDays}
                onChange={handleChange}
                required
                min="1"
                placeholder="7"
                className={inputClass}
              />
            </InputField>
          </div>

          {/* Row 5: Adults + Children + Total */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Counter
              label="Adults"
              value={form.adults}
              onChange={(v) => set('adults', v)}
              icon={FiUsers}
              min={1}
            />
            <Counter
              label="Children"
              value={form.children}
              onChange={(v) => set('children', v)}
              icon={FaChild}
            />
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-accent font-semibold text-gray-600 flex items-center gap-2">
                <FiUsers className="text-emerald-500" /> Total People
              </label>
              <div className="flex items-center justify-center bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 h-[46px]">
                <span className="font-heading font-bold text-2xl text-emerald-600">{totalPeople}</span>
              </div>
            </div>
          </div>

          {/* Special Requirements */}
          <InputField label="Special Requirements" icon={FiMessageSquare}>
            <textarea
              name="specialRequirements"
              value={form.specialRequirements}
              onChange={handleChange}
              rows={4}
              placeholder="Dietary restrictions, wheelchair access, anniversary surprise, etc."
              className={`${inputClass} resize-none`}
            />
          </InputField>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={status === 'loading'}
            whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 rounded-2xl font-heading font-bold text-white text-base flex items-center justify-center gap-3 transition-all duration-300 ${
              status === 'loading'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-ocean-500 to-sky-500 hover:shadow-glow-blue'
            }`}
          >
            {status === 'loading' ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <FiLoader className="text-xl" />
                </motion.div>
                Sending Enquiry...
              </>
            ) : (
              <>
                <FiSend className="text-xl" />
                Send My Enquiry
              </>
            )}
          </motion.button>

          <p className="text-xs text-gray-400 text-center font-accent">
            By submitting, you agree to our Privacy Policy. We never share your data.
          </p>
        </form>
      )}
    </motion.div>
  )
}
