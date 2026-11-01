import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-accent text-canvas hover:brightness-90',
  outline: 'border border-canvas/40 text-canvas hover:border-canvas',
}

interface ButtonLinkProps {
  to: string
  variant?: keyof typeof variants
  children: ReactNode
}

function ButtonLink({ to, variant = 'primary', children }: ButtonLinkProps) {
  return (
    <Link
      to={to}
      className={`inline-flex min-h-11 items-center rounded-lg px-6 font-semibold transition duration-150 ${variants[variant]}`}
    >
      {children}
    </Link>
  )
}

export default ButtonLink
