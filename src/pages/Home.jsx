import { motion } from 'framer-motion'
import { pageTransition } from '../animations/variants'
import Hero from '../components/sections/Hero'
import Destinations from '../components/sections/Destinations'
import WhyUs from '../components/sections/WhyUs'
import Services from '../components/sections/Services'
import Packages from '../components/sections/Packages'
import Testimonials from '../components/sections/Testimonials'
import Stats from '../components/sections/Stats'
import CTA from '../components/sections/CTA'

export default function Home() {
  return (
    <motion.div {...pageTransition}>
      <Hero />
      <Destinations />
      <WhyUs />
      <Services />
      <Packages />
      <Stats />
      <Testimonials />
      <CTA />
    </motion.div>
  )
}
