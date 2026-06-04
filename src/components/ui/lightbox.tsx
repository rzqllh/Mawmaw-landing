"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { X, CaretLeft, CaretRight, Download, MagnifyingGlassPlus, MagnifyingGlassMinus } from "@phosphor-icons/react";
import type { ImageAsset } from "@/data/public-content";
import { BlurImage } from "./blur-image";
import { cn } from "@/lib/utils";

type LightboxProps = {
  images: ImageAsset[];
  initialIndex: number;
  onClose: () => void;
};

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [zoomLevel, setZoomLevel] = useState<1 | 2>(1);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const currentImage = images[currentIndex];
  
  // Handlers
  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1 === images.length ? 0 : prev + 1));
    setZoomLevel(1);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 < 0 ? images.length - 1 : prev - 1));
    setZoomLevel(1);
  }, [images.length]);

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 2 : 1));
  };

  // Window bounds for drag constraints
  useEffect(() => {
    setBounds({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setBounds({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    document.addEventListener("keydown", handleKeyDown);
    // Lock body and html scroll
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [handleNext, handlePrev, onClose]);

  // Framer motion variants
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  if (!currentImage) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="lightbox-backdrop fixed inset-0 z-50 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
    >
      {/* Absolute Backdrop - Black with heavy blur */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-3xl" />
      
      {/* Top Bar */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/50 to-transparent">
        <div className="text-white/80 font-medium tracking-widest text-sm drop-shadow-md">
          {currentIndex + 1} / {images.length}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleZoom}
            className="lightbox-control flex h-10 w-10 items-center justify-center rounded-full text-white"
            aria-label={zoomLevel === 1 ? "Zoom in" : "Zoom out"}
            title={zoomLevel === 1 ? "Zoom in" : "Zoom out"}
          >
            {zoomLevel === 1 ? <MagnifyingGlassPlus className="h-5 w-5" /> : <MagnifyingGlassMinus className="h-5 w-5" />}
          </button>
          
          <a
            href={currentImage.src}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="lightbox-control flex h-10 w-10 items-center justify-center rounded-full !text-white"
            aria-label="Download image"
            title="Download image"
          >
            <Download className="h-5 w-5" />
          </a>

          <button
            onClick={onClose}
            className="lightbox-control flex h-10 w-10 items-center justify-center rounded-full text-white"
            aria-label="Close gallery"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Image Area */}
      <div 
        className="relative flex-1 flex items-center justify-center overflow-hidden touch-none" 
        onClick={onClose}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 flex items-center justify-center p-4 md:p-12"
          >
            <motion.div
              drag={true}
              dragConstraints={
                zoomLevel === 1 
                  ? { left: 0, right: 0, top: 0, bottom: 0 } 
                  : { 
                      left: -bounds.width / 2, 
                      right: bounds.width / 2, 
                      top: -bounds.height / 2, 
                      bottom: bounds.height / 2 
                    }
              }
              dragElastic={zoomLevel === 1 ? 1 : 0.1}
              onDragEnd={(e, { offset, velocity }) => {
                if (zoomLevel === 2) return;
                const swipeX = swipePower(offset.x, velocity.x);
                const swipeY = swipePower(offset.y, velocity.y);

                if (swipeX < -swipeConfidenceThreshold) {
                  handleNext();
                } else if (swipeX > swipeConfidenceThreshold) {
                  handlePrev();
                } else if (Math.abs(swipeY) > swipeConfidenceThreshold) {
                  onClose();
                }
              }}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={toggleZoom}
              animate={{ 
                scale: zoomLevel, 
                ...(zoomLevel === 1 ? { x: 0, y: 0 } : {}) 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={cn(
                "relative w-full h-full max-w-7xl max-h-[85vh]",
                zoomLevel === 2 ? "cursor-grab active:cursor-grabbing" : ""
              )}
            >
              <BlurImage
                src={currentImage.src}
                alt={currentImage.alt}
                blurDataURL={currentImage.blurDataURL}
                fill
                priority
                sizes="100vw"
                className="object-contain"
                containerClassName="absolute inset-0 bg-transparent"
                draggable={false}
                noSkeleton={true}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              className="lightbox-control absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full text-white z-20 md:left-8"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous image"
            >
              <CaretLeft className="h-6 w-6" />
            </button>
            <button
              className="lightbox-control absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full text-white z-20 md:right-8"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next image"
            >
              <CaretRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Caption */}
      {currentImage.alt && (
        <div className="absolute bottom-24 inset-x-0 z-20 flex justify-center pointer-events-none px-4">
          <div className="bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm max-w-2xl text-center drop-shadow-md border border-white/10">
            {currentImage.alt}
          </div>
        </div>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="lightbox-thumbnail-strip relative z-20 h-24 px-4 pb-4 pt-6 flex items-center justify-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
                setZoomLevel(1);
              }}
              className={cn(
                "relative h-14 w-20 shrink-0 overflow-hidden rounded-md transition-all duration-300",
                currentIndex === idx 
                  ? "ring-2 ring-gold-500 opacity-100 scale-105" 
                  : "opacity-40 hover:opacity-100"
              )}
            >
              <Image
                src={img.src}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
