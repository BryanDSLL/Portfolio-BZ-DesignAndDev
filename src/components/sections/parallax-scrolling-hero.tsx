import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Sparkles, ArrowRight, Code2, Layers, Cpu } from "lucide-react"
import { VideoText } from "@/components/ui/video-text"
import { WordRotate } from "@/components/ui/word-rotate"
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"
import { BlurFade } from "@/components/ui/blur-fade"

export const ParallaxScrollingHero = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Smooth springs for high-end feel
  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 20 })

  // Parallax layers
  const backgroundY = useTransform(smoothY, [0, 1], ["0%", "35%"])
  const midLayerY = useTransform(smoothY, [0, 1], ["0%", "-40%"])
  const textLayerY = useTransform(smoothY, [0, 1], ["0%", "20%"])
  const opacityFade = useTransform(smoothY, [0, 0.7], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[105vh] w-full overflow-hidden pt-28 pb-20 flex flex-col items-center justify-center"
    >
      {/* ========================================================
          Layer 1: Ambient Gradients & Parallax Background (21st Dev style)
         ======================================================== */}
      <motion.div
        style={{ y: backgroundY }}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Glow Orb 1 - Violet */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-primary/25 blur-[140px] dark:bg-primary/20 animate-pulse-slow" />

        {/* Glow Orb 2 - Cyan */}
        <div className="absolute top-1/3 left-1/4 h-[420px] w-[420px] rounded-full bg-accent/20 blur-[130px] dark:bg-accent/15" />

        {/* Glow Orb 3 - Emerald */}
        <div className="absolute top-1/2 right-1/4 h-[380px] w-[380px] rounded-full bg-emerald-500/15 blur-[120px]" />

        {/* Dynamic Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </motion.div>

      {/* ========================================================
          Layer 2: Floating Decorative Badges (Mid-Layer Parallax)
         ======================================================== */}
      <motion.div
        style={{ y: midLayerY }}
        className="pointer-events-none absolute inset-0 z-10 hidden lg:block"
      >
        {/* Tech Badge 1: React & Vite */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-36 left-[8%] flex items-center gap-3 rounded-2xl border border-white/10 bg-card/60 px-4 py-3 shadow-xl backdrop-blur-xl"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Code2 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground">Frontend Pro</div>
            <div className="text-sm font-bold text-foreground">React 19 + TypeScript</div>
          </div>
        </motion.div>

        {/* Tech Badge 2: Zustand Cache Store */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-44 right-[8%] flex items-center gap-3 rounded-2xl border border-white/10 bg-card/60 px-4 py-3 shadow-xl backdrop-blur-xl"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground">State Architecture</div>
            <div className="text-sm font-bold text-foreground">Zustand TTL Cache</div>
          </div>
        </motion.div>

        {/* Tech Badge 3: Motion & UI */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-28 left-[12%] flex items-center gap-3 rounded-2xl border border-white/10 bg-card/60 px-4 py-3 shadow-xl backdrop-blur-xl"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10 text-pink-500">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground">Rich Animations</div>
            <div className="text-sm font-bold text-foreground">Framer Motion & 3D</div>
          </div>
        </motion.div>
      </motion.div>

      {/* ========================================================
          Layer 3: Core Content (Hero Headline, Video Text & CTAs)
         ======================================================== */}
      <motion.div
        style={{ y: textLayerY, opacity: opacityFade }}
        className="relative z-20 mx-auto max-w-5xl px-4 text-center flex flex-col items-center"
      >
        {/* Availability Badge */}
        <BlurFade delay={0.1}>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-md mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-semibold tracking-wide uppercase text-[11px]">
              Disponível para Projetos & Liderança Frontend
            </span>
            <Sparkles className="h-3.5 w-3.5 text-primary" />
          </div>
        </BlurFade>

        {/* Video Text Principal - Nome e Destaque */}
        <BlurFade delay={0.2} duration={0.6}>
          <VideoText
            text="BRYAN DEV"
            className="my-1 scale-95 sm:scale-100"
          />
        </BlurFade>

        {/* Rotating Roles with Word Rotate */}
        <BlurFade delay={0.3}>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground">
            <span>Especialista em</span>
            <WordRotate
              words={[
                "Aplicações SaaS Escaláveis",
                "Interfaces High-End & Interativas",
                "Arquitetura Frontend com Zustand",
                "Experiências Fluidas com Motion",
              ]}
              className="bg-gradient-to-r from-primary via-accent to-pink-500 bg-clip-text text-transparent font-bold"
            />
          </div>
        </BlurFade>

        {/* Brief Bio / Value Proposition */}
        <BlurFade delay={0.4}>
          <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            Construindo produtos digitais que combinam engenharia de software rigorosa,
            performance de ponta e design sensorial que impressiona à primeira vista.
          </p>
        </BlurFade>

        {/* CTA Actions */}
        <BlurFade delay={0.5}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {/* Primary Action Button */}
            <a
              href="#projetos"
              className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-primary/40 hover:scale-105 active:scale-95"
            >
              <span>Explorar Projetos</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Hero Video Dialog - Showreel Modal */}
            <HeroVideoDialog
              videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              triggerText="Assistir Showreel Demo"
            />
          </div>
        </BlurFade>

        {/* Tech Stack Pills at the bottom of Hero */}
        <BlurFade delay={0.6}>
          <div className="mt-14 pt-8 border-t border-border/40 w-full max-w-3xl flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground mr-2">Core Stack:</span>
            {["React 19", "TypeScript", "Vite", "Tailwind CSS", "Zustand Cache", "Framer Motion", "Shadcn UI"].map(
              (tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-border/60 bg-card/40 px-2.5 py-1 font-mono transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </BlurFade>
      </motion.div>

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  )
}
