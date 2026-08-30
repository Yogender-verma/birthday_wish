import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Cake3DProps {
  onCut: () => void;
  isCut: boolean;
}

export const Cake3D: React.FC<Cake3DProps> = ({ onCut, isCut }) => {
  const [dragProgress, setDragProgress] = useState<number>(0);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [imgError, setImgError] = useState<boolean>(false);
  const cakeRef = useRef<HTMLDivElement>(null);

  // High-resolution realistic birthday cake images
  const cakePrimaryImg = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80";
  const cakeFallbackImg = "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80";

  // Mouse Drag / Touch Swipe handlers for interactive cake cutting
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isCut) return;
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragStart || isCut) return;
    const dx = Math.abs(e.clientX - dragStart.x);
    const dy = Math.abs(e.clientY - dragStart.y);
    const dist = Math.sqrt(dx * dx + dy * dy);
    const threshold = 110;
    const progress = Math.min(dist / threshold, 1);
    setDragProgress(progress);

    if (dist >= threshold) {
      setDragStart(null);
      setDragProgress(1);
      onCut();
    }
  };

  const handlePointerUp = () => {
    setDragStart(null);
    if (!isCut) {
      setDragProgress(0);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-4 w-full">
      {/* Ambient Radial Soft Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-amber-500/20 blur-3xl pointer-events-none transform scale-125" />

      {/* Interactive Cake Card Container */}
      <div
        ref={cakeRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative cursor-grab active:cursor-grabbing p-4 sm:p-6 touch-none"
      >
        {/* Cake Container (Splits into 2 halves when cut) */}
        <div className="relative flex items-center justify-center w-[300px] sm:w-[380px] h-[320px] sm:h-[380px]">
          
          {/* Lit Candles on Top */}
          <div className="absolute top-2 z-30 flex items-center justify-center gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Flickering Candle Flame (Blows out on cut) */}
                <AnimatePresence>
                  {!isCut && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: [1, 1.2, 0.9, 1] }}
                      exit={{ opacity: 0, scale: 0.1, y: -15 }}
                      transition={{ repeat: Infinity, duration: 0.5 + i * 0.1, ease: 'easeInOut' }}
                      className="relative flex flex-col items-center mb-1"
                    >
                      <div className="w-5 h-8 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full blur-[1px] shadow-[0_0_22px_#F59E0B]" />
                      <div className="absolute top-1 w-2 h-4 bg-white rounded-full opacity-80 animate-pulse" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Candle Stick */}
                <div className="w-3 h-12 bg-gradient-to-b from-pink-300 via-purple-300 to-pink-400 rounded-t-md shadow-md border-t border-white/60 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.6)_50%,transparent_75%)] bg-[length:10px_10px]" />
                </div>
              </div>
            ))}
          </div>

          {/* Left Cake Half */}
          <motion.div
            animate={isCut ? { x: -45, rotate: -5, opacity: 0.95 } : { x: 0, rotate: 0 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
            className="relative w-[150px] sm:w-[190px] h-full overflow-hidden rounded-l-3xl shadow-2xl border-l-2 border-y-2 border-pink-300/40 bg-purple-950/80 backdrop-blur-md flex items-center justify-end"
          >
            <img
              src={imgError ? cakeFallbackImg : cakePrimaryImg}
              alt="Real Birthday Cake Left Half"
              onError={() => setImgError(true)}
              className="w-[300px] sm:w-[380px] max-w-none h-full object-cover pointer-events-none transform translate-x-[50%]"
            />
            {/* Cut edge gradient shading */}
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-purple-950/80 to-transparent pointer-events-none" />
          </motion.div>

          {/* Right Cake Half */}
          <motion.div
            animate={isCut ? { x: 45, rotate: 5, opacity: 0.95 } : { x: 0, rotate: 0 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
            className="relative w-[150px] sm:w-[190px] h-full overflow-hidden rounded-r-3xl shadow-2xl border-r-2 border-y-2 border-pink-300/40 bg-purple-950/80 backdrop-blur-md flex items-center justify-start"
          >
            <img
              src={imgError ? cakeFallbackImg : cakePrimaryImg}
              alt="Real Birthday Cake Right Half"
              onError={() => setImgError(true)}
              className="w-[300px] sm:w-[380px] max-w-none h-full object-cover pointer-events-none transform -translate-x-[50%]"
            />
            {/* Cut edge gradient shading */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-purple-950/80 to-transparent pointer-events-none" />
          </motion.div>

          {/* Cutting Line Effect (Appears when dragging or cut) */}
          {(dragProgress > 0 || isCut) && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              className="absolute z-40 w-2 h-[340px] bg-gradient-to-b from-white via-pink-400 to-amber-300 rounded-full shadow-[0_0_30px_#EC4899] pointer-events-none"
            />
          )}
        </div>

        {/* Decorative Shiny Gold Platter Plate */}
        <div className="w-[320px] sm:w-[410px] h-5 bg-gradient-to-r from-amber-300 via-yellow-100 via-white to-amber-300 rounded-full shadow-[0_10px_25px_rgba(251,191,36,0.5)] mx-auto mt-[-10px] border border-amber-200/80" />
      </div>

      {/* Drag Progress Indicator */}
      {!isCut && dragProgress > 0 && (
        <div className="mt-2 text-xs font-semibold text-pink-300 tracking-wider animate-pulse">
          Cutting real cake... {Math.round(dragProgress * 100)}%
        </div>
      )}
    </div>
  );
};
