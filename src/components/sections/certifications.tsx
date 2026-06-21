"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Award, Calendar, ShieldCheck, ExternalLink } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const certifications = [
  {
    title: "Taller Frontend: Creación de un Solana Client",
    issuer: "WayLearn & Solana Foundation",
    date: "Abr. 2026",
    skills: ["Blockchain", "Solana Client Development", "Frontend"],
    credentialUrl: "https://www.linkedin.com/in/neocarvajal/details/certifications/",
    credentialId: "",
  },
  {
    title: "Solana Latam Builders Program - Rust",
    issuer: "WayLearn & Solana Foundation",
    date: "Feb. 2026",
    credentialId: "1WJNb_Trh-fuPQZUAVAayjuyOBEW-8jud",
    desc: "Certificado de finalización en la 1era cohorte del programa para desarrolladores de software en Solana.",
    skills: ["Rust", "Solana", "Smart Contracts", "Anchor"],
    credentialUrl: "https://www.linkedin.com/in/neocarvajal/details/certifications/",
  },
  {
    title: "Blockchain Basics",
    issuer: "Cyfrin Updraft",
    date: "Oct. 2025",
    credentialId: "9WKQTRCMO2SM",
    skills: ["Blockchain", "Security", "Smart Contracts"],
    credentialUrl: "https://www.linkedin.com/in/neocarvajal/details/certifications/",
  },
  {
    title: "Heavy Duty Camp - Bootcamp (Spain)",
    issuer: "Heavy Duty Builders",
    date: "Nov. 2024",
    credentialId: "9AJed5xXPFyZFm5kt5N8PSz789wtA349d6NSC6HAzhbK",
    desc: "Vibrant community of developers dedicated to supporting fellow software enthusiasts in the Solana ecosystem.",
    skills: ["Blockchain", "Web3", "Anchor", "React"],
    credentialUrl: "https://www.linkedin.com/in/neocarvajal/details/certifications/",
  },
  {
    title: "Chainlink Bootcamp",
    issuer: "Chainlink",
    date: "Jun. 2024",
    credentialId: "7137924",
    desc: "20 hours, 10 days bootcamp focused on smart contract development and Chainlink oracle integrations.",
    skills: ["Blockchain", "Oracles", "Solidity"],
    credentialUrl: "https://www.linkedin.com/in/neocarvajal/details/certifications/",
  },
  {
    title: "Billion Reasons to Build Bootcamp (Global)",
    issuer: "Push Protocol",
    date: "Ago. 2024",
    credentialId: "0x4edc5b4da5874ca635d7c5f301d700bd9a5b33e057c333554fa5f7b77a90e8b8",
    skills: ["Blockchain", "Web3 Notifications"],
    credentialUrl: "https://www.linkedin.com/in/neocarvajal/details/certifications/",
  },
]

export function CertificationsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const cards = el.querySelectorAll(".cert-card")

    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelector(".section-title-anim"),
        { y: 60, rotateX: -8, opacity: 0, transformOrigin: "center top -150px" },
        { y: 0, rotateX: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top bottom-=80", end: "top center+=100", scrub: 1.2 }
        }
      )
      gsap.fromTo(cards,
        { y: 80, rotateX: 10, scale: 0.9, opacity: 0 },
        { y: 0, rotateX: 0, scale: 1, opacity: 1, duration: 1.3, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top bottom-=50", end: "top center+=120", scrub: 1.4 }
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="certifications" ref={sectionRef} className="relative z-10 px-4 py-32" style={{ perspective: 1200 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background/60 pointer-events-none" />
      <div className="mx-auto max-w-6xl">
        <div className="section-title-anim mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300 backdrop-blur-sm">
            <Award className="size-3" />
            Educación y validación
          </span>
          <h2 className="bg-gradient-to-r from-violet-200 via-fuchsia-200 to-cyan-200 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            Certificaciones
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Acreditaciones clave en desarrollo Blockchain, Rust y Web3
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ transformStyle: "preserve-3d" }}>
          {certifications.map((c) => (
            <div
              key={c.title}
              className="cert-card group relative flex flex-col justify-between rounded-2xl border border-border/50 bg-background/30 p-6 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-background/50 hover:shadow-2xl hover:shadow-violet-500/10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1 rounded bg-violet-500/10 px-2 py-1 text-[10px] font-medium text-violet-300">
                    <ShieldCheck className="size-3" />
                    {c.issuer}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground/60">
                    <Calendar className="size-3" />
                    {c.date}
                  </div>
                </div>

                <h3 className="mb-2 text-md font-semibold leading-tight text-foreground transition-colors group-hover:text-violet-200">
                  {c.title}
                </h3>

                {c.desc && (
                  <p className="mb-4 text-xs text-muted-foreground/80 leading-relaxed">
                    {c.desc}
                  </p>
                )}

                {c.credentialId && (
                  <div className="mb-4 font-mono text-[9px] text-muted-foreground/40 truncate">
                    ID: {c.credentialId}
                  </div>
                )}
              </div>

              <div>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {c.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-muted/40 px-2 py-0.5 text-[9px] text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <a
                  href={c.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-background/20 py-2 text-xs font-medium backdrop-blur-sm transition-all hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300"
                >
                  Mostrar credencial
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
