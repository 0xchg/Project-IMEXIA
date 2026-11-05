import type { Client } from '../data/types.ts'
import Reveal from './Reveal.tsx'

interface ClientLogosProps {
  clients: Client[]
}

function ClientLogos({ clients }: ClientLogosProps) {
  return (
    <ul className="grid grid-cols-3 items-center gap-4 md:gap-12">
      {clients.map(({ name, logo }, index) => (
        <li key={name}>
          {/* white silhouettes on the dark page; the colours need a light tile, which appears on hover */}
          <Reveal
            delay={index * 0.08}
            className="group flex h-20 items-center justify-center rounded-box p-3 transition-colors duration-300 hover:bg-paper active:bg-paper sm:h-28 sm:p-5 lg:h-36"
          >
            <img
              src={logo}
              alt={name}
              loading="lazy"
              className="max-h-full w-auto max-w-full object-contain opacity-60 transition duration-300 [filter:var(--logo-filter)] group-hover:scale-105 group-hover:opacity-100 group-hover:[filter:none] group-active:opacity-100 group-active:[filter:none]"
            />
          </Reveal>
        </li>
      ))}
    </ul>
  )
}

export default ClientLogos
