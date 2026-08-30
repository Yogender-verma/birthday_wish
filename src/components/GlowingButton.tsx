import React from 'react';
import { motion } from 'framer-motion';
import { playClickSound } from '../utils/sound';

interface GlowingButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'magical' | 'strong';
  className?: string;
  size?: 'md' | 'lg' | 'xl';
  disabled?: boolean;
}

export const GlowingButton: React.FC<GlowingButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  size = 'lg',
  disabled = false,
}) => {
  const handleClick = () => {
    if (disabled) return;
    playClickSound();
    onClick();
  };

  const sizeClasses = {
    md: 'px-6 py-3 text-base font-semibold min-w-[160px]',
    lg: 'px-8 py-4 text-lg font-bold min-w-[200px]',
    xl: 'px-10 py-5 text-xl font-extrabold min-w-[240px]',
  }[size];

  if (variant === 'magical') {
    return (
      <motion.button
        whileHover={{ scale: 1.08, rotate: [0, -1, 1, 0] }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        disabled={disabled}
        className={`relative group cursor-pointer overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-4 focus:ring-purple-500/50 ${className}`}
      >
        {/* Outer glowing pulsing aura */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 opacity-80 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse-glow" />
        
        {/* Inner button container */}
        <span className="relative flex items-center justify-center gap-3 rounded-full bg-[#130A24] px-10 py-5 text-xl sm:text-2xl font-black text-white border border-purple-300/40 shadow-2xl transition-all duration-300 group-hover:bg-[#1C0E38] group-hover:text-pink-200">
          <span className="relative z-10 tracking-wider bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent drop-shadow-md">
            {children}
          </span>
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-2xl"
          >
            ✨
          </motion.span>
        </span>
      </motion.button>
    );
  }

  if (variant === 'strong') {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(236, 72, 153, 0.5), 0 0 40px rgba(168, 85, 247, 0.4)',
            '0 0 35px rgba(236, 72, 153, 0.8), 0 0 60px rgba(168, 85, 247, 0.7)',
            '0 0 20px rgba(236, 72, 153, 0.5), 0 0 40px rgba(168, 85, 247, 0.4)',
          ],
        }}
        transition={{ boxShadow: { repeat: Infinity, duration: 1.8 } }}
        onClick={handleClick}
        disabled={disabled}
        className={`relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-500 text-white font-bold tracking-wide border border-pink-300/50 shadow-xl transition-all duration-300 cursor-pointer ${sizeClasses} ${className}`}
      >
        <span className="relative z-10 drop-shadow-md">{children}</span>
      </motion.button>
    );
  }

  if (variant === 'secondary') {
    return (
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleClick}
        disabled={disabled}
        className={`relative inline-flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 text-purple-200 hover:text-white font-medium border border-purple-400/20 hover:border-purple-400/40 backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md ${sizeClasses} ${className}`}
      >
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }

  // Standard Primary Glowing Button
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      disabled={disabled}
      className={`relative group overflow-hidden rounded-2xl bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 text-white font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] border border-purple-300/30 transition-all duration-300 cursor-pointer ${sizeClasses} ${className}`}
    >
      {/* Light sheen animation across button */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
