'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { useLanguage } from '@/store/use-language';
import { translations } from '@/lib/translations';
import { smoothScrollTo } from '@/lib/scroll-utils';
import { Text3DFlip } from '@/components/ui/text-3d-flip';
import media from '@/data/media.json';

export function ParallaxComponent({ isLoaded = true }: { isLoaded?: boolean }) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = translations[language].hero;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    if (triggerElement && parallaxRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: '0% 0%',
          end: '100% 0%',
          scrub: 0,
        },
      });

      const layers = [
        { layer: '1', yPercent: 65 },
        { layer: '2', yPercent: 48 },
        { layer: '3', yPercent: 30 },
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: 'none',
          },
          idx === 0 ? undefined : '<'
        );
      });

      // Smooth fade-out of hero text overlays during scroll transition to section 2
      // Using explicit fromTo ensures scrubbing back to 0% scroll unconditionally restores full opacity and y: 0
      tl.fromTo(
        parallaxRef.current.querySelectorAll('.parallax__text-overlay'),
        {
          opacity: 1,
          y: 0,
        },
        {
          opacity: 0,
          y: -40,
          ease: 'power1.out',
        },
        0
      );
    }

    const lenis = new Lenis();
    if (typeof window !== 'undefined') {
      window.__lenis = lenis;
    }
    lenis.on('scroll', ScrollTrigger.update);
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (triggerElement) {
        gsap.killTweensOf(triggerElement);
      }
      gsap.ticker.remove(tickerCallback);
      if (typeof window !== 'undefined') {
        window.__lenis = null;
      }
      lenis.destroy();
    };
  }, []);

  return (
    <div
      id="inicio"
      className="parallax relative w-full h-screen min-h-[720px] overflow-hidden bg-[#06080d] select-none"
      ref={parallaxRef}
    >
      {/* Visual Section: Osmo / 21st.dev 4-Layer Depth Parallax */}
      <div className="parallax__visuals absolute inset-0 w-full h-full">
        <div className="parallax__black-line-overflow absolute -top-[1px] left-0 w-full h-[2px] bg-[#06080d] z-10"></div>

        <div data-parallax-layers className="parallax__layers relative w-full h-full overflow-hidden">
          {/* Layer 1: Sky, Moon & Distant Mountain */}
          <img
            src={media.hero.parallaxLayer1}
            loading="eager"
            width="1920"
            height="1080"
            data-parallax-layer="1"
            alt="Céu noturno e montanhas"
            className="parallax__layer-img absolute inset-0 w-full h-full object-cover object-center pointer-events-none scale-105 filter brightness-[0.85] contrast-[1.1]"
          />

          {/* Layer 2: Mid-ground Mountain Ridge */}
          <img
            src={media.hero.parallaxLayer2}
            loading="eager"
            width="1920"
            height="1080"
            data-parallax-layer="2"
            alt="Picos nevados"
            className="parallax__layer-img absolute inset-0 w-full h-full object-cover object-center pointer-events-none scale-105 filter brightness-[0.88] contrast-[1.1]"
          />

          {/* Layer 3: Profile Hero (Bryan Zimbrão + Capsule Picture) */}
          <div
            data-parallax-layer="3"
            className="parallax__layer-title absolute inset-0 w-full h-full flex items-center justify-center z-[3] px-4 pointer-events-none"
          >
            <div className="relative text-center w-full max-w-7xl mx-auto flex flex-col items-center justify-center -translate-y-4 sm:-translate-y-6">
              <motion.div
                initial={{ opacity: 0, y: -25 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -25 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="pointer-events-auto w-fit mx-auto inline-flex justify-center"
              >
                <Text3DFlip
                  as="h1"
                  staggerDuration={0.035}
                  staggerFrom="first"
                  rotateDirection="bottom"
                  className="w-fit inline-flex m-0 p-0 font-bold text-[60px] min-[360px]:text-[76px] sm:text-[120px] md:text-[150px] lg:text-[185px] xl:text-[210px] leading-[0.85] tracking-tighter uppercase justify-center whitespace-nowrap flex-nowrap text-white drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)] select-none cursor-pointer"
                  flipTextClassName="text-sky-400 font-bold drop-shadow-[0_0_35px_rgba(56,189,248,0.8)]"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  BRYAN
                </Text3DFlip>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -25 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -25 }}
                transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                className="pointer-events-auto w-fit mx-auto inline-flex justify-center"
              >
                <Text3DFlip
                  as="h1"
                  staggerDuration={0.035}
                  staggerFrom="first"
                  rotateDirection="bottom"
                  className="w-fit inline-flex m-0 p-0 font-bold text-[60px] min-[360px]:text-[76px] sm:text-[120px] md:text-[150px] lg:text-[185px] xl:text-[210px] leading-[0.85] tracking-tighter uppercase justify-center whitespace-nowrap flex-nowrap text-white drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)] select-none cursor-pointer"
                  flipTextClassName="text-sky-400 font-bold drop-shadow-[0_0_35px_rgba(56,189,248,0.8)]"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  ZIMBRÃO
                </Text3DFlip>
              </motion.div>

              {/* Centered Capsule Profile Picture - Tamanho ajustado e elegante */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto">
                <div className="w-[45px] h-[78px] min-[360px]:w-[52px] min-[360px]:h-[88px] sm:w-[64px] sm:h-[108px] md:w-[76px] md:h-[128px] lg:w-[88px] lg:h-[148px] xl:w-[94px] xl:h-[158px] rounded-full overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.85)] border-2 border-white/35 dark:border-sky-400/50 ring-2 sm:ring-4 ring-black/40 transition-transform duration-300 hover:scale-110 cursor-pointer">
                  <img
                    src={media.profile.avatar}
                    alt={media.profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient Dark Atmospheric Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none z-[5]" />

        {/* Sombra Suave Dinâmica na base do hero: sutil e baixa para transição suave sem cobrir as montanhas */}
        <div className="parallax__fade absolute bottom-0 left-0 right-0 h-20 sm:h-24 md:h-28 bg-gradient-to-t from-slate-50/90 via-slate-50/40 to-transparent dark:from-[#06080d] dark:via-[#06080d]/60 dark:to-transparent pointer-events-none z-[6] transition-all duration-500" />
      </div>

      {/* Top Left Title: PORTFÓLIO / DESENVOLVIMENTO */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
        className="absolute top-20 sm:top-28 md:top-32 left-4 sm:left-12 md:left-16 lg:left-24 right-4 sm:right-12 md:right-16 lg:right-24 z-[10] pointer-events-none"
      >
        <div className="parallax__text-overlay flex items-center gap-4 sm:gap-6 w-full">
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase text-white dark:text-sky-400 font-semibold drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] transition-colors duration-300 shrink-0">
            {t.tag}
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/35 dark:from-sky-500/35 to-transparent" />
        </div>
      </motion.div>

      {/* Bottom Left Content: Sombra suave por trás do texto, ajustado com padding responsivo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-4 sm:bottom-10 md:bottom-12 left-3 right-3 sm:left-12 sm:right-auto md:left-16 lg:left-24 z-[10] max-w-xl text-left pointer-events-auto"
      >
        <div className="relative overflow-hidden p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/60 dark:bg-[#070e1a]/45 backdrop-blur-xl backdrop-saturate-150 border border-white/70 dark:border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.2)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.65)] transition-colors duration-500">
          {/* Reflexo especular no chanfro de vidro superior (Apple Glass effect) */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 dark:via-sky-400/40 to-transparent" />
          
          {/* Brilho de refração interna */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 dark:via-transparent dark:to-white/5 opacity-70" />

          <div className="relative z-1 flex flex-col gap-0.5">
            <Text3DFlip
              as="h2"
              staggerDuration={0.03}
              staggerFrom="first"
              rotateDirection="bottom"
              className="text-xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-zinc-950 dark:text-white tracking-tight leading-[1.15] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)] dark:drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] transition-colors duration-300"
              flipTextClassName="text-sky-600 dark:text-sky-400 font-extrabold"
            >
              {t.headlineLine1}
            </Text3DFlip>
            <Text3DFlip
              as="h2"
              staggerDuration={0.03}
              staggerFrom="first"
              rotateDirection="bottom"
              className="text-xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-zinc-950 dark:text-white tracking-tight leading-[1.15] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)] dark:drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] transition-colors duration-300"
              flipTextClassName="text-sky-600 dark:text-sky-400 font-extrabold"
            >
              {t.headlineLine2}
            </Text3DFlip>
          </div>

          <p className="relative z-1 mt-2.5 sm:mt-4 text-xs sm:text-base text-zinc-900 dark:text-zinc-100 max-w-md leading-relaxed font-medium whitespace-pre-line drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)] dark:drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] transition-colors duration-300">
            {t.description}
          </p>

          <a
            href="#stack"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('#stack');
            }}
            className="relative z-1 mt-4 sm:mt-6 inline-flex items-center gap-2 rounded-full border border-sky-600/35 bg-sky-500/15 hover:bg-sky-500/25 px-3.5 py-1.5 text-xs font-mono font-bold tracking-widest uppercase text-sky-800 hover:text-sky-950 dark:border-sky-400/35 dark:bg-sky-500/20 dark:text-sky-200 dark:hover:bg-sky-500/30 transition-all duration-300 group cursor-pointer w-fit shadow-xs backdrop-blur-md"
          >
            <span className="text-sm transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            <span>{t.explore}</span>
          </a>
        </div>
      </motion.div>

      {/* Bottom Right Indicator: ● 01 — 04 (oculto no mobile para não sobrepor o card e o botão de contato) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
        className="absolute bottom-8 sm:bottom-10 md:bottom-12 right-28 sm:right-32 md:right-36 lg:right-40 z-[10] hidden md:flex"
      >
        <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest text-zinc-900 dark:text-zinc-100 px-3.5 py-1.5 rounded-full bg-gradient-to-br from-white/75 via-white/55 to-white/45 dark:from-[#0b1325]/55 dark:via-[#070e1a]/45 dark:to-[#040812]/55 backdrop-blur-2xl backdrop-saturate-150 border border-white/60 dark:border-white/15 shadow-lg transition-colors duration-300 font-semibold">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
          <span>01 — 04</span>
        </div>
      </motion.div>
    </div>
  );
}

export default ParallaxComponent;

