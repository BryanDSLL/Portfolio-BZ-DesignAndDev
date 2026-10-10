import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Sparkles, X } from "lucide-react"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useLanguage } from "@/store/use-language"
import { translations } from "@/lib/translations"
import { smoothScrollTo } from "@/lib/scroll-utils"
import { cn } from "@/lib/utils"

export const Navbar = ({ isLoaded = true }: { isLoaded?: boolean }) => {
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState("stack")
  const [showThemeHint, setShowThemeHint] = useState(false)
  const { language } = useLanguage()
  const t = translations[language].nav

  // Exibe o indicador de escolha de tema assim que a página carrega
  useEffect(() => {
    if (!isLoaded) return
    if (sessionStorage.getItem("theme_hint_dismissed")) return

    const timer = setTimeout(() => {
      setShowThemeHint(true)
    }, 1200)

    return () => clearTimeout(timer)
  }, [isLoaded])

  // Desvanece a dica automaticamente ao rolar a página para não obstruir
  useEffect(() => {
    if (scrolled) {
      setShowThemeHint(false)
    }
  }, [scrolled])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)

      const sections = [
        { id: "inicio", tab: "" },
        { id: "stack", tab: "stack" },
        { id: "projetos", tab: "projects" },
        { id: "sobre", tab: "about" },
        { id: "contato", tab: "contact" },
      ]

      const scrollPosition = window.scrollY + 220
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section.id)
        if (el && el.offsetTop <= scrollPosition) {
          setActiveTab(section.tab)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "stack", name: t.stack, href: "#stack" },
    { id: "projects", name: t.projects, href: "#projetos" },
    { id: "about", name: t.about, href: "#sobre" },
  ]

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={isLoaded ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex items-center justify-center px-2 sm:px-4 pointer-events-none"
    >
      <div className="relative flex flex-wrap md:flex-nowrap items-center justify-center gap-1.5 sm:gap-2 max-w-full">
        {/* Notch Flutuante Principal Centralizado com Glassmorphism em Dark e Light Mode */}
        <div
          className={cn(
            "pointer-events-auto flex items-center gap-1.5 sm:gap-3 md:gap-5 rounded-full px-2.5 sm:px-5 py-1.5 transition-all duration-300 shadow-2xl shrink-0",
            scrolled
              ? "border border-black/10 bg-white/90 text-zinc-900 shadow-zinc-950/10 backdrop-blur-2xl dark:border-sky-500/20 dark:bg-[#070e1a]/90 dark:text-white dark:shadow-[0_10px_30px_rgba(2,12,28,0.8)]"
              : "border border-black/5 bg-white/75 text-zinc-900 shadow-lg backdrop-blur-xl dark:border-sky-500/20 dark:bg-[#070d18]/75 dark:text-white"
          )}
        >
          {/* Brand Logo - Bryan.Dev com redirecionamento fluido com ease para a primeira sessão */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault()
              setActiveTab("")
              smoothScrollTo(0, { duration: 1.2 })
            }}
            className="flex items-center gap-0.5 text-xs sm:text-sm md:text-base font-bold tracking-tight text-zinc-900 dark:text-white hover:opacity-85 transition-opacity pl-0.5 sm:pl-1 cursor-pointer shrink-0"
          >
            <span>
              Bryan<span className="text-sky-500 dark:text-sky-400 font-semibold">.Dev</span>
            </span>
          </a>

          {/* Separador vertical sutil */}
          <div className="h-3.5 w-[1px] bg-zinc-300 dark:bg-sky-500/20 hidden sm:block shrink-0" />

          {/* Navigation Links com transição fluida com easing curve */}
          <nav className="flex items-center gap-0.5 sm:gap-1.5">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab(item.id)
                  smoothScrollTo(item.href, { duration: 1.2 })
                }}
                className={cn(
                  "rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-sm transition-all duration-200 cursor-pointer select-none",
                  activeTab === item.id
                    ? "bg-zinc-900 text-white font-semibold shadow-xs dark:bg-sky-500/20 dark:text-sky-300 dark:border dark:border-sky-500/30"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-black/5 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/5 font-medium"
                )}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Separador vertical sutil */}
          <div className="h-3.5 w-[1px] bg-zinc-300 dark:bg-sky-500/20" />

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Theme Toggler Container com Indicador Interativo de Escolha */}
            <div className="relative flex items-center justify-center">
              {/* Efeito de Halo/Ping sutil ao redor do botão enquanto a dica está ativa */}
              {showThemeHint && (
                <span className="pointer-events-none absolute -inset-1 rounded-full border-2 border-sky-400 dark:border-sky-300 animate-ping opacity-60" />
              )}

              <AnimatedThemeToggler
                variant="circle"
                duration={450}
                onToggle={() => {
                  setShowThemeHint(false)
                  sessionStorage.setItem("theme_hint_dismissed", "true")
                }}
                className={cn(
                  "flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border transition-all duration-300 [&_svg]:h-3.5 [&_svg]:w-3.5 cursor-pointer outline-none",
                  showThemeHint
                    ? "border-sky-500 bg-sky-500/15 text-sky-800 shadow-[0_0_14px_rgba(56,189,248,0.45)] dark:border-sky-400 dark:bg-sky-400/20 dark:text-sky-300"
                    : "border-black/10 bg-black/5 text-zinc-700 hover:text-zinc-950 hover:bg-black/10 dark:border-sky-500/20 dark:bg-sky-500/5 dark:text-sky-200 dark:hover:text-white dark:hover:bg-sky-500/15"
                )}
              />

              {/* Tooltip Indicador Flutuante apontando exatamente para o botão de tema */}
              <AnimatePresence>
                {showThemeHint && (
                  <div className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 z-50 pointer-events-none flex justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.92 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="pointer-events-auto relative flex items-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-2xl border border-sky-500/30 bg-white/95 px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-mono font-medium text-zinc-900 shadow-2xl backdrop-blur-2xl dark:border-sky-400/40 dark:bg-[#070e1a]/95 dark:text-white dark:shadow-[0_10px_35px_rgba(2,12,28,0.85)] select-none"
                    >
                      {/* Seta indicadora apontando diretamente para o centro do botão de tema */}
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-t border-l border-sky-500/30 bg-white/95 dark:border-sky-400/40 dark:bg-[#070e1a]/95" />

                      <span className="relative z-10 flex items-center gap-1.5 text-sky-700 dark:text-sky-300">
                        <Sparkles className="h-3.5 w-3.5 text-sky-500 dark:text-sky-400 animate-spin" style={{ animationDuration: "6s" }} />
                        <span className="text-[10px] sm:text-xs font-semibold text-zinc-800 dark:text-zinc-100">{t.themeHint}</span>
                      </span>

                      {/* Botão de Fechar Dica */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowThemeHint(false)
                          sessionStorage.setItem("theme_hint_dismissed", "true")
                        }}
                        className="relative z-10 rounded-full p-0.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors cursor-pointer ml-0.5"
                        aria-label="Fechar dica"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Button: Vamos Conversar / Let's Talk com redirecionamento suave */}
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault()
                smoothScrollTo("#contato", { duration: 1.2 })
              }}
              className="group inline-flex items-center gap-1 rounded-full border border-zinc-900/20 bg-zinc-900 px-2 sm:px-3.5 py-1 text-xs font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-zinc-800 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200 dark:hover:bg-sky-500 dark:hover:text-zinc-950 shadow-sm cursor-pointer shrink-0"
              title={t.letsTalk}
            >
              <span className="hidden sm:inline">{t.letsTalk}</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Segundo Notch: Seletor de Idioma (independente, bem ao lado do principal) */}
        <div
          className={cn(
            "pointer-events-auto md:absolute md:left-[calc(100%+8px)] lg:left-[calc(100%+10px)] md:top-1/2 md:-translate-y-1/2 flex items-center rounded-full px-1 sm:px-1.5 py-0.5 transition-all duration-300 shadow-2xl shrink-0",
            scrolled
              ? "border border-black/10 bg-white/90 text-zinc-900 shadow-zinc-950/10 backdrop-blur-2xl dark:border-sky-500/20 dark:bg-[#070e1a]/90 dark:text-white dark:shadow-[0_10px_30px_rgba(2,12,28,0.8)]"
              : "border border-black/5 bg-white/75 text-zinc-900 shadow-lg backdrop-blur-xl dark:border-sky-500/20 dark:bg-[#070d18]/75 dark:text-white"
          )}
        >
          <LanguageSwitcher isNotch />
        </div>
      </div>
    </motion.header>
  )
}

export default Navbar
