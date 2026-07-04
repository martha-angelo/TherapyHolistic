'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
}

export default function RevealOnScroll({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={cn('reveal', className)}>
      {children}
    </div>
  )
}
