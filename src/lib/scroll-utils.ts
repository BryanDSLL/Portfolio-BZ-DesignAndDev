import type Lenis from "@studio-freight/lenis"

declare global {
  interface Window {
    __lenis?: Lenis | null
  }
}

/**
 * Easing cúbico clássico (easeInOutCubic):
 * Aceleração suave e desaceleração cinematográfica progressiva.
 */
export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/**
 * Redirecionamento suave com animação fluida e curva de easing matemática.
 * Utiliza a instância ativa do Lenis se disponível, ou executa via requestAnimationFrame de alta precisão.
 */
export function smoothScrollTo(
  target: string | number | HTMLElement,
  options?: {
    offset?: number
    duration?: number
  }
) {
  const { offset = 0, duration = 1.2 } = options ?? {}

  // 1. Prioriza o motor do Lenis já sincronizado com o GSAP Ticker
  if (typeof window !== "undefined" && window.__lenis) {
    try {
      window.__lenis.scrollTo(target, {
        offset,
        duration,
        easing: easeInOutCubic,
      })
      return
    } catch (err) {
      console.warn("Lenis scrollTo fallback:", err)
    }
  }

  // 2. Fallback matemático nativo com interpolação de easing em rAF
  if (typeof window === "undefined") return

  let targetY = 0
  if (typeof target === "number") {
    targetY = target + offset
  } else if (typeof target === "string") {
    const el = document.querySelector(target) as HTMLElement | null
    if (el) {
      targetY = el.getBoundingClientRect().top + window.pageYOffset + offset
    }
  } else if (target instanceof HTMLElement) {
    targetY = target.getBoundingClientRect().top + window.pageYOffset + offset
  }

  const startY = window.pageYOffset
  const distance = targetY - startY
  const durationMs = duration * 1000
  let startTime: number | null = null

  const step = (currentTime: number) => {
    if (startTime === null) startTime = currentTime
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / durationMs, 1)
    const easedProgress = easeInOutCubic(progress)

    window.scrollTo(0, startY + distance * easedProgress)

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}
