import React from 'react';
import { motion } from 'framer-motion';

export type BearEmotion = 'happy' | 'crying' | 'begging' | 'excited' | 'celebrating';

interface MochaBearProps {
  emotion?: BearEmotion;
  className?: string;
  size?: number;
}

export const MochaBear: React.FC<MochaBearProps> = ({
  emotion = 'happy',
  className = '',
  size = 140,
}) => {
  // Motion variants based on emotion
  const bodyVariants = {
    happy: {
      y: [0, -8, 0],
      rotate: [0, -3, 3, 0],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
    },
    crying: {
      y: [0, 4, 0],
      rotate: [-4, 4, -4],
      transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' as const },
    },
    begging: {
      y: [0, -6, 0],
      scale: [1, 1.03, 1],
      transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' as const },
    },
    excited: {
      y: [0, -16, 0],
      rotate: [-5, 5, -5],
      transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' as const },
    },
    celebrating: {
      y: [0, -20, 0],
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' as const },
    },
  };

  const armLeftVariants = {
    happy: { rotate: [0, -25, 0], transition: { duration: 1, repeat: Infinity } },
    crying: { rotate: [-10, 10, -10], transition: { duration: 0.4, repeat: Infinity } },
    begging: { rotate: [20, 35, 20], transition: { duration: 0.8, repeat: Infinity } },
    excited: { rotate: [-30, 0, -30], transition: { duration: 0.6, repeat: Infinity } },
    celebrating: { rotate: [-45, -10, -45], transition: { duration: 0.5, repeat: Infinity } },
  };

  const armRightVariants = {
    happy: { rotate: [0, 20, 0], transition: { duration: 1.5, repeat: Infinity } },
    crying: { rotate: [10, -10, 10], transition: { duration: 0.4, repeat: Infinity } },
    begging: { rotate: [-20, -35, -20], transition: { duration: 0.8, repeat: Infinity } },
    excited: { rotate: [30, 0, 30], transition: { duration: 0.6, repeat: Infinity } },
    celebrating: { rotate: [45, 10, 45], transition: { duration: 0.5, repeat: Infinity } },
  };

  return (
    <motion.div
      variants={bodyVariants}
      animate={emotion}
      className={`relative inline-block select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
      >
        {/* Shadow */}
        <ellipse cx="80" cy="148" rx="42" ry="8" fill="rgba(0,0,0,0.25)" />

        {/* Left Ear */}
        <motion.g
          animate={{ rotate: emotion === 'crying' ? [-5, 5, -5] : [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ transformOrigin: '38px 42px' }}
        >
          <circle cx="38" cy="42" r="18" fill="#8B5A2B" stroke="#2D1800" strokeWidth="4.5" />
          <circle cx="38" cy="42" r="10" fill="#6E441F" />
        </motion.g>

        {/* Right Ear */}
        <motion.g
          animate={{ rotate: emotion === 'crying' ? [5, -5, 5] : [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ transformOrigin: '122px 42px' }}
        >
          <circle cx="122" cy="42" r="18" fill="#8B5A2B" stroke="#2D1800" strokeWidth="4.5" />
          <circle cx="122" cy="42" r="10" fill="#6E441F" />
        </motion.g>

        {/* Body */}
        <ellipse cx="80" cy="115" rx="36" ry="32" fill="#8B5A2B" stroke="#2D1800" strokeWidth="4.5" />
        {/* Tummy */}
        <ellipse cx="80" cy="118" rx="22" ry="18" fill="#D2B48C" opacity="0.9" />

        {/* Head */}
        <ellipse cx="80" cy="68" rx="48" ry="42" fill="#8B5A2B" stroke="#2D1800" strokeWidth="4.5" />

        {/* Snout / Muzzle */}
        <ellipse cx="80" cy="76" rx="20" ry="15" fill="#D2B48C" stroke="#2D1800" strokeWidth="3" />
        {/* Nose */}
        <ellipse cx="80" cy="69" rx="6" ry="4.5" fill="#2D1800" />
        {/* Mouth */}
        {emotion === 'crying' ? (
          <path d="M72 82 Q80 76 88 82" fill="none" stroke="#2D1800" strokeWidth="3" strokeLinecap="round" />
        ) : emotion === 'begging' ? (
          <path d="M75 80 Q80 84 85 80" fill="none" stroke="#2D1800" strokeWidth="3" strokeLinecap="round" />
        ) : (
          <path d="M74 77 Q80 84 86 77" fill="#E85D75" stroke="#2D1800" strokeWidth="2.5" strokeLinecap="round" />
        )}

        {/* Blush Cheeks */}
        <ellipse cx="48" cy="74" rx="8" ry="5" fill="#FF85A2" opacity="0.75" />
        <ellipse cx="112" cy="74" rx="8" ry="5" fill="#FF85A2" opacity="0.75" />

        {/* Eyes */}
        {emotion === 'crying' ? (
          <>
            {/* Crying eyes */}
            <path d="M50 64 Q58 56 64 64" fill="none" stroke="#2D1800" strokeWidth="4" strokeLinecap="round" />
            <path d="M96 64 Q102 56 110 64" fill="none" stroke="#2D1800" strokeWidth="4" strokeLinecap="round" />
            {/* Animated Tears */}
            <motion.path
              d="M52 68 Q46 80 50 92 Q54 80 52 68 Z"
              fill="#60A5FA"
              animate={{ opacity: [0.4, 1, 0.4], y: [0, 6, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <motion.path
              d="M108 68 Q102 80 106 92 Q110 80 108 68 Z"
              fill="#60A5FA"
              animate={{ opacity: [0.4, 1, 0.4], y: [0, 6, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          </>
        ) : emotion === 'begging' ? (
          <>
            {/* Shiny glossy Pleading Eyes */}
            <circle cx="56" cy="62" r="7" fill="#2D1800" />
            <circle cx="104" cy="62" r="7" fill="#2D1800" />
            <circle cx="58" cy="60" r="3" fill="#FFFFFF" />
            <circle cx="106" cy="60" r="3" fill="#FFFFFF" />
            <circle cx="54" cy="64" r="1.5" fill="#FFFFFF" />
            <circle cx="102" cy="64" r="1.5" fill="#FFFFFF" />
          </>
        ) : emotion === 'excited' || emotion === 'celebrating' ? (
          <>
            {/* Happy Star / Arch Eyes */}
            <path d="M50 63 Q56 55 62 63" fill="none" stroke="#2D1800" strokeWidth="4" strokeLinecap="round" />
            <path d="M98 63 Q104 55 110 63" fill="none" stroke="#2D1800" strokeWidth="4" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Happy Curved Eyes */}
            <path d="M50 62 Q56 55 62 62" fill="none" stroke="#2D1800" strokeWidth="4" strokeLinecap="round" />
            <path d="M98 62 Q104 55 110 62" fill="none" stroke="#2D1800" strokeWidth="4" strokeLinecap="round" />
          </>
        )}

        {/* Arms */}
        {/* Left Arm */}
        <motion.g
          animate={armLeftVariants[emotion]}
          style={{ transformOrigin: '48px 105px' }}
        >
          <ellipse cx="40" cy="112" rx="9" ry="16" fill="#8B5A2B" stroke="#2D1800" strokeWidth="4" />
        </motion.g>

        {/* Right Arm */}
        <motion.g
          animate={armRightVariants[emotion]}
          style={{ transformOrigin: '112px 105px' }}
        >
          <ellipse cx="120" cy="112" rx="9" ry="16" fill="#8B5A2B" stroke="#2D1800" strokeWidth="4" />
        </motion.g>

        {/* Party Hat for Celebrating */}
        {(emotion === 'celebrating' || emotion === 'excited') && (
          <g transform="translate(68, 8)">
            <polygon points="12,0 0,30 24,30" fill="#EC4899" stroke="#2D1800" strokeWidth="3" />
            <circle cx="12" cy="0" r="4" fill="#FBBF24" />
          </g>
        )}
      </svg>
    </motion.div>
  );
};
