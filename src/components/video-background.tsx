"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const VIDEOS = [
  { src: "/videos/neo-programador-solana1.mp4", range: [0, 0.55] as [number, number] },
  { src: "/videos/neo-programador-solana2.mp4", range: [0.45, 1] as [number, number] },
]

const FADE = 0.08
const IS_DEV = process.env.NODE_ENV === "development"

function debugLog(...args: unknown[]) {
  if (IS_DEV) console.log("[VideoScrub]", ...args)
}

// Smooth parallax drifts
const PARALLAX = [
  { scaleStart: 1.0, scaleEnd: 1.15, yStart: 0, yEnd: -4 },
  { scaleStart: 1.12, scaleEnd: 1.0, yStart: 3, yEnd: 0 },
]

export function VideoBackground() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null])
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(true)
  const [errorCount, setErrorCount] = useState(0)
  const readyCount = useRef(0)
  const totalNeeded = VIDEOS.length

  // Interpolated progress variables for smoothing seek lag
  const smoothProgress = useRef(0)
  const targetProgress = useRef(0)
  const animationFrameId = useRef<number | null>(null)

  // Reset scroll on mount
  useEffect(() => {
    window.scrollTo(0, 0)
    history.scrollRestoration = "manual"
  }, [])

  // Mark a video as ready (either loaded or errored)
  const markReady = useCallback((type: "loaded" | "error", index: number) => {
    readyCount.current++
    debugLog(`Video ${index} ${type}. Ready: ${readyCount.current}/${totalNeeded}`)

    if (type === "error") {
      setErrorCount((prev) => prev + 1)
    }

    if (readyCount.current >= totalNeeded) {
      setReady(true)
      setLoading(false)
      debugLog("All videos ready. Initializing ScrollTrigger.")
    }
  }, [totalNeeded])

  // Interpolation loop to smooth out video currentTime seeking and prevent visual stutter (seeking lag)
  useEffect(() => {
    if (!ready) return

    const smoothSeekLoop = () => {
      // Linear interpolation: smoothProgress catches up to targetProgress gradually (0.1 interpolation factor)
      const diff = targetProgress.current - smoothProgress.current
      if (Math.abs(diff) > 0.001) {
        smoothProgress.current += diff * 0.1
      } else {
        smoothProgress.current = targetProgress.current
      }

      const p = smoothProgress.current
      const videos = videoRefs.current

      VIDEOS.forEach((cfg, i) => {
        const video = videos[i]
        if (!video || !video.duration || Number.isNaN(video.duration)) return

        const [rStart, rEnd] = cfg.range
        const px = PARALLAX[i]

        // Seek calculation using interpolated smooth progress
        if (p >= rStart) {
          if (p <= rEnd) {
            const localP = Math.max(0, Math.min(1, (p - rStart) / (rEnd - rStart)))
            // If it's the second video, offset start to 0.03s
            const startOffset = i === 1 ? 0.03 : 0
            const targetTime = startOffset + localP * (video.duration - startOffset)
            
            // Check HTMLVideoElement readyState before seeking to prevent freezes
            if (video.readyState >= 2 && Math.abs(video.currentTime - targetTime) > 0.04) {
              video.currentTime = targetTime
            }
          } else if (i === VIDEOS.length - 1) {
            video.currentTime = video.duration - 0.05
          }
        }

        // Opacity transition
        let opacity = 0
        if (i === 0) {
          opacity = p < rEnd - FADE ? 1 : Math.max(0, (rEnd - p) / FADE)
        } else {
          opacity = p > rStart + FADE ? 1 : Math.max(0, (p - rStart) / FADE)
        }
        video.style.opacity = String(opacity)

        // Parallax transform
        const scale = px.scaleStart + (px.scaleEnd - px.scaleStart) * Math.min(1, p)
        const yPct = px.yStart + (px.yEnd - px.yStart) * Math.min(1, p)
        video.style.transform = `scale(${scale.toFixed(4)}) translateY(${yPct.toFixed(2)}%)`
      })

      animationFrameId.current = requestAnimationFrame(smoothSeekLoop)
    }

    animationFrameId.current = requestAnimationFrame(smoothSeekLoop)

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current)
    }
  }, [ready])

  // Prime videos and create ScrollTrigger once all are ready
  useEffect(() => {
    const videos = videoRefs.current
    if (!ready || videos.some((v) => !v)) return

    const primePromises = videos.map((v, i) => {
      if (!v) return Promise.resolve()
      v.currentTime = 0.001
      return v.play()
        .then(() => {
          v.pause()
          v.currentTime = 0
          debugLog(`Video ${i} primed. Duration: ${v.duration}s, ReadyState: ${v.readyState}`)
        })
        .catch((err) => {
          debugLog(`Video ${i} prime failed:`, err.message)
        })
    })

    let st: ScrollTrigger | null = null

    Promise.all(primePromises).then(() => {
      requestAnimationFrame(() => {
        st = ScrollTrigger.create({
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Increased GSAP scrub value to smooth the scroll updates
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Simply capture target scroll progress; seeking is smoothed in the RAF loop
            targetProgress.current = self.progress
          },
        })

        ScrollTrigger.refresh()
        debugLog("ScrollTrigger created. ScrollHeight:", document.body.scrollHeight)
      })
    })

    return () => {
      if (st) st.kill()
    }
  }, [ready])

  const allErrored = errorCount >= totalNeeded

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-background">
      {/* Loading shimmer overlay */}
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-700">
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-12 w-12">
              <div
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  borderTopColor: "#a855f7",
                  borderRightColor: "#22d3ee",
                  animation: "spin 1s linear infinite",
                }}
              />
              <div
                className="absolute inset-1 rounded-full border-2 border-transparent"
                style={{
                  borderBottomColor: "#f472b6",
                  borderLeftColor: "#67e8f9",
                  animation: "spin 1.5s linear infinite reverse",
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground/50 animate-pulse">Cargando experiencia...</p>
          </div>
        </div>
      )}

      {/* Error fallback gradient */}
      {allErrored && (
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/80 via-background to-cyan-950/80" />
      )}

      {/* Video elements */}
      {VIDEOS.map((cfg, i) => (
        <video
          key={cfg.src}
          ref={(el) => { videoRefs.current[i] = el }}
          src={cfg.src}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{
            opacity: i === 0 ? 1 : 0,
            transformOrigin: "center center",
          }}
          muted
          playsInline
          preload="auto"
          onCanPlayThrough={() => markReady("loaded", i)}
          onError={() => markReady("error", i)}
        />
      ))}

      {/* Modern gradient overlay supporting light/dark theme translucency */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/40 mix-blend-normal" />
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent via-background/5 to-background/50" />
    </div>
  )
}
