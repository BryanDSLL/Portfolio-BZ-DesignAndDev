import { cn } from "@/lib/utils"

interface SectionDemarcatorProps {
  label: string
  className?: string
  textClassName?: string
  lineClassName?: string
}

export function SectionDemarcator({
  label,
  className,
  textClassName,
  lineClassName,
}: SectionDemarcatorProps) {
  return (
    <div className={cn("w-full flex items-center gap-4 sm:gap-6 select-none", className)}>
      <span
        className={cn(
          "text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase font-semibold text-zinc-600 dark:text-sky-400 shrink-0 transition-colors duration-300",
          textClassName
        )}
      >
        {label}
      </span>
      <div
        className={cn(
          "h-[1px] flex-1 bg-gradient-to-r from-zinc-300 via-zinc-200/50 to-transparent dark:from-sky-500/35 dark:via-sky-500/10 dark:to-transparent",
          lineClassName
        )}
      />
    </div>
  )
}
