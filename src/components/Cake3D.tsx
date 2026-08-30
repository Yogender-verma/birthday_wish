import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Cake3DProps {
  onCut: () => void;
  isCut: boolean;
}

export const Cake3D: React.FC<Cake3DProps> = ({ onCut, isCut }) => {
  const [dragProgress, setDragProgress] = useState<number>(0);
  const [knifePos, setKnifePos] = useState<{ x: number; y: number } | null>(null);
  const [isSlashing, setIsSlashing] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);
  const cakeRef = useRef<HTMLDivElement>(null);

  // High-resolution realistic cake photos
  const cakePrimaryImg = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80";
  const cakeFallbackImg = "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80";

  // Real-time Knife Drag & Pointer tracking
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isCut || isSlashing) return;
    if (cakeRef.current) {
      const rect = cakeRef.current.getBoundingClientRect();
      setKnifePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isCut || isSlashing) return;
    if (cakeRef.current) {
      const rect = cakeRef.current.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      const relativeX = e.clientX - rect.left;

      if (knifePos) {
        setKnifePos({ x: relativeX, y: relativeY });
        const progress = Math.min(Math.max((relativeY - 40) / (rect.height - 80), 0), 1);
        setDragProgress(progress);

        if (progress >= 0.75) {
          triggerSlashAndCut();
        }
      }
    }
  };

  const handlePointerUp = () => {
    if (!isCut && !isSlashing) {
      setKnifePos(null);
      setDragProgress(0);
    }
  };

  const triggerSlashAndCut = () => {
    if (isCut || isSlashing) return;
    setIsSlashing(true);
    setDragProgress(1);

    setTimeout(() => {
      setIsSlashing(false);
      onCut();
    }, 450);
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-4 w-full">
      {/* Ambient Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-amber-500/20 blur-3xl pointer-events-none transform scale-125" />

      {/* Main Interactive Container */}
      <div
        ref={cakeRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative cursor-crosshair p-4 sm:p-6 touch-none"
      >
        {/* Cake Container */}
        <div className="relative flex items-center justify-center w-[300px] sm:w-[380px] h-[320px] sm:h-[380px]">

          {/* Lit Candles on Top */}
          <div className="absolute top-2 z-30 flex items-center justify-center gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Flickering Flame / Smoke trail */}
                <AnimatePresence>
                  {!isCut ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: [1, 1.2, 0.95, 1] }}
                      exit={{ opacity: 0, scale: 0.1, y: -20 }}
                      transition={{ repeat: Infinity, duration: 0.5 + i * 0.1, ease: 'easeInOut' }}
                      className="relative flex flex-col items-center mb-1"
                    >
                      <div className="w-5 h-8 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full blur-[1px] shadow-[0_0_22px_#F59E0B]" />
                      <div className="absolute top-1 w-2 h-4 bg-white rounded-full opacity-90 animate-pulse" />
                    </motion.div>
                  ) : (
                    /* Smoke puff when candle is extinguished */
                    <motion.div
                      initial={{ opacity: 1, y: 0, scale: 0.8 }}
                      animate={{ opacity: 0, y: -30, scale: 1.8 }}
                      transition={{ duration: 1.2 }}
                      className="w-4 h-4 bg-gray-400/50 rounded-full blur-md mb-2"
                    />
                  )}
                </AnimatePresence>

                {/* Candle Stick */}
                <div className="w-3.5 h-14 bg-gradient-to-b from-pink-300 via-purple-300 to-pink-400 rounded-t-md shadow-md border-t border-white/60 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.7)_50%,transparent_75%)] bg-[length:10px_10px]" />
                </div>
              </div>
            ))}
          </div>

          {/* Left Cake Half */}
          <motion.div
            animate={isCut ? { x: -50, rotate: -6, opacity: 0.95 } : { x: 0, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 90 }}
            className="relative w-[150px] sm:w-[190px] h-full overflow-hidden rounded-l-3xl shadow-2xl border-l-2 border-y-2 border-pink-300/40 bg-purple-950 flex items-center justify-end"
          >
            <img
              src={imgError ? cakeFallbackImg : cakePrimaryImg}
              alt="Real Birthday Cake Left Half"
              onError={() => setImgError(true)}
              className="w-[300px] sm:w-[380px] max-w-none h-full object-cover pointer-events-none transform translate-x-[50%]"
            />

            {/* Internal Layer Cross-Section (Revealed on Cut) */}
            {isCut && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-amber-200 via-pink-300 to-purple-900 border-r-2 border-white/80 flex flex-col justify-around py-4"
              >
                <div className="h-3 w-full bg-pink-400/80 shadow-inner" />
                <div className="h-4 w-full bg-amber-100/90 shadow-inner" />
                <div className="h-3 w-full bg-pink-500/80 shadow-inner" />
                <div className="h-4 w-full bg-amber-100/90 shadow-inner" />
              </motion.div>
            )}
          </motion.div>

          {/* Right Cake Half */}
          <motion.div
            animate={isCut ? { x: 50, rotate: 6, opacity: 0.95 } : { x: 0, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 90 }}
            className="relative w-[150px] sm:w-[190px] h-full overflow-hidden rounded-r-3xl shadow-2xl border-r-2 border-y-2 border-pink-300/40 bg-purple-950 flex items-center justify-start"
          >
            <img
              src={imgError ? cakeFallbackImg : cakePrimaryImg}
              alt="Real Birthday Cake Right Half"
              onError={() => setImgError(true)}
              className="w-[300px] sm:w-[380px] max-w-none h-full object-cover pointer-events-none transform -translate-x-[50%]"
            />

            {/* Internal Layer Cross-Section (Revealed on Cut) */}
            {isCut && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-amber-200 via-pink-300 to-purple-900 border-l-2 border-white/80 flex flex-col justify-around py-4"
              >
                <div className="h-3 w-full bg-pink-400/80 shadow-inner" />
                <div className="h-4 w-full bg-amber-100/90 shadow-inner" />
                <div className="h-3 w-full bg-pink-500/80 shadow-inner" />
                <div className="h-4 w-full bg-amber-100/90 shadow-inner" />
              </motion.div>
            )}
          </motion.div>

          {/* Dynamic Laser Cut Line */}
          {(dragProgress > 0 || isCut || isSlashing) && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              className="absolute z-40 w-2.5 h-[350px] bg-gradient-to-b from-white via-pink-400 to-amber-300 rounded-full shadow-[0_0_35px_#EC4899] pointer-events-none"
            />
          )}

          {/* Interactive Real 3D Cake Knife (Follows Cursor/Touch) */}
          {!isCut && knifePos && (
            <motion.div
              style={{ left: knifePos.x - 20, top: knifePos.y - 80 }}
              animate={isSlashing ? { y: [0, 180], rotate: [-25, 10] } : { scale: 1.1 }}
              transition={isSlashing ? { duration: 0.4 } : { duration: 0.05 }}
              className="absolute z-50 pointer-events-none flex flex-col items-center transform -rotate-45 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
            >
              {/* Metallic Blade */}
              <div className="w-6 h-28 bg-gradient-to-r from-gray-100 via-white via-gray-300 to-gray-400 rounded-t-lg border-l border-white shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent" />
              </div>
              {/* Wooden / Gold Handle */}
              <div className="w-7 h-14 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 rounded-b-md border-t-2 border-amber-400 shadow-md" />
            </motion.div>
          )}

          {/* Animated Knife Slash Effect */}
          {isSlashing && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: [0, 1, 0], scaleY: [0, 1.2] }}
              transition={{ duration: 0.35 }}
              className="absolute z-50 w-6 h-[380px] bg-gradient-to-b from-white via-cyan-200 via-pink-400 to-amber-300 blur-sm pointer-events-none"
            />
          )}
        </div>

        {/* Shiny Gold Platter */}
        <div className="w-[320px] sm:w-[410px] h-5 bg-gradient-to-r from-amber-300 via-yellow-100 via-white to-amber-300 rounded-full shadow-[0_12px_30px_rgba(251,191,36,0.6)] mx-auto mt-[-10px] border border-amber-200/90" />
      </div>

      {/* Real-time Guidance text */}
      {!isCut && (
        <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm font-semibold text-pink-300 bg-purple-950/60 px-4 py-1.5 rounded-full border border-pink-400/30 backdrop-blur-md animate-pulse">
          <span>🔪 Drag knife top to bottom across cake to cut!</span>
          {dragProgress > 0 && <span>({Math.round(dragProgress * 100)}%)</span>}
        </div>
      )}
    </div>
  );
};
