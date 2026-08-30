import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cake3D } from '../Cake3D';
import { MilkMochaSticker } from '../cartoons/MilkMochaSticker';
import { triggerConfettiBurst } from '../ConfettiEffect';
import { playFanfareSound, playClickSound } from '../../utils/sound';
import { GlowingButton } from '../GlowingButton';
import { Sparkles, Scissors } from 'lucide-react';

interface Scene8Props {
  onContinue: () => void;
}

export const Scene8: React.FC<Scene8Props> = ({ onContinue }) => {
  const [step, setStep] = useState<number>(0);
  const [isCut, setIsCut] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  useEffect(() => {
    // 1. "Okayyy... enough with the wishes 😭" (0.5s)
    const t1 = setTimeout(() => setStep(1), 500);

    // 2. "Now let's cut the cake! 🎂" (1.5s)
    const t2 = setTimeout(() => setStep(2), 1500);

    // 3. Show Cake & Instructions (2.4s)
    const t3 = setTimeout(() => setStep(3), 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleCut = () => {
    if (isCut) return;
    setIsCut(true);
    setIsShaking(true);

    // Trigger sound and celebration confetti
    playFanfareSound();
    triggerConfettiBurst();

    setTimeout(() => {
      setIsShaking(false);
    }, 600);

    // Advance to Step 9 celebration after 2.2 seconds
    setTimeout(() => {
      onContinue();
    }, 2200);
  };

  const handleFallbackCutClick = () => {
    playClickSound();
    handleCut();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={
        isShaking
          ? { opacity: 1, x: [-8, 8, -6, 6, -3, 3, 0] }
          : { opacity: 1, x: 0 }
      }
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col items-center justify-center text-center px-4 py-8 min-h-screen max-w-3xl mx-auto relative z-10"
    >
      {/* Intro Text Step 1 */}
      {step >= 1 && (
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg sm:text-2xl font-bold text-pink-300 mb-2"
        >
          Okayyy... enough with the wishes 😭
        </motion.p>
      )}

      {/* Intro Text Step 2 */}
      {step >= 2 && (
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 140 }}
          className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6 text-glow-purple"
        >
          Now let's cut the cake! 🎂
        </motion.h2>
      )}

      {/* Cake & Instructions Step 3 */}
      {step >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col items-center"
        >
          {/* Milk and Mocha Sticker */}
          <MilkMochaSticker scene={8} />

          {/* Instructions */}
          {!isCut ? (
            <div className="mb-4 space-y-1">
              <div className="flex items-center justify-center gap-2 text-amber-300 font-semibold text-sm sm:text-base">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Make a wish first... ✨</span>
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <p className="text-purple-200 text-xs sm:text-sm">
                Now swipe or drag across the cake 👇
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="mb-4 space-y-1"
            >
              <h1 className="text-4xl sm:text-6xl font-black text-amber-300 tracking-wider text-glow-amber">
                YOOOOO! 🎉
              </h1>
              <p className="text-2xl sm:text-3xl font-extrabold text-pink-300">
                CAKE CUT! 🎂❤️
              </p>
            </motion.div>
          )}

          {/* Interactive Cake */}
          <Cake3D onCut={handleCut} isCut={isCut} />

          {/* Fallback Cut Button for Reliability */}
          {!isCut && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6"
            >
              <GlowingButton onClick={handleFallbackCutClick} variant="primary" size="md">
                <Scissors className="w-4 h-4 mr-2" />
                <span>CUT THE CAKE 🔪</span>
              </GlowingButton>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};
