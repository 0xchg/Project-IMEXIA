import type { ReactNode } from 'react'
import Reveal from './Reveal.tsx'

const tones = {
  canvas: 'bg-canvas text-ink',
  surface: 'bg-surface text-ink',
  ink: 'bg-ink text-canvas',
}

interface SectionProps {
  title?: string
  tone?: keyof typeof tones
  className?: string
  children: ReactNode
}

function Section({ title, tone = 'canvas', className = '', children }: SectionProps) {
  return (
    <section className={`px-4 py-12 md:px-6 lg:px-12 ${tones[tone]} ${className}`}>
      {title && (
        <Reveal>
          <h2 className="mb-8 text-heading font-semibold">{title}</h2>
        </Reveal>
      )}
      {children}
    </section>
  )
}

export default Section
