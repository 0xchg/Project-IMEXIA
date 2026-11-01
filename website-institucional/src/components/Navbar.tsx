import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { company, navItems } from '../data/data.ts'
import MenuToggle from './MenuToggle.tsx'
import MobileMenu from './MobileMenu.tsx'
import NavItemLink from './NavItemLink.tsx'

const menuId = 'mobile-menu'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const { scrollY, scrollYProgress } = useScroll()
  // scrollYProgress reports 1 on pages too short to scroll
  const progress = useTransform<number, number>([scrollY, scrollYProgress], ([y, value]) =>
    y > 0 ? value : 0,
  )

  const closeMenu = () => setMenuOpen(false)

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && menuOpen) {
      closeMenu()
      toggleRef.current?.focus()
    }
  }

  return (
    <header
      onKeyDown={handleKeyDown}
      className="sticky top-0 z-50 border-b border-border bg-canvas/90 backdrop-blur-md"
    >
      <nav className="flex items-center justify-between gap-x-6 px-4 py-2 md:px-6 lg:px-12">
        <Link to="/" onClick={closeMenu} className="inline-flex min-h-11 items-center">
          <img src={logo} alt={company.name} className="h-8 w-auto" />
        </Link>
        <ul className="hidden gap-2 sm:flex">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavItemLink {...item} indicator className="inline-flex px-2" />
            </li>
          ))}
        </ul>
        <MenuToggle
          ref={toggleRef}
          open={menuOpen}
          controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        />
        <MobileMenu id={menuId} open={menuOpen} onNavigate={closeMenu} />
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
