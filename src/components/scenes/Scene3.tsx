import React from 'react';
import { motion } from 'framer-motion';
import { GlowingButton } from '../GlowingButton';
import { MilkMochaSticker } from '../cartoons/MilkMochaSticker';

interface Scene3Props {
  onOpen: () => void;
}

export const Scene3: React.FC<Scene3Props> = ({ onOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.7 }}
      className="flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto min-h-screen py-6"
    >
      {/* NO 😭 with dramatic shake */}
      <motion.div
        animate={{
          x: [-6, 6, -5, 5, -2, 2, 0],
        }}
        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2.5 }}
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 220 }}
          className="text-5xl sm:text-7xl font-black text-purple-300 tracking-tight mb-1 text-glow-purple"
        >
          NO 😭
        </motion.h1>
      </motion.div>

      {/* Cute pleading text with soft bounce */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="text-xl sm:text-3xl font-bold text-pink-300 mb-1 flex items-center justify-center gap-2"
      >
        <span>Please open</span>
        <motion.span
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          🥺
        </motion.span>
      </motion.p>

      {/* Authentic Animated Milk & Mocha Sticker */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <MilkMochaSticker scene={3} />
      </motion.div>

      {/* ONLY ONE BUTTON with strong glowing pulse */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="w-full max-w-xs"
      >
        <GlowingButton onClick={onOpen} variant="strong" size="xl" className="w-full">
          OPEN ✨
        </GlowingButton>
      </motion.div>
    </motion.div>
  );
};
