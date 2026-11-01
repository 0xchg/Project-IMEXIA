import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import { company, navItems } from '../data/data.ts'

function Navbar() {
  return (
    <header className="border-b border-border">
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
                  `inline-flex min-h-11 items-center px-1 transition-colors duration-150 sm:px-2 ${
                    isActive ? 'font-semibold text-accent' : 'text-muted hover:text-ink'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
