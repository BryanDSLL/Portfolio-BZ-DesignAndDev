"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Sparkles } from "lucide-react"

interface PreloaderProps {
  onComplete?: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState("INICIALIZANDO ECOSSISTEMA BRYAN.DEV...")
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    // 1. Force scroll to top on every mount/reload
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior })
    document.body.style.overflow = "hidden"

    // 2. High-precision requestAnimationFrame animation loop (~1.75s duration)
    const startTime = performance.now()
    const duration = 1750
    let animationFrameId: number

    const update = (now: number) => {
      const elapsed = now - startTime
      const t = Math.min(elapsed / duration, 1)

      // Fluid easing curve:
      // - 0 to 45% of time: fast rise to ~65%
      // - 45% to 72% of time: gentle pacing around 65% - 82%
      // - 72% to 100% of time: smooth ease-out quadratic glide to 100%
      let calculatedProgress: number
      if (t < 0.45) {
        calculatedProgress = (t / 0.45) * 65
      } else if (t < 0.72) {
        const subT = (t - 0.45) / 0.27
        calculatedProgress = 65 + subT * 17
      } else {
        const subT = (t - 0.72) / 0.28
        // Smooth quadratic ease-out
        calculatedProgress = 82 + (1 - Math.pow(1 - subT, 2)) * 18
      }

      const currentInt = Math.min(Math.floor(calculatedProgress), 100)
      setProgress(currentInt)

      // Live status text progression
      if (currentInt < 25) {
        setStatusText("INICIALIZANDO ECOSSISTEMA BRYAN.DEV...")
      } else if (currentInt < 55) {
        setStatusText("CARREGANDO ATIVOS VISUAIS & FONTES...")
      } else if (currentInt < 85) {
        setStatusText("SINCRONIZANDO MICRO-INTERAÇÕES A 60 FPS...")
      } else if (currentInt < 100) {
        setStatusText("CALIBRANDO RADAR ORBITAL & SHADERS...")
      } else {
        setStatusText("SISTEMA PRONTO // BEM-VINDO")
      }

      if (t < 1) {
        animationFrameId = requestAnimationFrame(update)
      } else {
        setProgress(100)
        setStatusText("SISTEMA PRONTO // BEM-VINDO")

        // Brief 260ms pause on 100% for impact, then start the curtain lift
        setTimeout(() => {
          setIsFinished(true)
          document.body.style.overflow = ""
          // Trigger page entrance animations right as curtain lifts
          if (onComplete) onComplete()
        }, 260)
      }
    }

    animationFrameId = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(animationFrameId)
      document.body.style.overflow = ""
    }
  }, [onComplete])

  return (
    <AnimatePresence mode="wait">
      {!isFinished && (
        <motion.div
          key="preloader-overlay"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1], // Signature cubic-bezier curtain wipe
            },
          }}
          className="fixed inset-0 z-[999999] flex flex-col justify-between bg-[#06080d] p-6 sm:p-12 text-white select-none overflow-hidden"
        >
          {/* Ambient Lighting Mesh (100% self-contained, no background leakage) */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-white/[0.02] blur-[150px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
          </div>

          {/* Top Bar: Brand & Mode */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="relative z-10 flex items-center justify-between text-xs font-mono tracking-widest text-zinc-400"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-white font-bold tracking-normal font-sans">Bryan.Dev</span>
              <span className="text-zinc-600">/</span>
              <span className="text-[11px] text-zinc-400">BRYAN ZIMBRÃO</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-zinc-500 text-[11px]">
              <Sparkles className="h-3 w-3 text-zinc-400" />
              <span>CREATIVE ARCHITECT & FRONTEND DEV</span>
            </div>
          </motion.div>

          {/* Center: Brand Monogram & Numerical Counter */}
          <div className="relative z-10 my-auto flex flex-col items-center text-center">
            {/* Terminal Monogram Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-3xl border border-white/15 bg-white/[0.04] shadow-[0_0_30px_rgba(255,255,255,0.04)] backdrop-blur-xl"
            >
              <Terminal className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
            </motion.div>

            {/* Giant Monospace Progress Counter */}
            <div className="flex items-baseline gap-1 font-mono tracking-tighter">
              <span className="text-6xl sm:text-8xl md:text-9xl font-black bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                {String(progress).padStart(2, "0")}
              </span>
              <span className="text-2xl sm:text-4xl font-bold text-zinc-500">%</span>
            </div>

            {/* Dynamic Status Text */}
            <motion.div
              key={statusText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono text-zinc-300 backdrop-blur-md max-w-[92%] justify-center"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span className="truncate">{statusText}</span>
            </motion.div>
          </div>

          {/* Bottom Bar: Precision Progress Bar & Specs */}
          <div className="relative z-10 flex flex-col gap-3">
            {/* Precision Silver Progress Track */}
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-zinc-800/80">
              <motion.div
                className="h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-zinc-500 gap-2">
              <span className="truncate max-w-[70%] sm:max-w-none">STACK // REACT 19 • THREE.JS • MAGIC UI</span>
              <span className="text-zinc-400 shrink-0">60 FPS ENGINE</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader
