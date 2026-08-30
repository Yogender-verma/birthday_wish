import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlowingButton } from '../GlowingButton';
import { CartoonDuo } from '../cartoons/CartoonDuo';
import { Sparkles } from 'lucide-react';

interface Scene10Props {
  onContinue: () => void;
}

export const Scene10: React.FC<Scene10Props> = ({ onContinue }) => {
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    // 1. "Wait..." (0.6s)
    const t1 = setTimeout(() => setStage(1), 600);

    // 2. "You thought that was it? 👀" (1.8s)
    const t2 = setTimeout(() => setStage(2), 1800);

    // 3. "Nahhh 😭" + sticker & button (3.2s)
    const t3 = setTimeout(() => setStage(3), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center text-center px-4 py-8 min-h-screen max-w-xl mx-auto relative z-10 space-y-6"
    >
      {/* STAGE 1: "Wait..." */}
      {stage >= 1 && (
        <motion.h1
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="text-4xl sm:text-6xl font-black text-amber-300 tracking-tight text-glow-amber"
        >
          Wait...
        </motion.h1>
      )}

      {/* STAGE 2: "You thought that was it? 👀" */}
      {stage >= 2 && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-2xl sm:text-4xl font-bold text-pink-200"
        >
          You thought that was it? 👀
        </motion.p>
      )}

      {/* STAGE 3: "Nahhh 😭" & Cartoon Sticker */}
      {stage >= 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
          className="flex flex-col items-center space-y-6"
        >
          <h2 className="text-4xl sm:text-6xl font-black text-purple-300 tracking-tight text-glow-purple">
            Nahhh 😭
          </h2>

          <motion.div
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="my-2"
          >
            <CartoonDuo scene={6} />
          </motion.div>

          <div className="flex items-center gap-2 text-pink-300 text-sm font-semibold">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>There is one last special surprise waiting...</span>
            <Sparkles className="w-4 h-4 animate-spin" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="pt-4"
          >
            <GlowingButton onClick={onContinue} variant="magical" size="lg">
              ONE MORE THING →
            </GlowingButton>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
