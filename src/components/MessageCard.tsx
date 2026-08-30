import React from 'react';
import { motion } from 'framer-motion';
import { birthdayMessage, senderName } from '../config';
import { Heart, Sparkles } from 'lucide-react';

interface MessageCardProps {
  delay?: number;
}

export const MessageCard: React.FC<MessageCardProps> = ({ delay = 0.5 }) => {
  const lines = birthdayMessage.split('\n').filter((line) => line.trim() !== '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-xl mx-auto px-4 sm:px-6"
    >
      <div className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden text-center shadow-2xl border border-purple-400/30">
        {/* Subtle decorative glow orb inside card */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Card Icon */}
        <div className="flex justify-center items-center gap-2 mb-4 text-purple-300/80">
          <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
          <span className="text-xs uppercase tracking-widest font-semibold text-purple-200/70">
            A Special Note
          </span>
          <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
        </div>

        {/* Line-by-line animated birthday text */}
        <div className="space-y-4 text-gray-100 text-base sm:text-lg md:text-xl font-normal leading-relaxed">
          {lines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: delay + 0.3 + index * 0.25,
                ease: 'easeOut',
              }}
              className={
                line.includes('Happy Birthday')
                  ? 'font-bold text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-amber-200 text-glow-pink mt-2'
                  : ''
              }
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Bottom Sender Signature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: delay + 0.3 + lines.length * 0.25 + 0.2,
          }}
          className="mt-8 pt-4 border-t border-purple-400/20 flex items-center justify-center gap-2"
        >
          <span className="font-handwriting text-2xl sm:text-3xl text-pink-300 tracking-wide">
            — {senderName}
          </span>
          <Heart className="w-5 h-5 text-pink-500 fill-pink-500 inline-block animate-bounce" />
        </motion.div>
      </div>
    </motion.div>
  );
};
