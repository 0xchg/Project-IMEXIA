import { createBrowserRouter, Navigate, RouterProvider, type RouteObject } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import { languages, type Language } from './data/shared.ts'
import About from './pages/About.tsx'
import Contact from './pages/Contact.tsx'
import Home from './pages/Home.tsx'
import Services from './pages/Services.tsx'

// every language gets the same pages under its own prefix
const pagesIn = (language: Language): RouteObject => {
  const root = languages[language].prefix || '/'
  return {
    path: root,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'about', element: <About /> },
      { path: 'contact-us', element: <Contact /> },
      { path: '*', element: <Navigate to={root} replace /> },
    ],
  }
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: (Object.keys(languages) as Language[]).map(pagesIn),
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
