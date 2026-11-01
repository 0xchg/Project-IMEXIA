import type { Ref } from 'react'
import { labels } from '../data/data.ts'

const bar = 'absolute h-0.5 w-6 rounded-full bg-ink transition duration-200'

interface MenuToggleProps {
  ref: Ref<HTMLButtonElement>
  open: boolean
  controls: string
  onClick: () => void
}

function MenuToggle({ ref, open, controls, onClick }: MenuToggleProps) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={open ? labels.closeMenu : labels.openMenu}
      aria-expanded={open}
      aria-controls={controls}
      onClick={onClick}
      className="relative flex size-11 items-center justify-center sm:hidden"
    >
      <span className={`${bar} ${open ? 'rotate-45' : '-translate-y-2'}`} />
      <span className={`${bar} ${open ? 'opacity-0' : ''}`} />
      <span className={`${bar} ${open ? '-rotate-45' : 'translate-y-2'}`} />
    </button>
  )
}

export default MenuToggle
