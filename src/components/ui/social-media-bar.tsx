"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.507 14.307l-.009.075c-.234-.117-1.383-.682-1.598-.76-.215-.078-.371-.117-.527.117-.156.234-.606.76-.743.916-.137.156-.273.176-.508.058-.234-.117-.988-.364-1.882-1.161-.696-.621-1.166-1.388-1.303-1.622-.137-.234-.015-.36.103-.477.106-.105.234-.273.351-.41.117-.137.156-.234.234-.39.078-.156.039-.293-.02-.41-.058-.117-.527-1.27-.723-1.738-.19-.457-.385-.395-.528-.402l-.45-.008c-.156 0-.41.058-.625.293-.215.234-.82.801-.82 1.953s.84 2.266.957 2.422c.117.156 1.654 2.525 4.008 3.541.56.242.997.386 1.338.494.563.179 1.076.154 1.481.093.452-.068 1.383-.566 1.578-1.113.195-.547.195-1.016.137-1.113-.058-.098-.214-.156-.448-.273zm-5.467 7.693c-2.072 0-3.993-.608-5.61-1.658l-.402-.24-4.168 1.093 1.112-4.062-.262-.418a10.02 10.02 0 0 1-1.536-5.365c0-5.541 4.509-10.05 10.05-10.05 2.684 0 5.207 1.045 7.104 2.943a9.98 9.98 0 0 1 2.944 7.105c0 5.541-4.509 10.05-10.05 10.05z" />
    </svg>
  )
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

interface SocialLink {
  id: string
  name: string
  handle: string
  url: string
  color: string
  hoverBg: string
  icon: React.ReactNode
}

export function SocialMediaBar() {
  const links: SocialLink[] = [
    {
      id: "linkedin",
      name: "LinkedIn",
      handle: "in/bryan-zimbrao",
      url: "https://www.linkedin.com",
      color: "text-[#0A66C2]",
      hoverBg: "hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10",
      icon: <LinkedinIcon className="h-4 w-4" />,
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      handle: "+55 (Conversar)",
      url: "https://wa.me/5511999999999?text=Ol%C3%A1%20Bryan!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar.",
      color: "text-[#25D366]",
      hoverBg: "hover:border-[#25D366]/40 hover:bg-[#25D366]/10",
      icon: <WhatsappIcon className="h-4 w-4" />,
    },
    {
      id: "instagram",
      name: "Instagram",
      handle: "@bryan.dev",
      url: "https://www.instagram.com",
      color: "text-[#E4405F]",
      hoverBg: "hover:border-[#E4405F]/40 hover:bg-[#E4405F]/10",
      icon: <InstagramIcon className="h-4 w-4" />,
    },
    {
      id: "github",
      name: "GitHub",
      handle: "@bryan-dev",
      url: "https://github.com",
      color: "text-zinc-900 dark:text-white",
      hoverBg: "hover:border-white/40 hover:bg-white/10",
      icon: <GithubIcon className="h-4 w-4" />,
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
      {links.map((link) => (
        <div key={link.id} className="relative group">
          <motion.a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2 rounded-full border border-black/10 dark:border-white/15 bg-white/80 dark:bg-[#070e1a]/80 backdrop-blur-md text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200 shadow-sm transition-all duration-300 cursor-pointer",
              link.hoverBg
            )}
          >
            <span className={cn("transition-transform duration-300 group-hover:scale-115", link.color)}>
              {link.icon}
            </span>
            <span className="font-semibold">{link.name}</span>
            <ArrowUpRight className="h-3 w-3 opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-zinc-500 dark:text-zinc-400" />
          </motion.a>
        </div>
      ))}
    </div>
  )
}
