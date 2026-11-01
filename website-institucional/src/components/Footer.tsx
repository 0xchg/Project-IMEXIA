import { company } from '../data/data.ts'

const year = new Date().getFullYear()

function Footer() {
  return (
    <footer className="bg-ink px-4 py-6 text-sm text-canvas md:px-6">
      <p>
        © {year} {company.name}
      </p>
    </footer>
  )
}

export default Footer
