import React from 'react';
import { motion } from 'framer-motion';
import { GlowingButton } from '../GlowingButton';
import { MilkMochaSticker } from '../cartoons/MilkMochaSticker';

interface Scene2Props {
  onOpen: () => void;
  onReject: () => void;
}

export const Scene2: React.FC<Scene2Props> = ({ onOpen, onReject }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.7 }}
      className="flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto min-h-screen py-6"
    >
      {/* Shocked / Emotional Headline */}
      <motion.div
        animate={{
          rotate: [-2, 2, -2, 2, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
          className="text-4xl sm:text-6xl font-extrabold text-pink-400 tracking-tight mb-2 text-glow-pink"
        >
          WHYY?? 😭
        </motion.h1>
      </motion.div>

      {/* Dramatic subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-lg sm:text-2xl font-semibold text-purple-200 mb-1 leading-snug"
      >
        Bruhh, why don't you want to open??
      </motion.p>

      {/* Authentic Animated Milk & Mocha Sticker */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        <MilkMochaSticker scene={2} />
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
      >
        <GlowingButton onClick={onOpen} variant="primary" size="lg" className="w-full sm:w-auto">
          Open 👀
        </GlowingButton>

        <GlowingButton onClick={onReject} variant="secondary" size="lg" className="w-full sm:w-auto">
          It's my wish 😤
        </GlowingButton>
      </motion.div>
    </motion.div>
  );
};
