import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo-dark.webp'
import useContent from '../hooks/useContent.ts'
import LanguageSwitch from './LanguageSwitch.tsx'
import ButtonLink from './ButtonLink.tsx'
import MenuToggle from './MenuToggle.tsx'
import MobileMenu from './MobileMenu.tsx'
import NavItemLink from './NavItemLink.tsx'

const menuId = 'mobile-menu'
const hideAfter = 80

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const { company, labels, navItems, localize } = useContent()
  const { scrollY, scrollYProgress } = useScroll()
  // scrollYProgress reports 1 on pages too short to scroll
  const progress = useTransform<number, number>([scrollY, scrollYProgress], ([y, value]) =>
    y > 0 ? value : 0,
  )

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setHidden(latest > previous && latest > hideAfter)
  })

  const closeMenu = () => setMenuOpen(false)

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && menuOpen) {
      closeMenu()
      toggleRef.current?.focus()
    }
  }

  return (
    <motion.header
      onKeyDown={handleKeyDown}
      onFocus={() => setHidden(false)}
      animate={{ y: hidden && !menuOpen ? '-100%' : 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-border bg-deep/85 backdrop-blur-md"
    >
      {/* logo on the left, links in the middle, language and the call to action on the right */}
      <nav className="flex items-center gap-x-6 px-4 py-2 md:px-6 lg:px-12">
        <Link to={localize('/')} onClick={closeMenu} className="inline-flex min-h-11 min-w-0 items-center">
          <img src={logo} alt={company.name} className="h-8 w-auto object-contain object-left" />
        </Link>
        <ul className="hidden flex-1 justify-center gap-2 md:flex lg:gap-4">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavItemLink {...item} indicator className="inline-flex px-2" />
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-2 md:ml-0 md:gap-4">
          <LanguageSwitch onSwitch={closeMenu} />
          {/* the contact page stays one tap away in the menu below lg, where the pill doesn't fit */}
          <div className="hidden lg:block">
            <ButtonLink to="/contact-us" arrow={false} className="rounded-full">
              {labels.contactCta}
            </ButtonLink>
          </div>
          <MenuToggle
            ref={toggleRef}
            open={menuOpen}
            controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          />
        </div>
        <MobileMenu id={menuId} open={menuOpen} onNavigate={closeMenu} />
      </nav>
      {/* hangs below the header (+1px for its border), so it lands at the top of the screen when the header hides */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%+1px)] h-0.5 origin-left bg-accent"
        style={{ scaleX: progress }}
      />
    </motion.header>
  )
}

export default Navbar
