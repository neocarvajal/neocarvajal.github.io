"use client"

import { useRef, useEffect } from "react"
import { motion } from "motion/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code2, GraduationCap, MapPin, Calendar, Globe, Send } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: Code2, value: "5+", label: "Años en tech" },
  { icon: GraduationCap, value: "10+", label: "Proyectos Web3" },
  { icon: Globe, value: "3", label: "Idiomas" },
  { icon: Send, value: "1", label: "Comunidad" },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background/60 pointer-events-none" />
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300 backdrop-blur-sm"
          >
            Quién soy
          </motion.span>
          <h2
            ref={titleRef}
            className="bg-gradient-to-r from-violet-200 via-fuchsia-200 to-cyan-200 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
          >
            Sobre Mí
          </h2>
        </div>

        <div ref={contentRef} className="grid gap-10 lg:grid-cols-5" style={{ transformStyle: "preserve-3d" }}>
          <div className="lg:col-span-3 space-y-5">
            <p className="text-lg leading-relaxed text-muted-foreground/90">
              Soy <strong className="text-foreground">Erick Carvajal</strong>, Web3 Builder venezolano
              apasionado por la tecnología blockchain y el ecosistema Solana.
              Combino experiencia en desarrollo de smart contracts con habilidades
              en reclutamiento tech y estrategia digital.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground/80">
              Me enfoco en el desarrollo on-chain y en crear soluciones seguras y eficientes. 
              Creo contenido técnico y comparto mis aprendizajes sobre Solana, Rust, Anchor y el desarrollo de dApps.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 text-violet-400" />
                Cumaná, Venezuela
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="size-4 text-cyan-400" />
                Disponible para colaborar
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border/50 bg-background/30 p-5 text-center backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-background/50"
              >
                <stat.icon className="mx-auto mb-2 size-6 text-violet-400" />
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
