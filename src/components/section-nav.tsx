"use client"

import { useEffect, useState } from "react"
import { useLang } from "@/lib/i18n"

const sectionIds = ["cover", "about", "experience", "certifications", "projects", "blog", "interests", "services", "social"] as const

export function SectionNav() {
  const [active, setActive] = useState("cover")
  const [hovered, setHovered] = useState<string | null>(null)
  const { lang, tx } = useLang()

  const sections = sectionIds.map((id) => ({ id, label: tx.nav[id][lang] }))

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [lang])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          onMouseEnter={() => setHovered(id)}
          onMouseLeave={() => setHovered(null)}
          className="group relative flex items-center justify-center"
          aria-label={label}
        >
          <span
            className={`block rounded-full transition-all duration-500 ${
              active === id
                ? "h-3 w-3 bg-violet-400 shadow-lg shadow-violet-500/50"
                : "h-2 w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
            }`}
          />
          <span
            className={`absolute right-full mr-3 whitespace-nowrap text-xs transition-all duration-300 ${
              hovered === id || active === id
                ? "translate-x-0 opacity-100"
                : "translate-x-2 opacity-0 pointer-events-none"
            }`}
          >
            {label}
          </span>
        </button>
      ))}
    </nav>
  )
}
