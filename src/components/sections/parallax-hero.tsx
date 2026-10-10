import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowDown, Sparkles } from "lucide-react"
import media from "@/data/media.json"

export const ParallaxHero = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Smooth spring for cinematic 21st Dev Parallax
  const smoothY = useSpring(scrollYProgress, { stiffness: 90, damping: 22 })

  // Parallax transformations for different depth layers
  const backgroundY = useTransform(smoothY, [0, 1], ["0%", "28%"])
  const backgroundScale = useTransform(smoothY, [0, 1], [1, 1.12])
  
  // Title moves slower, creating depth behind/in front of camera
  const titleY = useTransform(smoothY, [0, 1], ["0%", "50%"])
  const titleOpacity = useTransform(smoothY, [0, 0.6], [1, 0.15])

  // Subtitle content fades out faster
  const contentY = useTransform(smoothY, [0, 1], ["0%", "35%"])
  const contentOpacity = useTransform(smoothY, [0, 0.5], [1, 0])

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-[110vh] w-full overflow-hidden bg-[#06080d] text-white flex flex-col justify-between"
    >
      {/* ========================================================
          Layer 1: Parallax Mountain Artwork & Night Atmosphere
         ======================================================== */}
      <motion.div
        style={{ y: backgroundY, scale: backgroundScale }}
        className="pointer-events-none absolute inset-0 z-0 h-[120%] w-full"
      >
        <img
          src={media.hero.mountains}
          alt="Paisagem montanhosa noturna com viajante no horizonte"
          className="h-full w-full object-cover object-center filter brightness-[0.92] contrast-[1.08] dark:brightness-[0.88]"
        />

        {/* Ambient atmospheric lighting and vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-transparent to-black/50" />
        <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none" />
      </motion.div>

      {/* ========================================================
          Layer 2: Big Central Title (Bryan.Dev)
         ======================================================== */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 flex flex-col items-center justify-center pt-36 md:pt-44 text-center px-4"
      >
        {/* Subtle Category Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3.5 py-1 text-[11px] font-mono tracking-widest uppercase text-zinc-300 backdrop-blur-md mb-4"
        >
          <Sparkles className="h-3 w-3 text-zinc-300" />
          <span>PORTFOLIO // CREATIVE DEV</span>
        </motion.div>

        {/* Hero Name - Exact Figma Match */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-extrabold tracking-tight text-white select-none drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] font-sans"
        >
          Bryan<span className="text-zinc-400 font-bold">.Dev</span>
        </motion.h1>
      </motion.div>

      {/* ========================================================
          Layer 3: Lower Hero Content (Poetic Headline & Bio)
         ======================================================== */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-12 pb-24 md:pb-28 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
      >
        {/* Left Block: Poetic Headline & Subtitle */}
        <div className="max-w-xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight leading-snug"
          >
            Código em movimento.
            <br />
            Ideias em construção.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-4 text-sm sm:text-base text-zinc-300/90 leading-relaxed font-normal"
          >
            Desenvolvedor frontend focado em criar experiências digitais de alto impacto.
          </motion.p>

          {/* Quick CTA to scroll down */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 flex items-center gap-3"
          >
            <a
              href="#stack"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-zinc-300 hover:text-white transition-colors py-1"
            >
              <span>Explorar stack & projetos</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-transform duration-300 group-hover:translate-y-1">
                <ArrowDown className="h-3.5 w-3.5" />
              </span>
            </a>
          </motion.div>
        </div>

        {/* Right Block: Live Coordinates / Availability indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex items-center gap-3 text-xs font-mono text-zinc-400"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span>AVAILABLE FOR FREELANCE & FULL-TIME</span>
        </motion.div>
      </motion.div>

      {/* Seamless Dark Fade transition to Section 2 (Animated Beam) */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#06080d] via-[#06080d]/80 to-transparent z-20" />
    </section>
  )
}
