import { useInView } from 'react-intersection-observer'

// Simplified hook — uses whileInView via inView state
// Returns a ref and a boolean. Use inView to conditionally apply classes or drive variants.
export const useScrollAnimation = (threshold = 0.15) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  })

  // Return compatible shape with old API
  const controls = inView ? 'show' : 'hidden'

  return { ref, controls, inView }
}
