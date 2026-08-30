import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerConfettiBurst } from './ConfettiEffect';
import { playWarpSound, playFanfareSound } from '../utils/sound';

interface GiftBoxProps {
  onOpened: () => void;
}

export const GiftBox: React.FC<GiftBoxProps> = ({ onOpened }) => {
  const [openingStage, setOpeningStage] = useState<'idle' | 'shaking' | 'loosening' | 'open'>('idle');

  const handleOpenClick = () => {
    if (openingStage !== 'idle') return;

    // Stage 1: Shaking (0 - 500ms)
    setOpeningStage('shaking');
    playWarpSound();

    // Stage 2: Ribbon loosening (500ms - 1000ms)
    setTimeout(() => {
      setOpeningStage('loosening');
    }, 500);

    // Stage 3: Lid opening & light burst (1000ms - 2200ms)
    setTimeout(() => {
      setOpeningStage('open');
      playFanfareSound();
      triggerConfettiBurst();
    }, 1000);

    // Complete callback after reveal animation (2200ms)
    setTimeout(() => {
      onOpened();
    }, 2200);
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-6 select-none cursor-pointer" onClick={handleOpenClick}>
      {/* Outer Glowing Soft Aura */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-amber-400/30 blur-3xl pointer-events-none transform scale-150 animate-pulse-glow" />

      {/* Gift Box Container */}
      <motion.div
        animate={
          openingStage === 'idle'
            ? { y: [0, -12, 0] }
            : openingStage === 'shaking'
            ? { x: [-8, 8, -6, 6, -3, 3, 0], scale: [1, 1.05, 1] }
            : { y: 0 }
        }
        transition={
          openingStage === 'idle'
            ? { repeat: Infinity, duration: 3, ease: 'easeInOut' }
            : { duration: 0.5 }
        }
        className="relative w-56 h-56 sm:w-72 sm:h-72 flex flex-col items-center justify-end"
      >
        {/* Light Beam emitting from box interior on open */}
        <AnimatePresence>
          {openingStage === 'open' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute -top-24 w-40 h-80 bg-gradient-to-t from-pink-400/80 via-amber-300/60 to-transparent blur-xl pointer-events-none z-10"
            />
          )}
        </AnimatePresence>

        {/* Gift Box Lid */}
        <motion.div
          animate={
            openingStage === 'loosening'
              ? { y: -15, rotate: -5 }
              : openingStage === 'open'
              ? { y: -120, rotate: -25, opacity: 0 }
              : { y: 0, rotate: 0 }
          }
          transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}
          className="relative z-30 w-60 sm:w-76 h-14 sm:h-18 bg-gradient-to-r from-purple-700 via-pink-600 to-purple-600 rounded-xl shadow-2xl border-2 border-pink-300/40 flex items-center justify-center overflow-visible"
        >
          {/* Animated Ribbon Bow on Top */}
          <div className="absolute -top-7 sm:-top-9 flex items-center justify-center z-40">
            <motion.div
              animate={openingStage === 'loosening' ? { scale: 1.2, rotate: 15 } : { scale: 1 }}
              className="relative flex items-center justify-center"
            >
              {/* Bow loops */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-300 to-yellow-500 rounded-full border-2 border-white/60 shadow-lg transform -rotate-45" />
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-bl from-amber-300 to-yellow-500 rounded-full border-2 border-white/60 shadow-lg transform rotate-45 -ml-4" />
              <div className="absolute w-5 h-5 sm:w-6 sm:h-6 bg-yellow-200 rounded-full border border-white shadow-md z-50" />
            </motion.div>
          </div>

          {/* Vertical Ribbon Segment on Lid */}
          <div className="w-8 sm:w-10 h-full bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-500 shadow-md border-x border-white/50" />
        </motion.div>

        {/* Gift Box Base */}
        <div className="relative z-20 w-52 sm:w-68 h-44 sm:h-56 bg-gradient-to-b from-purple-900 via-purple-800 to-pink-950 rounded-b-2xl border-2 border-purple-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden">
          {/* Vertical Ribbon Segment on Base */}
          <div className="w-8 sm:w-10 h-full bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-500 shadow-md border-x border-white/50" />

          {/* Horizontal Ribbon Segment on Base */}
          <div className="absolute w-full h-8 sm:h-10 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 shadow-md border-y border-white/50" />

          {/* Subtle Sparkle Details on Box Surface */}
          <div className="absolute top-4 left-6 w-2 h-2 bg-pink-300 rounded-full animate-ping" />
          <div className="absolute bottom-6 right-8 w-2 h-2 bg-amber-300 rounded-full animate-ping" />
        </div>
      </motion.div>
    </div>
  );
};
