import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import useContent from '../hooks/useContent.ts'

const variants = {
  primary: 'bg-accent text-canvas hover:bg-accent-strong hover:shadow-lg hover:shadow-accent/40',
  outline: 'border border-canvas/40 text-canvas hover:border-canvas hover:bg-canvas/10',
}

interface ButtonLinkProps {
  to: string
  variant?: keyof typeof variants
  children: ReactNode
}

function ButtonLink({ to, variant = 'primary', children }: ButtonLinkProps) {
  const { localize } = useContent()

  return (
    <Link
      to={localize(to)}
      className={`inline-flex min-h-11 items-center rounded-box px-6 font-semibold transition duration-200 hover:-translate-y-0.5 active:scale-95 ${variants[variant]}`}
    >
      {children}
    </Link>
  )
}

export default ButtonLink
