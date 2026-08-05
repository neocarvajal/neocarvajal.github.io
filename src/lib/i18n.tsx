"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Lang = "es" | "en"

type Text = Record<Lang, string>

// ──────────────────────────────────────────────
// All translatable strings
// ──────────────────────────────────────────────
const t = {
  // ── Section Nav ──
  nav: {
    cover: { es: "Inicio", en: "Home" } as Text,
    about: { es: "Sobre mí", en: "About" } as Text,
    experience: { es: "Experiencia", en: "Experience" } as Text,
    certifications: { es: "Certificaciones", en: "Certifications" } as Text,
    projects: { es: "Proyectos", en: "Projects" } as Text,
    blog: { es: "Blog", en: "Blog" } as Text,
    interests: { es: "Intereses", en: "Interests" } as Text,
    social: { es: "Redes", en: "Social" } as Text,
  },

  // ── Cover ──
  cover: {
    badge: { es: "Blockchain Developer & Web3 Builder", en: "Blockchain Developer & Web3 Builder" } as Text,
    subtitle: {
      es: "Web3 Builder de LATAM construyendo el futuro descentralizado sobre Solana.",
      en: "Web3 Builder from LATAM building the decentralized future on Solana.",
    } as Text,
    location: { es: "Cumaná, Venezuela", en: "Cumaná, Venezuela" } as Text,
  },

  // ── About ──
  about: {
    badge: { es: "Quién soy", en: "About" } as Text,
    title: { es: "Sobre Mí", en: "About" } as Text,
    bio1: {
      es: "Software Engineer & Blockchain Developer con experiencia en infraestructura descentralizada y desarrollo web full-stack.",
      en: "Software Engineer & Blockchain Developer with a versatile background spanning decentralized infrastructure and full-stack web development.",
    } as Text,
    bio2: {
      es: "Impulsado por un profundo interés en Blockchain y su constante innovación, estoy altamente motivado para colaborar con equipos visionarios y crecer a largo plazo dentro del ecosistema blockchain.",
      en: "Driven by a deep interest in Blockchain and its continuous innovation, I am highly motivated to collaborate with forward-thinking teams and grow long-term within the blockchain ecosystem.",
    } as Text,
    location: { es: "Cumaná, Venezuela", en: "Cumaná, Venezuela" } as Text,
    available: { es: "Disponible para colaborar", en: "Open to collaborate" } as Text,
    statsYears: { es: "Años en tech", en: "Years in tech" } as Text,
    statsLang: { es: "Idiomas", en: "Languages" } as Text,
  },

  // ── Experience ──
  experience: {
    badge: { es: "Trayectoria", en: "Career" } as Text,
    title: { es: "Experiencia", en: "Experience" } as Text,
    desc: { es: "Mi camino en blockchain y comunidad Web3", en: "My journey in blockchain and the Web3 community" } as Text,
    role1: { es: "Web3 Content Creator", en: "Web3 Content Creator" } as Text,
    company1: { es: "Dev.to - Twitter/X - YouTube", en: "Dev.to - Twitter/X - YouTube" } as Text,
    period1: { es: "2023 - Presente", en: "2023 - Present" } as Text,
    desc1: {
      es: "Artículos técnicos sobre Solana, Rust, Anchor y blockchain. Tutoriales.",
      en: "Technical articles about Solana, Rust, Anchor and blockchain. Tutorials.",
    } as Text,
    role2: { es: "Embajador Solana Allstars", en: "Solana Allstars Ambassador" } as Text,
    company2: { es: "Solana Allstars Venezuela - step.finance", en: "Solana Allstars Venezuela - step.finance" } as Text,
    period2: { es: "Octubre 2024 - Diciembre 2025", en: "October 2024 - December 2025" } as Text,
    desc2: {
      es: "Representante de la comunidad local. Alianzas estratégicas con empresas e instituciones para la organización de eventos IRL.",
      en: "Local community representative. Strategic partnerships with companies and institutions for organizing IRL events.",
    } as Text,
  },

  // ── Certifications ──
  certifications: {
    badge: { es: "Educación y validación", en: "Education & Validation" } as Text,
    title: { es: "Certificaciones", en: "Certifications" } as Text,
    desc: { es: "Acreditaciones clave en desarrollo Blockchain, Rust y Web3", en: "Key accreditations in Blockchain, Rust and Web3 development" } as Text,
    cert1: { es: "Taller Frontend: Creación de un Solana Client", en: "Frontend Workshop: Building a Solana Client" } as Text,
    cert2: { es: "Solana Latam Builders Program - Rust", en: "Solana Latam Builders Program - Rust" } as Text,
    cert2desc: {
      es: "Certificado de finalización en la 1era cohorte del programa para desarrolladores de software en Solana.",
      en: "Completion certificate for the 1st cohort of the Solana software developer program.",
    } as Text,
    cert3: { es: "Blockchain Basics", en: "Blockchain Basics" } as Text,
    cert4: { es: "Heavy Duty Camp - Bootcamp (España)", en: "Heavy Duty Camp - Bootcamp (Spain)" } as Text,
    cert4desc: {
      es: "Comunidad vibrante de desarrolladores dedicados a apoyar a entusiastas del software en el ecosistema Solana.",
      en: "Vibrant community of developers dedicated to supporting fellow software enthusiasts in the Solana ecosystem.",
    } as Text,
    cert5: { es: "Chainlink Bootcamp", en: "Chainlink Bootcamp" } as Text,
    cert5desc: {
      es: "20 horas, 10 días de bootcamp enfocado en desarrollo de smart contracts e integración de oráculos Chainlink.",
      en: "20 hours, 10 days bootcamp focused on smart contract development and Chainlink oracle integrations.",
    } as Text,
    cert6: { es: "Billion Reasons to Build Bootcamp (Global)", en: "Billion Reasons to Build Bootcamp (Global)" } as Text,
    dates: {
      abr2026: { es: "Abr. 2026", en: "Apr. 2026" } as Text,
      feb2026: { es: "Feb. 2026", en: "Feb. 2026" } as Text,
      oct2025: { es: "Oct. 2025", en: "Oct. 2025" } as Text,
      nov2024: { es: "Nov. 2024", en: "Nov. 2024" } as Text,
      jun2024: { es: "Jun. 2024", en: "Jun. 2024" } as Text,
      ago2024: { es: "Ago. 2024", en: "Aug. 2024" } as Text,
    },
    idLabel: { es: "ID: ", en: "ID: " } as Text,
    showCredential: { es: "Mostrar credencial", en: "Show credential" } as Text,
  },

  // ── Projects ──
  projects: {
    badge: { es: "Código abierto", en: "Open Source" } as Text,
    title: { es: "Proyectos", en: "Projects" } as Text,
    desc: { es: "Repositorios y contribuciones destacadas de Solana", en: "Featured Solana repositories and contributions" } as Text,
    cta: { es: "Ver todos en GitHub", en: "See all on GitHub" } as Text,
  },

  // ── Blog ──
  blog: {
    badge: { es: "Artículos técnicos", en: "Technical Articles" } as Text,
    title: { es: "Blog", en: "Blog" } as Text,
    desc: { es: "Escribo sobre Solana, blockchain y desarrollo Web3", en: "I write about Solana, blockchain and Web3 development" } as Text,
    cta: { es: "Ver todos en Dev.to", en: "See all on Dev.to" } as Text,
    min: { es: "min", en: "min" } as Text,
  },

  // ── Interests ──
  interests: {
    badge: { es: "Áreas de expertise", en: "Areas of Expertise" } as Text,
    title: { es: "Intereses", en: "Interests" } as Text,
    desc: { es: "Donde construyo, aprendo y aporto valor", en: "Where I build, learn and add value" } as Text,
    interest1: { es: "Solana & Blockchain", en: "Solana & Blockchain" } as Text,
    interest1desc: {
      es: "Smart contracts en Rust con Anchor y Pinocchio. Protocolos DeFi y programas Solana.",
      en: "Smart contracts in Rust with Anchor and Pinocchio. DeFi protocols and Solana programs.",
    } as Text,
    interest2: { es: "Web3 Development", en: "Web3 Development" } as Text,
    interest2desc: {
      es: "dApps descentralizadas, integración con wallets, NFTs y tokens SPL.",
      en: "Decentralized dApps, wallet integration, NFTs and SPL tokens.",
    } as Text,
    interest3: { es: "Rust & Anchor", en: "Rust & Anchor" } as Text,
    interest3desc: {
      es: "Programación segura en Rust. Frameworks Anchor para Solana optimizado.",
      en: "Safe programming in Rust. Optimized Anchor frameworks for Solana.",
    } as Text,
    interest4: { es: "Social Media & Marketing", en: "Social Media & Marketing" } as Text,
    interest4desc: {
      es: "Estrategias digitales Web3, contenido blockchain y crecimiento de comunidades.",
      en: "Web3 digital strategies, blockchain content and community growth.",
    } as Text,
    interest5: { es: "Talent Acquisition", en: "Talent Acquisition" } as Text,
    interest5desc: {
      es: "Reclutamiento internacional y liderazgo de equipos tech en LATAM y US.",
      en: "International recruiting and tech team leadership in LATAM and US.",
    } as Text,
    interest6: { es: "Innovación Digital", en: "Digital Innovation" } as Text,
    interest6desc: {
      es: "Exploración de Blinks, Token-2022, identity on-chain y nuevas techs.",
      en: "Exploring Blinks, Token-2022, on-chain identity and emerging tech.",
    } as Text,
  },

  // ── Social ──
  social: {
    badge: { es: "Conecta conmigo", en: "Connect with me" } as Text,
    title: { es: "Redes", en: "Social" } as Text,
    desc: { es: "Sígueme y sigue mi trabajo en el ecosistema Web3", en: "Follow me and my work in the Web3 ecosystem" } as Text,
  },

  // ── Contact ──
  contact: {
    badge: { es: "Hablemos", en: "Let's Talk" } as Text,
    title: { es: "Contacto", en: "Contact" } as Text,
    desc: {
      es: "¿Tienes un proyecto, idea o colaboración en mente? Estoy abierto a oportunidades en el ecosistema Web3 y blockchain.",
      en: "Have a project, idea or collaboration in mind? I'm open to opportunities in the Web3 and blockchain ecosystem.",
    } as Text,
  },

  // ── Interests section ──
  interestsSection: {
    badge: { es: "Áreas de expertise", en: "Areas of Expertise" } as Text,
    title: { es: "Intereses", en: "Interests" } as Text,
    desc: { es: "Donde construyo, aprendo y aporto valor", en: "Where I build, learn and add value" } as Text,
  },
}

// ──────────────────────────────────────────────
// Context
// ──────────────────────────────────────────────
type LangContext = {
  lang: Lang
  setLang: (l: Lang) => void
  tx: typeof t
}

const Ctx = createContext<LangContext>({
  lang: "en",
  setLang: () => {},
  tx: t,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en")

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    if (typeof document !== "undefined") {
      document.documentElement.lang = l
    }
  }, [])

  return (
    <Ctx.Provider value={{ lang, setLang, tx: t }}>
      {children}
    </Ctx.Provider>
  )
}

export function useLang() {
  return useContext(Ctx)
}
