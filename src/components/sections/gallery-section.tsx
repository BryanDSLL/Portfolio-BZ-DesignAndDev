"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Sparkles } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import { useLanguage } from "@/store/use-language"
import { translations } from "@/lib/translations"
import { cn } from "@/lib/utils"
import { SectionDemarcator } from "@/components/ui/section-demarcator"

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  )
}

export function ProjectsGallerySection() {
  const { language } = useLanguage()
  const t = translations[language].projects
  const [activeProjectId, setActiveProjectId] = useState<string>("apex-finance")
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section
      id="galeria-projetos"
      className="relative w-full min-h-screen py-20 lg:py-28 flex flex-col justify-center select-none overflow-hidden"
    >
      {/* Background radial architectural ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[600px] w-[900px] rounded-full bg-sky-500/[0.03] dark:bg-sky-500/[0.04] blur-[180px]" />
      </div>

      {/* Subtle Blueprint Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#0284c708_1px,transparent_1px),linear-gradient(to_bottom,#0284c708_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* Demarcador de Seção no Topo - alinhado à esquerda na mesma coordenada que o Hero */}
      <div className="w-full px-4 sm:px-12 md:px-16 lg:px-24 mb-6 sm:mb-8">
        <SectionDemarcator label={t.galleryBadge} />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Galeria */}
        <BlurFade delay={0.2} inView className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            {t.upcomingTitle}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-xl">
            {t.upcomingSubtitle}
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-white/5 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 w-fit">
          <Sparkles className="h-3 w-3 text-sky-500 dark:text-sky-400" />
          <span>{t.exploreHint}</span>
        </div>
      </BlurFade>

      {/* Desktop & Tablet: Elastic Accordion Horizontal */}
      <div className="hidden md:flex w-full h-[460px] lg:h-[500px] gap-3">
        {t.items.map((item) => {
          const isSelected = (hoveredCard || activeProjectId) === item.id

          return (
            <motion.div
              key={item.id}
              layout
              onClick={() => {
                setActiveProjectId(item.id)
                setHoveredCard(null)
              }}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className={cn(
                "relative h-full rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 backdrop-blur-xl shadow-lg",
                isSelected
                  ? "flex-[3.5] border-sky-500/50 shadow-2xl ring-2 ring-sky-500/20 dark:border-sky-400/60 dark:ring-sky-400/25 dark:shadow-[0_15px_40px_rgba(2,132,199,0.25)]"
                  : "flex-[1] border-zinc-200/80 bg-zinc-900/40 hover:border-sky-400/40 dark:border-sky-500/20 dark:bg-[#070e1c]/80 opacity-75 hover:opacity-100 hover:flex-[1.4]"
              )}
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-transform duration-700",
                  isSelected ? "scale-105" : "scale-115 grayscale-[30%]"
                )}
                loading="lazy"
              />

              {/* Gradient Overlays for optimal readability */}
              <div
                className={cn(
                  "absolute inset-0 transition-opacity duration-300",
                  isSelected
                    ? "bg-gradient-to-t from-zinc-950/95 via-zinc-950/50 to-zinc-950/20"
                    : "bg-zinc-950/70 hover:bg-zinc-950/50"
                )}
              />

              {/* Top Badge: Number and Category */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-md border border-white/10">
                  {item.number}
                </span>

                {isSelected && (
                  <motion.span
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 backdrop-blur-md font-semibold"
                  >
                    {item.category}
                  </motion.span>
                )}
              </div>

              {/* Collapsed State Title */}
              {!isSelected && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 w-full px-2 text-center">
                  <span className="text-xs font-bold text-white tracking-wide truncate max-w-[120px]">
                    {item.title}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    {item.year}
                  </span>
                </div>
              )}

              {/* Expanded State Content */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end z-10"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono font-semibold text-sky-400 tracking-wide">
                      {item.role}
                    </span>
                    <span className="text-zinc-500">•</span>
                    <span className="text-xs font-mono text-zinc-400">
                      {item.year}
                    </span>
                  </div>

                  <h4 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight mb-2">
                    {item.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-zinc-300 line-clamp-3 leading-relaxed mb-4 max-w-xl">
                    {item.description}
                  </p>

                  {/* Stack Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-zinc-300 backdrop-blur-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center gap-3">
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-sky-500 hover:bg-sky-400 text-zinc-950 font-semibold text-xs px-4 py-2 transition-all duration-200 shadow-md hover:shadow-sky-500/20"
                    >
                      <span>{t.visitSite}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>

                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 hover:bg-white/10 text-white text-xs px-3.5 py-2 transition-all duration-200 backdrop-blur-md"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      <span>{t.viewCode}</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Mobile & Small Screens: Vertical Stacked Cards */}
      <div className="flex md:hidden flex-col gap-4 w-full">
        {t.items.map((item) => {
          const isSelected = activeProjectId === item.id

          return (
            <div
              key={item.id}
              onClick={() => setActiveProjectId(activeProjectId === item.id ? "" : item.id)}
              className={cn(
                "relative rounded-2xl overflow-hidden border transition-all duration-300 backdrop-blur-xl cursor-pointer",
                isSelected
                  ? "border-sky-500 ring-2 ring-sky-500/20 bg-[#070e1c]/95"
                  : "border-zinc-200 dark:border-sky-500/20 bg-white/80 dark:bg-[#070e1c]/60"
              )}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-black/70 text-white backdrop-blur-md border border-white/10">
                    {item.number}
                  </span>
                  <span className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 backdrop-blur-md font-semibold">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-lg font-bold text-white tracking-tight">
                    {item.title}
                  </h4>
                  <span className="text-xs font-mono text-sky-400">
                    {item.role}
                  </span>
                </div>
              </div>

              {isSelected && (
                <div className="p-4 flex flex-col" onClick={(e) => e.stopPropagation()}>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-3">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mb-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 px-2 py-0.5 text-[10px] font-mono text-zinc-700 dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-sky-500 hover:bg-sky-400 text-zinc-950 font-semibold text-xs py-2.5 min-h-[42px] shadow-sm transition-colors cursor-pointer"
                    >
                      <span>{t.visitSite}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-zinc-200 dark:border-white/20 bg-white dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-900 dark:text-white text-xs px-3.5 py-2.5 min-h-[42px] transition-colors cursor-pointer"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
      </div>
    </section>
  )
}

export default ProjectsGallerySection
