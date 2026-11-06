import type { LucideIcon } from 'lucide-react'
import { Plane } from 'lucide-react'

interface HeroArtProps {
  icon: LucideIcon
}

// stands in for a photo: the area's icon at the centre of glowing rings, with a plane on orbit
function HeroArt({ icon: Icon }: HeroArtProps) {
  return (
    <div className="flex size-full items-center justify-center opacity-70 lg:pl-[18%]">
      <div className="relative aspect-square w-[min(85%,34rem)]">
        <div className="absolute inset-0 rounded-full border border-accent/15" />
        <div className="absolute inset-[14%] rounded-full border border-dashed border-glow/25" />
        <div className="absolute inset-[30%] rounded-full border border-accent/30 bg-accent/5 shadow-[0_0_120px] shadow-accent/30" />
        {/* the plane rides the dashed ring */}
        <div className="absolute inset-[14%] animate-[spin_28s_linear_infinite] motion-reduce:animate-none">
          <Plane className="absolute top-0 left-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rotate-90 text-glow" strokeWidth={1.5} />
        </div>
        <Icon className="absolute top-1/2 left-1/2 size-1/4 -translate-1/2 text-accent" strokeWidth={1} />
      </div>
    </div>
  )
}

export default HeroArt
