import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MochaBear } from './MochaBear';
import type { BearEmotion } from './MochaBear';
import { MilkBear } from './MilkBear';
import { playClickSound } from '../../utils/sound';

interface CartoonDuoProps {
  scene: number;
}

export const CartoonDuo: React.FC<CartoonDuoProps> = ({ scene }) => {
  const [tapReaction, setTapReaction] = useState<boolean>(false);

  // Map scene numbers to emotion states & layout
  const getSceneConfig = (sceneNum: number): {
    mochaEmotion: BearEmotion;
    milkEmotion: BearEmotion;
    spacing: string;
    extraProp?: string;
  } => {
    switch (sceneNum) {
      case 1:
        return { mochaEmotion: 'happy', milkEmotion: 'happy', spacing: 'gap-4 sm:gap-8', extraProp: '💌' };
      case 2:
        return { mochaEmotion: 'crying', milkEmotion: 'crying', spacing: 'gap-2 sm:gap-4', extraProp: '💧' };
      case 3:
        return { mochaEmotion: 'begging', milkEmotion: 'begging', spacing: 'gap-3 sm:gap-6', extraProp: '🥺' };
      case 4:
        return { mochaEmotion: 'excited', milkEmotion: 'excited', spacing: 'gap-4 sm:gap-8', extraProp: '✨' };
      case 5:
        return { mochaEmotion: 'celebrating', milkEmotion: 'celebrating', spacing: 'gap-6 sm:gap-10', extraProp: '🎁' };
      case 6:
        return { mochaEmotion: 'happy', milkEmotion: 'excited', spacing: 'gap-5 sm:gap-9', extraProp: '🌟' };
      default:
        return { mochaEmotion: 'happy', milkEmotion: 'happy', spacing: 'gap-6' };
    }
  };

  const config = getSceneConfig(scene);

  const handleTap = () => {
    playClickSound();
    setTapReaction(true);
    setTimeout(() => setTapReaction(false), 800);
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-6 select-none z-20">
      {/* Floating Animated Prop above duo */}
      {config.extraProp && (
        <motion.div
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.2, 1],
            rotate: [-8, 8, -8],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-3xl sm:text-4xl mb-1 filter drop-shadow-[0_0_12px_rgba(236,72,153,0.6)]"
        >
          {config.extraProp}
        </motion.div>
      )}

      {/* Separate Interactive Cartoon Bears Container */}
      <motion.div
        animate={tapReaction ? { scale: [1, 1.15, 1], rotate: [0, -6, 6, 0] } : {}}
        transition={{ duration: 0.6 }}
        onClick={handleTap}
        className={`flex items-center justify-center ${config.spacing} cursor-pointer group`}
        title="Tap us!"
      >
        {/* Brown Bear (Mocha) */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: -4 }}
          whileTap={{ scale: 0.9 }}
          className="relative"
        >
          <MochaBear emotion={config.mochaEmotion} size={130} />
        </motion.div>

        {/* Floating Heart / Sparkle connector between them */}
        <motion.div
          animate={{
            scale: [0.9, 1.3, 0.9],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-xl sm:text-2xl text-pink-400 font-bold"
        >
          {scene === 2 ? '💔' : scene === 5 ? '🎉' : '💖'}
        </motion.div>

        {/* White Bear (Milk) */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 4 }}
          whileTap={{ scale: 0.9 }}
          className="relative"
        >
          <MilkBear emotion={config.milkEmotion} size={130} />
        </motion.div>
      </motion.div>

      {/* Subtle Hint */}
      <span className="text-[10px] sm:text-xs text-purple-300/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
        (Tap characters to react!)
      </span>
    </div>
  );
};
