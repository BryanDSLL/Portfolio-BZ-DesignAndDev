"use client"

import { useLanguage } from "@/store/use-language"
import { cn } from "@/lib/utils"

export function BrazilFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
    >
      <rect width="64" height="64" rx="32" fill="#009C3B" />
      <polygon points="32,10 57,32 32,54 7,32" fill="#FFDF00" />
      <circle cx="32" cy="32" r="14" fill="#002776" />
      <path
        d="M18.5 34.5C22 30 29 28.5 45.5 32"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function USAFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
    >
      <rect width="64" height="64" rx="32" fill="#B22234" />
      <rect y="10" width="64" height="7" fill="#FFFFFF" />
      <rect y="24" width="64" height="7" fill="#FFFFFF" />
      <rect y="38" width="64" height="7" fill="#FFFFFF" />
      <rect y="52" width="64" height="7" fill="#FFFFFF" />
      <rect width="32" height="32" rx="4" fill="#3C3B6E" />
      {/* Mini stars pattern */}
      <circle cx="8" cy="8" r="1.8" fill="#FFFFFF" />
      <circle cx="16" cy="8" r="1.8" fill="#FFFFFF" />
      <circle cx="24" cy="8" r="1.8" fill="#FFFFFF" />
      <circle cx="12" cy="16" r="1.8" fill="#FFFFFF" />
      <circle cx="20" cy="16" r="1.8" fill="#FFFFFF" />
      <circle cx="8" cy="24" r="1.8" fill="#FFFFFF" />
      <circle cx="16" cy="24" r="1.8" fill="#FFFFFF" />
      <circle cx="24" cy="24" r="1.8" fill="#FFFFFF" />
    </svg>
  )
}

export function LanguageSwitcher({
  className,
  isNotch = false,
}: {
  className?: string
  isNotch?: boolean
}) {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1",
        !isNotch &&
          "rounded-full border border-black/10 bg-black/5 p-0.5 dark:border-white/10 dark:bg-white/5 backdrop-blur-md transition-colors",
        className
      )}
      role="group"
      aria-label="Seleção de idioma / Language selector"
    >
      <button
        type="button"
        onClick={() => setLanguage("pt")}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-2 sm:px-2.5 py-0.5 text-xs font-mono transition-all duration-200 cursor-pointer select-none leading-none",
          language === "pt"
            ? "bg-zinc-900 text-white font-semibold shadow-xs dark:bg-sky-500/20 dark:text-sky-300 dark:border dark:border-sky-500/30"
            : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100"
        )}
        title="Português (Brasil)"
        aria-pressed={language === "pt"}
      >
        <BrazilFlag className="h-3 w-3 rounded-full shadow-xs shrink-0" />
        <span className="text-[10px] sm:text-[11px] font-semibold leading-none">PT</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-2 sm:px-2.5 py-0.5 text-xs font-mono transition-all duration-200 cursor-pointer select-none leading-none",
          language === "en"
            ? "bg-zinc-900 text-white font-semibold shadow-xs dark:bg-sky-500/20 dark:text-sky-300 dark:border dark:border-sky-500/30"
            : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100"
        )}
        title="English (US)"
        aria-pressed={language === "en"}
      >
        <USAFlag className="h-3 w-3 rounded-full shadow-xs shrink-0" />
        <span className="text-[10px] sm:text-[11px] font-semibold leading-none">EN</span>
      </button>
    </div>
  )
}
