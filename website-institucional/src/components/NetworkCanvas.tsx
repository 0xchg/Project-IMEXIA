import { useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

interface Point {
  x: number
  y: number
  vx: number
  vy: number
}

// one point per this many square pixels, within limits
const density = 14000
const minPoints = 24
const maxPoints = 90
// pixels per second at rest
const drift = 18
const pointerReach = 180

const readColor = (name: string, fallback: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback

// "connecting people, businesses and opportunities": drifting points that link up when close,
// and reach for the pointer; the parent needs `relative isolate overflow-hidden`
function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const line = readColor('--color-on-deep', '#ffffff')
    const dot = readColor('--color-glow', '#1ca0d3')
    let width = 0
    let height = 0
    let reach = 0
    let points: Point[] = []
    const pointer = { x: 0, y: 0, active: false }

    const resize = () => {
      const ratio = devicePixelRatio || 1
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * ratio
      canvas.height = height * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      reach = width < 640 ? 90 : 130
      const count = Math.min(maxPoints, Math.max(minPoints, Math.round((width * height) / density)))
      points = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2
        const speed = drift * (0.4 + Math.random() * 0.6)
        return { x: Math.random() * width, y: Math.random() * height, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed }
      })
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      context.lineWidth = 1
      context.strokeStyle = line
      for (let i = 0; i < points.length; i++) {
        const a = points[i]
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j]
          const distance = Math.hypot(a.x - b.x, a.y - b.y)
          if (distance > reach) continue
          context.globalAlpha = (1 - distance / reach) * 0.35
          context.beginPath()
          context.moveTo(a.x, a.y)
          context.lineTo(b.x, b.y)
          context.stroke()
        }
        if (pointer.active) {
          const distance = Math.hypot(a.x - pointer.x, a.y - pointer.y)
          if (distance < pointerReach) {
            context.globalAlpha = (1 - distance / pointerReach) * 0.6
            context.beginPath()
            context.moveTo(a.x, a.y)
            context.lineTo(pointer.x, pointer.y)
            context.stroke()
          }
        }
      }
      context.globalAlpha = 0.9
      context.fillStyle = dot
      for (const { x, y } of points) {
        context.beginPath()
        context.arc(x, y, 1.75, 0, Math.PI * 2)
        context.fill()
      }
      context.globalAlpha = 1
    }

    const step = (seconds: number, push: number) => {
      for (const point of points) {
        if (pointer.active) {
          // a gentle pull towards the pointer
          const dx = pointer.x - point.x
          const dy = pointer.y - point.y
          const distance = Math.hypot(dx, dy)
          if (distance < pointerReach && distance > 1) {
            point.x += (dx / distance) * 30 * seconds
            point.y += (dy / distance) * 30 * seconds
          }
        }
        point.x += point.vx * seconds
        point.y += point.vy * seconds + push
        // wrap around the edges
        if (point.x < -10) point.x = width + 10
        if (point.x > width + 10) point.x = -10
        if (point.y < -10) point.y = height + 10
        if (point.y > height + 10) point.y = -10
      }
    }

    resize()
    draw()
    const observer = new ResizeObserver(() => {
      resize()
      draw()
    })
    observer.observe(canvas)
    if (reduceMotion) return () => observer.disconnect()

    // scrolling nudges the network along, so it reacts on touch screens too
    let push = 0
    let lastScroll = scrollY
    const onScroll = () => {
      push += (lastScroll - scrollY) * 0.15
      lastScroll = scrollY
    }
    const onPointerMove = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect()
      pointer.x = event.clientX - box.left
      pointer.y = event.clientY - box.top
      pointer.active = event.pointerType === 'mouse' && pointer.y >= 0 && pointer.y <= box.height
    }
    const onPointerLeave = () => {
      pointer.active = false
    }

    let frame = 0
    let last = 0
    let visible = true
    const loop = (time: number) => {
      const seconds = last ? Math.min((time - last) / 1000, 0.05) : 0
      last = time
      step(seconds, push)
      push *= 0.85
      draw()
      frame = requestAnimationFrame(loop)
    }
    const start = () => {
      if (frame || !visible || document.hidden) return
      last = 0
      frame = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }
    // no work while the hero is off screen or the tab is hidden
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    visibility.observe(canvas)
    const onVisibilityChange = () => (document.hidden ? stop() : start())

    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibilityChange)
    start()

    return () => {
      stop()
      observer.disconnect()
      visibility.disconnect()
      removeEventListener('scroll', onScroll)
      removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [reduceMotion])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      // fainter on the left, where the headline sits
      className="absolute inset-0 -z-10 size-full [mask-image:linear-gradient(to_right,rgb(0_0_0/0.35),black_70%)]"
    />
  )
}

export default NetworkCanvas
