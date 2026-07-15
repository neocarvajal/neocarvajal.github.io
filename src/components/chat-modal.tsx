"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, Send, Sparkles, AlertTriangle, User, Bot, Loader2, ArrowUpRight } from "lucide-react"
import { getSupabase } from "@/lib/supabase"
import { useLang } from "@/lib/i18n"

interface ServiceData {
  id: string
  title: string
  tagline: string
  description: string
  gradient: string
  color: string
}

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatModalProps {
  service: ServiceData
  onClose: () => void
}

export function ChatModal({ service, onClose }: ChatModalProps) {
  const { lang, tx } = useLang()
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: tx.chat.welcomeMessages[service.id]?.[lang] ?? tx.chat.fallbackGreeting[lang] },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showEscalation, setShowEscalation] = useState(false)
  const lastSendTime = useRef(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    inputRef.current?.focus()
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEsc)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = ""
    }
  }, [onClose])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const now = Date.now()
    if (now - lastSendTime.current < 2000) return
    lastSendTime.current = now

    setInput("")
    const userMsg: Message = { role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true)
    setShowEscalation(false)

    try {
      const { data, error } = await getSupabase().functions.invoke("chat", {
        body: {
          messages: [...messages, userMsg].slice(-20),
          serviceId: service.id,
        },
      })

      if (error) throw error
      const botMsg: Message = { role: "assistant", content: data.response }
      setMessages((prev) => [...prev, botMsg])

      if (data.response.includes("intervención directa de Erick")) {
        setShowEscalation(true)
      }
    } catch {
      const fallback = tx.chat.fallbackResponses[service.id]?.[lang] ?? tx.chat.error[lang]
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: fallback + tx.chat.offlineDemarc[lang],
        },
      ])
      setShowEscalation(true)
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, messages, service.id])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      >
        <button
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          aria-label={tx.chat.close[lang]}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border/50 bg-background/80 backdrop-blur-2xl shadow-2xl"
          style={{ maxHeight: "min(85vh, 700px)" }}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-border/30 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className={`flex size-10 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg`}>
                <Bot className="size-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{service.title}</h3>
                  <span className="rounded-full bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 text-[10px] text-violet-300 font-medium whitespace-nowrap">
                    {tx.chat.assistant[lang]}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground/60">{service.tagline}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted/30 hover:text-foreground transition-colors cursor-pointer"
              aria-label={tx.chat.close[lang]}
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scroll-smooth">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className={`mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${service.gradient} shadow-sm`}>
                    <Bot className="size-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-violet-500/20 text-foreground border border-violet-500/10"
                      : "bg-muted/30 text-foreground border border-border/20"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.role === "user" && (
                  <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-foreground/10 shadow-sm">
                    <User className="size-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className={`mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${service.gradient} shadow-sm`}>
                  <Bot className="size-4 text-white" />
                </div>
                <div className="rounded-2xl bg-muted/30 px-4 py-3 border border-border/20">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                      className="flex items-center gap-1"
                    >
                      <span className="size-1.5 rounded-full bg-violet-400" />
                      <span className="size-1.5 rounded-full bg-violet-400" style={{ animationDelay: "0.2s" }} />
                      <span className="size-1.5 rounded-full bg-violet-400" style={{ animationDelay: "0.4s" }} />
                    </motion.div>
                    <span className="text-xs text-muted-foreground">{tx.chat.thinking[lang]}</span>
                  </div>
                </div>
              </div>
            )}

            {showEscalation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-amber-400 text-sm font-medium mb-2">
                  <AlertTriangle className="size-4" />
                  <span>{tx.chat.escalation[lang]}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  {tx.chat.escalationDesc[lang]}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <a
                    href="https://linkedin.com/in/neocarvajal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 text-xs text-violet-300 hover:bg-violet-500/20 transition-colors"
                  >
                    LinkedIn
                    <ArrowUpRight className="size-3" />
                  </a>
                  <a
                    href="#social"
                    onClick={(e) => { e.preventDefault(); onClose(); setTimeout(() => document.getElementById("social")?.scrollIntoView({ behavior: "smooth" }), 500) }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-muted/30 border border-border/50 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {tx.chat.viewContact[lang]}
                    <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="shrink-0 border-t border-border/30 px-5 py-3">
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage() }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={tx.chat.placeholder[lang]}
                disabled={isLoading}
                className="flex-1 rounded-xl border border-border/30 bg-muted/20 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none ring-0 transition-colors focus:border-violet-500/30 focus:bg-muted/30 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-lg transition-all hover:scale-105 hover:shadow-violet-500/25 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
              </button>
            </form>
                <p className="mt-2 text-[10px] text-muted-foreground/30 text-center">
                  {tx.chat.footer[lang]}
                  <span className="inline-flex items-center gap-1 ml-2 text-amber-400/50">
                    <Sparkles className="size-3" />
                    {tx.chat.demo[lang]}
                  </span>
                </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
