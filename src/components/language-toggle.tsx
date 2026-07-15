"use client"

import { useLang, type Lang } from "@/lib/i18n"
import { Globe } from "lucide-react"

const flags: Record<Lang, string> = {
  es: "ES",
  en: "EN",
}

export function LanguageToggle() {
  const { lang, setLang } = useLang()

  return (
    <button
      type="button"
      onClick={() => setLang(lang === "es" ? "en" : "es")}
      className="fixed bottom-6 right-6 z-50 flex cursor-pointer items-center gap-2 rounded-full border border-border/40 bg-background/80 px-5 py-3 text-sm font-semibold shadow-lg select-none transition-colors duration-200 hover:border-violet-400/50 hover:bg-background/95 hover:text-violet-300 active:scale-90 active:border-violet-400/60 active:bg-violet-500/25"
      style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
      aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
    >
      <Globe className="size-4" />
      <span>{flags[lang]}</span>
    </button>
  )
}
