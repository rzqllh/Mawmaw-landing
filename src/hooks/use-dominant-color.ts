"use client";

import { useState, useEffect, useRef } from "react";

type RGB = { r: number; g: number; b: number };

export function useDominantColor(imageSrc: string) {
  const [color, setColor] = useState<RGB | null>(null);
  const cache = useRef<Map<string, RGB>>(new Map());

  useEffect(() => {
    if (!imageSrc) return;

    if (cache.current.has(imageSrc)) {
      setColor(cache.current.get(imageSrc)!);
      return;
    }

    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      if (!ctx) return;
      
      canvas.width = 1;
      canvas.height = 1;
      
      // Draw image scaled down to 1x1 pixel to easily get the average/dominant color
      ctx.drawImage(img, 0, 0, 1, 1);
      
      const data = ctx.getImageData(0, 0, 1, 1).data;
      const rgb = { r: data[0], g: data[1], b: data[2] };
      
      cache.current.set(imageSrc, rgb);
      setColor(rgb);
    };

    img.onerror = () => {
      // Fallback color if image cannot be loaded (e.g. CORS issues)
      const fallback = { r: 17, g: 32, b: 25 }; // var(--forest-900) equivalent
      cache.current.set(imageSrc, fallback);
      setColor(fallback);
    };

    img.src = imageSrc;
  }, [imageSrc]);

  return color;
}
