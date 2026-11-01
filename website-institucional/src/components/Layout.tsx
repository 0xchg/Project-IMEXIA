import { Outlet, ScrollRestoration } from 'react-router-dom'
import Footer from './Footer.tsx'
import Navbar from './Navbar.tsx'

function Layout() {
  return (
    <div className="flex min-h-dvh flex-col bg-canvas text-ink">
      <Navbar />
      <main className="flex-1 px-4 py-8 md:px-6">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}

export default Layout
