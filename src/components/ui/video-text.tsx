"use client"

import React, {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react"
import { cn } from "@/lib/utils"
import media from "@/data/media.json"

export interface VideoTextProps {
  /**
   * The video source URL
   */
  src?: string
  /**
   * Additional className for the container
   */
  className?: string
  /**
   * Whether to autoplay the video
   */
  autoPlay?: boolean
  /**
   * Whether to mute the video
   */
  muted?: boolean
  /**
   * Whether to loop the video
   */
  loop?: boolean
  /**
   * Whether to preload the video
   */
  preload?: "auto" | "metadata" | "none"
  /**
   * The content to display (will have the video "inside" it)
   */
  children?: ReactNode
  /**
   * Optional text prop alias for children
   */
  text?: string
  /**
   * Font size for the text mask
   * @default 170
   */
  fontSize?: string | number
  /**
   * Font weight for the text mask
   * @default "900"
   */
  fontWeight?: string | number
  /**
   * Text anchor for the text mask
   * @default "middle"
   */
  textAnchor?: string
  /**
   * Dominant baseline for the text mask
   * @default "middle"
   */
  dominantBaseline?: string
  /**
   * Font family for the text mask
   * @default "sans-serif"
   */
  fontFamily?: string
  /**
   * The element type to render for the text
   * @default "div"
   */
  as?: ElementType
}

export function VideoText({
  src = media.videos.ocean.cdn,
  children,
  text,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize,
  fontWeight = "900",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
  as: Component = "div",
}: VideoTextProps) {
  const content = text ?? React.Children.toArray(children).join("")
  const videoRef = useRef<HTMLVideoElement>(null)

  // Remove any quotes to guarantee valid SVG XML
  const cleanFontFamily = (fontFamily || "sans-serif").replace(/['"]/g, "")

  const buildSvgMask = () => {
    const size = fontSize ?? 170
    return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1000 250"><text x="50%" y="55%" font-size="${size}" font-weight="${fontWeight}" text-anchor="${textAnchor}" dominant-baseline="${dominantBaseline}" font-family="${cleanFontFamily}">${content}</text></svg>`
  }

  const [svgMask, setSvgMask] = useState(buildSvgMask)

  useEffect(() => {
    setSvgMask(buildSvgMask())
  }, [content, fontSize, fontWeight, textAnchor, dominantBaseline, cleanFontFamily])

  // Ensure autoplay works on all modern browser autoplay security policies
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {
        // Handled silently
      })
    }
  }, [src])

  const dataUrlMask = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`

  return (
    <Component className={cn("relative size-full", className)}>
      {/* Create a container that masks the video to only show within text */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-500"
        style={{
          maskImage: dataUrlMask,
          WebkitMaskImage: dataUrlMask,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
          playsInline
        >
          <source src={src} type="video/webm" />
          <source src={media.videos.ocean.local} type="video/webm" />
          <source src={media.videos.ocean.cdn} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Add a backup text element for SEO/accessibility */}
      <span className="sr-only">{content}</span>
    </Component>
  )
}

export default VideoText
