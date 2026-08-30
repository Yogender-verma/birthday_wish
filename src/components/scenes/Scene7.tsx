import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { birthdayPerson } from '../../config';
import { MessageCard } from '../MessageCard';
import { SurpriseWishJar } from '../SurpriseWishJar';
import { ConfettiEffect, triggerConfettiBurst } from '../ConfettiEffect';
import { playFanfareSound, playClickSound } from '../../utils/sound';
import { RotateCcw, Sparkles } from 'lucide-react';
import { GlowingButton } from '../GlowingButton';

interface Scene7Props {
  onReplay: () => void;
  onContinue?: () => void;
}

export const Scene7: React.FC<Scene7Props> = ({ onReplay, onContinue }) => {
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    // Stage 1: Reveal Cake 🎂 (0.8s)
    const t1 = setTimeout(() => setStage(1), 800);

    // Stage 2: Reveal HAPPY BIRTHDAY (1.8s)
    const t2 = setTimeout(() => setStage(2), 1800);

    // Stage 3: Reveal Recipient Name (2.6s)
    const t3 = setTimeout(() => {
      setStage(3);
      playFanfareSound();
      triggerConfettiBurst();
    }, 2600);

    // Stage 4: Reveal Message Card & Wishes (3.6s)
    const t4 = setTimeout(() => setStage(4), 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleReplayClick = () => {
    playClickSound();
    onReplay();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col items-center justify-center text-center px-4 py-12 min-h-screen max-w-4xl mx-auto relative z-10"
    >
      {/* Continuous soft confetti after stage 3 */}
      {stage >= 3 && <ConfettiEffect trigger={true} continuous={true} />}

      {/* STAGE 1: Reveal Cake 🎂 */}
      {stage >= 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.3, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 160 }}
          className="mb-4"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl sm:text-8xl filter drop-shadow-[0_0_25px_rgba(251,191,36,0.6)]"
          >
            🎂
          </motion.div>
        </motion.div>
      )}

      {/* STAGE 2: Reveal HAPPY BIRTHDAY 🎉 */}
      {stage >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-2"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-pink-300/80">
              Celebration Day
            </span>
            <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-cinzel text-glow-purple">
            HAPPY BIRTHDAY 🎉
          </h2>
        </motion.div>
      )}

      {/* STAGE 3: Reveal Recipient Name (only if defined) */}
      {stage >= 3 && birthdayPerson && typeof birthdayPerson === 'string' && (birthdayPerson as string).trim() !== '' && birthdayPerson !== 'NAME' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, type: 'spring', stiffness: 120 }}
          className="mb-10"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black bg-gradient-to-r from-pink-400 via-purple-200 to-amber-300 bg-clip-text text-transparent tracking-tight text-glow-pink py-2">
            {birthdayPerson}
          </h1>
        </motion.div>
      )}

      {/* STAGE 4: Reveal Personal Message Card & Wish Jar */}
      {stage >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full space-y-8"
        >
          {/* Glassmorphic Personal Note Card */}
          <MessageCard delay={0.2} />

          {/* Interactive Wish Jar Cards */}
          <SurpriseWishJar />

          {/* Action Buttons: Cut the Cake & Replay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="pt-6 pb-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {onContinue && (
              <GlowingButton onClick={onContinue} variant="strong" size="lg">
                LET'S CUT THE CAKE 🎂 →
              </GlowingButton>
            )}

            <button
              onClick={handleReplayClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-purple-200 hover:text-white text-sm font-semibold border border-purple-400/20 hover:border-purple-400/50 backdrop-blur-md transition-all duration-300 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-pink-400" />
              <span>Replay Experience</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

