"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, MessageCircle, Send, Code2, ExternalLink, Sparkles } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelector(".contact-content"),
        { y: 60, rotateX: -10, scale: 0.85, opacity: 0, transformOrigin: "center top -150px" },
        { y: 0, rotateX: 0, scale: 1, opacity: 1, duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top bottom-=80", end: "top center+=100", scrub: 1.2 }
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative z-10 px-4 py-32" style={{ perspective: 1000 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background/60 pointer-events-none" />
      <div className="mx-auto max-w-2xl">
        <div className="contact-content text-center" style={{ transformStyle: "preserve-3d" }}>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300 backdrop-blur-sm">
            <Sparkles className="size-3" />
            Hablemos
          </span>
          <h2
            className="mb-4 bg-gradient-to-r from-violet-200 via-fuchsia-200 to-cyan-200 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
          >
            Contacto
          </h2>
          <p className="mx-auto mb-10 max-w-md text-muted-foreground">
            ¿Tienes un proyecto, idea o colaboración en mente? Estoy abierto a
            oportunidades en el ecosistema Web3 y blockchain.
          </p>

          <div className="mx-auto max-w-sm space-y-4">
            {[
              { icon: Mail, label: "Email", handle: "neocarvajal@proton.me", url: "mailto:neocarvajal@proton.me", gradient: "from-violet-500 to-purple-600" },
              { icon: MessageCircle, label: "Telegram", handle: "@neocarvajal", url: "https://t.me/neocarvajal", gradient: "from-cyan-500 to-blue-600" },
              { icon: Send, label: "Twitter / DM", handle: "@xGtsn", url: "https://x.com/xGtsn", gradient: "from-fuchsia-500 to-pink-600" },
              { icon: Code2, label: "GitHub", handle: "@neocarvajal", url: "https://github.com/neocarvajal", gradient: "from-gray-600 to-gray-900" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-background/30 p-4 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-background/50 hover:shadow-xl hover:-translate-y-0.5"
              >
                <div className={`flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg`}>
                  <item.icon className="size-5 text-white" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground truncate">{item.handle}</p>
                </div>
                <ExternalLink className="size-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100" />
              </a>
            ))}
          </div>

          <div className="mt-16 text-xs text-muted-foreground/40">
            <p>Construido con Next.js, GSAP + Motion y mucho ☕ por @neocarvajal</p>
          </div>
        </div>
      </div>
    </section>
  )
}
