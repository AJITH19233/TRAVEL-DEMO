import { useEffect, useRef } from 'react'
import { useMousePosition } from '../../hooks/useMousePosition'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const position = useMousePosition()

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${position.x - 6}px, ${position.y - 6}px)`
    }
  }, [position])

  useEffect(() => {
    if (!followerRef.current) return
    let animFrame
    let followerX = 0
    let followerY = 0
    let mouseX = position.x
    let mouseY = position.y

    const animate = () => {
      followerX += (mouseX - followerX - 18) * 0.1
      followerY += (mouseY - followerY - 18) * 0.1
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerX}px, ${followerY}px)`
      }
      animFrame = requestAnimationFrame(animate)
    }
    animFrame = requestAnimationFrame(animate)

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    const addHover = () => followerRef.current?.classList.add('hovered')
    const removeHover = () => followerRef.current?.classList.remove('hovered')
    const interactables = document.querySelectorAll('a, button, [role="button"]')
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('mousemove', handleMouseMove)
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [])

  // Only show on desktop
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={followerRef} className="cursor-follower hidden md:block" />
    </>
  )
}
