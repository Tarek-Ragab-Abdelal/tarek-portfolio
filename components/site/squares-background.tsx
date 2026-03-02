"use client";

import { useRef, useEffect } from "react";

interface SquaresProps {
  direction?: "diagonal" | "up" | "right" | "down" | "left";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
}

export function SquaresBackground({
  direction = "diagonal",
  speed = 0.3,
  borderColor = "rgba(59,130,246,0.08)",
  squareSize = 40,
  hoverFillColor = "rgba(59,130,246,0.12)"
}: Readonly<SquaresProps>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquare = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const sx = x - (gridOffset.current.x % squareSize);
          const sy = y - (gridOffset.current.y % squareSize);

          if (
            hoveredSquare.current &&
            Math.floor((x - startX) / squareSize) === hoveredSquare.current.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquare.current.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(sx, sy, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(sx, sy, squareSize, squareSize);
        }
      }

      // Radial vignette fade
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
      );
      gradient.addColorStop(0, "rgba(10, 10, 10, 0)");
      gradient.addColorStop(1, "#0a0a0a");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const tick = () => {
      const s = Math.max(speed, 0.1);
      switch (direction) {
        case "right": gridOffset.current.x = (gridOffset.current.x - s + squareSize) % squareSize; break;
        case "left": gridOffset.current.x = (gridOffset.current.x + s + squareSize) % squareSize; break;
        case "up": gridOffset.current.y = (gridOffset.current.y + s + squareSize) % squareSize; break;
        case "down": gridOffset.current.y = (gridOffset.current.y - s + squareSize) % squareSize; break;
        case "diagonal":
          gridOffset.current.x = (gridOffset.current.x - s + squareSize) % squareSize;
          gridOffset.current.y = (gridOffset.current.y - s + squareSize) % squareSize;
          break;
      }
      draw();
      requestRef.current = requestAnimationFrame(tick);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;
      hoveredSquare.current = {
        x: Math.floor((mx + gridOffset.current.x - startX) / squareSize),
        y: Math.floor((my + gridOffset.current.y - startY) / squareSize)
      };
    };

    const onMouseLeave = () => { hoveredSquare.current = null; };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    requestRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return <canvas ref={canvasRef} className="h-full w-full border-none block" />;
}
