import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GiftBox } from '../GiftBox';
import { MilkMochaSticker } from '../cartoons/MilkMochaSticker';
import { GlowingButton } from '../GlowingButton';
import { Sparkles, Gift } from 'lucide-react';
import { playClickSound } from '../../utils/sound';

interface Scene11Props {
  onContinue: () => void;
}

export const Scene11: React.FC<Scene11Props> = ({ onContinue }) => {
  const [isOpenTriggered, setIsOpenTriggered] = useState<boolean>(false);

  const handleOpenGift = () => {
    if (isOpenTriggered) return;
    setIsOpenTriggered(true);
    playClickSound();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center text-center px-4 py-8 min-h-screen max-w-2xl mx-auto relative z-10 space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-2"
      >
        <div className="flex items-center justify-center gap-2 text-pink-300 font-semibold text-xs sm:text-sm tracking-widest uppercase">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>The Real Surprise</span>
          <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight text-glow-purple">
          Okay... THIS is the actual surprise 🎁
        </h1>

        <p className="text-lg sm:text-2xl font-bold text-pink-200">
          Open it.
        </p>

        {/* Milk & Mocha Animated Sticker Card */}
        <MilkMochaSticker scene={11} />
      </motion.div>

      {/* Interactive Gift Box */}
      <GiftBox onOpened={onContinue} />

      {/* Open Gift Button */}
      {!isOpenTriggered && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <GlowingButton onClick={handleOpenGift} variant="strong" size="xl">
            <Gift className="w-6 h-6 mr-2" />
            <span>OPEN GIFT 🎁</span>
          </GlowingButton>
        </motion.div>
      )}
    </motion.div>
  );
};
