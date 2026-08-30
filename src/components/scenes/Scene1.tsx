import React from 'react';
import { motion } from 'framer-motion';
import { GlowingButton } from '../GlowingButton';
import { senderName } from '../../config';
import { MilkMochaSticker } from '../cartoons/MilkMochaSticker';

interface Scene1Props {
  onOpen: () => void;
  onReject: () => void;
}

export const Scene1: React.FC<Scene1Props> = ({ onOpen, onReject }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto min-h-screen py-6"
    >
      {/* First line: Heyy! 👀 */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-2 text-glow-purple"
      >
        Heyy! 👀
      </motion.h1>

      {/* Second line: Yogender Verma sent something for you. */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-lg sm:text-2xl font-medium text-purple-200/90 mb-1"
      >
        <span className="bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-200 bg-clip-text text-transparent font-bold">
          {senderName}
        </span>{' '}
        sent something for you.
      </motion.p>

      {/* Authentic Animated Milk & Mocha Sticker */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <MilkMochaSticker scene={1} />
      </motion.div>

      {/* Two Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
      >
        <GlowingButton onClick={onOpen} variant="primary" size="lg" className="w-full sm:w-auto">
          Open ✨
        </GlowingButton>

        <GlowingButton onClick={onReject} variant="secondary" size="lg" className="w-full sm:w-auto">
          Nah, I don't want 😭
        </GlowingButton>
      </motion.div>
    </motion.div>
  );
};
