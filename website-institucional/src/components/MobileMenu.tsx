import { AnimatePresence, motion } from 'motion/react'
import useContent from '../hooks/useContent.ts'
import NavItemLink from './NavItemLink.tsx'

interface MobileMenuProps {
  id: string
  open: boolean
  onNavigate: () => void
}

function MobileMenu({ id, open, onNavigate }: MobileMenuProps) {
  const { navItems } = useContent()

  return (
    <AnimatePresence>
      {open && (
        <motion.ul
          id={id}
          className="absolute inset-x-0 top-full overflow-hidden border-b border-border bg-canvas md:hidden"
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {navItems.map((item, index) => (
            <motion.li
              key={item.to}
              className="px-4 last:pb-2"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.05 + index * 0.05 }}
            >
              <NavItemLink {...item} className="flex" onClick={onNavigate} />
            </motion.li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
