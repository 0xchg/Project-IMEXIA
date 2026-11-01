import { motion } from 'motion/react'
import { NavLink } from 'react-router-dom'
import type { NavItem } from '../data/data.ts'

interface NavItemLinkProps extends NavItem {
  indicator?: boolean
  className?: string
  onClick?: () => void
}

function NavItemLink({ to, label, indicator = false, className = '', onClick }: NavItemLinkProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `relative min-h-11 items-center transition-colors duration-150 ${className} ${
          isActive ? 'font-semibold text-accent' : 'text-muted hover:text-ink'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {label}
          {indicator && isActive && (
            <motion.span
              layoutId="nav-indicator"
              className="absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-accent"
            />
          )}
        </>
      )}
    </NavLink>
  )
}

export default NavItemLink
