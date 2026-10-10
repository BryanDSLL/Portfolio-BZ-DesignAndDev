import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"
import { ParallaxComponent } from "@/components/ui/parallax-scrolling"
import { StackBeamSection } from "@/components/sections/stack-beam-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ProjectsGallerySection } from "@/components/sections/gallery-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { FloatingContactButton } from "@/components/ui/floating-contact-button"
import { Preloader } from "@/components/ui/preloader"
import { SectionReveal } from "@/components/ui/section-reveal"
import { SpotlightCursor } from "@/components/ui/spotlight-cursor"

export const App = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  // Garante que todo reload/F5 sempre reseta a rolagem para o início do topo
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior })
  }, [])

  return (
    <div className="relative min-h-screen bg-slate-50 text-zinc-900 dark:bg-[#06080d] dark:text-white selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-950 transition-colors duration-300">
      {/* Efeito Spotlight Dinâmico que segue o Cursor com atmosfera suave */}
      <SpotlightCursor config={{ radius: 260, brightness: 0.12, color: "#38bdf8", smoothing: 0.2 }} />

      {/* Telinha de Loading Fluida / Preloader de Entrada (F5 / Inicial) */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Header com Navegação e Theme Toggler (Sincronizado) */}
      <Navbar isLoaded={isLoaded} />

      <main className="relative flex flex-col w-full">
        {/* Sessão 1: Parallax 21st Dev Hero (Sincronizado) */}
        <ParallaxComponent isLoaded={isLoaded} />

        {/* Sessão 2: Animated Beam & Orbiting Circles (Magic UI) Tech & Skills Radar */}
        <StackBeamSection />

        {/* Sessão 3: Featured Video Text (CarePlus) - Sessão dedicada com VideoText Magic UI */}
        <ProjectsSection />

        {/* Sessão 4: Galeria dos demais projetos (Sessão separada) */}
        <ProjectsGallerySection />

        {/* Sessão 5: Sobre Mim (Magic UI PixelImage + Balões flutuantes + Social Media) */}
        <AboutSection />

        {/* Sessão 6: Formulário de Contato Direto & Propostas */}
        <ContactSection />
      </main>

      {/* Floating Action Button (FAB) com Magic UI Spinning Text para Contato (Sincronizado) */}
      <FloatingContactButton isLoaded={isLoaded} />

      {/* Footer Minimalista com animação de entrada */}
      <SectionReveal margin="-30px">
        <footer className="border-t border-zinc-200 dark:border-white/5 py-8 px-4 text-center text-[11px] sm:text-xs text-zinc-500 leading-relaxed">
          <p>© {new Date().getFullYear()} Bryan.Dev • Construído com React 19, Vite, Tailwind CSS, Framer Motion & Magic UI.</p>
        </footer>
      </SectionReveal>
    </div>
  )
}

export default App

