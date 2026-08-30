import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlowingButton } from '../GlowingButton';
import { triggerConfettiBurst } from '../ConfettiEffect';
import { playFanfareSound } from '../../utils/sound';
import { Sparkles, Gift } from 'lucide-react';
import { MilkMochaSticker } from '../cartoons/MilkMochaSticker';

interface Scene5Props {
  onContinue: () => void;
}

export const Scene5: React.FC<Scene5Props> = ({ onContinue }) => {
  useEffect(() => {
    // Trigger fanfare audio & confetti on mount
    playFanfareSound();
    triggerConfettiBurst();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto min-h-screen py-6 relative z-10"
    >
      {/* Decorative Sparkles */}
      <div className="flex justify-center items-center gap-3 mb-1 text-pink-400">
        <Sparkles className="w-5 h-5 animate-pulse text-amber-300" />
        <Gift className="w-7 h-7 animate-bounce text-pink-400" />
        <Sparkles className="w-5 h-5 animate-pulse text-purple-300" />
      </div>

      {/* CONGRATULATIONS 🎉 */}
      <motion.h1
        initial={{ opacity: 0, y: -20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 180 }}
        className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-pink-400 via-purple-200 to-amber-300 bg-clip-text text-transparent tracking-tight mb-1 text-glow-pink"
      >
        CONGRATULATIONS 🎉
      </motion.h1>

      {/* You're going to the surprise gift 🎁 */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg sm:text-2xl font-bold text-purple-100 mb-1 flex items-center justify-center gap-2"
      >
        <span>You're going to the surprise gift</span>
        <span className="inline-block animate-bounce">🎁</span>
      </motion.p>

      {/* Authentic Animated Milk & Mocha Sticker */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <MilkMochaSticker scene={5} />
      </motion.div>

      {/* CONTINUE → */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        <GlowingButton onClick={onContinue} variant="primary" size="lg">
          CONTINUE →
        </GlowingButton>
      </motion.div>
    </motion.div>
  );
};
