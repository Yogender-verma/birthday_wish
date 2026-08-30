import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlowingButton } from '../GlowingButton';
import { playWarpSound } from '../../utils/sound';
import { MilkMochaSticker } from '../cartoons/MilkMochaSticker';

interface Scene4Props {
  onContinue: () => void;
  onWarpStateChange?: (isWarping: boolean) => void;
}

export const Scene4: React.FC<Scene4Props> = ({ onContinue, onWarpStateChange }) => {
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [isCinematicWarping, setIsCinematicWarping] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);

  useEffect(() => {
    // 1. Show second line after 0.8s
    const timer1 = setTimeout(() => {
      setShowSecondLine(true);
    }, 800);

    // 2. Trigger cinematic warp sound & background acceleration after 2s
    const timer2 = setTimeout(() => {
      setIsCinematicWarping(true);
      if (onWarpStateChange) onWarpStateChange(true);
      playWarpSound();
    }, 2000);

    // 3. Reveal CONTINUE button after animation sequence completes (3.2s)
    const timer3 = setTimeout(() => {
      setShowContinueButton(true);
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onWarpStateChange]);

  const handleContinueClick = () => {
    if (onWarpStateChange) onWarpStateChange(false);
    onContinue();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 1 }}
      className="relative flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto min-h-screen py-6 z-10"
    >
      {/* Central Expanding Light Beam Radial Overlay */}
      {isCinematicWarping && (
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: [0, 0.8, 0.4], scale: [0.2, 2.5, 3] }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute inset-0 m-auto w-96 h-96 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-300 rounded-full blur-[100px] pointer-events-none -z-10"
        />
      )}

      {/* Line 1: Okay... */}
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl sm:text-6xl font-extrabold text-purple-200 tracking-tight mb-2 text-glow-purple"
      >
        Okay...
      </motion.h1>

      {/* Line 2: Now you're opening the page 👀 */}
      {showSecondLine && (
        <motion.p
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8 }}
          className="text-xl sm:text-2xl font-semibold text-pink-300 mb-1"
        >
          Now you're opening the page 👀
        </motion.p>
      )}

      {/* Authentic Animated Milk & Mocha Sticker */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <MilkMochaSticker scene={4} />
      </motion.div>

      {/* CONTINUE → Button (Revealed only after introductory animation completes) */}
      {showContinueButton && (
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 150 }}
          className="mt-4"
        >
          <GlowingButton onClick={handleContinueClick} variant="primary" size="lg">
            CONTINUE →
          </GlowingButton>
        </motion.div>
      )}
    </motion.div>
  );
};
