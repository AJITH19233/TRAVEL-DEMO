import { useState, useEffect, useRef } from 'react'

export const useCounter = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start)
  const [isActive, setIsActive] = useState(false)
  const countRef = useRef(null)

  const startCounter = () => setIsActive(true)

  useEffect(() => {
    if (!isActive) return
    const startTime = Date.now()
    const step = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(start + (end - start) * eased))
      if (progress < 1) {
        countRef.current = requestAnimationFrame(step)
      }
    }
    countRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(countRef.current)
  }, [isActive, end, duration, start])

  return { count, startCounter }
}
