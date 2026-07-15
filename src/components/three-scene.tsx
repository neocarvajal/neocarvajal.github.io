"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  Float, AdaptiveDpr,
  TorusKnot, Icosahedron, Octahedron, Dodecahedron,
  Cone, Tetrahedron, Box, Torus,
} from "@react-three/drei"
import * as THREE from "three"

const warn = console.warn
console.warn = (...args) => {
  if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return
  warn(...args)
}

interface SceneProps {
  scrollRef: React.RefObject<number>
  isMobile: boolean
  reducedMotion: boolean
}

const NEON_COLORS = ["#a855f7", "#22d3ee", "#f472b6", "#67e8f9", "#c084fc"]

interface GeoConfig {
  geometry: React.ElementType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any[]
  position: [number, number, number]
  color: string
  rotSpeed: [number, number]
  wireframe: boolean
  id: number
}

const GEOMETRIES: GeoConfig[] = [
  { geometry: Torus, args: [0.6, 0.15, 16, 48], position: [-3.5, 2, -6], color: "#a855f7", rotSpeed: [0.6, 0.8], wireframe: false, id: 0 },
  { geometry: Icosahedron, args: [0.7, 0], position: [3.5, -1.5, -8], color: "#22d3ee", rotSpeed: [0.5, 0.9], wireframe: true, id: 1 },
  { geometry: Box, args: [1.2, 1.8, 0.4], position: [-2.5, -3, -10], color: "#f472b6", rotSpeed: [0.7, 0.4], wireframe: false, id: 2 },
  { geometry: TorusKnot, args: [0.5, 0.18, 64, 8], position: [2, 3.5, -12], color: "#67e8f9", rotSpeed: [0.8, 0.6], wireframe: false, id: 3 },
  { geometry: Octahedron, args: [0.6, 0], position: [-4, -2, -14], color: "#c084fc", rotSpeed: [1.0, 0.5], wireframe: true, id: 4 },
  { geometry: Torus, args: [0.7, 0.12, 16, 48], position: [4.5, 1, -16], color: "#a855f7", rotSpeed: [0.4, 1.1], wireframe: false, id: 5 },
  { geometry: Dodecahedron, args: [0.5, 0], position: [-3.5, 3, -18], color: "#22d3ee", rotSpeed: [0.9, 0.3], wireframe: true, id: 6 },
  { geometry: Cone, args: [0.5, 1, 6], position: [3, -3.5, -20], color: "#f472b6", rotSpeed: [0.6, 0.8], wireframe: false, id: 7 },
  { geometry: Tetrahedron, args: [0.7, 0], position: [-1.5, 0, -22], color: "#67e8f9", rotSpeed: [0.2, 0.5], wireframe: true, id: 8 },
  { geometry: TorusKnot, args: [0.4, 0.12, 48, 6], position: [1.5, -2, -24], color: "#c084fc", rotSpeed: [1.2, 0.9], wireframe: false, id: 9 },
]

export default function ThreeScene({ scrollRef, isMobile, reducedMotion }: SceneProps) {
  return (
    <Canvas
      camera={{ position: isMobile ? [0, 0, 14] : [0, 0, 10], fov: 55 }}
      dpr={isMobile ? [0.8, 1] : [1, 1.5]}
      gl={{ alpha: true, antialias: !isMobile }}
      frameloop="always"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <AdaptiveDpr pixelated />
      <SceneContent scrollRef={scrollRef} isMobile={isMobile} reducedMotion={reducedMotion} />
    </Canvas>
  )
}

function SceneContent({ scrollRef, isMobile, reducedMotion }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[8, 10, 5]} color="#a855f7" intensity={1.5} distance={40} />
      <pointLight position={[-8, -5, 8]} color="#22d3ee" intensity={1.2} distance={35} />
      <pointLight position={[0, 10, -5]} color="#f472b6" intensity={1.0} distance={30} />
      <pointLight position={[5, -8, -10]} color="#67e8f9" intensity={0.8} distance={30} />

      <EnergyField scrollRef={scrollRef} reducedMotion={reducedMotion} />
      <EnergyRings scrollRef={scrollRef} reducedMotion={reducedMotion} />
      <HolographicPanels reducedMotion={reducedMotion} />
      <Geometries scrollRef={scrollRef} isMobile={isMobile} reducedMotion={reducedMotion} />
      <GlowOrbs />
    </>
  )
}

function EnergyField({ scrollRef, reducedMotion }: { scrollRef: React.RefObject<number>; reducedMotion: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const count = 2000

  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 6 + Math.random() * 6
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.cos(phi) * 0.6
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 10
    }
    return pos
  })

  useFrame((state) => {
    if (!ref.current || reducedMotion) return
    const p = scrollRef.current
    const elapsed = state.clock.elapsedTime
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3 + 1] += Math.sin(elapsed * 0.5 + i * 0.003) * 0.002
      pos[i3] += Math.cos(elapsed * 0.4 + i * 0.003) * 0.001
    }
    ref.current.geometry.attributes.position.needsUpdate = true
    const mat = ref.current.material as THREE.PointsMaterial
    mat.size = 0.06 + p * 0.12
  })

  const [colors] = useState(() => {
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const c = new THREE.Color(NEON_COLORS[i % NEON_COLORS.length])
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
    }
    return col
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        <bufferAttribute args={[colors, 3]} attach="attributes-color" />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function EnergyRings({ scrollRef, reducedMotion }: { scrollRef: React.RefObject<number>; reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const NEONS = ["#a855f7", "#22d3ee", "#f472b6", "#67e8f9", "#c084fc", "#a855f7"]

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return
    const p = scrollRef.current
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08 * (0.5 + p * 0.5)
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh
      mesh.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.1
      const mat = mesh.material as THREE.MeshPhongMaterial
      mat.emissiveIntensity = 0.8 + Math.sin(state.clock.elapsedTime * 0.5 + i * 0.7) * 0.4
    })
  })

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[0, -3 + i * 1.4, 0]} rotation={[0.6, i * 0.5, 0]}>
          <torusGeometry args={[4 + i * 0.5, 0.08 + i * 0.02, 18, 64]} />
          <meshPhongMaterial
            color={NEONS[i]}
            emissive={NEONS[i]}
            emissiveIntensity={1.2}
            transparent
            opacity={0.5 + i * 0.04}
            shininess={90}
          />
        </mesh>
      ))}
    </group>
  )
}

