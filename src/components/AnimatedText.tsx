import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  variant?: 'fade' | 'scale' | 'stagger' | 'blur' | 'glow';
  as?: 'h1' | 'h2' | 'p' | 'div' | 'span';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0,
  variant = 'fade',
  as = 'div',
}) => {
  const Component = as as any;

  if (variant === 'stagger') {
    const words = text.split(' ');

    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: (i: number = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: delay * i },
      }),
    };

    const childVariants: Variants = {
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          type: 'spring',
          damping: 12,
          stiffness: 100,
        },
      },
      hidden: {
        opacity: 0,
        y: 20,
        filter: 'blur(8px)',
      },
    };

    return (
      <Component className={className}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex flex-wrap justify-center gap-x-2 gap-y-1"
        >
          {words.map((word, index) => (
            <motion.span variants={childVariants} key={index} className="inline-block">
              {word}
            </motion.span>
          ))}
        </motion.div>
      </Component>
    );
  }

  if (variant === 'blur') {
    return (
      <Component className={className}>
        <motion.div
          initial={{ opacity: 0, filter: 'blur(16px)', scale: 0.95 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        >
          {text}
        </motion.div>
      </Component>
    );
  }

  if (variant === 'scale') {
    return (
      <Component className={className}>
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay, ease: 'easeOut' }}
        >
          {text}
        </motion.div>
      </Component>
    );
  }

  if (variant === 'glow') {
    return (
      <Component className={className}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay }}
          className="relative inline-block"
        >
          <span className="relative z-10 bg-gradient-to-r from-pink-300 via-purple-200 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]">
            {text}
          </span>
        </motion.div>
      </Component>
    );
  }

  // Default fade & slide up
  return (
    <Component className={className}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      >
        {text}
      </motion.div>
    </Component>
  );
};
