"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Code2, Globe, Layers, GraduationCap, Wallet, Bot, Sparkles,
} from "lucide-react"
import { ChatModal } from "@/components/chat-modal"
import { useLang } from "@/lib/i18n"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: "smart-contracts",
    title: "Smart Contracts",
    tagline: "Solana · Rust · Anchor",
    description:
      "Desarrollo y auditoría de contratos inteligentes en Solana. Desde tokens SPL hasta programas complejos con CPI y PDAs.",
    icon: Code2,
    gradient: "from-violet-500 to-purple-600",
    color: "violet",
  },
  {
    id: "dapps",
    title: "DApps Web3",
    tagline: "Next.js · React · Wallet Adapter",
    description:
      "Construcción de aplicaciones descentralizadas full-stack con integración de wallets, RPC y experiencia de usuario fluida.",
    icon: Globe,
    gradient: "from-cyan-500 to-blue-600",
    color: "cyan",
  },
  {
    id: "consulting",
    title: "Consultoría Técnica",
    tagline: "Arquitectura · Estrategia · Optimización",
    description:
      "Asesoramiento en arquitectura blockchain, optimización de programas Solana, y mejores prácticas de seguridad.",
    icon: Layers,
    gradient: "from-fuchsia-500 to-pink-600",
    color: "fuchsia",
  },
  {
    id: "mentoring",
    title: "Mentoría & Formación",
    tagline: "1-on-1 · Workshops · Recursos",
    description:
      "Formación personalizada en desarrollo Web3, desde fundamentos de Solana hasta patrones avanzados de Anchor.",
    icon: GraduationCap,
    gradient: "from-emerald-500 to-teal-600",
    color: "emerald",
  },
  {
    id: "wallet-rpc",
    title: "Wallet & RPC Integration",
    tagline: "Carteras · Endpoints · Proveedores",
    description:
      "Integración de wallets (Phantom, Backpack, etc.), optimización de conexiones RPC y gestión de endpoints.",
    icon: Wallet,
    gradient: "from-amber-500 to-orange-600",
    color: "amber",
  },
  {
    id: "automation",
    title: "Bots & Automation",
    tagline: "Scripts · Bots · Herramientas",
    description:
      "Automatización de procesos en blockchain: monitoreo de wallets, trading bots, y herramientas de análisis en cadena.",
    icon: Bot,
    gradient: "from-rose-500 to-red-600",
    color: "rose",
  },
]

type ServiceId = (typeof services)[number]["id"]

export function ServicesSection() {
  const { lang, tx } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedService, setSelectedService] = useState<ServiceId | null>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelector(".section-title-anim"),
        { y: 60, rotateY: 8, opacity: 0, transformOrigin: "right center -150px" },
        {
          y: 0, rotateY: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top bottom-=80", end: "top center+=100", scrub: 1.2 },
        }
      )
      gsap.fromTo(el.querySelectorAll(".service-card"),
        { y: 50, rotateX: 15, scale: 0.85, opacity: 0 },
        {
          y: 0, rotateX: 0, scale: 1, opacity: 1, duration: 1.3, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top bottom-=50", end: "top center+=100", scrub: 1.4 },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  const selectedServiceData = services.find((s) => s.id === selectedService) ?? null

  return (
    <>
      <section
        id="services"
        ref={sectionRef}
        className="relative z-10 px-4 py-32"
        style={{ perspective: 1200 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background/60 pointer-events-none" />
        <div className="mx-auto max-w-6xl relative">
          <div className="section-title-anim mb-16 text-center">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300 backdrop-blur-sm">
              <Sparkles className="size-3" />
              {tx.services.badge[lang]}
            </span>
            <h2 className="mb-4 bg-gradient-to-r from-violet-200 via-fuchsia-200 to-cyan-200 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
              {tx.services.title[lang]}
            </h2>
            <p className="mx-auto max-w-lg text-muted-foreground">
              {tx.services.desc[lang]}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ transformStyle: "preserve-3d" }}>
            {services.map((service) => {
              const Icon = service.icon
              return (
                <button
                  key={service.id}
                  onPointerDown={() => setSelectedService(service.id)}
                  className="service-card group relative w-full overflow-hidden rounded-2xl border border-border/50 bg-background/30 p-6 backdrop-blur-xl text-left transition-all duration-500 hover:border-violet-500/30 hover:bg-background/50 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                  style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
                >
                  <div className={`mb-4 flex size-14 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg`}>
                    <Icon className="size-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-violet-200 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-xs font-mono text-muted-foreground/70">
                    {service.tagline}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-violet-400 dark:text-violet-300 group-hover:text-violet-200 transition-colors">
                    <span>{tx.services.cta[lang]}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                  <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.04]`} />
                </button>
              )
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground/60">
              {tx.services.help[lang]}{' '}
              <a
                href="#social"
                className="text-violet-300 hover:text-violet-200 transition-colors"
              >
                {tx.services.contact[lang]}
              </a>
            </p>
          </div>
        </div>
      </section>

      {selectedServiceData && (
        <ChatModal
          service={selectedServiceData}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  )
}
