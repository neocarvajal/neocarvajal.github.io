"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Briefcase, Calendar } from "lucide-react"
import { useLang } from "@/lib/i18n"

gsap.registerPlugin(ScrollTrigger)

export function ExperienceSection() {
  const { lang, tx } = useLang()
  const sectionRef = useRef<HTMLElement>(null)

  const experiences = [
    {
      role: tx.experience.role1[lang],
      company: tx.experience.company1[lang],
      period: tx.experience.period1[lang],
      desc: tx.experience.desc1[lang],
      tags: ["Content", "Solana", "Rust", "Web3"],
      gradient: "from-violet-500 to-purple-600",
    },
    {
      role: tx.experience.role2[lang],
      company: tx.experience.company2[lang],
      period: tx.experience.period2[lang],
      desc: tx.experience.desc2[lang],
      tags: ["Community", "Solana", "Events", "LATAM"],
      gradient: "from-cyan-500 to-blue-600",
    },
  ]

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const items = el.querySelectorAll(".exp-item")
    const lines = el.querySelectorAll(".exp-line")

    const ctx = gsap.context(() => {
      gsap.fromTo(lines,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 1.5, ease: "power2.inOut",
          scrollTrigger: { trigger: el, start: "top bottom-=50", end: "top center+=100", scrub: 1.5 }
        }
      )
      gsap.fromTo(items,
        { y: 80, rotateX: -14, scale: 0.8, opacity: 0, transformOrigin: "left center -200px" },
        { y: 0, rotateX: 0, scale: 1, opacity: 1, duration: 1.3, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: el, start: "top bottom-=50", end: "top center+=120", scrub: 1.3 }
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="relative z-10 px-4 py-32" style={{ perspective: 1000 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background/60 pointer-events-none" />
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs text-cyan-300 backdrop-blur-sm">
            {tx.experience.badge[lang]}
          </span>
          <h2
            className="bg-gradient-to-r from-cyan-200 via-violet-200 to-fuchsia-200 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
          >
            {tx.experience.title[lang]}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            {tx.experience.desc[lang]}
          </p>
        </div>

        <div className="relative" style={{ transformStyle: "preserve-3d" }}>
          <div className="exp-line absolute left-[19px] top-0 h-full w-0.5 origin-top bg-gradient-to-b from-violet-500 via-cyan-500 to-fuchsia-500 max-sm:left-[13px]" />

          <div className="space-y-10">
            {experiences.map((exp) => (
              <div key={exp.company} className="exp-item relative pl-12 sm:pl-14" style={{ transformStyle: "preserve-3d" }}>
                <div className={`absolute left-0 top-1 flex size-10 items-center justify-center rounded-full bg-gradient-to-br ${exp.gradient} shadow-lg max-sm:size-7`}>
                  <Briefcase className="size-4 text-white max-sm:size-3" />
                </div>

                <div className="rounded-2xl border border-border/50 bg-background/30 p-6 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-background/50 hover:shadow-xl">
                  <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="size-3" />
                    {exp.period}
                  </div>
                  <h3
                    className="text-lg font-semibold text-foreground"
                  >
                    {exp.role}
                  </h3>
                  <p className="mb-3 text-sm text-violet-300">{exp.company}</p>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{exp.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block rounded-full bg-background/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
