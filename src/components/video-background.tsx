"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const VIDEOS = [
  { src: "/videos/neo-programador-solana1.mp4", range: [0, 0.55] as [number, number] },
  { src: "/videos/neo-programador-solana2.mp4", range: [0.45, 1] as [number, number], startTime: 2.18 },
]

const FADE = 0.08
const IS_DEV = process.env.NODE_ENV === "development"
function debugLog(...args: unknown[]) { if (IS_DEV) console.log("[VideoScrub]", ...args) }

type TransitionPreset = {
  opacityInFrom: number; opacityOutTo: number
  scaleInFrom: number; scaleOutTo: number
  xInFrom: number; xOutTo: number
  yInFrom: number; yOutTo: number
  blurInFrom?: number; blurOutTo?: number
}

const TRANSITIONS = {
  FADE: { opacityInFrom: 0, opacityOutTo: 0, scaleInFrom: 1, scaleOutTo: 1, xInFrom: 0, xOutTo: 0, yInFrom: 0, yOutTo: 0 },
  ZOOM_CROSS: { opacityInFrom: 0, opacityOutTo: 0, scaleInFrom: 1.2, scaleOutTo: 1.2, xInFrom: 0, xOutTo: 0, yInFrom: 0, yOutTo: 0 },
  GLITCH_ENTER: { opacityInFrom: 0, opacityOutTo: 0, scaleInFrom: 1.1, scaleOutTo: 0.95, xInFrom: -2, xOutTo: 2, yInFrom: 0, yOutTo: 0, blurInFrom: 8, blurOutTo: 8 },
} as const satisfies Record<string, TransitionPreset>

const VIDEO_TRANSITIONS = [TRANSITIONS.GLITCH_ENTER, TRANSITIONS.ZOOM_CROSS]

type ParallaxPreset = { scaleStart: number; scaleEnd: number; xStart: number; xEnd: number; yStart: number; yEnd: number }

const CAMERA_PRESETS = {
  STATIC: { scaleStart: 1, scaleEnd: 1.15, xStart: 0, xEnd: 0, yStart: 0, yEnd: -4 },
  SOLANA_HERO: { scaleStart: 0.9, scaleEnd: 0.9, xStart: 0, xEnd: 0, yStart: 0, yEnd: 0 },
} as const satisfies Record<string, ParallaxPreset>

const PARALLAX = [CAMERA_PRESETS.STATIC, CAMERA_PRESETS.SOLANA_HERO]

function GradientOrbs() {
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(orb1Ref.current, {
        x: "20vw", y: "15vh", scale: 1.3,
        duration: 14, ease: "sine.inOut", repeat: -1, yoyo: true,
      })
      gsap.to(orb2Ref.current, {
        x: "-15vw", y: "-20vh", scale: 1.4,
        duration: 18, ease: "sine.inOut", repeat: -1, yoyo: true,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <div ref={orb1Ref} className="absolute -left-32 -top-32 size-[500px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #a855f7 0%, #6366f1 50%, transparent 70%)" }} />
      <div ref={orb2Ref} className="absolute -bottom-32 -right-32 size-[400px] rounded-full opacity-20 blur-[100px]"
        style={{ background: "radial-gradient(circle, #22d3ee 0%, #06b6d4 50%, transparent 70%)" }} />
    </>
  )
}

