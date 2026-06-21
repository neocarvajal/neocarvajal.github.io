"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Wallet, Sparkles, AlertCircle, RefreshCw } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const WALLET = "8H8nCS6JUhKNJRHbC2fmr6ofHRLsYCapqVmb5CJJ6VE6"

interface NFT {
  name: string
  image: string
  mint: string
  description?: string
}

interface HeliusFile {
  uri?: string
}

interface HeliusAsset {
  id: string
  content?: {
    files?: HeliusFile[]
    links?: {
      image?: string
    }
    metadata?: {
      name?: string
      description?: string
    }
  }
}

export function NftGallerySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [nfts, setNfts] = useState<NFT[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNfts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=301bb746-d8d8-4f24-9b5d-e0bcff5d80ad`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "my-id",
          method: "getAssetsByOwner",
          params: {
            ownerAddress: WALLET,
            page: 1,
            limit: 6,
            displayOptions: {
              showFungible: false,
            },
          },
        }),
      })

      const data = await response.json()
      if (data.result && data.result.items) {
        const parsedNfts = data.result.items
          .filter((item: HeliusAsset) => item.content?.files?.[0]?.uri || item.content?.links?.image)
          .map((item: HeliusAsset) => ({
            name: item.content?.metadata?.name || "Unnamed NFT",
            image: item.content?.files?.[0]?.uri || item.content?.links?.image || "",
            mint: item.id || "",
            description: item.content?.metadata?.description || "",
          }))
        setNfts(parsedNfts.slice(0, 6))
      } else {
        throw new Error("No items found")
      }
    } catch (err) {
      console.error("Error fetching NFTs:", err)
      setError("No se pudieron cargar los NFTs reales. Mostrando galeria local:")
      setNfts([
        {
          name: "Solana Latam Builder #042",
          image: "https://images.unsplash.com/photo-1644075206780-94cb0c47b580?w=500&auto=format&fit=crop&q=80",
          mint: "LATAM...42a1",
          description: "Builders of the Solana ecosystem in Latin America",
        },
        {
          name: "Heavy Duty Camp Cadet",
          image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&auto=format&fit=crop&q=80",
          mint: "HDC...Z9y8",
          description: " bootcamp completion badge",
        },
        {
          name: "Superteam Earn Explorer",
          image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&auto=format&fit=crop&q=80",
          mint: "EARN...K1s9",
          description: "Contributing to the global decentralized economy",
        },
      ])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNfts()
  }, [fetchNfts])

  useEffect(() => {
    const el = sectionRef.current
    if (!el || loading) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelector(".section-title-anim"),
        { y: 60, rotateY: 8, opacity: 0, transformOrigin: "right center -150px" },
        { y: 0, rotateY: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top bottom-=80", end: "top center+=100", scrub: 1.2 }
        }
      )
      gsap.fromTo(el.querySelectorAll(".nft-card"),
        { y: 50, rotateX: 15, scale: 0.85, opacity: 0 },
        { y: 0, rotateX: 0, scale: 1, opacity: 1, duration: 1.3, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top bottom-=50", end: "top center+=100", scrub: 1.4 }
        }
      )
    }, el)
    return () => ctx.revert()
  }, [loading, nfts])

  return (
    <section id="nft" ref={sectionRef} className="relative z-10 px-4 py-32" style={{ perspective: 1200 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background/60 pointer-events-none" />
      <div className="mx-auto max-w-6xl relative">
        <div className="section-title-anim mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300 backdrop-blur-sm">
            <Sparkles className="size-3" />
            Colección digital
          </span>
          <h2
            className="mb-4 bg-gradient-to-r from-violet-200 via-fuchsia-200 to-rose-200 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
          >
            NFT Gallery
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Activos digitales en mi wallet de Solana
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-3">
            <a
              href={`https://solscan.io/account/${WALLET}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 border border-violet-500/20 px-4 py-2 text-sm text-violet-300 backdrop-blur-sm transition-colors hover:bg-violet-500/20"
            >
              <Wallet className="size-4" />
              <span className="font-mono text-xs">
                {WALLET.slice(0, 6)}...{WALLET.slice(-4)}
              </span>
              <ExternalLink className="size-3" />
            </a>
            <button
              onClick={fetchNfts}
              disabled={loading}
              className="p-2 rounded-full border border-border bg-background/30 hover:bg-background/60 text-muted-foreground transition-colors cursor-pointer"
              title="Actualizar NFTs"
            >
              <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {error && (
          <div className="mx-auto mb-10 max-w-lg rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-center text-xs text-amber-500 dark:text-amber-200 backdrop-blur-sm flex items-center justify-center gap-2">
            <AlertCircle className="size-4 text-amber-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse rounded-2xl border border-border/50 bg-background/20 p-4 h-80 flex flex-col justify-between">
                <div className="h-48 rounded-xl bg-muted/30" />
                <div className="h-6 w-2/3 rounded bg-muted/30 mt-4" />
                <div className="h-4 w-1/2 rounded bg-muted/20 mt-2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ transformStyle: "preserve-3d" }}>
            {nfts.map((nft) => (
              <div
                key={nft.mint}
                className="nft-card group relative overflow-hidden rounded-2xl border border-border/50 bg-background/30 p-4 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-background/50 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1644075206780-94cb0c47b580?w=500&auto=format&fit=crop&q=80"
                    }}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-md font-semibold text-foreground truncate group-hover:text-violet-300 transition-colors">
                    {nft.name}
                  </h3>
                  {nft.description && (
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {nft.description}
                    </p>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-muted-foreground/60">
                      Mint: {nft.mint.slice(0, 5)}...
                    </span>
                    <a
                      href={`https://solscan.io/token/${nft.mint}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-violet-400 dark:text-violet-300 hover:text-violet-200 font-medium"
                    >
                      Explorer
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <a
            href={`https://solscan.io/account/${WALLET}?tab=nft`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-violet-300"
          >
            Ver toda mi actividad en Solscan
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
