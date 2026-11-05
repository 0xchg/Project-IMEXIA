import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import useContent from '../hooks/useContent.ts'
import { buttonBase, buttonVariants } from './buttonStyles.ts'

interface ButtonLinkProps {
  to: string
  variant?: keyof typeof buttonVariants
  children: ReactNode
}

function ButtonLink({ to, variant = 'primary', children }: ButtonLinkProps) {
  const { localize } = useContent()

  return (
    <Link to={localize(to)} className={`${buttonBase} ${buttonVariants[variant]}`}>
      {children}
    </Link>
  )
}

export default ButtonLink
