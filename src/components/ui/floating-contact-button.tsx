"use client"

import React from "react"
import { MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import { SpinningText } from "@/components/ui/spinning-text"
import { useLanguage } from "@/store/use-language"
import { translations } from "@/lib/translations"
import { smoothScrollTo } from "@/lib/scroll-utils"

export function FloatingContactButton({ isLoaded = true }: { isLoaded?: boolean }) {
  const { language } = useLanguage()
  const t = translations[language].contact

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    smoothScrollTo("#contato", { duration: 1.2 })
  }

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={
        isLoaded
          ? {
              opacity: 1,
              scale: 1,
              y: 0,
              transitionEnd: { transform: "none" },
            }
          : { opacity: 0, scale: 0.8, y: 20 }
      }
      transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-40"
      aria-label="Atalho para contato"
    >
      <a
        href="#contato"
        onClick={handleClick}
        className="group relative flex size-[82px] sm:size-[90px] items-center justify-center rounded-full transition-transform duration-300 hover:scale-105 cursor-pointer select-none"
      >
        {/* Fundo com blur cirúrgico: só o suficiente para ficar exatamente atrás do texto animado */}
        <div
          style={{
            WebkitBackdropFilter: "blur(12px)",
            backdropFilter: "blur(12px)",
          }}
          className="absolute inset-0 rounded-full border border-black/10 bg-white/55 shadow-md backdrop-blur-md transition-all duration-300 group-hover:border-black/20 group-hover:shadow-lg dark:border-white/10 dark:bg-black/55 dark:shadow-[0_4px_24px_rgba(0,0,0,0.8)] dark:group-hover:border-white/20"
        />

        {/* Magic UI Spinning Text Orbit */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <SpinningText
            key={t.spinningText}
            radius={5.7}
            duration={14}
            className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-bold text-zinc-900 transition-colors duration-300 group-hover:text-black dark:text-zinc-300 dark:font-medium dark:group-hover:text-white"
          >
            {t.spinningText}
          </SpinningText>
        </div>

        {/* Center Contact Button - Estilização Vercel (preto/cinza/branco no dark, branco no light) */}
        <div className="relative z-20 flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full border border-black/10 bg-white shadow-md backdrop-blur-md transition-all duration-300 group-hover:border-zinc-400 group-hover:shadow-xl dark:border-white/15 dark:bg-zinc-950 dark:shadow-[0_4px_20px_rgba(0,0,0,0.9)] dark:group-hover:border-white/30 dark:group-hover:bg-zinc-900">
          <MessageSquare className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-zinc-900 transition-transform duration-300 group-hover:scale-110 group-hover:text-black dark:text-white dark:group-hover:text-zinc-100" />

          {/* Active status indicator dot (posicionado de modo a não sobrepor os textos animados) */}
          <span className="absolute top-0.5 right-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75 dark:bg-white/60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500 ring-2 ring-white dark:bg-white dark:ring-zinc-950" />
          </span>
        </div>
      </a>
    </motion.aside>
  )
}

export default FloatingContactButton
