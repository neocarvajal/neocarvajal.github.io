"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Blocks, Globe, Code2, Users, Rocket, Sparkles } from "lucide-react"
import { useLang } from "@/lib/i18n"

gsap.registerPlugin(ScrollTrigger)

const interests = [
  {
    title: "Solana & Blockchain",
    desc: "Smart contracts en Rust con Anchor y Pinocchio. Protocolos DeFi y programas Solana.",
    icon: Blocks,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "Web3 Development",
    desc: "dApps descentralizadas, integración con wallets, NFTs y tokens SPL.",
    icon: Globe,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    title: "Rust & Anchor",
    desc: "Programación segura en Rust. Frameworks Anchor para Solana optimizado.",
    icon: Code2,
    gradient: "from-fuchsia-500 to-pink-600",
  },
  {
    title: "Social Media & Marketing",
    desc: "Estrategias digitales Web3, contenido blockchain y crecimiento de comunidades.",
    icon: Users,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    title: "Talent Acquisition",
    desc: "Reclutamiento internacional y liderazgo de equipos tech en LATAM y US.",
    icon: Rocket,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Innovación Digital",
    desc: "Exploración de Blinks, Token-2022, identity on-chain y nuevas techs.",
    icon: Sparkles,
    gradient: "from-rose-500 to-red-600",
  },
]

export function InterestsSection() {
  const { lang, tx } = useLang()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const cards = el.querySelectorAll(".interest-card")

    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelector(".section-title-anim"),
        { y: 60, rotateX: 5, rotateY: -5, opacity: 0, transformOrigin: "center top -150px" },
        { y: 0, rotateX: 0, rotateY: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top bottom-=80", end: "top center+=100", scrub: 1.2 }
        }
      )
      gsap.fromTo(cards,
        { y: 70, rotateX: 12, rotateY: 8, scale: 0.75, opacity: 0, transformOrigin: "center center -150px" },
        { y: 0, rotateX: 0, rotateY: 0, scale: 1, opacity: 1, duration: 1.4, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top bottom-=50", end: "top center+=120", scrub: 1.5 }
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="interests" ref={sectionRef} className="relative z-10 px-4 py-32" style={{ perspective: 1000 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background/60 pointer-events-none" />
      <div className="mx-auto max-w-6xl relative">
        <div className="section-title-anim mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs text-cyan-300 backdrop-blur-sm">
            <Sparkles className="size-3" />
            {tx.interests.badge[lang]}
          </span>
          <h2
            className="mb-4 bg-gradient-to-r from-cyan-200 via-violet-200 to-fuchsia-200 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
          >
            {tx.interests.title[lang]}
          </h2>
          <p className="mx-auto max-w-md text-muted-foreground">
            {tx.interests.desc[lang]}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ transformStyle: "preserve-3d" }}>
          {interests.map((item) => (
            <div key={item.title} className="interest-card group">
              <div className="relative h-full overflow-hidden rounded-2xl border border-border/50 bg-background/30 p-6 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-background/50 hover:shadow-2xl hover:-translate-y-1">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.03]`} />

                <div className={`mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg`}>
                  <item.icon className="size-6 text-white" />
                </div>

                <h3
                  className="mb-2 text-lg font-semibold transition-colors group-hover:text-violet-200"
                  >
                    {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
