import { useEffect, useState } from "react"
import { AnimatePresence, motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

export interface WordRotateProps {
  words: string[]
  duration?: number
  framerProps?: HTMLMotionProps<"span">
  className?: string
}

export const WordRotate = ({
  words,
  duration = 2500,
  framerProps = {
    initial: { opacity: 0, y: -20, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: 20, filter: "blur(8px)" },
    transition: { duration: 0.35, ease: "easeOut" },
  },
  className,
}: WordRotateProps) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, duration)

    return () => clearInterval(interval)
  }, [words, duration])

  return (
    <div className="inline-block overflow-hidden py-1">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className={cn("inline-block font-bold tracking-tight", className)}
          {...framerProps}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
