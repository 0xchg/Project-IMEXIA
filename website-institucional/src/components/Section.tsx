import type { ComponentProps } from 'react'
import TextReveal from './TextReveal.tsx'

const tones = {
  canvas: 'bg-canvas text-ink',
  surface: 'bg-surface text-ink',
  deep: 'bg-deep text-on-deep',
}

// any other <section> attribute (id, ref, aria-*) passes straight through
interface SectionProps extends Omit<ComponentProps<'section'>, 'title'> {
  title?: string
  tone?: keyof typeof tones
}

function Section({ title, tone = 'canvas', className = '', children, ...rest }: SectionProps) {
  return (
    <section {...rest} className={`px-4 py-12 md:px-6 lg:px-12 ${tones[tone]} ${className}`}>
      {title && (
        <h2 className="mb-8 text-heading font-semibold">
          <TextReveal>{title}</TextReveal>
        </h2>
      )}
      {children}
    </section>
  )
}

export default Section
