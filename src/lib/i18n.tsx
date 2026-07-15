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
    services: { es: "Servicios", en: "Services" } as Text,
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

  // ── Services ──
  services: {
    badge: { es: "Lo que puedo hacer por ti", en: "What I Can Do For You" } as Text,
    title: { es: "Servicios", en: "Services" } as Text,
    desc: {
      es: "Soluciones blockchain y Web3 para tu proyecto. Cada servicio tiene su propio asistente IA entrenado.",
      en: "Blockchain and Web3 solutions for your project. Each service has its own trained AI assistant.",
    } as Text,
    cta: { es: "Chatea con el asistente", en: "Chat with the assistant" } as Text,
    help: { es: "¿No encuentras lo que buscas?", en: "Can't find what you're looking for?" } as Text,
    contact: { es: "Contáctame directamente", en: "Contact me directly" } as Text,
    service1: { es: "Smart Contracts", en: "Smart Contracts" } as Text,
    service1desc: {
      es: "Desarrollo y auditoría de contratos inteligentes en Solana. Desde tokens SPL hasta programas complejos con CPI y PDAs.",
      en: "Development and audit of smart contracts on Solana. From SPL tokens to complex programs with CPI and PDAs.",
    } as Text,
    service2: { es: "DApps Web3", en: "Web3 DApps" } as Text,
    service2desc: {
      es: "Construcción de aplicaciones descentralizadas full-stack con integración de wallets, RPC y experiencia de usuario fluida.",
      en: "Full-stack decentralized application development with wallet integration, RPC and seamless user experience.",
    } as Text,
    service3: { es: "Consultoría Técnica", en: "Technical Consulting" } as Text,
    service3desc: {
      es: "Asesoramiento en arquitectura blockchain, optimización de programas Solana, y mejores prácticas de seguridad.",
      en: "Blockchain architecture advisory, Solana program optimization, and security best practices.",
    } as Text,
    service4: { es: "Mentoría & Formación", en: "Mentoring & Training" } as Text,
    service4desc: {
      es: "Formación personalizada en desarrollo Web3, desde fundamentos de Solana hasta patrones avanzados de Anchor.",
      en: "Personalized Web3 development training, from Solana fundamentals to advanced Anchor patterns.",
    } as Text,
    service5: { es: "Wallet & RPC Integration", en: "Wallet & RPC Integration" } as Text,
    service5desc: {
      es: "Integración de wallets (Phantom, Backpack, etc.), optimización de conexiones RPC y gestión de endpoints.",
      en: "Wallet integration (Phantom, Backpack, etc.), RPC connection optimization and endpoint management.",
    } as Text,
    service6: { es: "Bots & Automation", en: "Bots & Automation" } as Text,
    service6desc: {
      es: "Automatización de procesos en blockchain: monitoreo de wallets, trading bots, y herramientas de análisis en cadena.",
      en: "Blockchain process automation: wallet monitoring, trading bots, and on-chain analysis tools.",
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

  // ── Chat Modal ──
  chat: {
    assistant: { es: "Asistente virtual", en: "Virtual Assistant" } as Text,
    close: { es: "Cerrar", en: "Close" } as Text,
    placeholder: { es: "Escribe tu mensaje...", en: "Type your message..." } as Text,
    thinking: { es: "Pensando...", en: "Thinking..." } as Text,
    escalation: { es: "Se requiere intervención directa", en: "Direct intervention required" } as Text,
    escalationDesc: {
      es: "Esta consulta necesita que Erick la responda personalmente.",
      en: "This consultation needs Erick to respond personally.",
    } as Text,
    viewContact: { es: "Ver contacto", en: "View contact" } as Text,
    error: {
      es: "Lo siento, hubo un error de conexión. Por favor intenta de nuevo o contacta a Erick directamente.",
      en: "Sorry, there was a connection error. Please try again or contact Erick directly.",
    } as Text,
    footer: { es: "Asistente entrenado para responder como Erick", en: "Assistant trained to respond as Erick" } as Text,
    demo: { es: "Modo demo", en: "Demo mode" } as Text,
    offlineDemarc: {
      es: "\n\n---\n\n*💡 Modo offline — tu consulta ha sido registrada. Erick te responderá pronto.*",
      en: "\n\n---\n\n*💡 Offline mode — your message has been noted. Erick will get back to you soon.*",
    } as Text,
    fallbackResponses: {
      "smart-contracts": {
        es: "¡Entendido! Como especialista en Solana, Erick desarrolla smart contracts con Anchor y Rust: tokens SPL, CPIs, PDAs y programas complejos. ¿Qué tipo de contrato necesitas?",
        en: "Got it! As a Solana specialist, Erick develops smart contracts with Anchor and Rust: SPL tokens, CPIs, PDAs, and complex programs. What type of contract do you need?",
      } as Text,
      "dapps": {
        es: "¡Genial! Erick construye DApps full-stack con Next.js, React y wallet-adapter para el frontend, y Anchor para el backend on-chain. ¿Qué tipo de aplicación tienes en mente?",
        en: "Great! Erick builds full-stack DApps with Next.js, React, and wallet-adapter for the frontend, and Anchor for the on-chain backend. What kind of app do you have in mind?",
      } as Text,
      "consulting": {
        es: "Entendido. Como consultor blockchain, Erick ayuda a equipos a diseñar arquitecturas Solana escalables y seguras, revisa programas, optimiza gas y establece mejores prácticas. ¿En qué etapa está tu proyecto?",
        en: "Understood. As a blockchain consultant, Erick helps teams design scalable and secure Solana architectures, reviews programs, optimizes gas, and establishes best practices. What stage is your project at?",
      } as Text,
      "mentoring": {
        es: "¡Perfecto! Erick ofrece mentoría 1-on-1 para developers que quieren entrar a Web3, desde fundamentos de Solana hasta patrones avanzados en Anchor. ¿Qué nivel tienes y qué te gustaría aprender?",
        en: "Perfect! Erick offers 1-on-1 mentoring for developers wanting to get into Web3, from Solana fundamentals to advanced Anchor patterns. What level are you and what would you like to learn?",
      } as Text,
      "wallet-rpc": {
        es: "Entendido. Erick tiene experiencia integrando wallets (Phantom, Backpack, Solflare) y optimizando conexiones RPC con Helius y Triton. ¿Qué integración específica necesitas?",
        en: "Understood. Erick has experience integrating wallets (Phantom, Backpack, Solflare) and optimizing RPC connections with Helius and Triton. What specific integration do you need?",
      } as Text,
      "automation": {
        es: "¡Perfecto! Erick desarrolla bots y herramientas de automatización para blockchain: monitoreo de wallets en tiempo real, análisis de transacciones, y scripts personalizados. ¿Qué proceso quieres automatizar?",
        en: "Perfect! Erick develops bots and automation tools for blockchain: real-time wallet monitoring, transaction analysis, and custom scripts. What process do you want to automate?",
      } as Text,
    } as Record<string, Text>,
    fallbackGreeting: { es: "¡Hola! ¿En qué puedo ayudarte?", en: "Hi! How can I help you?" } as Text,

    welcomeMessages: {
      "smart-contracts": {
        es: "¡Hola! Soy el asistente de Erick para temas de Smart Contracts en Solana. ¿Tienes alguna idea o proyecto en mente? Cuéntame y te explico cómo Erick puede ayudarte a construirlo.",
        en: "Hi! I'm Erick's assistant for Smart Contracts on Solana. Do you have an idea or project in mind? Tell me and I'll explain how Erick can help you build it.",
      } as Text,
      "dapps": {
        es: "¡Bienvenido! Soy el asistente de DApps de Erick. ¿Qué tipo de aplicación descentralizada te gustaría construir? Ya sea un marketplace, juego, o plataforma DeFi, estaré encantado de guiarte.",
        en: "Welcome! I'm Erick's DApps assistant. What kind of decentralized application would you like to build? Whether a marketplace, game, or DeFi platform, I'll be glad to guide you.",
      } as Text,
      "consulting": {
        es: "Hola, soy el asistente de consultoría de Erick. ¿En qué etapa está tu proyecto? Cuéntame sobre tu arquitectura o desafíos técnicos y te daré una visión inicial.",
        en: "Hi, I'm Erick's consulting assistant. What stage is your project at? Tell me about your architecture or technical challenges and I'll give you an initial overview.",
      } as Text,
      "mentoring": {
        es: "¡Hey! Soy el asistente de mentoría. ¿Quieres aprender desarrollo Web3? Cuéntame tu nivel actual y qué te gustaría dominar. Desde fundamentos hasta avanzado.",
        en: "Hey! I'm the mentoring assistant. Want to learn Web3 development? Tell me your current level and what you'd like to master. From fundamentals to advanced.",
      } as Text,
      "wallet-rpc": {
        es: "Hola, soy el asistente de integración Wallet & RPC. ¿Tienes algún problema de conexión o necesitas implementar una wallet en tu DApp? Estoy aquí para ayudarte.",
        en: "Hi, I'm the Wallet & RPC integration assistant. Having connection issues or need to implement a wallet in your DApp? I'm here to help.",
      } as Text,
      "automation": {
        es: "¡Hola! Soy el asistente de automatización de Erick. ¿Qué proceso necesitas automatizar en blockchain? Cuéntame tu caso y vemos cómo hacerlo realidad.",
        en: "Hi! I'm Erick's automation assistant. What process do you need to automate on blockchain? Tell me about your case and we'll make it happen.",
      } as Text,
    } as Record<string, Text>,
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
