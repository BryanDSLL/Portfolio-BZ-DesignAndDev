import type { FC } from "react"

export interface SmoothCursorProps {
  cursor?: React.ReactNode
}

/** Seta Default Stealth Delta (0ms hardware latency) */
export const DefaultCursorSVG: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
    >
      <g transform="translate(-13.81, -1.72) scale(0.62) rotate(-26, 25.5, 6)">
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          fill="#090d16"
        />
        <path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          stroke="#38bdf8"
          strokeWidth={2.2}
          strokeLinejoin="round"
        />
        <path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          stroke="white"
          strokeWidth={0.8}
          strokeOpacity={0.6}
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

/** Mãozinha Pointer Cyber Stealth (substitui o ponteiro nativo em links e botões) */
export const DefaultPointerSVG: FC = () => {
  const handPath =
    "M8.5 2C7.4 2 6.5 2.9 6.5 4V13.8L5.2 12.5C4.3 11.6 2.9 11.6 2 12.5C1.1 13.4 1.1 14.8 2 15.7L6.8 21.5C8 23 9.8 24 11.8 24H17.5C20.5 24 23 21.5 23 18.5V12C23 10.9 22.1 10 21 10C20.7 10 20.4 10.1 20.2 10.2C19.8 9.5 19 9 18 9C17.7 9 17.4 9.1 17.1 9.2C16.6 8.5 15.9 8 15 8C14.8 8 14.5 8 14.3 8.1V4C14.3 2.9 13.4 2 12.3 2H8.5Z"

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
    >
      <g transform="translate(1, 0.5)">
        <path d={handPath} fill="#090d16" />
        <path
          d={handPath}
          stroke="#38bdf8"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d={handPath}
          stroke="white"
          strokeWidth={0.7}
          opacity={0.65}
          strokeLinejoin="round"
        />
        <path
          d="M15.3 8.5V14M18.1 9.5V14M20.9 10.5V14"
          stroke="#38bdf8"
          strokeWidth={1.3}
          strokeLinecap="round"
          opacity={0.8}
        />
      </g>
    </svg>
  )
}

export function SmoothCursor() {
  // A suíte de cursores agora opera padronizada em todos os estados diretamente via CSS nativo (index.css),
  // cobrindo Default (seta stealth), Pointer (mãozinha cyber em links/botões) e Text (I-beam em inputs),
  // eliminando 100% dos cursores brancos nativos do Windows com 0ms de latência.
  return null
}

export default SmoothCursor
