import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaCompass } from 'react-icons/fa'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 400)
          return 100
        }
        return prev + 4
      })
    }, 30)
    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      className="loading-screen flex-col gap-8"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated circles */}
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="w-24 h-24 rounded-full border-2 border-transparent border-t-sky-500 border-r-sky-500/30"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border-2 border-transparent border-t-emerald-500 border-l-emerald-500/30"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaCompass className="text-white text-3xl" />
          </motion.div>
        </div>
      </div>

      {/* Brand */}
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading font-bold text-3xl text-white"
        >
          Wander<span className="text-amber-500">lux</span>
        </motion.h1>
        <p className="text-white/40 text-sm font-accent tracking-widest uppercase mt-1">
          Premium Travel
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-white/30 text-xs font-accent">{progress}%</p>
    </motion.div>
  )
}
