"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Star, Code2, Sparkles } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    name: "solanatiers",
    desc: "Sistema de tiers y membresías on-chain en Solana.",
    stars: 0,
    lang: "TypeScript",
    url: "https://github.com/neocarvajal/solanatiers",
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "solana-workflow",
    desc: "Herramientas y workflows de automatización para desarrollo y testing en Solana.",
    stars: 0,
    lang: "Rust",
    url: "https://github.com/neocarvajal/solana-workflow",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "dexscreener-spl-explorer",
    desc: "Explorador de tokens SPL con integraciones de datos en tiempo real de Dexscreener.",
    stars: 0,
    lang: "TypeScript",
    url: "https://github.com/neocarvajal/dexscreener-spl-explorer",
    color: "from-fuchsia-500 to-pink-600",
  },
]

const langColors: Record<string, string> = {
  TypeScript: "#3178c6",
  Rust: "#dea584",
}

function ProjectCard({ p }: { p: (typeof projects)[0] }) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { y: 100, rotateX: 15, scale: 0.7, opacity: 0, transformOrigin: "right bottom -200px" },
        { y: 0, rotateX: 0, scale: 1, opacity: 1, duration: 1.4, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: el.closest("section"), start: "top bottom-=80", end: "top center+=120", scrub: 1.3 }
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <a
      ref={cardRef}
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card group block h-full"
    >
      <div className="relative h-full overflow-hidden rounded-2xl border border-border/50 bg-background/30 p-6 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-background/50 hover:shadow-2xl hover:shadow-violet-500/10">
        <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.04]`} />
        <div className="relative">
          <div className="mb-4 flex items-center justify-between">
            <div className={`flex size-10 items-center justify-center rounded-lg bg-gradient-to-br ${p.color}`}>
              <Code2 className="size-5 text-white" />
            </div>
            <ExternalLink className="size-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100" />
          </div>
          <h3
            className="mb-2 text-lg font-semibold transition-colors group-hover:text-violet-200"
                  >
                    {p.name}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full" style={{ backgroundColor: langColors[p.lang] || "#8b5cf6" }} />
              {p.lang}
            </span>
            <span className="flex items-center gap-1">
              <Star className="size-3" />
              {p.stars}
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelector(".section-title-anim"),
        { y: 60, rotateX: 12, opacity: 0, transformOrigin: "center top -150px" },
        { y: 0, rotateX: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top bottom-=80", end: "top center+=100", scrub: 1.2 }
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative z-10 px-4 py-32" style={{ perspective: 1200 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background/60 pointer-events-none" />
      <div className="mx-auto max-w-6xl relative">
        <div className="section-title-anim mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300 backdrop-blur-sm">
            <Sparkles className="size-3" />
            Código abierto
          </span>
          <h2
            className="mb-4 bg-gradient-to-r from-violet-200 via-fuchsia-200 to-cyan-200 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
          >
            Proyectos
          </h2>
          <p className="mx-auto max-w-md text-muted-foreground">
            Repositorios y contribuciones destacadas de Solana
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ transformStyle: "preserve-3d" }}>
          {projects.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://github.com/neocarvajal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-violet-300"
          >
            Ver todos en GitHub
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
