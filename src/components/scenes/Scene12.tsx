import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { finalMessage, senderName } from '../../config';
import { GlowingButton } from '../GlowingButton';
import { Heart, Sparkles } from 'lucide-react';

interface Scene12Props {
  onContinue: () => void;
}

export const Scene12: React.FC<Scene12Props> = ({ onContinue }) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);

  useEffect(() => {
    let index = 0;
    const fullText = finalMessage.trim();

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, 28); // Smooth typing speed

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center text-center px-4 py-8 min-h-screen max-w-3xl mx-auto relative z-10 space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-1"
      >
        <div className="flex items-center justify-center gap-2 text-pink-300 font-semibold text-xs sm:text-sm tracking-widest uppercase">
          <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-pulse" />
          <span>Personal Note</span>
          <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-pulse" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight text-glow-pink">
          For you ❤️
        </h1>
      </motion.div>

      {/* Glassmorphic Note Card with Typing Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-purple-900/40 via-purple-950/60 to-black/60 border border-purple-400/30 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.5)] relative overflow-hidden"
      >
        <div className="text-left font-sans text-base sm:text-xl text-purple-100 leading-relaxed whitespace-pre-wrap font-medium">
          {displayedText}
          {!isTypingComplete && (
            <span className="inline-block w-2 h-5 ml-1 bg-pink-400 animate-pulse" />
          )}
        </div>

        {/* Sender Signature */}
        {displayedText.length > 35 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 text-right font-serif italic text-lg sm:text-2xl font-bold bg-gradient-to-r from-pink-300 to-amber-300 bg-clip-text text-transparent"
          >
            — {senderName} ❤️
          </motion.div>
        )}
      </motion.div>

      {/* Continue Button to Final Screen */}
      {isTypingComplete && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="pt-4"
        >
          <GlowingButton onClick={onContinue} variant="magical" size="xl">
            FINAL SURPRISE ✨ →
          </GlowingButton>
        </motion.div>
      )}
    </motion.div>
  );
};
