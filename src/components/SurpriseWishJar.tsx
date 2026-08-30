import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { surpriseWishes } from '../config';
import { playClickSound } from '../utils/sound';
import { triggerConfettiBurst } from './ConfettiEffect';

export const SurpriseWishJar: React.FC = () => {
  const [activeWishIndex, setActiveWishIndex] = useState<number | null>(null);

  const handleWishClick = (index: number) => {
    playClickSound();
    triggerConfettiBurst();
    setActiveWishIndex(activeWishIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 mt-8">
      <div className="text-center mb-4">
        <span className="text-xs uppercase tracking-widest text-purple-300/70 font-semibold">
          ✨ Tap a card to unlock a wish ✨
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {surpriseWishes.map((wish, index) => {
          const isSelected = activeWishIndex === index;

          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleWishClick(index)}
              className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 border ${
                isSelected
                  ? 'bg-purple-900/60 border-pink-400 shadow-[0_0_25px_rgba(236,72,153,0.5)]'
                  : 'glass-card hover:border-purple-400/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl">{wish.icon}</span>
                <div className="text-left">
                  <h4 className="font-bold text-sm sm:text-base text-purple-100">
                    {wish.title}
                  </h4>
                  <p className="text-xs text-purple-300/80">
                    {isSelected ? 'Tap to close' : 'Tap to reveal'}
                  </p>
                </div>
              </div>

              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 pt-3 border-t border-purple-400/20 text-xs sm:text-sm text-purple-100/90 leading-relaxed text-left"
                  >
                    {wish.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
