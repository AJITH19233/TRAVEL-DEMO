// Framer Motion reusable animation variants

export const fadeIn = (direction = 'up', delay = 0) => ({
  hidden: {
    opacity: 0,
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
      delay,
    },
  },
})

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
})

export const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', damping: 20, stiffness: 100, delay },
  },
})

export const slideInLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -80 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', damping: 20, stiffness: 80, delay },
  },
})

export const slideInRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 80 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', damping: 20, stiffness: 80, delay },
  },
})

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
}

export const cardHover = {
  rest: { scale: 1, y: 0, boxShadow: '0 20px 60px rgba(0,0,0,0.1)' },
  hover: {
    scale: 1.03,
    y: -8,
    boxShadow: '0 30px 80px rgba(0,0,0,0.2)',
    transition: { type: 'spring', damping: 15, stiffness: 200 },
  },
}

export const imageZoom = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const buttonRipple = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
}

export const floatingAnimation = {
  animate: {
    y: [-10, 10, -10],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const textReveal = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const navVariants = {
  hidden: { opacity: 0, y: -30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
}
