"use client"

import React, { useState, forwardRef } from "react"
import {
  Terminal,
  Play,
  Pause,
  Zap,
  ShieldCheck,
  Cpu,
  Info,
  ExternalLink,
  MousePointerClick,
} from "lucide-react"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"
import { BlurFade } from "@/components/ui/blur-fade"
import { useLanguage } from "@/store/use-language"
import { translations } from "@/lib/translations"
import { cn } from "@/lib/utils"
import { SectionDemarcator } from "@/components/ui/section-demarcator"

import { OFFICIAL_TECH_ICONS } from "@/components/ui/tech-icons"

// Tech Interface
interface TechItem {
  id: string
  name: string
  category: "Core" | "State & Forms" | "3D & Motion" | "Testing & MCP" | "UI Systems"
  role: string
  description: string
  orbit: 1 | 2 | 3
  icon: React.ReactNode
  color: string
  url: string
  tags: string[]
}

// 16 Complete Tech Stack List with 100% Official Brand Icons
const TECH_STACK: TechItem[] = [
  // Orbit 1: Core Foundation (4 items)
  {
    id: "react",
    name: "React 19",
    category: "Core",
    role: "Core UI & Server Actions",
    description: "Componentização moderna, Actions assíncronas e renderização otimizada com a versão mais recente do ecossistema React.",
    orbit: 1,
    icon: OFFICIAL_TECH_ICONS.react,
    color: "#00d8ff",
    url: "https://react.dev",
    tags: ["React 19", "Server Actions", "Hooks", "Concurrent UI"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Core",
    role: "100% Strict Type-Safe",
    description: "Tipagem estrita de ponta a ponta, autocompletion inteligente e prevenção cirúrgica de bugs em produção.",
    orbit: 1,
    icon: OFFICIAL_TECH_ICONS.typescript,
    color: "#3178c6",
    url: "https://www.typescriptlang.org",
    tags: ["Strict Typing", "Type Inference", "Interfaces", "Generics"],
  },
  {
    id: "vite",
    name: "Vite",
    category: "Core",
    role: "Ultra-Fast Build Engine",
    description: "Bundling veloz baseado em Rollup/ESBuild com HMR instantâneo para máxima produtividade de desenvolvimento.",
    orbit: 1,
    icon: OFFICIAL_TECH_ICONS.vite,
    color: "#bd34fe",
    url: "https://vite.dev",
    tags: ["Rollup / ESBuild", "Instant HMR", "Fast Bundler", "Zero Config"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Core",
    role: "Design Tokens & Utilities",
    description: "Arquitetura utility-first com design tokens customizados, suporte completo a temas dinâmicos e zero CSS bloat.",
    orbit: 1,
    icon: OFFICIAL_TECH_ICONS.tailwind,
    color: "#38bdf8",
    url: "https://tailwindcss.com",
    tags: ["Utility-First", "Design Tokens", "Dark Mode", "Fluid CSS"],
  },

  // Orbit 2: State, Forms, 3D & Testing (6 items)
  {
    id: "zustand",
    name: "Zustand",
    category: "State & Forms",
    role: "Atomic State Management",
    description: "Gerenciamento de estado global leve, reativo e sem prop drilling, garantindo renderizações cirúrgicas.",
    orbit: 2,
    icon: OFFICIAL_TECH_ICONS.zustand,
    color: "#eab308",
    url: "https://zustand.docs.pmnd.rs",
    tags: ["Atomic State", "Zero Boilerplate", "No Re-renders", "Persist Middleware"],
  },
  {
    id: "framer-motion",
    name: "Framer Motion",
    category: "3D & Motion",
    role: "Cinematic Micro-Interactions",
    description: "Animações declarativas com física de molas (springs), transições de layout suaves e orquestração de gestos.",
    orbit: 2,
    icon: OFFICIAL_TECH_ICONS.framerMotion,
    color: "#ea4c89",
    url: "https://motion.dev",
    tags: ["Spring Physics", "Gestures", "Layout Morph", "60 FPS"],
  },
  {
    id: "threejs",
    name: "Three.js",
    category: "3D & Motion",
    role: "WebGL & 3D Canvas",
    description: "Renderização 3D interativa em tempo real com shaders customizados e iluminação dinâmica no navegador.",
    orbit: 2,
    icon: OFFICIAL_TECH_ICONS.threejs,
    color: "#ffffff",
    url: "https://threejs.org",
    tags: ["WebGL 3D", "Shaders", "Lighting & Shadows", "Interactive Canvas"],
  },
  {
    id: "react-hook-form",
    name: "React Hook Form",
    category: "State & Forms",
    role: "Zero Re-Render Forms",
    description: "Formulários de alta performance com validação assíncrona desacoplada de re-renderizações desnecessárias.",
    orbit: 2,
    icon: OFFICIAL_TECH_ICONS.reactHookForm,
    color: "#ec5990",
    url: "https://react-hook-form.com",
    tags: ["Isolated Re-renders", "Async Validation", "Uncontrolled Inputs", "Super Fast"],
  },
  {
    id: "zod",
    name: "Zod",
    category: "State & Forms",
    role: "Runtime Schema Validation",
    description: "Definição de esquemas tipados com inferência automática de tipos e validação estrita de dados e APIs.",
    orbit: 2,
    icon: OFFICIAL_TECH_ICONS.zod,
    color: "#3b82f6",
    url: "https://zod.dev",
    tags: ["Runtime Schema", "Type Inference", "SafeParse", "DTO Validation"],
  },
  {
    id: "vitest",
    name: "Vitest",
    category: "Testing & MCP",
    role: "Next-Gen Unit Testing",
    description: "Suíte de testes unitários ultrarrápida nativa em Vite, compatível com sintaxe Jest e execução paralela multithread.",
    orbit: 2,
    icon: OFFICIAL_TECH_ICONS.vitest,
    color: "#729b1b",
    url: "https://vitest.dev",
    tags: ["Vite Native", "Jest Compatible", "Multi-Threaded", "Instant Feedback"],
  },

  // Orbit 3: Advanced UI Libraries & MCP Automation (6 items)
  {
    id: "playwright",
    name: "Playwright (MCP)",
    category: "Testing & MCP",
    role: "E2E Testing & Browser MCP",
    description: "Automação de ponta a ponta e agentes de navegação MCP para validação contínua de interfaces e fluxos complexos.",
    orbit: 3,
    icon: OFFICIAL_TECH_ICONS.playwright,
    color: "#2ead33",
    url: "https://playwright.dev",
    tags: ["E2E Automation", "Browser Agents", "MCP Protocol", "Cross-Browser"],
  },
  {
    id: "figma-mcp",
    name: "Figma MCP",
    category: "Testing & MCP",
    role: "Design Tokens & Sync MCP",
    description: "Conexão direta de design tokens do Figma para componentes React via protocolo MCP de inteligência artificial.",
    orbit: 3,
    icon: OFFICIAL_TECH_ICONS.figmaMcp,
    color: "#a259ff",
    url: "https://www.figma.com",
    tags: ["Design System", "MCP Bridge", "Token Sync", "Design-to-Code"],
  },
  {
    id: "twenty-first-dev",
    name: "21st Dev",
    category: "UI Systems",
    role: "High-End Parallax & Galleries",
    description: "Componentes criativos de alta engenharia visual, como o Parallax Hero Scrolling e Elastic Galleries.",
    orbit: 3,
    icon: OFFICIAL_TECH_ICONS.twentyFirstDev,
    color: "#38bdf8",
    url: "https://21st.dev",
    tags: ["Cinematic UI", "Parallax Effects", "Micro-Interactions", "Registry"],
  },
  {
    id: "magic-ui",
    name: "Magic UI",
    category: "UI Systems",
    role: "Cinematic Beams & Orbits",
    description: "Biblioteca de animações de vanguarda: Animated Beam, Orbiting Circles, Spinning Text e Video Text com MCP dedicado.",
    orbit: 3,
    icon: OFFICIAL_TECH_ICONS.magicUi,
    color: "#22d3ee",
    url: "https://magicui.design",
    tags: ["Orbiting Circles", "Animated Beams", "Bento Grid", "MCP Integration"],
  },
  {
    id: "aceternity-ui",
    name: "Aceternity UI",
    category: "UI Systems",
    role: "Futuristic Visual Components",
    description: "Elementos de vanguarda com visual dark mode, gradientes fluidos e efeitos visuais imersivos.",
    orbit: 3,
    icon: OFFICIAL_TECH_ICONS.aceternity,
    color: "#818cf8",
    url: "https://ui.aceternity.com",
    tags: ["Visual Impact", "Modern Gradients", "Futuristic Design", "Dark Aesthetics"],
  },
  {
    id: "shadcn-ui",
    name: "Shadcn UI",
    category: "UI Systems",
    role: "Accessible Headless Primitives",
    description: "Componentes acessíveis construídos com Radix UI, totalmente customizáveis e prontos para produção.",
    orbit: 3,
    icon: OFFICIAL_TECH_ICONS.shadcn,
    color: "#ffffff",
    url: "https://ui.shadcn.com",
    tags: ["Radix Primitives", "Fully Accessible", "Copy-Paste Code", "Tailwind Ready"],
  },
]

// Circular Tech Node Component with interactive tooltip
interface CircularTechNodeProps {
  tech: TechItem
  isSelected: boolean
  onClick: () => void
  onHover: () => void
}

const CircularTechNode = forwardRef<HTMLDivElement, CircularTechNodeProps>(
  ({ tech, isSelected, onClick, onHover }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        onMouseEnter={onHover}
        className={cn(
          "group relative flex size-10 sm:size-11 cursor-pointer items-center justify-center rounded-full border bg-white/90 p-2 shadow-md backdrop-blur-md transition-all duration-300 hover:scale-120 dark:bg-[#0a1526]/90 dark:shadow-black/70",
          isSelected
            ? "border-sky-500 ring-4 ring-sky-500/20 shadow-xl scale-115 z-30 dark:border-sky-400 dark:ring-sky-400/25 dark:shadow-[0_0_24px_rgba(56,189,248,0.3)]"
            : "border-zinc-200/90 dark:border-sky-500/20 hover:border-sky-400 dark:hover:border-sky-400/60 hover:shadow-lg dark:hover:shadow-[0_0_16px_rgba(56,189,248,0.15)]"
        )}
      >
        <div className="h-full w-full flex items-center justify-center pointer-events-none transition-transform group-hover:scale-110">
          {tech.icon}
        </div>

        {/* Hover / Active Floating Label Tooltip */}
        <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-black/10 bg-zinc-900/95 px-2.5 py-1 text-[10px] font-mono font-semibold text-white shadow-xl opacity-0 backdrop-blur-md transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1 dark:border-sky-500/30 dark:bg-[#070e1c]/95 z-40">
          <span className="flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: tech.color }}
            />
            {tech.name}
          </span>
        </div>
      </div>
    )
  }
)

CircularTechNode.displayName = "CircularTechNode"

export function StackBeamSection() {
  const [selectedTech, setSelectedTech] = useState<TechItem>(TECH_STACK[0])
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const { language } = useLanguage()
  const t = translations[language].stack

  // Orbit filters (3 concentric orbits)
  const orbit1Techs = TECH_STACK.filter((t) => t.orbit === 1)
  const orbit2Techs = TECH_STACK.filter((t) => t.orbit === 2)
  const orbit3Techs = TECH_STACK.filter((t) => t.orbit === 3)

  return (
    <section
      id="stack"
      className="relative w-full min-h-screen lg:h-screen lg:max-h-screen flex flex-col justify-between select-none py-12 lg:py-10 overflow-hidden"
    >
      {/* Background radial gradient accent (subtle architectural lighting) */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[550px] w-[750px] rounded-full bg-zinc-300/20 dark:bg-white/[0.02] blur-[160px]" />
      </div>

      {/* Demarcador de Seção no Topo - alinhado à esquerda na mesma coordenada que o Hero */}
      <div className="w-full px-4 sm:px-12 md:px-16 lg:px-24 pt-2 mb-2 lg:mb-0 shrink-0">
        <SectionDemarcator label={t.badge} />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12 items-center justify-center my-auto">
        {/* Left Column (5 cols on lg): Header, Controls, Dynamic Spotlight Card, Compact Pillar Highlights */}
        <BlurFade delay={0.1} inView className="w-full lg:col-span-5 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            {t.titlePrefix}
            <span className="text-zinc-900 dark:text-white">
              {t.titleSuffix}
            </span>
          </h2>

          <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-md">
            {t.description}
          </p>

          {/* Interactive Orbit Controls Bar: Play / Pause */}
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? t.resume : t.pause}
              className="flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1.5 text-xs font-mono font-medium text-sky-800 dark:text-sky-300 shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-sky-500/20 hover:border-sky-400 cursor-pointer"
            >
              {isPaused ? (
                <>
                  <Play className="h-3.5 w-3.5 fill-current text-sky-600 dark:text-sky-400" />
                  <span>{t.resume}</span>
                </>
              ) : (
                <>
                  <Pause className="h-3.5 w-3.5 fill-current text-sky-600 dark:text-sky-400" />
                  <span>{t.pause}</span>
                </>
              )}
            </button>

            <span className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-sky-400 transition-opacity",
                  isPaused ? "opacity-30" : "animate-pulse shadow-[0_0_8px_#38bdf8]"
                )}
              />
              <span>{isPaused ? t.pausedOrbits : t.activeOrbits}</span>
            </span>

            {/* Interactive User Callout Hint */}
            <div className="flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-50/60 dark:bg-sky-500/10 px-3 py-1 text-[11px] font-mono text-sky-700 dark:text-sky-300 backdrop-blur-sm">
              <MousePointerClick className="h-3 w-3 text-sky-500 dark:text-sky-400 shrink-0 animate-bounce" />
              <span>{t.hoverHint}</span>
            </div>
          </div>

          {/* Interactive Selected Tech Spotlight Card */}
          <div className="mt-4 w-full rounded-2xl border border-zinc-200/90 bg-white/80 p-3.5 sm:p-4 shadow-sm backdrop-blur-md dark:border-sky-500/25 dark:bg-[#080f1e]/90 transition-all duration-300">
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div
                  className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-zinc-50 p-2 shadow-inner dark:border-sky-500/30 dark:bg-[#0d1c33]/70"
                  style={{ borderColor: `${selectedTech.color}50` }}
                >
                  {selectedTech.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold tracking-tight text-zinc-900 dark:text-white truncate">
                      {selectedTech.name}
                    </h3>
                    <span className="rounded-full bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 text-[10px] font-mono font-medium dark:bg-sky-950/70 dark:text-sky-300 dark:border-sky-800/60">
                      {selectedTech.category}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-sky-600 dark:text-sky-400 truncate">
                    {t.techRoles[selectedTech.id] || selectedTech.role}
                  </p>
                </div>
              </div>

              {/* Header Actions: Órbita indicator & Botão de Site Oficial fixo no topo direito */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-white/5 px-2 py-0.5 rounded-full border border-black/5 dark:border-white/10">
                  <Info className="h-3 w-3 text-sky-500 dark:text-sky-400" />
                  <span>{t.orbitPrefix} {selectedTech.orbit}</span>
                </span>

                <a
                  href={selectedTech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500 hover:text-white px-2.5 sm:px-3 py-1 text-xs font-mono font-medium text-sky-700 dark:text-sky-300 dark:hover:bg-sky-500 dark:hover:text-zinc-950 transition-all duration-200 shadow-xs cursor-pointer shrink-0"
                  title={`${t.visitWebsite} - ${selectedTech.name}`}
                >
                  <span>{t.visitWebsite}</span>
                  <ExternalLink className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            <p className="mt-2.5 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {t.techDescriptions[selectedTech.id] || selectedTech.description}
            </p>

            {/* Tags Bar exclusiva com largura total */}
            <div className="mt-3.5 pt-2.5 border-t border-zinc-200/80 dark:border-sky-500/20 flex flex-wrap items-center gap-1.5">
              {selectedTech.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-zinc-100/90 dark:bg-sky-500/10 text-zinc-700 dark:text-sky-300 border border-black/5 dark:border-sky-500/20 px-2 py-0.5 text-[10px] font-mono font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 3 Compact Architectural Pillars Highlights */}
          <div className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2 w-full">
            <div className="rounded-xl border border-zinc-200/70 bg-white/60 p-1.5 sm:p-2 dark:border-sky-500/20 dark:bg-[#080f1e]/60 backdrop-blur-sm transition-all hover:border-sky-400 dark:hover:border-sky-500/40">
              <div className="flex items-center gap-1 sm:gap-1.5 text-zinc-900 dark:text-white font-semibold text-[10px] sm:text-[11px]">
                <Zap className="h-3 w-3 text-sky-500 dark:text-sky-400 shrink-0" />
                <span className="truncate">{t.pillars.p1Title}</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                {t.pillars.p1Sub}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200/70 bg-white/60 p-1.5 sm:p-2 dark:border-sky-500/20 dark:bg-[#080f1e]/60 backdrop-blur-sm transition-all hover:border-sky-400 dark:hover:border-sky-500/40">
              <div className="flex items-center gap-1 sm:gap-1.5 text-zinc-900 dark:text-white font-semibold text-[10px] sm:text-[11px]">
                <ShieldCheck className="h-3 w-3 text-sky-500 dark:text-sky-400 shrink-0" />
                <span className="truncate">{t.pillars.p2Title}</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                {t.pillars.p2Sub}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200/70 bg-white/60 p-1.5 sm:p-2 dark:border-sky-500/20 dark:bg-[#080f1e]/60 backdrop-blur-sm transition-all hover:border-sky-400 dark:hover:border-sky-500/40">
              <div className="flex items-center gap-1 sm:gap-1.5 text-zinc-900 dark:text-white font-semibold text-[10px] sm:text-[11px]">
                <Cpu className="h-3 w-3 text-sky-500 dark:text-sky-400 shrink-0" />
                <span className="truncate">{t.pillars.p3Title}</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                {t.pillars.p3Sub}
              </p>
            </div>
          </div>
        </BlurFade>

        {/* Right Column (7 cols on lg): Circular Orbit Arena */}
        <BlurFade delay={0.2} inView className="w-full lg:col-span-7 flex items-center justify-center mt-6 lg:mt-0">
          <div className="relative w-full max-w-[540px] h-[450px] sm:h-[490px] lg:h-[520px] xl:h-[535px] rounded-3xl border border-zinc-200/80 bg-white/70 p-2 sm:p-4 shadow-xl backdrop-blur-xl dark:border-sky-500/25 dark:bg-[#070e1c]/95 dark:shadow-[0_20px_50px_rgba(2,12,28,0.7)] overflow-hidden flex items-center justify-center">
            {/* Subtle Grid Pattern Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0284c715_1px,transparent_1px),linear-gradient(to_bottom,#0284c715_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

            {/* Orbit Stage Container */}
            <div
              className={cn(
                "relative flex size-full items-center justify-center scale-[0.58] min-[360px]:scale-[0.66] min-[400px]:scale-[0.74] sm:scale-[0.84] lg:scale-[0.90] -translate-y-3.5 transition-transform duration-500",
                isPaused && "[&_.animate-orbit]:[animation-play-state:paused]"
              )}
            >
              {/* Center Hub: Dev */}
              <div className="group relative z-30 flex size-24 sm:size-26 flex-col items-center justify-center rounded-full border border-sky-400/40 bg-white/95 p-3 text-center shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-108 hover:border-sky-400 dark:border-sky-500/50 dark:bg-[#0d1c33]/95 dark:shadow-[0_0_25px_rgba(2,132,199,0.2)] dark:hover:border-sky-400 dark:hover:shadow-[0_0_35px_rgba(56,189,248,0.35)]">
                <div className="absolute -inset-1 rounded-full bg-sky-500/10 dark:bg-sky-400/10 opacity-50 blur-md transition duration-500 group-hover:opacity-100" />
                <span className="absolute top-1 right-2 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                </span>
                <div className="relative flex size-8 items-center justify-center rounded-full bg-sky-50 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400 shadow-inner mb-0.5">
                  <Terminal className="h-4 w-4" />
                </div>
                <span className="relative text-sm font-bold tracking-tight text-zinc-900 dark:text-white">
                  Dev
                </span>
              </div>

              {/* 3 Concentric Orbiting Circles (Magic UI) */}
              <OrbitingCircles iconSize={42} radius={96} duration={26} path={true} className="hover:[animation-play-state:paused]">
                {orbit1Techs.map((tech) => (
                  <CircularTechNode
                    key={tech.id}
                    tech={tech}
                    isSelected={selectedTech.id === tech.id}
                    onClick={() => setSelectedTech(tech)}
                    onHover={() => setSelectedTech(tech)}
                  />
                ))}
              </OrbitingCircles>
              <OrbitingCircles iconSize={42} radius={162} duration={36} reverse path={true} className="hover:[animation-play-state:paused]">
                {orbit2Techs.map((tech) => (
                  <CircularTechNode
                    key={tech.id}
                    tech={tech}
                    isSelected={selectedTech.id === tech.id}
                    onClick={() => setSelectedTech(tech)}
                    onHover={() => setSelectedTech(tech)}
                  />
                ))}
              </OrbitingCircles>
              <OrbitingCircles iconSize={42} radius={228} duration={48} path={true} className="hover:[animation-play-state:paused]">
                {orbit3Techs.map((tech) => (
                  <CircularTechNode
                    key={tech.id}
                    tech={tech}
                    isSelected={selectedTech.id === tech.id}
                    onClick={() => setSelectedTech(tech)}
                    onHover={() => setSelectedTech(tech)}
                  />
                ))}
              </OrbitingCircles>
            </div>

            {/* Bottom Orbit Arena Interactive Hint - posicionado fora da órbita na base, preenchendo horizontalmente sem quebra de linha */}
            <div className="pointer-events-none absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-zinc-500 dark:text-zinc-400 bg-white/90 dark:bg-[#070e1c]/90 backdrop-blur-md px-3 sm:px-4 py-1 rounded-full border border-black/5 dark:border-sky-500/20 shadow-xs z-30 whitespace-nowrap max-w-[92%] justify-center">
              <MousePointerClick className="h-3 w-3 text-sky-500 dark:text-sky-400 shrink-0" />
              <span className="whitespace-nowrap">{t.arenaHint}</span>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}

export default StackBeamSection
