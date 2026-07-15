"use client"

import { useRef, useEffect } from "react"
import { useLang } from "@/lib/i18n"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GitFork, MessageCircle, Link2, Camera, Globe, PenTool, Sparkles } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const socials = [
  { name: "GitHub", handle: "@neocarvajal", url: "https://github.com/neocarvajal", icon: GitFork, gradient: "from-gray-600 to-gray-900" },
  { name: "Twitter / X", handle: "@xGtsn", url: "https://x.com/xGtsn", icon: MessageCircle, gradient: "from-blue-400 to-blue-600" },
  { name: "LinkedIn", handle: "/in/neocarvajal", url: "https://linkedin.com/in/neocarvajal", icon: Link2, gradient: "from-blue-500 to-blue-700" },
  { name: "Instagram", handle: "@neocarvajal", url: "https://instagram.com/neocarvajal", icon: Camera, gradient: "from-pink-500 to-orange-500" },
  { name: "Dev.to", handle: "@neocarvajal", url: "https://dev.to/neocarvajal", icon: PenTool, gradient: "from-gray-700 to-gray-900" },
  { name: "Portfolio", handle: "neocarvajal.github.io", url: "https://neocarvajal.github.io/", icon: Globe, gradient: "from-violet-500 to-fuchsia-500" },
]

export function SocialSection() {
  const { lang, tx } = useLang()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const cards = el.querySelectorAll(".social-card")

    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelector(".section-title-anim"),
        { y: 60, rotateX: -8, opacity: 0, transformOrigin: "center top -150px" },
        { y: 0, rotateX: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top bottom-=80", end: "top center+=100", scrub: 1.2 }
        }
      )
      gsap.fromTo(cards,
        { y: 60, rotateX: 15, rotateY: -12, scale: 0.7, opacity: 0, transformOrigin: "center center -200px" },
        { y: 0, rotateX: 0, rotateY: 0, scale: 1, opacity: 1, duration: 1.3, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top bottom-=50", end: "top center+=120", scrub: 1.5 }
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="social" ref={sectionRef} className="relative z-10 px-4 py-32" style={{ perspective: 1000 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background/60 pointer-events-none" />
      <div className="mx-auto max-w-2xl relative">
        <div className="section-title-anim mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-1.5 text-xs text-fuchsia-300 backdrop-blur-sm">
            <Sparkles className="size-3" />
            {tx.social.badge[lang]}
          </span>
          <h2
            className="mb-4 bg-gradient-to-r from-fuchsia-200 via-violet-200 to-cyan-200 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
          >
            {tx.social.title[lang]}
          </h2>
          <p className="mx-auto max-w-md text-muted-foreground">
            {tx.social.desc[lang]}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2" style={{ transformStyle: "preserve-3d" }}>
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card group block"
            >
              <div className="relative flex items-center gap-4 rounded-2xl border border-border/50 bg-background/30 p-4 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/30 hover:bg-background/50 hover:shadow-xl hover:-translate-y-0.5">
                <div className={`flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.gradient} shadow-lg`}>
                  <s.icon className="size-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium transition-colors group-hover:text-violet-200">{s.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{s.handle}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5">
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
