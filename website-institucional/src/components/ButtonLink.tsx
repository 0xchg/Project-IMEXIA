import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import useContent from '../hooks/useContent.ts'
import { buttonBase, buttonVariants } from './buttonStyles.ts'

interface ButtonLinkProps {
  to: string
  variant?: keyof typeof buttonVariants
  className?: string
  // the trailing chevron of the references; the navbar's pill goes without
  arrow?: boolean
  children: ReactNode
}

function ButtonLink({ to, variant = 'primary', className = '', arrow = true, children }: ButtonLinkProps) {
  const { localize } = useContent()

  return (
    <Link to={localize(to)} className={`${buttonBase} ${buttonVariants[variant]} ${className}`}>
      {children}
      {arrow && (
        <ChevronRight aria-hidden="true" className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </Link>
  )
}

export default ButtonLink
