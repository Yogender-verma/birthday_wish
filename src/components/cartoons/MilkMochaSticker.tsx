import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { playClickSound } from '../../utils/sound';
import { CartoonDuo } from './CartoonDuo';

interface MilkMochaStickerProps {
  scene: number;
  size?: number;
}

export const MilkMochaSticker: React.FC<MilkMochaStickerProps> = ({ scene }) => {
  const [tapReaction, setTapReaction] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Curated authentic Milk & Mocha animated GIF stickers with guaranteed high-reliability Giphy URLs
  const gifMap: Record<number, { primary: string; fallback: string; alt: string; emoji: string }> = {
    1: {
      primary: 'https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif',
      fallback: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDJ6YjRxcjJ2dTFydHlxcDNicnlvMHNmcWFxZGZ0MWswbHZreTRuNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif',
      alt: 'Milk and Mocha Happy Hug',
      emoji: '💖',
    },
    2: {
      primary: 'https://media.giphy.com/media/L95W4wv8nnb9K/giphy.gif',
      fallback: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDYycDRuZndvMW1tb2p4amR2MHM5dTN0cHNnbmZsZHdxa2d2dThzZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L95W4wv8nnb9K/giphy.gif',
      alt: 'Milk and Mocha Crying',
      emoji: '😭',
    },
    3: {
      primary: 'https://media.giphy.com/media/c76IJLufpNwSULPk77/giphy.gif',
      fallback: 'https://i.giphy.com/media/c76IJLufpNwSULPk77/giphy.gif',
      alt: 'Milk and Mocha Pleading',
      emoji: '🥺',
    },
    4: {
      primary: 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
      fallback: 'https://i.giphy.com/media/mlvseq9yvZhba/giphy.gif',
      alt: 'Milk and Mocha Curious',
      emoji: '👀',
    },
    5: {
      primary: 'https://media.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif',
      fallback: 'https://i.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif',
      alt: 'Milk and Mocha Celebrating',
      emoji: '🎉',
    },
    6: {
      primary: 'https://media.giphy.com/media/KztT2c4u8mYYUiMKdJ/giphy.gif',
      fallback: 'https://i.giphy.com/media/KztT2c4u8mYYUiMKdJ/giphy.gif',
      alt: 'Milk and Mocha Magical Star',
      emoji: '✨',
    },
    7: {
      primary: 'https://media.giphy.com/media/l4KibW1bB5FGYAwuY/giphy.gif',
      fallback: 'https://i.giphy.com/media/l4KibW1bB5FGYAwuY/giphy.gif',
      alt: 'Milk and Mocha Birthday Wish',
      emoji: '🎂',
    },
    8: {
      primary: 'https://media.giphy.com/media/3o7E4F2G3Wn9U3m2l0/giphy.gif',
      fallback: 'https://i.giphy.com/media/3o7E4F2G3Wn9U3m2l0/giphy.gif',
      alt: 'Milk and Mocha Cake Cut',
      emoji: '🍰',
    },
    9: {
      primary: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
      fallback: 'https://media.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif',
      alt: 'Milk and Mocha Party Celebration',
      emoji: '🥳🎉',
    },
    10: {
      primary: 'https://media.giphy.com/media/3o7TKTDn976rzVgky4/giphy.gif',
      fallback: 'https://i.giphy.com/media/3o7TKTDn976rzVgky4/giphy.gif',
      alt: 'Milk and Mocha Wait Surprise',
      emoji: '👀❓',
    },
    11: {
      primary: 'https://media.giphy.com/media/26n6WywJyh39n1pBu/giphy.gif',
      fallback: 'https://i.giphy.com/media/26n6WywJyh39n1pBu/giphy.gif',
      alt: 'Milk and Mocha Gift Box',
      emoji: '🎁✨',
    },
    12: {
      primary: 'https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif',
      fallback: 'https://i.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif',
      alt: 'Milk and Mocha Personal Love',
      emoji: '❤️💌',
    },
    13: {
      primary: 'https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif',
      fallback: 'https://i.giphy.com/media/vFKqnCdLPNOKc/giphy.gif',
      alt: 'Milk and Mocha Forever Birthday',
      emoji: '✨💖',
    },
  };

  const currentGif = gifMap[scene] || gifMap[1];

  const handleTap = () => {
    playClickSound();
    setTapReaction(true);
    setTimeout(() => setTapReaction(false), 700);
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-4 select-none z-20">
      {/* Floating Vibrant Animated Emoji Badge */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.25, 1],
          rotate: [-8, 8, -8],
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="text-4xl sm:text-5xl mb-2 filter drop-shadow-[0_0_20px_rgba(236,72,153,0.8)] flex items-center justify-center gap-1"
      >
        <span>{currentGif.emoji}</span>
      </motion.div>

      {/* Main Sticker Frame in soft rounded white glass card */}
      <motion.div
        animate={
          tapReaction
            ? { scale: [1, 1.12, 1], rotate: [0, -5, 5, 0] }
            : { y: [0, -6, 0] }
        }
        transition={
          tapReaction
            ? { duration: 0.5 }
            : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
        }
        onClick={handleTap}
        className="relative group cursor-pointer p-2 sm:p-3 rounded-3xl bg-white/95 border-2 border-pink-300/60 shadow-[0_10px_30px_rgba(168,85,247,0.35)] backdrop-blur-lg overflow-hidden transition-all duration-300 hover:shadow-[0_15px_40px_rgba(236,72,153,0.5)]"
      >
        {/* Soft pink glow border highlight inside card */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-pink-100/40 via-purple-100/40 to-transparent pointer-events-none" />

        <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center rounded-2xl bg-white overflow-hidden p-1">
          {!imgError ? (
            <img
              src={currentGif.primary}
              alt={currentGif.alt}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain pointer-events-none transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            /* Reliable Cartoon Duo SVG Fallback if image network fails */
            <div className="w-full h-full flex items-center justify-center bg-pink-50 rounded-xl">
              <CartoonDuo scene={scene} />
            </div>
          )}
        </div>
      </motion.div>

      <span className="text-[11px] sm:text-xs text-pink-200/90 mt-2 font-semibold tracking-wide flex items-center gap-1">
        <span>✨ Tap the Milk & Mocha sticker {currentGif.emoji} ✨</span>
      </span>
    </div>
  );
};