export function VideoBackground() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null])
  const [videosLoaded, setVideosLoaded] = useState(false)
  const readyCount = useRef(0)
  const totalNeeded = VIDEOS.length
  const smoothProgress = useRef(0)
  const targetProgress = useRef(0)
  const animationFrameId = useRef<number | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    history.scrollRestoration = "manual"
  }, [])

  // Start ScrollTrigger immediately so page scroll works
  const stInited = useRef(false)
  useEffect(() => {
    if (stInited.current) return
    stInited.current = true
    requestAnimationFrame(() => {
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => { targetProgress.current = self.progress },
      })
      ScrollTrigger.refresh()
      debugLog("ScrollTrigger created.")
    })
  }, [])

  const markReady = useCallback((_type: "loaded" | "error", _index: number) => {
    if (readyCount.current >= totalNeeded) return
    readyCount.current++
    debugLog(`Video ${_index} ${_type}. Ready: ${readyCount.current}/${totalNeeded}`)
    if (readyCount.current >= totalNeeded) {
      setVideosLoaded(true)
      debugLog("All videos ready.")
    }
  }, [totalNeeded])

  // Video seek loop — runs only when videos are loaded
  useEffect(() => {
    if (!videosLoaded) return

    const videos = videoRefs.current
    videos.forEach((v, i) => {
      const initTime = VIDEOS[i].startTime ?? 0
      if (v) v.currentTime = initTime
    })

    let lastProgress = -1
    const SEEK_THRESHOLD = 0.08
    const SMOOTH = 0.12

    const smoothSeekLoop = () => {
      const diff = targetProgress.current - smoothProgress.current
      smoothProgress.current += diff * SMOOTH

      const p = smoothProgress.current

      if (Math.abs(p - lastProgress) < 0.003) {
        animationFrameId.current = requestAnimationFrame(smoothSeekLoop)
        return
      }
      lastProgress = p

      VIDEOS.forEach((cfg, i) => {
        const video = videos[i]
        if (!video || !video.duration || Number.isNaN(video.duration)) return

        const [rStart, rEnd] = cfg.range
        const px = PARALLAX[i]
        const transition = VIDEO_TRANSITIONS[i]
        const startOffset = cfg.startTime ?? 0

        if (p >= rStart) {
          if (p <= rEnd) {
            const localP = Math.max(0, Math.min(1, (p - rStart) / (rEnd - rStart)))
            const dur = video.duration - startOffset
            const targetTime = startOffset + localP * Math.max(dur, 0)
            if (video.readyState >= 2 && Math.abs(video.currentTime - targetTime) > SEEK_THRESHOLD) {
              video.currentTime = targetTime
            }
          } else if (i === VIDEOS.length - 1) {
            video.currentTime = video.duration - 0.05
          }
        } else if (startOffset > 0 && Math.abs(video.currentTime - startOffset) > 0.8) {
          video.currentTime = startOffset
        }

        const localP = Math.max(0, Math.min(1, (p - rStart) / (rEnd - rStart)))

        if (i === 0) {
          video.style.opacity = String(p < rEnd - FADE ? 1 : Math.max(0, (rEnd - p) / FADE))
        } else {
          video.style.opacity = String(p > rStart + FADE ? 1 : Math.max(0, (p - rStart) / FADE))
        }

        const camScale = px.scaleStart + (px.scaleEnd - px.scaleStart) * localP
        const camX = px.xStart + (px.xEnd - px.xStart) * localP
        const camY = px.yStart + (px.yEnd - px.yStart) * localP
        const trScale = transition.scaleInFrom + (transition.scaleOutTo - transition.scaleInFrom) * localP
        const trX = transition.xInFrom + (transition.xOutTo - transition.xInFrom) * localP
        const trY = transition.yInFrom + (transition.yOutTo - transition.yInFrom) * localP

        video.style.transform =
          `translate3d(${(camX + trX).toFixed(2)}%, ${(camY + trY).toFixed(2)}%, 0) scale(${(camScale * trScale).toFixed(4)})`
      })

      animationFrameId.current = requestAnimationFrame(smoothSeekLoop)
    }

    animationFrameId.current = requestAnimationFrame(smoothSeekLoop)
    return () => { if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current) }
  }, [videosLoaded])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-background">
      {/* Gradient with animated orbs — shown immediately, always */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${videosLoaded ? "opacity-0" : "opacity-100"}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/80 via-background to-cyan-950/80" />
        <GradientOrbs />
      </div>

      {/* Video elements — fade in when loaded */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${videosLoaded ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        {VIDEOS.map((cfg, i) => (
          <video
            key={cfg.src}
            ref={(el) => { videoRefs.current[i] = el; if (el && el.readyState >= 2) markReady("loaded", i) }}
            src={cfg.src}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            style={{ opacity: i === 0 ? 1 : 0, transformOrigin: "center center" }}
            muted playsInline preload="auto"
            onCanPlayThrough={() => markReady("loaded", i)}
            onError={() => markReady("error", i)}
          />
        ))}
      </div>

      {/* Gradient overlays — always on top of everything */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/40 mix-blend-normal" />
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent via-background/5 to-background/50" />
    </div>
  )
}
