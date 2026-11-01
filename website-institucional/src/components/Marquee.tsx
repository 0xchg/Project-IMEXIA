const copies = 4

interface MarqueeProps {
  items: string[]
}

function Marquee({ items }: MarqueeProps) {
  const track = Array.from({ length: copies }, () => items).flat()

  return (
    <div className="overflow-hidden border-b border-border py-4">
      <ul className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {track.map((item, index) => (
          <li
            key={index}
            aria-hidden={index >= items.length}
            className="pr-12 font-semibold whitespace-nowrap text-muted"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Marquee
