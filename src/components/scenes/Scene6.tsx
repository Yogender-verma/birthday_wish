import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlowingButton } from '../GlowingButton';
import { MilkMochaSticker } from '../cartoons/MilkMochaSticker';

interface Scene6Props {
  onContinue: () => void;
}

export const Scene6: React.FC<Scene6Props> = ({ onContinue }) => {
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showMagicalButton, setShowMagicalButton] = useState(false);

  useEffect(() => {
    // 1. Show second line after brief pause (0.7s)
    const timer1 = setTimeout(() => {
      setShowSecondLine(true);
    }, 700);

    // 2. Reveal magical button after second line pause (1.6s)
    const timer2 = setTimeout(() => {
      setShowMagicalButton(true);
    }, 1600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(15px)' }}
      transition={{ duration: 0.9 }}
      className="flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto min-h-screen py-6 relative z-10"
    >
      {/* So... */}
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl sm:text-6xl font-extrabold text-purple-200 tracking-tight mb-2 text-glow-purple"
      >
        So...
      </motion.h1>

      {/* You're finally here 👀 */}
      {showSecondLine && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl sm:text-3xl font-bold text-pink-300 mb-1"
        >
          You're finally here 👀
        </motion.p>
      )}

      {/* Authentic Animated Milk & Mocha Sticker */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <MilkMochaSticker scene={6} />
      </motion.div>

      {/* Large Glowing Magical Circular Button */}
      {showMagicalButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 140 }}
          className="mt-2"
        >
          <GlowingButton onClick={onContinue} variant="magical" size="xl">
            CONTINUE
          </GlowingButton>
        </motion.div>
      )}
    </motion.div>
  );
};
