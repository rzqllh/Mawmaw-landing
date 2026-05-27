"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ChromaFlow, FilmGrain, Shader } from "shaders/react";

export function HeroShader() {
  const shouldReduceMotion = useReducedMotion();
  const [hasShaderSupport, setHasShaderSupport] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setHasShaderSupport("gpu" in navigator);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const canUseShader = hasShaderSupport && !shouldReduceMotion;

  if (!canUseShader) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_25%_24%,rgba(212,190,66,0.24),transparent_30rem),radial-gradient(circle_at_78%_42%,rgba(78,114,88,0.18),transparent_34rem)]"
      />
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-45">
      <Shader
        disableTelemetry
        colorSpace="srgb"
        toneMapping="neutral"
        className="h-full w-full"
        style={{ width: "100%", height: "100%" }}
      >
        <ChromaFlow
          baseColor="#F8F7F2"
          upColor="#D4BE42"
          downColor="#4E7258"
          leftColor="#FFFEFA"
          rightColor="#263829"
          intensity={0.55}
          radius={4}
          momentum={16}
          opacity={0.34}
        />
        <FilmGrain strength={0.12} bias={2} animated={false} opacity={0.18} />
      </Shader>
    </div>
  );
}
