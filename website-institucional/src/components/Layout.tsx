import { motion, MotionConfig } from 'motion/react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import Footer from './Footer.tsx'
import Navbar from './Navbar.tsx'

function Layout() {
  const { pathname } = useLocation()

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-dvh flex-col bg-canvas text-ink">
        <Navbar />
        <motion.main
          key={pathname}
          className="flex-1"
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
