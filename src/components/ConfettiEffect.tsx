import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiEffectProps {
  trigger?: boolean;
  continuous?: boolean;
}

export const triggerConfettiBurst = () => {
  // Center burst
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#A855F7', '#EC4899', '#F59E0B', '#3B82F6', '#10B981', '#FFFFFF'],
  });

  // Left & right cannons
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#EC4899', '#C084FC', '#F472B6'],
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#A855F7', '#E879F9', '#FBBF24'],
    });
  }, 250);
};

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({
  trigger = true,
  continuous = false,
}) => {
  useEffect(() => {
    if (!trigger) return;

    triggerConfettiBurst();

    if (continuous) {
      const interval = setInterval(() => {
        confetti({
          particleCount: 15,
          angle: 90 + (Math.random() - 0.5) * 40,
          spread: 45,
          origin: { x: Math.random(), y: -0.1 },
          colors: ['#A855F7', '#EC4899', '#FBBF24', '#C084FC'],
          ticks: 300,
          gravity: 0.6,
          scalar: 0.9,
        });
      }, 2500);

      return () => clearInterval(interval);
    }
  }, [trigger, continuous]);

  return null;
};
