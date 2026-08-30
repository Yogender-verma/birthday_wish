import React from 'react';
import { motion } from 'framer-motion';
import type { BearEmotion } from './MochaBear';

interface MilkBearProps {
  emotion?: BearEmotion;
  className?: string;
  size?: number;
}

export const MilkBear: React.FC<MilkBearProps> = ({
  emotion = 'happy',
  className = '',
  size = 140,
}) => {
  const bodyVariants = {
    happy: {
      y: [0, -8, 0],
      rotate: [0, 3, -3, 0],
      transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.2 },
    },
    crying: {
      y: [0, 5, 0],
      rotate: [4, -4, 4],
      transition: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' as const },
    },
    begging: {
      y: [0, -7, 0],
      scale: [1, 1.04, 1],
      transition: { duration: 1.1, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.1 },
    },
    excited: {
      y: [0, -18, 0],
      rotate: [6, -6, 6],
      transition: { duration: 0.75, repeat: Infinity, ease: 'easeInOut' as const },
    },
    celebrating: {
      y: [0, -22, 0],
      rotate: [0, 12, -12, 0],
      transition: { duration: 0.55, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.1 },
    },
  };

  const armLeftVariants = {
    happy: { rotate: [0, -18, 0], transition: { duration: 1.4, repeat: Infinity } },
    crying: { rotate: [-15, 15, -15], transition: { duration: 0.35, repeat: Infinity } },
    begging: { rotate: [25, 40, 25], transition: { duration: 0.75, repeat: Infinity } },
    excited: { rotate: [-35, 5, -35], transition: { duration: 0.55, repeat: Infinity } },
    celebrating: { rotate: [-50, -15, -50], transition: { duration: 0.45, repeat: Infinity } },
  };

  const armRightVariants = {
    happy: { rotate: [0, 28, 0], transition: { duration: 0.9, repeat: Infinity } },
    crying: { rotate: [15, -15, 15], transition: { duration: 0.35, repeat: Infinity } },
    begging: { rotate: [-25, -40, -25], transition: { duration: 0.75, repeat: Infinity } },
    excited: { rotate: [35, -5, 35], transition: { duration: 0.55, repeat: Infinity } },
    celebrating: { rotate: [50, 15, 50], transition: { duration: 0.45, repeat: Infinity } },
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
          animate={{ rotate: emotion === 'crying' ? [-6, 6, -6] : [0, -4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          style={{ transformOrigin: '38px 42px' }}
        >
          <circle cx="38" cy="42" r="18" fill="#FFFFFF" stroke="#2D1800" strokeWidth="4.5" />
          <circle cx="38" cy="42" r="10" fill="#FFC0CB" />
        </motion.g>

        {/* Right Ear */}
        <motion.g
          animate={{ rotate: emotion === 'crying' ? [6, -6, 6] : [0, 4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          style={{ transformOrigin: '122px 42px' }}
        >
          <circle cx="122" cy="42" r="18" fill="#FFFFFF" stroke="#2D1800" strokeWidth="4.5" />
          <circle cx="122" cy="42" r="10" fill="#FFC0CB" />
        </motion.g>

        {/* Body */}
        <ellipse cx="80" cy="115" rx="36" ry="32" fill="#FFFFFF" stroke="#2D1800" strokeWidth="4.5" />

        {/* Head */}
        <ellipse cx="80" cy="68" rx="48" ry="42" fill="#FFFFFF" stroke="#2D1800" strokeWidth="4.5" />

        {/* Snout / Muzzle */}
        <ellipse cx="80" cy="76" rx="18" ry="14" fill="#FFF5F7" stroke="#2D1800" strokeWidth="2.5" />
        {/* Nose */}
        <ellipse cx="80" cy="70" rx="5.5" ry="4" fill="#2D1800" />
        {/* Mouth */}
        {emotion === 'crying' ? (
          <path d="M72 82 Q80 76 88 82" fill="none" stroke="#2D1800" strokeWidth="3" strokeLinecap="round" />
        ) : emotion === 'begging' ? (
          <path d="M74 81 Q80 76 86 81" fill="none" stroke="#2D1800" strokeWidth="3" strokeLinecap="round" />
        ) : (
          <path d="M74 77 Q80 84 86 77" fill="#E85D75" stroke="#2D1800" strokeWidth="2.5" strokeLinecap="round" />
        )}

        {/* Soft Pink Blush Cheeks */}
        <ellipse cx="46" cy="74" rx="9" ry="6" fill="#FF7597" opacity="0.8" />
        <ellipse cx="114" cy="74" rx="9" ry="6" fill="#FF7597" opacity="0.8" />

        {/* Eyes */}
        {emotion === 'crying' ? (
          <>
            {/* Crying eyes */}
            <circle cx="56" cy="62" r="6" fill="#2D1800" />
            <circle cx="104" cy="62" r="6" fill="#2D1800" />
            {/* Animated Waterfall Tears */}
            <motion.path
              d="M56 68 Q50 82 54 94 Q58 82 56 68 Z"
              fill="#3B82F6"
              animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
              transition={{ duration: 0.45, repeat: Infinity }}
            />
            <motion.path
              d="M104 68 Q98 82 102 94 Q106 82 104 68 Z"
              fill="#3B82F6"
              animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
              transition={{ duration: 0.45, repeat: Infinity }}
            />
          </>
        ) : emotion === 'begging' ? (
          <>
            {/* Shiny glossy Pleading Eyes */}
            <circle cx="56" cy="62" r="7.5" fill="#2D1800" />
            <circle cx="104" cy="62" r="7.5" fill="#2D1800" />
            <circle cx="58" cy="59.5" r="3.2" fill="#FFFFFF" />
            <circle cx="106" cy="59.5" r="3.2" fill="#FFFFFF" />
            <circle cx="53.5" cy="64" r="1.6" fill="#FFFFFF" />
            <circle cx="101.5" cy="64" r="1.6" fill="#FFFFFF" />
          </>
        ) : emotion === 'excited' || emotion === 'celebrating' ? (
          <>
            {/* Big Shiny Happy Eyes */}
            <circle cx="56" cy="62" r="7" fill="#2D1800" />
            <circle cx="104" cy="62" r="7" fill="#2D1800" />
            <circle cx="58" cy="60" r="3" fill="#FFFFFF" />
            <circle cx="106" cy="60" r="3" fill="#FFFFFF" />
          </>
        ) : (
          <>
            {/* Standard Cute Eyes */}
            <circle cx="56" cy="62" r="6.5" fill="#2D1800" />
            <circle cx="104" cy="62" r="6.5" fill="#2D1800" />
            <circle cx="58" cy="60" r="2.8" fill="#FFFFFF" />
            <circle cx="106" cy="60" r="2.8" fill="#FFFFFF" />
          </>
        )}

        {/* Arms */}
        {/* Left Arm */}
        <motion.g
          animate={armLeftVariants[emotion]}
          style={{ transformOrigin: '48px 105px' }}
        >
          <ellipse cx="40" cy="112" rx="9" ry="16" fill="#FFFFFF" stroke="#2D1800" strokeWidth="4" />
        </motion.g>

        {/* Right Arm */}
        <motion.g
          animate={armRightVariants[emotion]}
          style={{ transformOrigin: '112px 105px' }}
        >
          <ellipse cx="120" cy="112" rx="9" ry="16" fill="#FFFFFF" stroke="#2D1800" strokeWidth="4" />
        </motion.g>

        {/* Party Hat for Celebrating */}
        {(emotion === 'celebrating' || emotion === 'excited') && (
          <g transform="translate(68, 8)">
            <polygon points="12,0 0,30 24,30" fill="#A855F7" stroke="#2D1800" strokeWidth="3" />
            <circle cx="12" cy="0" r="4" fill="#3B82F6" />
          </g>
        )}
      </svg>
    </motion.div>
  );
};
