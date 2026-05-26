"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
};

type Wave = {
  amplitude: number;
  frequency: number;
  phase: number;
  speed: number;
  color: string;
  opacity: number;
  width: number;
};

const waves: Wave[] = [
  {
    amplitude: 30,
    frequency: 0.009,
    phase: 0,
    speed: 0.0011,
    color: "rgba(255, 255, 255, 0.92)",
    opacity: 0.54,
    width: 1.45,
  },
  {
    amplitude: 46,
    frequency: 0.0062,
    phase: Math.PI / 2,
    speed: 0.001,
    color: "rgba(214, 31, 42, 0.82)",
    opacity: 0.36,
    width: 1.25,
  },
  {
    amplitude: 24,
    frequency: 0.012,
    phase: Math.PI,
    speed: 0.0015,
    color: "rgba(255, 255, 255, 0.52)",
    opacity: 0.3,
    width: 0.9,
  },
  {
    amplitude: 56,
    frequency: 0.0044,
    phase: Math.PI * 1.45,
    speed: 0.0008,
    color: "rgba(110, 110, 110, 0.7)",
    opacity: 0.22,
    width: 1.1,
  },
];

export function GlowyWavesBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let animationId = 0;
    let time = 0;
    let prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * pixelRatio);
      canvas.height = Math.floor(rect.height * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const center = { x: rect.width / 2, y: rect.height / 2 };
      mouseRef.current = center;
      targetMouseRef.current = center;
    };

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const handleMouseMove = (event: MouseEvent) => {
      updatePointer(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) updatePointer(touch.clientX, touch.clientY);
    };

    const handleMouseLeave = () => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = { x: rect.width / 2, y: rect.height / 2 };
    };

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches;
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    const drawWave = (
      wave: Wave,
      width: number,
      height: number,
      centerY: number,
      index: number
    ) => {
      ctx.save();
      ctx.beginPath();

      for (let x = -20; x <= width + 20; x += 3) {
        const dx = x - mouseRef.current.x;
        const distance = Math.abs(dx);
        const influence = Math.max(0, 1 - distance / 340);
        const mouseLift =
          influence *
          (prefersReducedMotion ? 8 : 42) *
          Math.sin(time * 0.004 + x * 0.018 + wave.phase);
        const parallax =
          (mouseRef.current.y / Math.max(height, 1) - 0.5) *
          influence *
          (index % 2 === 0 ? 34 : -28);

        const y =
          centerY +
          Math.sin(x * wave.frequency + time * wave.speed + wave.phase) *
            wave.amplitude +
          Math.sin(x * wave.frequency * 0.42 + time * wave.speed * 1.8) *
            wave.amplitude *
            0.38 +
          mouseLift +
          parallax;

        if (x === -20) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.globalAlpha = wave.opacity;
      ctx.lineWidth = wave.width;
      ctx.strokeStyle = wave.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(255, 255, 255, 0.18)";
      ctx.stroke();

      ctx.globalAlpha = wave.opacity * 0.16;
      ctx.lineWidth = wave.width + 8;
      ctx.shadowBlur = 0;
      ctx.strokeStyle = wave.color;
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const smoothing = prefersReducedMotion ? 0.035 : 0.08;

      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * smoothing;

      time += prefersReducedMotion ? 0.08 : 1;

      ctx.clearRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.5
      );
      glow.addColorStop(0, "rgba(255, 255, 255, 0.075)");
      glow.addColorStop(0.38, "rgba(214, 31, 42, 0.045)");
      glow.addColorStop(0.72, "rgba(255, 255, 255, 0.018)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      waves.forEach((wave, index) => {
        drawWave(wave, width, height, height * (0.42 + index * 0.045), index);
      });

      animationId = window.requestAnimationFrame(animate);
    };

    animationId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      reducedMotionQuery.removeEventListener(
        "change",
        handleReducedMotionChange
      );
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-95"
      aria-hidden="true"
    />
  );
}
