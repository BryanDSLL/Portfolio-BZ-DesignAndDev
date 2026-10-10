"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Lock, Activity } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from "@/store/use-language"
import { translations } from "@/lib/translations"
import { SectionDemarcator } from "@/components/ui/section-demarcator"
import media from "@/data/media.json"

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

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

// Clean, high-fidelity SVG text mask for "CarePlus"
const SVG_MASK_RAW = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="250" viewBox="0 0 1000 250"><text x="50%" y="55%" font-size="170" font-weight="900" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, -apple-system, sans-serif">CarePlus</text></svg>`
const DATA_URL_MASK = `url("data:image/svg+xml,${encodeURIComponent(SVG_MASK_RAW)}")`

export function ProjectsSection() {
  const { language } = useLanguage()
  const t = translations[language].projects

  const sectionRef = useRef<HTMLElement>(null)
  const pinnedStageRef = useRef<HTMLDivElement>(null)
  const maskedStageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const backdropOverlayRef = useRef<HTMLDivElement>(null)
  const initialContentRef = useRef<HTMLDivElement>(null)
  const showcaseRef = useRef<HTMLDivElement>(null)

  const [initialMaskWidth, setInitialMaskWidth] = useState(850)

  // Calibrate initial mask width based on window width
  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth
      if (w < 640) {
        setInitialMaskWidth(Math.min(w * 0.9, 380))
      } else if (w < 1024) {
        setInitialMaskWidth(Math.min(w * 0.75, 650))
      } else {
        setInitialMaskWidth(Math.min(w * 0.65, 880))
      }
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  // Autoplay security policies guarantee
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !pinnedStageRef.current || !maskedStageRef.current) return

    // Apply starting mask size
    const startW = initialMaskWidth
    const targetW = Math.max(window.innerWidth * 24, 25000)

    const applyMaskSize = (sizePx: number) => {
      if (maskedStageRef.current) {
        const val = `${sizePx}px auto`
        maskedStageRef.current.style.webkitMaskSize = val
        maskedStageRef.current.style.maskSize = val
      }
    }

    applyMaskSize(startW)

    const ctx = gsap.context(() => {
      const maskObj = { size: startW }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: pinnedStageRef.current,
          start: "top top",
          end: "+=260%",
          scrub: 1,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // FASE 1: Fade out suave das informações iniciais (badge, descrição, tags)
      tl.to(
        initialContentRef.current,
        {
          opacity: 0,
          y: -40,
          filter: "blur(8px)",
          ease: "power2.inOut",
          pointerEvents: "none",
          duration: 0.25,
        },
        0
      )

      // FASE 2: ZOOM EXCLUSIVO NA MÁSCARA DAS LETRAS
      // O vídeo de fundo permanece 100% estacionário e nítido (sem qualquer zoom nos pixels do vídeo)
      tl.to(
        maskObj,
        {
          size: targetW,
          ease: "power2.in",
          duration: 0.55,
          onUpdate: () => {
            applyMaskSize(maskObj.size)
          },
        },
        0.08
      )

      // Transição para um overlay escuro suave sobre o vídeo à medida que o recorte preenche a tela
      tl.fromTo(
        backdropOverlayRef.current,
        { opacity: 0 },
        { opacity: 1, ease: "power1.inOut", duration: 0.35 },
        0.3
      )

      // FASE 3: Apresentação da "Tela Oculta" com a moldura moderna do CarePlus
      // Inicia um pouco antes (0.40 em vez de 0.60) para a moldura surgir mais cedo durante o scroll
      tl.fromTo(
        showcaseRef.current,
        {
          opacity: 0,
          scale: 0.88,
          y: 50,
          pointerEvents: "none",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.45,
          pointerEvents: "auto",
        },
        0.4
      )
    }, sectionRef)

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 350)

    return () => {
      clearTimeout(refreshTimer)
      ctx.revert()
    }
  }, [initialMaskWidth])

  return (
    <section
      ref={sectionRef}
      id="projetos"
      className="relative w-full select-none"
    >
      {/* Pinned Stage Container: travado com precisão pelo ScrollTrigger sem deixar a próxima sessão invadir */}
      <div
        ref={pinnedStageRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {/* Background Radial Ambient Glow & Blueprint Grid */}
        <div className="pointer-events-none absolute inset-0 -z-30 flex items-center justify-center">
          <div className="h-[750px] w-[1100px] rounded-full bg-sky-500/[0.04] dark:bg-sky-500/[0.06] blur-[180px]" />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-30 bg-[linear-gradient(to_right,#0284c708_1px,transparent_1px),linear-gradient(to_bottom,#0284c708_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_60%,transparent_100%)]" />

        {/* 
          CAMADA MASCARADA DE VÍDEO:
          O vídeo em si é FIXO e 100% full-screen cover (NUNCA É DADO ZOOM NO VÍDEO).
          O zoom do GSAP afeta ESTRITAMENTE a máscara das letras (maskSize).
        */}
        <div
          ref={maskedStageRef}
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10 will-change-[mask-size,-webkit-mask-size]"
          style={{
            WebkitMaskImage: DATA_URL_MASK,
            maskImage: DATA_URL_MASK,
            WebkitMaskPosition: "center center",
            maskPosition: "center center",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: `${initialMaskWidth}px auto`,
            maskSize: `${initialMaskWidth}px auto`,
          }}
        >
          {/* Vídeo estático de alta definição (permanece natural e sem esticar) */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover scale-100"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={media.videos.ocean.cdn} type="video/webm" />
            <source src={media.videos.ocean.local} type="video/webm" />
          </video>
        </div>

        {/* Overlay escuro que surge suavemente sobre o vídeo para dar contraste à moldura da tela oculta */}
        <div
          ref={backdropOverlayRef}
          className="pointer-events-none absolute inset-0 z-15 opacity-0 bg-slate-900/65 dark:bg-[#040810]/80 backdrop-blur-sm transition-opacity"
        />

        {/* 
          CAMADA INICIAL:
          Demarcador no topo (alinhado à esquerda) e textos explicativos na base (centralizados).
          Desaparecem suavemente em fade-out logo no início do scroll.
        */}
        <div
          ref={initialContentRef}
          className="absolute inset-0 z-20 pointer-events-auto flex flex-col justify-between py-20 sm:py-24 px-4 sm:px-12 md:px-16 lg:px-24 w-full"
        >
          {/* Top Section Demarcator - permanece alinhado à esquerda */}
          <div className="w-full">
            <SectionDemarcator label={t.badge} />
          </div>

          {/* Informações e Detalhes do Projeto em Destaque - CENTRALIZADOS */}
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-2 text-center">
              {t.featuredSubtitle}
            </h3>

            <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5 font-normal max-w-2xl text-center">
              {t.featuredDescription}
            </p>

            {/* Tags de Engenharia e Tecnologias */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 mb-6">
              {["Next.js 15", "TypeScript", "Tailwind CSS", "Telemetria Médica", "HIPAA Ready"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-200/80 bg-white/70 px-3 py-1 text-[11px] font-mono text-zinc-700 dark:border-sky-500/20 dark:bg-[#070e1c]/80 dark:text-sky-300 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Botão Inicial de Ação */}
            <div className="flex items-center justify-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 px-5 py-2 text-xs font-mono font-semibold transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer"
              >
                <span>{t.viewFullProject}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 
          CAMADA FINAL: TELA OCULTA COM MOLDURA MODERNA DO CAREPLUS
          Aparece suavemente após o zoom da máscara cobrir a tela.
        */}
        <div
          ref={showcaseRef}
          className="absolute z-30 w-full max-w-4xl px-4 sm:px-6 flex flex-col items-center pointer-events-none opacity-0"
        >
          {/* Badge & Título de Destaque da Tela Oculta - ALINHADO À ESQUERDA */}
          <div className="w-full flex flex-col items-start text-left mb-3 sm:mb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/15 px-3.5 py-1 text-[11px] font-mono tracking-widest text-sky-800 dark:text-sky-200 backdrop-blur-xl shadow-md mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{t.featuredBadge} • {t.liveStatus}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white drop-shadow-sm">
              CarePlus <span className="text-sky-500 dark:text-sky-400 font-semibold">Healthcare OS</span>
            </h2>
          </div>

          {/* Moldura Moderna estilo Browser / Janela */}
          <div className="group relative w-full rounded-2xl sm:rounded-3xl border border-black/10 dark:border-sky-500/30 bg-white/95 dark:bg-[#081020]/95 shadow-[0_25px_70px_rgba(0,0,0,0.35)] dark:shadow-[0_25px_80px_rgba(2,12,28,0.9)] backdrop-blur-2xl overflow-hidden">
            {/* Barra Superior da Janela (Window Controls & URL Bar) */}
            <div className="flex items-center justify-between px-3.5 sm:px-4 py-2 sm:py-2.5 border-b border-black/10 dark:border-sky-500/20 bg-zinc-100/90 dark:bg-[#060b14]/90 backdrop-blur-md">
              {/* Controles de Janela macOS */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-rose-500/80 shadow-xs" />
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-amber-500/80 shadow-xs" />
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500/80 shadow-xs" />
              </div>

              {/* URL Mockup Pill */}
              <div className="flex items-center gap-1.5 rounded-full border border-black/10 dark:border-sky-500/20 bg-white/80 dark:bg-[#0a1426]/80 px-3 sm:px-4 py-0.5 text-[10px] sm:text-[11px] font-mono text-zinc-600 dark:text-sky-300 shadow-inner">
                <Lock className="h-3 w-3 text-emerald-500 shrink-0" />
                <span>https://{t.mockupUrl}</span>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                <Activity className="h-3 w-3 text-sky-500 animate-pulse" />
                <span className="hidden sm:inline">60 FPS</span>
              </div>
            </div>

            {/* Conteúdo da Moldura: Interface Real de Alta Fidelidade do CarePlus */}
            <div className="relative aspect-[16/9] sm:aspect-[16/8.5] w-full overflow-hidden bg-zinc-950">
              <img
                src={media.projects.careplus.image}
                alt="CarePlus Clinical Dashboard"
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
              />

              {/* Gradiente sutil na base para dar acabamento e profundidade */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pointer-events-none" />

              {/* Telemetria e Features em Pills Flutuantes na base da imagem */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] sm:text-xs font-mono text-white/90">
                <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 hidden sm:inline">
                  Telemetria em Tempo Real • Prontuário Eletrônico
                </span>
                <span className="bg-sky-500/20 backdrop-blur-md text-sky-300 px-2.5 py-1 rounded-md border border-sky-400/30">
                  HL7 / FHIR Ready
                </span>
              </div>
            </div>
          </div>

          {/* Botões de Ação da Tela Oculta */}
          <div className="mt-4 sm:mt-5 flex items-center justify-start gap-3 w-full">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-sky-500 hover:bg-sky-400 text-zinc-950 font-mono font-bold text-xs sm:text-sm px-6 sm:px-7 py-2.5 sm:py-3 transition-all duration-300 shadow-xl hover:scale-105 cursor-pointer"
            >
              <span>{t.livePreview}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 dark:border-white/20 bg-white/80 dark:bg-black/40 hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-900 dark:text-white font-mono text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 backdrop-blur-md cursor-pointer"
            >
              <GithubIcon className="h-4 w-4" />
              <span>{t.viewCode}</span>
            </a>
          </div>

          {/* Dica de rolagem sutil para continuar até a galeria */}
          <div className="mt-2.5 sm:mt-3 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-zinc-500 dark:text-zinc-400 animate-bounce self-start">
            <span>↓ {t.continueScroll}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
