import React from "react";
import { useBackground } from "../context/BackgroundContext";

export default function BackgroundRenderer() {
  const { config } = useBackground();
  const { activeType, activeUrl, overlayOpacity, blurAmount } = config;

  // Extract YouTube embed ID if youtube link is supplied
  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
    } else if (url.includes("youtube.com/watch")) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get("v") || "";
    } else if (url.includes("youtube.com/embed/")) {
      videoId = url.split("youtube.com/embed/")[1]?.split("?")[0] || "";
    }
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&enablejsapi=1&disablekb=1`;
  };

  const ytEmbed = activeType === "video" && activeUrl ? getYouTubeEmbedUrl(activeUrl) : null;

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none transition-all duration-700"
      style={{
        filter: blurAmount > 0 ? `blur(${blurAmount}px)` : undefined,
        transform: blurAmount > 0 ? "scale(1.03)" : undefined // prevent blurred border artifacts
      }}
    >
      {/* 1. Default Dynamic Glass Gradient with Vivid Bleeding Light Orbs */}
      {activeType === "gradient" && (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          {/* Vivid ambient light nodes that bleed through frosted glass */}
          <div 
            className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-purple-600/35 via-indigo-600/30 to-pink-500/25 blur-[100px] animate-pulse"
            style={{ animationDuration: '8s' }}
          />
          <div 
            className="absolute top-[25%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-cyan-500/30 via-sky-600/25 to-blue-700/25 blur-[110px] animate-pulse"
            style={{ animationDuration: '10s' }}
          />
          <div 
            className="absolute -bottom-[20%] left-[20%] w-[70vw] h-[60vw] rounded-full bg-gradient-to-tr from-fuchsia-600/30 via-rose-500/25 to-amber-400/20 blur-[120px] animate-pulse"
            style={{ animationDuration: '12s' }}
          />
          <div 
            className="absolute top-[45%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-emerald-500/20 via-teal-500/20 to-transparent blur-[90px] animate-pulse"
            style={{ animationDuration: '14s' }}
          />
        </div>
      )}

      {/* 2. Video Background (Direct MP4/WebM or YouTube) */}
      {activeType === "video" && activeUrl && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {ytEmbed ? (
            <iframe
              src={ytEmbed}
              title="YouTube Background Video"
              className="w-[300vw] h-[300vh] -top-[100vh] -left-[100vw] absolute object-cover pointer-events-none"
              allow="autoplay; encrypted-media"
            />
          ) : (
            <video
              key={activeUrl}
              src={activeUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-opacity duration-1000"
            />
          )}
        </div>
      )}

      {/* 3. Image Background */}
      {activeType === "image" && activeUrl && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: `url("${activeUrl}")` }}
        />
      )}

      {/* 5. Animated 3-Color Gradient Background (Red/Blue/Green CodePen) */}
      {activeType === "animated-gradient" && (
        <div className="absolute inset-0 w-full h-full animated-gradient-bg overflow-hidden pointer-events-none">
          <style dangerouslySetInnerHTML={{ __html: `
            .animated-gradient-bg {
              width: 100%;
              height: 100%;
              background: linear-gradient(
                270deg,
                #e63b3b,
                #488cdd,
                #48dd68
              );
              background-size: 600% 600%;
              animation: animatedGradient 30s ease infinite;
            }

            @keyframes animatedGradient {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
          `}} />
        </div>
      )}

      {/* 4. Beach Wave Animated Background (CodePen HTML/CSS) */}
      {activeType === "beach" && (
        <div className="absolute inset-0 w-full h-full beach overflow-hidden pointer-events-none">
          <style dangerouslySetInnerHTML={{ __html: `
            @property --cp {
              syntax: '<percentage>';
              inherits: false;
              initial-value: 100%;
            }

            .beach {
              width: 100%;
              height: 100%;
              background: linear-gradient(
                to right,
                #004a44 0%,
                #03615b 5.26%,
                #0a6c66 10.53%,
                #027c73 15.79%,
                #028a7f 21.05%,
                #059c8e 26.32%,
                #39a997 31.58%,
                #4aae9f 36.84%,
                #84b7a2 42.11%,
                #b5aa8c 47.37%,
                #dbb89b 52.63%,
                #edc1a8 57.89%,
                #fed0b2 63.16%,
                #fddbc2 68.42%,
                #fedfc7 73.68%,
                #fee6d3 78.95%,
                #fee1d1 94.74%,
                #fcdecd 100%
              );
              position: relative;
              overflow: hidden;
            }

            .beach .wave {
              --_wave-shape-duration: 10s;
              --_wave-shape-delay: 0s;

              --_wave-move-duration: calc(var(--_wave-shape-duration) * .75);
              --_wave-move-delay: 0s;

              --_wave-spray-duration: var(--_wave-move-duration);
              --_wave-spray-delay: var(--_wave-move-delay);

              --_cp-factor: 1.0;
              --_cp: calc(var(--cp) * var(--_cp-factor));

              --_center: 50%;
              --_width: 50%;

              --_shape-line-p-x: 96%;
              --_shape-line-p-y: 0%;
              --_shape-curve-p-x: 87%;
              --_shape-curve-p-y: 40%;
              --_shape-curve-c-x: var(--_cp);
              --_shape-curve-c-y: 22%;
              --_shape-smooth-p-x: 84%;
              --_shape-smooth-p-y: 100%;

              --_shape-clip: shape(
                from 0% 0%,
                line to var(--_shape-line-p-x) var(--_shape-line-p-y),
                curve to var(--_shape-curve-p-x) var(--_shape-curve-p-y) with var(--_shape-curve-c-x) var(--_shape-curve-c-y) from origin,
                smooth to var(--_shape-smooth-p-x) var(--_shape-smooth-p-y),
                line to 0% 100%,
                close
              );

              --_shape-offset: shape(
                from var( --_shape-line-p-x ) var( --_shape-line-p-y ),
                curve to var( --_shape-curve-p-x ) var( --_shape-curve-p-y ) with var( --_shape-curve-c-x ) var( --_shape-curve-c-y ) from origin,
                smooth to var( --_shape-smooth-p-x ) var( --_shape-smooth-p-y )
              );

              --_opacity-min: 0.45;
              --_opacity-max: 1.00;

              --_spray-scale-min: 0.25;
              --_spray-scale-max: 0.90;

              position: absolute;
              left: calc(var(--_center) - var(--_width));
              width: var(--_width);
              height: 100%;

              background: 
                linear-gradient(to right, rgba(0,0,0, 0.00) 70%, rgba(255,255,255, 0.44) 90%),
                linear-gradient(to right, rgba(0,0,0, 0.00) 0%, rgba(0,255,224, 0.15) 100%);

              clip-path: var(--_shape-clip);

              animation: 
                beach-wave-move-animation var(--_wave-move-duration) infinite ease-in-out,
                beach-wave-shape-animation var(--_wave-shape-duration) infinite ease-in-out;

              animation-delay: 
                var(--_wave-move-delay),
                var(--_wave-shape-delay);

              will-change: transform, opacity;
            }

            .beach .wave.wave--1 {
              --_wave-shape-duration: 10s;
              --_wave-shape-delay: 0s;
              --_wave-move-duration: calc(var(--_wave-shape-duration) * .75);
              --_wave-move-delay: 0s;
              --_cp-factor: 1.0;
              --_width: 50%;
              --_shape-line-p-x: 96%;
              --_shape-curve-p-x: 87%;
              --_shape-curve-p-y: 40%;
              --_shape-smooth-p-x: 84%;
              --_shape-smooth-p-y: 100%;
              --_spray-scale-min: 0.25;
              --_spray-scale-max: 0.90;
            }
            .beach .wave.wave--2 {
              --_wave-shape-duration: 11s;
              --_wave-shape-delay: -2s;
              --_wave-move-duration: calc(var(--_wave-shape-duration) * .80);
              --_wave-move-delay: -2s;
              --_cp-factor: 0.9;
              --_width: 40%;
              --_shape-line-p-x: 100%;
              --_shape-curve-p-x: 77%;
              --_shape-curve-p-y: 50%;
              --_shape-smooth-p-x: 70%;
              --_shape-smooth-p-y: 100%;
              --_spray-scale-min: 0.20;
              --_spray-scale-max: 0.95;
            }
            .beach .wave.wave--3 {
              --_wave-shape-duration: 14s;
              --_wave-shape-delay: -4s;
              --_wave-move-duration: calc(var(--_wave-shape-duration) * .88);
              --_wave-move-delay: -4s;
              --_cp-factor: 0.95;
              --_width: 30%;
              --_shape-line-p-x: 80%;
              --_shape-curve-p-x: 92%;
              --_shape-curve-p-y: 55%;
              --_shape-smooth-p-x: 44%;
              --_shape-smooth-p-y: 100%;
              --_spray-scale-min: 0.34;
              --_spray-scale-max: 0.88;
            }
            .beach .wave.wave--4 {
              --_wave-shape-duration: 13s;
              --_wave-shape-delay: -6s;
              --_wave-move-duration: calc(var(--_wave-shape-duration) * .78);
              --_wave-move-delay: -6s;
              --_cp-factor: 0.85;
              --_width: 45%;
              --_shape-line-p-x: 93%;
              --_shape-curve-p-x: 85%;
              --_shape-curve-p-y: 39%;
              --_shape-smooth-p-x: 81%;
              --_shape-smooth-p-y: 100%;
              --_spray-scale-min: 0.55;
              --_spray-scale-max: 0.98;
            }

            .beach .wave i {
              --_offset-distance-min: 0%;
              --_offset-distance-max: 100%;

              display: block;
              position: absolute;
              offset-path: var(--_shape-offset);
              width: 16rem;
              aspect-ratio: 1 / 1;
              transform-origin: center left;
              background: radial-gradient(closest-side, rgba(255,255,255, 0.65) 0%, rgba(255,255,255, 0.00) 100%);
              will-change: transform, opacity;
              animation: beach-wave-spray-animation var(--_wave-spray-duration) infinite ease-in-out;
              animation-delay: var(--_wave-spray-delay);
            }

            @keyframes beach-wave-shape-animation {
              50% {
                --cp: 70%;
              }
            }

            @keyframes beach-wave-move-animation {
              0%, 100% {
                transform: translateX(0%);
                opacity: var(--_opacity-min);
              }
              50% {
                transform: translateX(var(--_center));
                opacity: var(--_opacity-max);
              }
            }

            @keyframes beach-wave-spray-animation {
              0%, 100% {
                opacity: 0.25;
                transform: scale(var(--_spray-scale-min));
              }
              50% {
                opacity: 1.00;
                transform: scale(var(--_spray-scale-max));
              }
            }
          `}} />
          <div className="wave wave--1">
            {Array.from({ length: 10 }).map((_, i) => (
              <i key={i} style={{ animationDelay: `calc(-1s * ${i})` } as React.CSSProperties} />
            ))}
          </div>
          <div className="wave wave--2">
            {Array.from({ length: 10 }).map((_, i) => (
              <i key={i} style={{ animationDelay: `calc(-1s * ${i} - 2s)` } as React.CSSProperties} />
            ))}
          </div>
          <div className="wave wave--3">
            {Array.from({ length: 10 }).map((_, i) => (
              <i key={i} style={{ animationDelay: `calc(-1s * ${i} - 4s)` } as React.CSSProperties} />
            ))}
          </div>
          <div className="wave wave--4">
            {Array.from({ length: 10 }).map((_, i) => (
              <i key={i} style={{ animationDelay: `calc(-1s * ${i} - 6s)` } as React.CSSProperties} />
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Overlay Dimmer to guarantee text readability on any wallpaper/video */}
      <div 
        className="absolute inset-0 bg-slate-50 dark:bg-slate-950 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: overlayOpacity / 100 }}
      />
    </div>
  );
}
