"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Calendar, Clock, Sparkles } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const posts = [
  {
    title: "How Token-2022 Changes Token Logic",
    desc: "Hands-on experiment con minting, transfers y burning en Solana",
    date: "2025-03-15",
    url: "https://dev.to/neocarvajal/how-token-2022-changes-token-logic",
    readTime: "3 min",
  },
  {
    title: "Auditing a Real Solana Transaction",
    desc: "Creando una cuenta USDC en Devnet paso a paso",
    date: "2025-03-10",
    url: "https://dev.to/neocarvajal/auditing-a-real-solana-transaction",
    readTime: "2 min",
  },
  {
    title: "Solana's Account Model for Web2 Devs",
    desc: "El modelo de cuentas de Solana explicado para developers web2",
    date: "2025-03-05",
    url: "https://dev.to/neocarvajal/solanas-account-model-explained-for-web2-developers",
    readTime: "4 min",
  },
  {
    title: "Anatomy of a Solana Transaction",
    desc: "Cada paso desde creación hasta finalización de una transacción",
    date: "2025-02-28",
    url: "https://dev.to/neocarvajal/anatomy-of-a-solana-transaction",
    readTime: "4 min",
  },
  {
    title: "Your Wallet Is Your Identity",
    desc: "La wallet de Solana como identidad digital en web3",
    date: "2025-02-20",
    url: "https://dev.to/neocarvajal/your-solana-wallet-is-more-than-a-wallet",
    readTime: "3 min",
  },
  {
    title: "Solana Vanity Addresses",
    desc: "Generación de direcciones vanity en Solana",
    date: "2025-02-15",
    url: "https://dev.to/neocarvajal/revisiting-solana-identity-through-vanity-addresses",
    readTime: "3 min",
  },
]

export function BlogPostsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const cards = el.querySelectorAll(".blog-card")

    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelector(".section-title-anim"),
        { y: 60, rotateY: -8, opacity: 0, transformOrigin: "left center -150px" },
        { y: 0, rotateY: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top bottom-=80", end: "top center+=100", scrub: 1.2 }
        }
      )
      gsap.fromTo(cards,
        { y: 80, rotateY: -14, rotateX: 6, scale: 0.75, opacity: 0, transformOrigin: "left top -200px" },
        { y: 0, rotateY: 0, rotateX: 0, scale: 1, opacity: 1, duration: 1.5, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top bottom-=50", end: "top center+=120", scrub: 1.3 }
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="blog" ref={sectionRef} className="relative z-10 px-4 py-32" style={{ perspective: 1200 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background/60 pointer-events-none" />
      <div className="mx-auto max-w-6xl relative">
        <div className="section-title-anim mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-1.5 text-xs text-fuchsia-300 backdrop-blur-sm">
            <Sparkles className="size-3" />
            Artículos técnicos
          </span>
          <h2
            className="mb-4 bg-gradient-to-r from-fuchsia-200 via-violet-200 to-cyan-200 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
          >
            Blog
          </h2>
          <p className="mx-auto max-w-md text-muted-foreground">
            Escribo sobre Solana, blockchain y desarrollo Web3
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ transformStyle: "preserve-3d" }}>
          {posts.map((post) => (
            <a
              key={post.title}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-card group block h-full"
            >
              <div className="relative h-full overflow-hidden rounded-2xl border border-border/50 bg-background/30 p-6 backdrop-blur-xl transition-all duration-500 hover:border-fuchsia-500/30 hover:bg-background/50 hover:shadow-2xl hover:shadow-fuchsia-500/10">
                <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3" />
                    {new Date(post.date).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3
                  className="mb-2 font-semibold leading-snug transition-colors group-hover:text-fuchsia-200"
                  >
                    {post.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{post.desc}</p>
                <ExternalLink className="mt-4 size-3.5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100" />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://dev.to/neocarvajal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-fuchsia-300"
          >
            Ver todos en Dev.to
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
