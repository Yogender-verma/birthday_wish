import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Cake3DProps {
  onCut: () => void;
  isCut: boolean;
}

export const Cake3D: React.FC<Cake3DProps> = ({ onCut, isCut }) => {
  const [dragProgress, setDragProgress] = useState<number>(0);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const cakeRef = useRef<HTMLDivElement>(null);

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
    const threshold = 120; // 120px drag triggers the cut
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
    <div className="relative flex flex-col items-center justify-center select-none py-4">
      {/* Interactive Cake Container */}
      <div
        ref={cakeRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative cursor-grab active:cursor-grabbing p-6 touch-none"
      >
        {/* Ambient Radial Soft Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-amber-500/20 blur-3xl pointer-events-none transform scale-125" />

        {/* Cake Structure wrapper (Splits into 2 halves when cut) */}
        <div className="relative flex items-center justify-center min-w-[280px] sm:min-w-[340px] h-[300px]">
          {/* Candle on Top */}
          <div className="absolute top-0 z-30 flex flex-col items-center">
            {/* Flickering Flame (Extinguishes when cut) */}
            <AnimatePresence>
              {!isCut && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: [1, 1.15, 0.95, 1] }}
                  exit={{ opacity: 0, scale: 0.1, y: -10 }}
                  transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut' }}
                  className="relative flex flex-col items-center mb-1"
                >
                  <div className="w-5 h-8 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full blur-[1px] shadow-[0_0_20px_#F59E0B]" />
                  <div className="absolute top-1 w-2 h-4 bg-white rounded-full opacity-80" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Candle Stick */}
            <div className="w-3 h-14 bg-gradient-to-b from-pink-300 via-purple-300 to-pink-400 rounded-t-md shadow-md border-t border-white/60 relative overflow-hidden">
              {/* Spiral Stripe Decor */}
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.6)_50%,transparent_75%)] bg-[length:10px_10px]" />
            </div>
          </div>

          {/* Left Cake Half */}
          <motion.div
            animate={isCut ? { x: -35, rotate: -4, opacity: 0.95 } : { x: 0, rotate: 0 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
            className="relative flex flex-col items-end z-20 overflow-hidden pr-[1px]"
          >
            {/* Top Tier Left */}
            <div className="relative w-28 sm:w-34 h-16 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 rounded-tl-3xl rounded-bl-sm border-t-4 border-pink-200 shadow-lg overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-4 bg-white/40 rounded-full blur-[1px]" />
              {/* Decorative Sprinkles */}
              <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-amber-300 shadow" />
              <div className="absolute top-8 left-10 w-2 h-2 rounded-full bg-cyan-300 shadow" />
              <div className="absolute top-6 left-16 w-2 h-2 rounded-full bg-white shadow" />
            </div>

            {/* Middle Tier Left */}
            <div className="relative w-36 sm:w-44 h-20 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-tl-3xl rounded-bl-sm border-t-4 border-purple-300 shadow-xl mt-[-8px] overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-5 bg-white/30 rounded-full blur-[1px]" />
              <div className="absolute top-6 left-6 w-3.5 h-3.5 rounded-full bg-amber-400 shadow" />
              <div className="absolute top-10 left-16 w-3 h-3 rounded-full bg-pink-200 shadow" />
              <div className="absolute top-8 left-24 w-3.5 h-3.5 rounded-full bg-cyan-300 shadow" />
            </div>

            {/* Bottom Tier Left */}
            <div className="relative w-44 sm:w-56 h-24 bg-gradient-to-r from-purple-900 via-purple-700 to-pink-700 rounded-tl-3xl rounded-bl-xl border-t-4 border-pink-400 shadow-2xl mt-[-8px] overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-6 bg-purple-300/30 rounded-full blur-[1px]" />
              <div className="absolute top-8 left-8 w-4 h-4 rounded-full bg-yellow-300 shadow" />
              <div className="absolute top-14 left-20 w-4 h-4 rounded-full bg-pink-300 shadow" />
              <div className="absolute top-10 left-32 w-3.5 h-3.5 rounded-full bg-white shadow" />
            </div>
          </motion.div>

          {/* Right Cake Half */}
          <motion.div
            animate={isCut ? { x: 35, rotate: 4, opacity: 0.95 } : { x: 0, rotate: 0 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
            className="relative flex flex-col items-start z-20 overflow-hidden pl-[1px]"
          >
            {/* Top Tier Right */}
            <div className="relative w-28 sm:w-34 h-16 bg-gradient-to-r from-pink-500 via-purple-400 to-pink-400 rounded-tr-3xl rounded-br-sm border-t-4 border-pink-200 shadow-lg overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-4 bg-white/40 rounded-full blur-[1px]" />
              <div className="absolute top-5 right-4 w-2 h-2 rounded-full bg-cyan-300 shadow" />
              <div className="absolute top-9 right-10 w-2 h-2 rounded-full bg-amber-300 shadow" />
              <div className="absolute top-7 right-16 w-2 h-2 rounded-full bg-white shadow" />
            </div>

            {/* Middle Tier Right */}
            <div className="relative w-36 sm:w-44 h-20 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-tr-3xl rounded-br-sm border-t-4 border-purple-300 shadow-xl mt-[-8px] overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-5 bg-white/30 rounded-full blur-[1px]" />
              <div className="absolute top-8 right-6 w-3.5 h-3.5 rounded-full bg-pink-200 shadow" />
              <div className="absolute top-6 right-16 w-3.5 h-3.5 rounded-full bg-amber-400 shadow" />
              <div className="absolute top-11 right-24 w-3 h-3 rounded-full bg-cyan-300 shadow" />
            </div>

            {/* Bottom Tier Right */}
            <div className="relative w-44 sm:w-56 h-24 bg-gradient-to-r from-pink-700 via-purple-700 to-purple-900 rounded-tr-3xl rounded-br-xl border-t-4 border-pink-400 shadow-2xl mt-[-8px] overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-6 bg-purple-300/30 rounded-full blur-[1px]" />
              <div className="absolute top-12 right-8 w-4 h-4 rounded-full bg-pink-300 shadow" />
              <div className="absolute top-8 right-20 w-4 h-4 rounded-full bg-yellow-300 shadow" />
              <div className="absolute top-14 right-32 w-3.5 h-3.5 rounded-full bg-white shadow" />
            </div>
          </motion.div>

          {/* Cutting Line Effect (Appears when dragging or cut) */}
          {(dragProgress > 0 || isCut) && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              className="absolute z-40 w-1.5 h-[280px] bg-gradient-to-b from-white via-pink-400 to-amber-300 rounded-full shadow-[0_0_25px_#EC4899] pointer-events-none"
            />
          )}
        </div>

        {/* Decorative Base Plate */}
        <div className="w-[300px] sm:w-[380px] h-4 bg-gradient-to-r from-amber-200 via-white to-amber-200 rounded-full shadow-2xl mx-auto mt-[-10px] border border-amber-300/50" />
      </div>

      {/* Cutting Progress Indicator */}
      {!isCut && dragProgress > 0 && (
        <div className="mt-2 text-xs font-semibold text-pink-300 tracking-wider animate-pulse">
          Cutting... {Math.round(dragProgress * 100)}%
        </div>
      )}
    </div>
  );
};
