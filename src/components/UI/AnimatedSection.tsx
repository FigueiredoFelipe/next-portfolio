'use client'

import { motion, useReducedMotion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

interface Props {
  children: ReactNode
  className?: string
  delay?: number
}

export default function AnimatedSection({ children, className, delay = 0 }: Props) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        ...fadeUp,
        visible: {
          ...fadeUp.visible as object,
          transition: { duration: 0.5, ease: 'easeOut', delay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
