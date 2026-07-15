"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MapPin, ExternalLink, Sparkles, ArrowDown } from "lucide-react"
import { useLang } from "@/lib/i18n"

gsap.registerPlugin(ScrollTrigger)

const badges = [
  { label: "Solana", color: "from-violet-500 to-purple-600" },
  { label: "Rust", color: "from-fuchsia-500 to-pink-600" },
  { label: "Web3", color: "from-cyan-500 to-blue-600" },
  { label: "Anchor", color: "from-emerald-500 to-teal-600" },
  { label: "Smart Contracts", color: "from-amber-500 to-orange-600" },
]

export function CoverSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const parallaxBgRef = useRef<HTMLDivElement>(null)
  const { lang, tx } = useLang()

  useEffect(() => {
    const el = sectionRef.current
    const bg = parallaxBgRef.current
    if (!el || !bg) return

    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelector(".cover-bg-glow"),
        { scale: 0.6, opacity: 0 },
        { scale: 1.4, opacity: 0.4, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top bottom", end: "top center", scrub: 1.5 }
        }
      )
      gsap.to(bg, {
        y: "30%", ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.5 }
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="cover" ref={sectionRef} className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-4 py-20 sm:py-32">
      <div ref={parallaxBgRef} className="cover-bg-glow pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-transparent opacity-0" />

      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background/70 pointer-events-none" />

      <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-violet-500/5 blur-[100px] animate-pulse" />
      <div className="absolute right-1/4 bottom-1/3 h-48 w-48 rounded-full bg-cyan-500/5 blur-[80px] animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute left-1/3 bottom-1/4 h-36 w-36 rounded-full bg-fuchsia-500/5 blur-[60px] animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="relative mx-auto max-w-4xl text-center animate-fade-in" style={{ perspective: 1200, transformStyle: "preserve-3d" }}>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300 backdrop-blur-sm">
          <Sparkles className="size-3" />
          {tx.cover.badge[lang]}
        </div>

        <h1 className="mb-4 text-5xl font-bold leading-tight sm:text-7xl lg:text-8xl">
          <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
            Erick
          </span>
          <br />
          <span className="text-foreground">Carvajal</span>
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-base sm:text-lg text-muted-foreground/80 leading-relaxed">
          {tx.cover.subtitle[lang]}
        </p>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {badges.map((badge) => (
            <span
              key={badge.label}
              className={`inline-block rounded-full bg-gradient-to-r ${badge.color} px-4 py-1.5 text-xs font-medium text-white shadow-lg`}
            >
              {badge.label}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4" />
          <span>Cumaná, Venezuela</span>
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="https://github.com/neocarvajal"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-all hover:opacity-90"
          >
            <span className="relative z-10">GitHub</span>
            <ExternalLink className="relative z-10 size-4" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-transform duration-300 group-hover:translate-x-0" />
          </a>
          <a
            href="https://linkedin.com/in/neocarvajal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-8 py-3 text-sm font-medium backdrop-blur-sm transition-all hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300"
          >
            LinkedIn
            <ExternalLink className="size-4" />
          </a>
        </div>

        <div className="mt-16">
          <div
            className="text-muted-foreground/30 animate-bounce"
          >
            <ArrowDown className="mx-auto size-5" />
          </div>
        </div>
      </div>
    </section>
  )
}
