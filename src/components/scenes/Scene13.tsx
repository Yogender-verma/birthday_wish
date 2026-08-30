import React from 'react';
import { motion } from 'framer-motion';
import { birthdayPerson } from '../../config';
import { ConfettiEffect } from '../ConfettiEffect';
import { FireworkRockets } from '../FireworkRockets';
import { playClickSound } from '../../utils/sound';
import { RotateCcw, Sparkles, Heart, Star } from 'lucide-react';

interface Scene13Props {
  onReplay: () => void;
}

export const Scene13: React.FC<Scene13Props> = ({ onReplay }) => {
  const handleReplayClick = () => {
    playClickSound();
    onReplay();
  };

  const nameStr = (birthdayPerson || '').toString().trim();
  const recipientDisplay = nameStr !== '' && nameStr !== 'NAME' ? nameStr : 'TO YOU 🎉';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col items-center justify-center text-center px-4 py-12 min-h-screen max-w-4xl mx-auto relative z-10 space-y-8 overflow-hidden"
    >
      {/* Sky Firework Rockets */}
      <FireworkRockets />

      {/* Soft Ambient Confetti */}
      <ConfettiEffect trigger={true} continuous={true} />

      {/* Floating Glowing Orbs & Hearts background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
            style={{
              top: `${10 + i * 11}%`,
              left: `${8 + ((i * 29) % 80)}%`,
            }}
            className="absolute"
          >
            {i % 2 === 0 ? (
              <Heart className="w-8 h-8 text-pink-400/50 fill-pink-400/40 blur-[1px]" />
            ) : (
              <Star className="w-7 h-7 text-amber-300/50 fill-amber-300/40 blur-[1px]" />
            )}
          </motion.div>
        ))}
      </div>

      {/* STAGE 1: Big Cinematic Cake Emoji */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, type: 'spring', stiffness: 140 }}
        className="relative z-10"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-7xl sm:text-9xl filter drop-shadow-[0_0_35px_rgba(236,72,153,0.7)]"
        >
          🎂
        </motion.div>
      </motion.div>

      {/* STAGE 2: HAPPY BIRTHDAY Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 space-y-2"
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-pink-300">
            Forever & Always
          </span>
          <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-7xl md:text-8xl font-black tracking-tight text-white font-cinzel text-glow-purple">
          HAPPY BIRTHDAY ❤️
        </h1>
      </motion.div>

      {/* STAGE 3: Recipient Name */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.9, type: 'spring' }}
        className="relative z-10"
      >
        <h2 className="text-5xl sm:text-8xl md:text-9xl font-black bg-gradient-to-r from-pink-400 via-purple-200 to-amber-300 bg-clip-text text-transparent tracking-tight text-glow-pink py-2">
          {recipientDisplay}
        </h2>
      </motion.div>

      {/* STAGE 4: Replay Experience Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 pt-8"
      >
        <button
          onClick={handleReplayClick}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-purple-100 hover:text-white text-base font-bold border border-purple-400/30 hover:border-purple-400/60 backdrop-blur-md transition-all duration-300 cursor-pointer shadow-xl hover:shadow-[0_0_25px_rgba(236,72,153,0.5)]"
        >
          <RotateCcw className="w-5 h-5 text-pink-400" />
          <span>Replay Experience ↺</span>
        </button>
      </motion.div>
    </motion.div>
  );
};
