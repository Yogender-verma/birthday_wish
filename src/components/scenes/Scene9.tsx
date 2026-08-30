import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlowingButton } from '../GlowingButton';
import { ConfettiEffect } from '../ConfettiEffect';
import { playFanfareSound } from '../../utils/sound';
import { Sparkles, Heart } from 'lucide-react';

interface Scene9Props {
  onContinue: () => void;
}

// Custom Floating Balloons component
const FloatingBalloons: React.FC = () => {
  const balloons = [
    { color: 'from-pink-500 to-rose-400', left: '10%', delay: 0, duration: 7 },
    { color: 'from-purple-500 to-indigo-400', left: '25%', delay: 1.5, duration: 8.5 },
    { color: 'from-amber-400 to-yellow-300', left: '75%', delay: 0.8, duration: 6.8 },
    { color: 'from-fuchsia-500 to-pink-400', left: '88%', delay: 2.2, duration: 9 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {balloons.map((b, i) => (
        <motion.div
          key={i}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{
            y: '-20vh',
            opacity: [0, 0.9, 0.9, 0],
            x: [0, 15, -15, 0],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: 'easeInOut',
          }}
          style={{ left: b.left }}
          className="absolute flex flex-col items-center"
        >
          {/* Balloon shape */}
          <div
            className={`w-14 h-18 sm:w-20 sm:h-24 bg-gradient-to-t ${b.color} rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.3)] relative flex items-center justify-center border-t border-white/40`}
          >
            <div className="absolute top-2 left-3 w-4 h-6 bg-white/30 rounded-full blur-[1px]" />
          </div>
          {/* Balloon knot & string */}
          <div className="w-2 h-2 bg-pink-600 rounded-sm -mt-0.5" />
          <div className="w-0.5 h-16 bg-white/40" />
        </motion.div>
      ))}
    </div>
  );
};

export const Scene9: React.FC<Scene9Props> = ({ onContinue }) => {
  useEffect(() => {
    playFanfareSound();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center text-center px-4 py-8 min-h-screen max-w-2xl mx-auto relative z-10 overflow-hidden"
    >
      {/* Floating Animated Balloons */}
      <FloatingBalloons />

      {/* Continuous Confetti */}
      <ConfettiEffect trigger={true} continuous={true} />

      {/* Floating Hearts in background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.7,
            }}
            style={{
              top: `${15 + i * 14}%`,
              left: `${12 + ((i * 37) % 75)}%`,
            }}
            className="absolute text-pink-400/40"
          >
            <Heart className="w-6 h-6 fill-current" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="relative z-10 space-y-6"
      >
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
          <span className="text-sm font-semibold tracking-widest uppercase text-pink-300">
            Grand Celebration
          </span>
          <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight text-glow-pink">
          Happy Birthdayyyy! 🎉🎂
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-amber-200 bg-clip-text text-transparent"
        >
          You officially survived the surprise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="pt-8"
        >
          <GlowingButton onClick={onContinue} variant="magical" size="xl">
            CONTINUE →
          </GlowingButton>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
