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
    amplitude: 34,
    frequency: 0.008,
    phase: 0,
    speed: 0.0012,
    color: "rgba(0, 229, 255, 0.9)",
    opacity: 0.6,
    width: 2.4,
  },
  {
    amplitude: 42,
    frequency: 0.006,
    phase: Math.PI / 2,
    speed: 0.001,
    color: "rgba(255, 255, 255, 0.72)",
    opacity: 0.42,
    width: 1.6,
  },
  {
    amplitude: 28,
    frequency: 0.01,
    phase: Math.PI,
    speed: 0.0014,
    color: "rgba(255, 82, 82, 0.75)",
    opacity: 0.34,
    width: 1.8,
  },
  {
    amplitude: 52,
    frequency: 0.0048,
    phase: Math.PI * 1.45,
    speed: 0.0008,
    color: "rgba(0, 229, 255, 0.5)",
    opacity: 0.28,
    width: 3,
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

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
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
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    const drawWave = (
      wave: Wave,
      width: number,
      height: number,
      centerY: number
    ) => {
      ctx.save();
      ctx.beginPath();

      for (let x = -20; x <= width + 20; x += 3) {
        const dx = x - mouseRef.current.x;
        const distance = Math.abs(dx);
        const influence = Math.max(0, 1 - distance / 260);
        const mouseLift =
          influence *
          (prefersReducedMotion ? 6 : 28) *
          Math.sin(time * 0.004 + x * 0.018 + wave.phase);

        const y =
          centerY +
          Math.sin(x * wave.frequency + time * wave.speed + wave.phase) *
            wave.amplitude +
          Math.sin(x * wave.frequency * 0.42 + time * wave.speed * 1.8) *
            wave.amplitude *
            0.38 +
          mouseLift;

        if (x === -20) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.globalAlpha = wave.opacity;
      ctx.lineWidth = wave.width;
      ctx.strokeStyle = wave.color;
      ctx.shadowBlur = 36;
      ctx.shadowColor = wave.color;
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
      glow.addColorStop(0, "rgba(0, 229, 255, 0.18)");
      glow.addColorStop(0.42, "rgba(0, 229, 255, 0.055)");
      glow.addColorStop(0.72, "rgba(255, 82, 82, 0.035)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      waves.forEach((wave, index) => {
        drawWave(wave, width, height, height * (0.42 + index * 0.045));
      });

      animationId = window.requestAnimationFrame(animate);
    };

    animationId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
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
      className="absolute inset-0 h-full w-full opacity-95 [mask-image:radial-gradient(ellipse_at_center,black_0%,black_52%,transparent_78%)]"
      aria-hidden="true"
    />
  );
}
