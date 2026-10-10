"use client"

import React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  delay?: number
  duration?: number
  yOffset?: number
  className?: string
  once?: boolean
  margin?: string
}

export function SectionReveal({
  children,
  delay = 0,
  duration = 0.65,
  yOffset = 32,
  className,
  once = true,
  margin = "-70px",
  ...props
}: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: margin as any }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Ultra-smooth cubic bezier spring
      }}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Staggered list container
interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className,
  ...props
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Child item inside StaggerContainer
export function StaggerItem({
  children,
  yOffset = 24,
  className,
}: {
  children: React.ReactNode
  yOffset?: number
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export default SectionReveal
