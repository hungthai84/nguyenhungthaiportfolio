import React, { useEffect, useState, useRef } from "react";
import { useCursor } from "../context/CursorContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  rotation: number;
  vRot: number;
  shape: "star" | "bubble" | "sparkle" | "clay";
}

export default function PointCursor() {
  const { cursorEffect } = useCursor();
  const [enabled, setEnabled] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const cyberRef = useRef<HTMLDivElement>(null);
  const clayRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const outerPos = useRef({ x: -100, y: -100 });
  const lastMousePos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (cursorEffect === "off") {
      return;
    }

    // Check if touch device
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches &&
      !window.matchMedia("(pointer: fine)").matches
    ) {
      setEnabled(false);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      mousePos.current = { x, y };

      if (!isVisible) setIsVisible(true);

      // Spawn particles based on movement distance for sparkles / bubbles
      const dist = Math.hypot(x - lastMousePos.current.x, y - lastMousePos.current.y);
      if (dist > 6) {
        if (cursorEffect === "sparkles") {
          const colors = ["#fbbf24", "#f472b6", "#a78bfa", "#60a5fa", "#34d399", "#ffffff"];
          const count = Math.min(3, Math.floor(dist / 10) + 1);
          for (let i = 0; i < count; i++) {
            particlesRef.current.push({
              x: x + (Math.random() - 0.5) * 12,
              y: y + (Math.random() - 0.5) * 12,
              vx: (Math.random() - 0.5) * 2.5,
              vy: Math.random() * 2 + 0.5,
              size: Math.random() * 6 + 3,
              alpha: 1,
              color: colors[Math.floor(Math.random() * colors.length)],
              rotation: Math.random() * 360,
              vRot: (Math.random() - 0.5) * 8,
              shape: "star"
            });
          }
        } else if (cursorEffect === "bubbles") {
          const colors = ["rgba(96, 165, 250, 0.7)", "rgba(147, 197, 253, 0.8)", "rgba(192, 132, 252, 0.6)", "rgba(255, 255, 255, 0.85)"];
          if (Math.random() < 0.45) {
            particlesRef.current.push({
              x: x + (Math.random() - 0.5) * 16,
              y: y + (Math.random() - 0.5) * 16,
              vx: (Math.random() - 0.5) * 1.5,
              vy: -Math.random() * 2 - 0.5,
              size: Math.random() * 10 + 4,
              alpha: 0.9,
              color: colors[Math.floor(Math.random() * colors.length)],
              rotation: 0,
              vRot: 0,
              shape: "bubble"
            });
          }
        }
        lastMousePos.current = { x, y };
      }

      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
        innerRef.current.style.visibility = "visible";
      }
      if (cyberRef.current) {
        cyberRef.current.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
        cyberRef.current.style.visibility = "visible";
      }
      if (clayRef.current) {
        clayRef.current.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
        clayRef.current.style.visibility = "visible";
      }

      // Check hover interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          "button, a, input, select, textarea, [role='button'], .cursor-pointer, .glass-card, [data-interactive]"
        );
        setIsHovering(!!interactive);
      }
    };

    const onMouseDown = () => {
      setIsMouseDown(true);
      // Spawn burst particles on click
      const { x, y } = mousePos.current;
      if (cursorEffect === "sparkles") {
        for (let i = 0; i < 12; i++) {
          const angle = (Math.PI * 2 * i) / 12;
          const speed = Math.random() * 4 + 2;
          particlesRef.current.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 8 + 4,
            alpha: 1,
            color: "#fbbf24",
            rotation: Math.random() * 360,
            vRot: (Math.random() - 0.5) * 15,
            shape: "star"
          });
        }
      } else if (cursorEffect === "bubbles") {
        for (let i = 0; i < 8; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 3 + 1;
          particlesRef.current.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 12 + 6,
            alpha: 1,
            color: "rgba(147, 197, 253, 0.8)",
            rotation: 0,
            vRot: 0,
            shape: "bubble"
          });
        }
      }
    };

    const onMouseUp = () => {
      setIsMouseDown(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      if (innerRef.current) innerRef.current.style.visibility = "hidden";
      if (outerRef.current) outerRef.current.style.visibility = "hidden";
      if (cyberRef.current) cyberRef.current.style.visibility = "hidden";
      if (clayRef.current) clayRef.current.style.visibility = "hidden";
    };

    const onMouseEnter = () => {
      setIsVisible(true);
      if (innerRef.current) innerRef.current.style.visibility = "visible";
      if (outerRef.current) outerRef.current.style.visibility = "visible";
      if (cyberRef.current) cyberRef.current.style.visibility = "visible";
      if (clayRef.current) clayRef.current.style.visibility = "visible";
    };

    // Canvas resize handling
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Animation Loop
    const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    };

    const animate = () => {
      const ease = cursorEffect === "clay" ? 0.12 : 0.18;
      outerPos.current.x += (mousePos.current.x - outerPos.current.x) * ease;
      outerPos.current.y += (mousePos.current.y - outerPos.current.y) * ease;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${outerPos.current.x}px, ${outerPos.current.y}px, 0px)`;
        if (isVisible) outerRef.current.style.visibility = "visible";
      }

      // Particle canvas rendering for sparkles and bubbles
      const canvas = canvasRef.current;
      if (canvas && (cursorEffect === "sparkles" || cursorEffect === "bubbles")) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          for (let i = particlesRef.current.length - 1; i >= 0; i--) {
            const p = particlesRef.current[i];
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.vRot;
            p.alpha -= 0.024;
            p.size = Math.max(0, p.size - 0.08);

            if (p.alpha <= 0 || p.size <= 0) {
              particlesRef.current.splice(i, 1);
              continue;
            }

            ctx.save();
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);

            if (p.shape === "star") {
              ctx.fillStyle = p.color;
              ctx.shadowColor = p.color;
              ctx.shadowBlur = 8;
              drawStar(ctx, 0, 0, 4, p.size, p.size * 0.4);
            } else if (p.shape === "bubble") {
              ctx.fillStyle = p.color;
              ctx.beginPath();
              ctx.arc(0, 0, p.size, 0, Math.PI * 2);
              ctx.fill();

              // Bubble shine highlight
              ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
              ctx.beginPath();
              ctx.arc(-p.size * 0.35, -p.size * 0.35, p.size * 0.28, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();
          }
        }
      } else if (canvas) {
        // Clear canvas if not in particle effect
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", updateCanvasSize);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible, cursorEffect]);

  if (!enabled || cursorEffect === "off") return null;

  return (
    <>
      {/* Dynamic Particle Canvas for Sparkles and Bubbles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9990]"
      />

      {/* 1. DEFAULT MAGIC CURSOR (Red/Orange Precision Dot & Smooth Outer Ring) */}
      {cursorEffect === "default" && (
        <>
          <div
            ref={innerRef}
            className={`m-magic-cursor mmc-inner ${isHovering ? "mmc-hover" : ""} ${isMouseDown ? "scale-75" : ""}`}
          />
          <div
            ref={outerRef}
            className={`m-magic-cursor mmc-outer ${isHovering ? "mmc-hover" : ""}`}
          />
        </>
      )}

      {/* 2. SPARKLES CURSOR (Star core with pulsing golden violet aura) */}
      {cursorEffect === "sparkles" && (
        <div
          ref={innerRef}
          className={`fixed left-0 top-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out ${
            isHovering ? "scale-150" : isMouseDown ? "scale-75" : "scale-100"
          }`}
        >
          <div className="relative flex items-center justify-center">
            <div className="w-4 h-4 bg-gradient-to-tr from-amber-400 via-rose-400 to-purple-400 rounded-full shadow-[0_0_16px_#f59e0b] animate-pulse" />
            <div className="absolute w-7 h-7 border border-amber-300/80 rounded-full animate-ping opacity-50" />
            <div className="absolute w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
      )}

      {/* 3. CYBER LASER NEON (Cyan crosshair and glowing tech reticle) */}
      {cursorEffect === "cyber" && (
        <>
          <div
            ref={cyberRef}
            className={`fixed left-0 top-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ${
              isHovering ? "scale-130" : isMouseDown ? "scale-90" : "scale-100"
            }`}
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              {/* Cyan Center Dot */}
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#00e5ff]" />
              
              {/* Crosshairs */}
              <div className="absolute w-full h-[1px] bg-cyan-400/80 shadow-[0_0_6px_#00e5ff]" />
              <div className="absolute h-full w-[1px] bg-cyan-400/80 shadow-[0_0_6px_#00e5ff]" />
              
              {/* Rotating Corner Brackets */}
              <div className="absolute inset-0 border border-cyan-400/60 rounded-sm animate-spin [animation-duration:8s] shadow-[0_0_12px_rgba(0,229,255,0.4)]" />
              <div className="absolute -inset-1 border border-dashed border-magenta-500/50 rounded-full animate-spin [animation-duration:14s]" />
            </div>
          </div>
          <div
            ref={outerRef}
            className="fixed left-0 top-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-cyan-400/30 transition-all duration-150 ease-out"
          />
        </>
      )}

      {/* 4. FLUID WATER BUBBLES (Translucent floating aqua bubble) */}
      {cursorEffect === "bubbles" && (
        <div
          ref={innerRef}
          className={`fixed left-0 top-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ${
            isHovering ? "scale-150" : isMouseDown ? "scale-85" : "scale-100"
          }`}
        >
          <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-blue-400/40 via-sky-300/50 to-indigo-400/30 backdrop-blur-xs border border-white/90 shadow-[0_4px_16px_rgba(59,130,246,0.5),inset_0_2px_4px_rgba(255,255,255,0.9)] flex items-center justify-center">
            <div className="absolute top-1 left-1.5 w-2 h-1.5 rounded-full bg-white/90" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600/70" />
          </div>
        </div>
      )}

      {/* 5. 3D CLAY BOUNCY ORB (Smooth pastel 3D clay sphere with squish) */}
      {cursorEffect === "clay" && (
        <div
          ref={clayRef}
          className={`fixed left-0 top-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${
            isHovering
              ? "scale-160 rotate-12"
              : isMouseDown
                ? "scale-75 scale-y-65"
                : "scale-100"
          }`}
        >
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-b from-indigo-300 via-indigo-500 to-purple-700 border-2 border-white/90 shadow-[0_8px_20px_rgba(99,102,241,0.55),inset_0_3px_5px_rgba(255,255,255,0.85),inset_0_-3px_5px_rgba(0,0,0,0.25)] flex items-center justify-center">
            {/* Clay top specular gloss */}
            <div className="absolute top-1 left-2 w-2.5 h-1.5 rounded-full bg-white/90 blur-[0.5px]" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-xs" />
          </div>
        </div>
      )}
    </>
  );
}
