"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code2, MapPin, Calendar, Globe } from "lucide-react"
import { useLang } from "@/lib/i18n"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: Code2, value: "5+" },
  { icon: Globe, value: "2" },
]

export function AboutSection() {
  const { lang, tx } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const statLabels = [tx.about.statsYears[lang], tx.about.statsLang[lang]]

  useEffect(() => {
    const el = sectionRef.current
    const title = titleRef.current
    const content = contentRef.current
    if (!el || !title || !content) return

    const ctx = gsap.context(() => {
      gsap.fromTo(title,
        { y: 80, rotateX: 15, opacity: 0, transformOrigin: "center top -150px" },
        { y: 0, rotateX: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top bottom-=80", end: "top center+=100", scrub: 1.2 }
        }
      )
      gsap.fromTo(content,
        { y: 60, rotateY: 12, scale: 0.85, opacity: 0, transformOrigin: "right center -200px" },
        { y: 0, rotateY: 0, scale: 1, opacity: 1, duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top bottom-=50", end: "top center+=120", scrub: 1.5 }
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative z-10 px-4 py-32" style={{ perspective: 1200 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background/60 pointer-events-none" />
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300 backdrop-blur-sm">
            {tx.about.badge[lang]}
          </span>
          <h2
            ref={titleRef}
            className="bg-gradient-to-r from-violet-200 via-fuchsia-200 to-cyan-200 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
          >
            {tx.about.title[lang]}
          </h2>
        </div>

        <div ref={contentRef} className="grid gap-10 lg:grid-cols-5" style={{ transformStyle: "preserve-3d" }}>
          <div className="lg:col-span-3 space-y-5">
            <p className="text-lg leading-relaxed text-muted-foreground/90">
              <strong className="text-foreground">Erick Carvajal</strong> — {tx.about.bio1[lang]}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground/80">
              {tx.about.bio2[lang]}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 text-violet-400" />
                {tx.about.location[lang]}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="size-4 text-cyan-400" />
                {tx.about.available[lang]}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={stat.value}
                className="rounded-2xl border border-border/50 bg-background/30 p-5 text-center backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-background/50"
              >
                <stat.icon className="mx-auto mb-2 size-6 text-violet-400" />
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{statLabels[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
