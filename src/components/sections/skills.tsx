"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Globe, Wallet, Shield, GitBranch } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const categories = [
  {
    title: "Blockchain",
    icon: Wallet,
    gradient: "from-violet-500 to-purple-600",
    skills: [
      { name: "Solana", level: 90 },
      { name: "Anchor", level: 85 },
      { name: "Pinocchio", level: 70 },
      { name: "Token-2022", level: 75 },
    ],
  },
  {
    title: "Smart Contracts",
    icon: Shield,
    gradient: "from-cyan-500 to-blue-600",
    skills: [
      { name: "Rust", level: 85 },
      { name: "Solidity", level: 60 },
      { name: "SPL Tokens", level: 80 },
      { name: "CPIs", level: 75 },
    ],
  },
  {
    title: "Frontend & Web",
    icon: Globe,
    gradient: "from-fuchsia-500 to-pink-600",
    skills: [
      { name: "Next.js", level: 85 },
      { name: "React", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    title: "Herramientas",
    icon: GitBranch,
    gradient: "from-amber-500 to-orange-600",
    skills: [
      { name: "Git", level: 85 },
      { name: "Solana CLI", level: 80 },
      { name: "Metaplex", level: 65 },
      { name: "Helius RPC", level: 70 },
    ],
  },
]

function SkillCard({ category }: { category: (typeof categories)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const bars = el.querySelectorAll(".skill-bar-fill")
    const ctx = gsap.context(() => {
      gsap.fromTo(bars,
        { width: "0%" },
        { width: (i) => `${category.skills[i].level}%`, duration: 1.5, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top bottom-=50", end: "top center+=100", scrub: 1.3 }
        }
      )
    }, el)
    return () => ctx.revert()
  }, [category.skills])

  return (
    <div
      ref={cardRef}
      className="skill-card group rounded-2xl border border-border/50 bg-background/30 p-6 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-background/50 hover:shadow-2xl hover:shadow-violet-500/5"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className={`mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.gradient} shadow-lg`}>
        <category.icon className="size-6 text-white" />
      </div>
      <h3
        className="mb-4 text-lg font-semibold text-foreground"
                  >
                    {category.title}
      </h3>
      <div className="space-y-3">
        {category.skills.map((skill) => (
          <div key={skill.name}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{skill.name}</span>
              <span className="text-xs text-muted-foreground/60">{skill.level}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted/30">
              <div
                className="skill-bar-fill h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const cards = el.querySelectorAll(".skill-card")

    const ctx = gsap.context(() => {
      gsap.fromTo(cards,
        { y: 60, rotateY: 10, rotateX: -5, scale: 0.85, opacity: 0, transformOrigin: "center center -150px" },
        { y: 0, rotateY: 0, rotateX: 0, scale: 1, opacity: 1, duration: 1.3, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top bottom-=50", end: "top center+=120", scrub: 1.4 }
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="relative z-10 px-4 py-32" style={{ perspective: 1200 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background/60 pointer-events-none" />
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-1.5 text-xs text-fuchsia-300 backdrop-blur-sm">
            Stack tecnológico
          </span>
          <h2
            className="bg-gradient-to-r from-fuchsia-200 via-violet-200 to-cyan-200 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
              >
            Skills
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Tecnologías con las que construyo y aporto valor
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2" style={{ transformStyle: "preserve-3d" }}>
          {categories.map((cat) => (
            <SkillCard key={cat.title} category={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}
