import { motion } from 'motion/react'
import type { ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

interface TextRevealProps {
  delay?: number
  children: ReactNode
}

// slides the text up from behind a mask when it scrolls into view, like the hero headline;
// the mask watches the viewport, because the hidden text is clipped and never counts as in view
function TextReveal({ delay = 0, children }: TextRevealProps) {
  return (
    <motion.span
      className="block overflow-hidden pb-1"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-48px' }}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: '110%' }, shown: { y: 0 } }}
        transition={{ duration: 0.8, delay, ease }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

export default TextReveal
