import type { ReactNode } from 'react'

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
      {title && <h2 className="mb-8 text-2xl font-semibold">{title}</h2>}
      {children}
    </section>
  )
}

export default Section
