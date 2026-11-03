import { motion, MotionConfig } from 'motion/react'
import { useEffect, useRef } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import Footer from './Footer.tsx'
import Navbar from './Navbar.tsx'

function Layout() {
  const { pathname, key } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const lastKey = useRef(key)

  // move focus off the clicked link on every navigation, so it doesn't keep a focus ring
  useEffect(() => {
    if (lastKey.current === key) return
    lastKey.current = key
    mainRef.current?.focus({ preventScroll: true })
  }, [key])

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-dvh flex-col bg-canvas text-ink">
        <Navbar />
        <motion.main
          ref={mainRef}
          key={pathname}
          tabIndex={-1}
          className="flex-1 outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
        <Footer />
        <ScrollRestoration />
      </div>
    </MotionConfig>
  )
}

export default Layout
