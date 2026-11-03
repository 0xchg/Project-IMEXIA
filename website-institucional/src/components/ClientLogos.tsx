import type { Client } from '../data/data.ts'
import Reveal from './Reveal.tsx'

interface ClientLogosProps {
  clients: Client[]
}

function ClientLogos({ clients }: ClientLogosProps) {
  return (
    <ul className="grid grid-cols-3 items-center gap-4 md:gap-12">
      {clients.map(({ name, logo }, index) => (
        <li key={name}>
          <Reveal delay={index * 0.08} className="group flex h-16 items-center justify-center sm:h-24 lg:h-32">
            <img
              src={logo}
              alt={name}
              loading="lazy"
              className="max-h-full w-auto max-w-full object-contain opacity-60 grayscale transition duration-300 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 group-active:opacity-100 group-active:grayscale-0"
            />
          </Reveal>
        </li>
      ))}
    </ul>
  )
}

export default ClientLogos
