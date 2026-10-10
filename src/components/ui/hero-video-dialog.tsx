import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Play, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface HeroVideoDialogProps {
  videoSrc: string
  className?: string
  triggerText?: string
}

export const HeroVideoDialog = ({
  videoSrc,
  className,
  triggerText = "Assistir Showreel",
}: HeroVideoDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Trigger Button or Card */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          "group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-primary/30 bg-primary/10 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:bg-primary/20 hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] cursor-pointer",
          className
        )}
      >
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-md transition-transform duration-300 group-hover:scale-110">
          <Play className="h-4 w-4 fill-white translate-x-0.5" />
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
        </span>
        <span className="tracking-wide">{triggerText}</span>
      </button>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 md:p-10"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 hover:scale-105 cursor-pointer"
                aria-label="Fechar vídeo"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Video Player */}
              <div className="relative aspect-video w-full">
                <iframe
                  src={videoSrc}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Showreel"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
