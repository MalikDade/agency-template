import { motion, useIsPresent } from 'framer-motion'
import { useEffect } from 'react'

export default function PageTransition({ children }) {
  const isPresent = useIsPresent()

  useEffect(() => {
    if (isPresent) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [isPresent])

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.22, ease: 'easeIn' } }}
    >
      {children}
    </motion.div>
  )
}