function HolographicPanels({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x = Math.sin(state.clock.elapsedTime * 0.15 + i * 0.5) * 0.05
      child.rotation.y = state.clock.elapsedTime * 0.05 * (i % 2 === 0 ? 1 : -1)
    })
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh
          key={i}
          position={[i * 4 - 6, i * 2 - 4, -14 - i * 3]}
          rotation={[0.2, i * 0.3, 0.1]}
        >
          <planeGeometry args={[3, 2.2]} />
          <meshPhongMaterial
            color="#67e8f9"
            emissive="#22d3ee"
            emissiveIntensity={0.6}
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      ))}
    </group>
  )
}

function GeometryMesh({ config, scrollRef, reducedMotion }: { config: GeoConfig; scrollRef: React.RefObject<number>; reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const startY = config.position[1]
  const startX = config.position[0]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Geom = config.geometry as React.ComponentType<any>

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current || reducedMotion) return
    const progress = scrollRef.current

    meshRef.current.rotation.x += delta * config.rotSpeed[0]
    meshRef.current.rotation.y += delta * config.rotSpeed[1]

    const parallax = 1 + Math.abs(config.position[2]) * 0.06
    groupRef.current.position.y = startY + progress * 3.5 * parallax
    groupRef.current.position.x = startX + progress * 1.2 * parallax

    const material = meshRef.current.material as THREE.MeshPhongMaterial
    const pulse = 0.6 + Math.sin(state.clock.elapsedTime * 0.6 + config.id * 0.8) * 0.3
    material.emissiveIntensity = pulse + progress * 0.5
  })

  return (
    <group ref={groupRef} position={[startX, startY, config.position[2]]}>
      <Float speed={0.5} floatIntensity={reducedMotion ? 0 : 1.5} enabled={!reducedMotion}>
        <mesh ref={meshRef}>
          <Geom args={config.args} />
          <meshPhongMaterial
            color={config.color}
            emissive={config.color}
            emissiveIntensity={0.9}
            shininess={80}
            transparent
            opacity={0.8}
            wireframe={config.wireframe}
          />
        </mesh>
      </Float>
    </group>
  )
}

function Geometries({ scrollRef, isMobile, reducedMotion }: SceneProps) {
  const items = isMobile ? GEOMETRIES.slice(0, 5) : GEOMETRIES
  return (
    <>
      {items.map((config) => (
        <GeometryMesh key={config.id} config={config} scrollRef={scrollRef} reducedMotion={reducedMotion} />
      ))}
    </>
  )
}

function createGlowTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext("2d")!
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  gradient.addColorStop(0, "rgba(255,255,255,1)")
  gradient.addColorStop(0.15, "rgba(255,255,255,0.9)")
  gradient.addColorStop(0.4, "rgba(255,255,255,0.5)")
  gradient.addColorStop(0.7, "rgba(255,255,255,0.15)")
  gradient.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(canvas)
}

const glowTexture = createGlowTexture()

const ORB_CONFIGS = [
  { color: "#a855f7", position: [-5, 3, -8] as const, scale: 5, phase: 0 },
  { color: "#22d3ee", position: [5, -2, -12] as const, scale: 6, phase: 1.5 },
  { color: "#f472b6", position: [-2, -5, -16] as const, scale: 4.5, phase: 3 },
  { color: "#67e8f9", position: [6, 3, -22] as const, scale: 4, phase: 4.5 },
  { color: "#c084fc", position: [0, 6, -14] as const, scale: 5.5, phase: 2 },
]

function GlowOrbs() {
  return (
    <>
      {ORB_CONFIGS.map((orb) => (
        <GlowOrb key={orb.color + orb.phase} config={orb} />
      ))}
    </>
  )
}

function GlowOrb({ config }: { config: typeof ORB_CONFIGS[0] }) {
  const ref = useRef<THREE.Sprite>(null)
  const startY = config.position[1]
  const startX = config.position[0]

  useFrame((state) => {
    if (!ref.current) return
    const pulse = 0.2 + Math.sin(state.clock.elapsedTime * 0.4 + config.phase) * 0.15
    ref.current.material.opacity = pulse + 0.3
    ref.current.scale.setScalar(config.scale * (0.9 + Math.sin(state.clock.elapsedTime * 0.3 + config.phase) * 0.1))
    ref.current.position.y = startY + Math.sin(state.clock.elapsedTime * 0.2 + config.phase) * 0.3
    ref.current.position.x = startX + Math.sin(state.clock.elapsedTime * 0.15 + config.phase * 0.5) * 0.4
  })

  return (
    <sprite ref={ref} position={config.position} scale={[config.scale, config.scale, 1]}>
      <spriteMaterial
        map={glowTexture}
        color={config.color}
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </sprite>
  )
}
