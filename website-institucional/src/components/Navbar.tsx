import { motion, useScroll, useTransform } from 'motion/react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import { company, navItems } from '../data/data.ts'

function Navbar() {
  const { scrollY, scrollYProgress } = useScroll()
  // scrollYProgress reports 1 on pages too short to scroll
  const progress = useTransform<number, number>([scrollY, scrollYProgress], ([y, value]) =>
    y > 0 ? value : 0,
  )

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-canvas/90 backdrop-blur-md">
      <nav className="flex flex-wrap items-center justify-between gap-x-6 px-4 py-2 md:px-6 lg:px-12">
        <Link to="/" className="inline-flex min-h-11 items-center">
          <img src={logo} alt={company.name} className="h-8 w-auto" />
        </Link>
        <ul className="flex w-full justify-between sm:w-auto sm:gap-2">
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `relative inline-flex min-h-11 items-center px-1 transition-colors duration-150 sm:px-2 ${
                    isActive ? 'font-semibold text-accent' : 'text-muted hover:text-ink'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-1 bottom-1 h-0.5 rounded-full bg-accent sm:inset-x-2"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-accent"
        style={{ scaleX: progress }}
      />
    </header>
  )
}

export default Navbar
