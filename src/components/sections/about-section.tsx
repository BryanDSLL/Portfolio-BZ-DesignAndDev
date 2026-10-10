"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import {
  Code2,
  Zap,
  Globe,
  Bot,
  Sparkles,
  RotateCcw,
} from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import { PixelImage } from "@/components/ui/pixel-image"
import { SocialMediaBar } from "@/components/ui/social-media-bar"
import { SectionDemarcator } from "@/components/ui/section-demarcator"
import { useLanguage } from "@/store/use-language"
import { translations } from "@/lib/translations"
import { cn } from "@/lib/utils"
import media from "@/data/media.json"

export function AboutSection() {
  const { language } = useLanguage()
  const t = translations[language].about
  const [activeBubble, setActiveBubble] = useState<string | null>(null)
  const replayPixelRef = useRef<(() => void) | null>(null)

  // Imagem oficial de Bryan obtida do JSON central de mídias
  const profileImageSrc = media.profile.avatar

  const bubbles = [
    {
      id: "role",
      tag: t.bubbles.role.tag,
      title: t.bubbles.role.title,
      description: t.bubbles.role.description,
      icon: Code2,
      tagColor: "text-sky-500 dark:text-sky-400 bg-sky-500/10 border-sky-500/20",
      accentGlow: "group-hover:border-sky-500/40 group-hover:shadow-sky-500/10",
      desktopPosition: "lg:top-4 lg:-left-[240px] xl:-left-[280px]",
      tailOrientation: "bottom-right",
      floatDuration: 4.2,
      floatDelay: 0,
    },
    {
      id: "performance",
      tag: t.bubbles.performance.tag,
      title: t.bubbles.performance.title,
      description: t.bubbles.performance.description,
      icon: Zap,
      tagColor: "text-amber-500 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
      accentGlow: "group-hover:border-amber-500/40 group-hover:shadow-amber-500/10",
      desktopPosition: "lg:top-4 lg:-right-[240px] xl:-right-[280px]",
      tailOrientation: "bottom-left",
      floatDuration: 4.8,
      floatDelay: 0.6,
    },
    {
      id: "location",
      tag: t.bubbles.location.tag,
      title: t.bubbles.location.title,
      description: t.bubbles.location.description,
      icon: Globe,
      tagColor: "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      accentGlow: "group-hover:border-emerald-500/40 group-hover:shadow-emerald-500/10",
      desktopPosition: "lg:bottom-6 lg:-left-[240px] xl:-left-[280px]",
      tailOrientation: "top-right",
      floatDuration: 5.1,
      floatDelay: 0.3,
    },
    {
      id: "automation",
      tag: t.bubbles.automation.tag,
      title: t.bubbles.automation.title,
      description: t.bubbles.automation.description,
      icon: Bot,
      tagColor: "text-purple-500 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
      accentGlow: "group-hover:border-purple-500/40 group-hover:shadow-purple-500/10",
      desktopPosition: "lg:bottom-6 lg:-right-[240px] xl:-right-[280px]",
      tailOrientation: "top-left",
      floatDuration: 4.5,
      floatDelay: 0.9,
    },
  ]

  return (
    <section
      id="sobre"
      className="relative w-full min-h-screen py-20 lg:py-28 flex flex-col justify-center select-none overflow-hidden"
    >
      {/* Background Architectural Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[550px] w-[800px] rounded-full bg-sky-500/[0.035] dark:bg-sky-500/[0.045] blur-[170px]" />
      </div>

      {/* Blueprint Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#0284c708_1px,transparent_1px),linear-gradient(to_bottom,#0284c708_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_65%,transparent_100%)]" />

      {/* Demarcador de Seção no Topo - alinhado estritamente à esquerda */}
      <div className="w-full px-4 sm:px-12 md:px-16 lg:px-24 mb-6 sm:mb-8">
        <SectionDemarcator label={t.badge} />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho alinhado à esquerda */}
        <BlurFade delay={0.2} inView className="text-left mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-600 dark:text-sky-400 text-xs font-mono font-medium mb-3">
            <Sparkles className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "8s" }} />
            <span>Perfil & Filosofia de Engenharia</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
            <span>{t.titlePrefix}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-sky-400 to-indigo-500 dark:from-sky-400 dark:via-sky-300 dark:to-indigo-300">
              {t.titleSuffix}
            </span>
          </h2>

          <div className="mt-4 max-w-3xl space-y-2.5 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
            <p>{t.bioLine1}</p>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              {t.bioLine2}
            </p>
          </div>
        </BlurFade>

        {/* Arena Central: Pixel Image com Balões Flutuantes ao Redor */}
        <div className="relative flex flex-col items-center justify-center my-6 lg:my-14">
          <div className="relative flex items-center justify-center">
            {/* Moldura de Alta Engenharia com Pixel Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative group p-2.5 sm:p-3 rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#070e1a]/80 backdrop-blur-2xl shadow-2xl dark:shadow-[0_20px_50px_rgba(2,12,28,0.9)]"
            >
              {/* Efeito sutil de Halo/Glow sob o card da foto */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-sky-500/20 via-indigo-500/10 to-transparent blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              {/* Componente Magic UI PixelImage */}
              <div
                onClick={() => replayPixelRef.current?.()}
                className="relative w-[260px] h-[330px] sm:w-[310px] sm:h-[390px] md:w-[340px] md:h-[430px] rounded-2xl overflow-hidden shadow-inner border border-black/5 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900/50 cursor-pointer"
              >
                <PixelImage
                  src={profileImageSrc}
                  grid="8x8"
                  grayscaleAnimation={true}
                  pixelFadeInDuration={1000}
                  maxAnimationDelay={1200}
                  colorRevealDelay={1500}
                  className="w-full h-full"
                  imageClassName="object-cover object-center w-full h-full"
                  onReplayReady={(fn) => {
                    replayPixelRef.current = fn
                  }}
                />

                {/* Badge Flutuante no rodapé da foto com botão de Replay interativo */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 px-3 py-1.5 rounded-xl bg-black/60 dark:bg-black/75 backdrop-blur-md border border-white/15 text-white flex items-center justify-between text-[11px] font-mono pointer-events-auto">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-semibold">Bryan Zimbrão</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      replayPixelRef.current?.()
                    }}
                    className="inline-flex items-center gap-1 text-[10px] text-zinc-300 hover:text-sky-400 transition-colors cursor-pointer"
                    title="Replay animação pixel"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Replay</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Balões de Texto Flutuantes (Posicionamento espacial no Desktop) */}
            <div className="hidden lg:block">
              {bubbles.map((bubble) => {
                const IconComponent = bubble.icon
                const isHovered = activeBubble === bubble.id

                return (
                  <motion.div
                    key={bubble.id}
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: bubble.floatDuration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: bubble.floatDelay,
                    }}
                    onMouseEnter={() => setActiveBubble(bubble.id)}
                    onMouseLeave={() => setActiveBubble(null)}
                    className={cn(
                      "absolute z-20 w-[260px] xl:w-[290px] cursor-pointer transition-transform duration-300 hover:scale-105",
                      bubble.desktopPosition
                    )}
                  >
                    <div
                      className={cn(
                        "relative p-4 rounded-2xl border bg-white/90 dark:bg-[#070e1a]/95 backdrop-blur-xl shadow-xl transition-all duration-300",
                        isHovered
                          ? "border-sky-500/50 shadow-sky-500/20 -translate-y-1"
                          : "border-black/10 dark:border-white/10 dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
                      )}
                    >
                      {/* Cabeçalho do Balão */}
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border",
                            bubble.tagColor
                          )}
                        >
                          <IconComponent className="h-3 w-3" />
                          <span>{bubble.tag}</span>
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-400 opacity-60" />
                      </div>

                      {/* Título e Descrição */}
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight mb-1">
                        {bubble.title}
                      </h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                        {bubble.description}
                      </p>

                      {/* Rabicho decorativo do balão de fala */}
                      <div
                        className={cn(
                          "absolute w-3 h-3 bg-white/90 dark:bg-[#070e1a]/95 border-b border-r border-black/10 dark:border-white/10 rotate-45 pointer-events-none",
                          bubble.tailOrientation === "bottom-right" &&
                            "-bottom-1.5 right-6",
                          bubble.tailOrientation === "bottom-left" &&
                            "-bottom-1.5 left-6",
                          bubble.tailOrientation === "top-right" &&
                            "-top-1.5 right-6 border-b-0 border-r-0 border-t border-l",
                          bubble.tailOrientation === "top-left" &&
                            "-top-1.5 left-6 border-b-0 border-r-0 border-t border-l"
                        )}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Botão de replay / dica do efeito Magic UI Pixel Image */}
          <button
            type="button"
            onClick={() => replayPixelRef.current?.()}
            className="mt-4 text-[11px] font-mono text-zinc-500 hover:text-sky-500 dark:text-zinc-400 dark:hover:text-sky-400 inline-flex items-center gap-1.5 transition-colors cursor-pointer select-none"
          >
            <RotateCcw className="h-3 w-3" />
            <span>{t.pixelHoverHint}</span>
          </button>

          {/* Versão Responsiva dos Balões de Fala para Telas Mobile e Tablet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-2xl mt-8 lg:hidden">
            {bubbles.map((bubble) => {
              const IconComponent = bubble.icon
              return (
                <div
                  key={bubble.id}
                  className="p-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#070e1a]/85 backdrop-blur-md shadow-md"
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border",
                        bubble.tagColor
                      )}
                    >
                      <IconComponent className="h-3 w-3" />
                      <span>{bubble.tag}</span>
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                    {bubble.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                    {bubble.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Seção de Redes Sociais no Estilo 21st.dev - Posicionada logo abaixo da foto */}
        <div className="mt-8 sm:mt-12 p-6 sm:p-8 rounded-3xl border border-black/10 dark:border-white/10 bg-gradient-to-r from-zinc-50 via-white to-zinc-50 dark:from-[#070e1a] dark:via-[#091222] dark:to-[#070e1a] shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
              {t.social.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              {t.social.subtitle}
            </p>
          </div>

          <SocialMediaBar />
        </div>
      </div>
    </section>
  )
}
