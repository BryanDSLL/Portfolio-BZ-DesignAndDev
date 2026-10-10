"use client"

import { useEffect, useMemo, useRef, useState, useCallback } from "react"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"

type Grid = {
  rows: number
  cols: number
}

const DEFAULT_GRIDS: Record<string, Grid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
  "10x10": { rows: 10, cols: 10 },
}

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS

export interface PixelImageProps {
  src: string
  grid?: PredefinedGridKey
  customGrid?: Grid
  grayscaleAnimation?: boolean
  pixelFadeInDuration?: number // in ms
  maxAnimationDelay?: number // in ms
  colorRevealDelay?: number // in ms
  triggerOnView?: boolean
  className?: string
  imageClassName?: string
  onReplayReady?: (replayFn: () => void) => void
}

export const PixelImage = ({
  src,
  grid = "8x8",
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1500,
  triggerOnView = true,
  customGrid,
  className,
  imageClassName,
  onReplayReady,
}: PixelImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, {
    once: false,
    amount: 0.25,
  })

  const [hasTriggered, setHasTriggered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showColor, setShowColor] = useState(false)
  const [animationCycle, setAnimationCycle] = useState(0)

  const MIN_GRID = 1
  const MAX_GRID = 16

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (g?: Grid) => {
      if (!g) return false
      const { rows: r, cols: c } = g
      return (
        Number.isInteger(r) &&
        Number.isInteger(c) &&
        r >= MIN_GRID &&
        c >= MIN_GRID &&
        r <= MAX_GRID &&
        c <= MAX_GRID
      )
    }

    return isValidGrid(customGrid) ? customGrid! : (DEFAULT_GRIDS[grid] || DEFAULT_GRIDS["8x8"])
  }, [customGrid, grid])

  const replay = useCallback(() => {
    setAnimationCycle((c) => c + 1)
  }, [])

  useEffect(() => {
    if (onReplayReady) {
      onReplayReady(replay)
    }
  }, [onReplayReady, replay])

  useEffect(() => {
    if (triggerOnView) {
      if (!isInView && !hasTriggered) {
        return
      }
      if (!isInView && hasTriggered) {
        // Reset when scrolled out so it will rebuild when re-entering
        setIsVisible(false)
        setShowColor(false)
        setHasTriggered(false)
        return
      }
    }

    setHasTriggered(true)
    setIsVisible(false)
    setShowColor(false)

    // Give a brief tick to ensure DOM paints opacity: 0 before triggering enter transitions
    const startTimer = setTimeout(() => {
      setIsVisible(true)
    }, 60)

    const colorTimer = setTimeout(() => {
      setShowColor(true)
    }, colorRevealDelay)

    return () => {
      clearTimeout(startTimer)
      clearTimeout(colorTimer)
    }
  }, [isInView, animationCycle, triggerOnView, colorRevealDelay])

  const pieces = useMemo(() => {
    const total = rows * cols
    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols)
      const col = index % cols

      const clipPath = `polygon(
        ${col * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${(row + 1) * (100 / rows)}%,
        ${col * (100 / cols)}% ${(row + 1) * (100 / rows)}%
      )`

      const delay = Math.random() * maxAnimationDelay
      return {
        clipPath,
        delay,
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, cols, maxAnimationDelay, animationCycle])

  return (
    <div
      ref={containerRef}
      className={cn("relative select-none overflow-hidden", className)}
    >
      {pieces.map((piece, index) => (
        <div
          key={`${animationCycle}-${index}`}
          className={cn(
            "absolute inset-0 transition-opacity ease-out",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            clipPath: piece.clipPath,
            WebkitClipPath: piece.clipPath,
            transitionDelay: isVisible ? `${piece.delay}ms` : "0ms",
            transitionDuration: isVisible ? `${pixelFadeInDuration}ms` : "0ms",
          }}
        >
          <img
            src={src}
            alt={`Pixel image piece ${index + 1}`}
            className={cn("h-full w-full object-cover", imageClassName)}
            style={{
              filter: grayscaleAnimation
                ? showColor
                  ? "grayscale(0%)"
                  : "grayscale(100%)"
                : "none",
              WebkitFilter: grayscaleAnimation
                ? showColor
                  ? "grayscale(0%)"
                  : "grayscale(100%)"
                : "none",
              transition: grayscaleAnimation
                ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  )
}

export default PixelImage
