'use client';
import { useRef, useEffect, type HTMLAttributes } from 'react';

export interface SpotlightConfig {
  radius?: number;
  brightness?: number;
  color?: string;
  smoothing?: number;
}

const useSpotlightEffect = (config: SpotlightConfig) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Desativa em dispositivos touch sem ponteiro fino para economizar bateria e render
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let currentX = -1000;
    let currentY = -1000;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (currentX === -1000) {
        currentX = mouseX;
        currentY = mouseY;
      }
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      currentX = -1000;
      currentY = -1000;
    };

    const hexToRgb = (hex: string) => {
      const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;
      if (cleanHex.length === 3) {
        const r = parseInt(cleanHex[0] + cleanHex[0], 16);
        const g = parseInt(cleanHex[1] + cleanHex[1], 16);
        const b = parseInt(cleanHex[2] + cleanHex[2], 16);
        return `${r},${g},${b}`;
      }
      const bigint = parseInt(cleanHex, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `${r},${g},${b}`;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mouseX !== -1000 && mouseY !== -1000) {
        // Se smoothing configurado, interpola suavemente
        const smoothing = config.smoothing ?? 0.15;
        if (smoothing > 0 && smoothing < 1) {
          currentX += (mouseX - currentX) * smoothing;
          currentY += (mouseY - currentY) * smoothing;
        } else {
          currentX = mouseX;
          currentY = mouseY;
        }

        const isDark = document.documentElement.classList.contains('dark');
        const defaultColor = isDark ? '#38bdf8' : '#0284c7';
        const activeColor = config.color || defaultColor;
        const radius = config.radius || 240;
        const defaultBrightness = isDark ? 0.12 : 0.08;
        const brightness = config.brightness ?? defaultBrightness;

        const gradient = ctx.createRadialGradient(
          currentX, currentY, 0,
          currentX, currentY, radius
        );
        const rgbColor = hexToRgb(activeColor);
        gradient.addColorStop(0, `rgba(${rgbColor}, ${brightness})`);
        gradient.addColorStop(0.5, `rgba(${rgbColor}, ${brightness * 0.4})`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [config.radius, config.brightness, config.color, config.smoothing]);

  return canvasRef;
};

export interface SpotlightCursorProps extends HTMLAttributes<HTMLCanvasElement> {
  config?: SpotlightConfig;
}

export const Component = ({
  config = {},
  className = '',
  ...rest
}: SpotlightCursorProps) => {
  const spotlightConfig: SpotlightConfig = {
    radius: 250,
    brightness: 0.13,
    color: '#38bdf8',
    smoothing: 0.2,
    ...config,
  };

  const canvasRef = useSpotlightEffect(spotlightConfig);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9990] w-full h-full ${className}`}
      {...rest}
    />
  );
};

export const SpotlightCursor = Component;
export default Component;
