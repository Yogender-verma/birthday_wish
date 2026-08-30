import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { toggleSound, getSoundEnabled, playClickSound } from '../utils/sound';

export const SoundToggle: React.FC = () => {
  const [enabled, setEnabled] = useState(getSoundEnabled());

  const handleToggle = () => {
    const newState = toggleSound();
    setEnabled(newState);
    if (newState) {
      playClickSound();
    }
  };

  return (
    <button
      onClick={handleToggle}
      title={enabled ? 'Mute Sound' : 'Enable Sound'}
      className="fixed top-4 right-4 z-50 p-3 rounded-full glass-card hover:bg-white/10 text-purple-200 hover:text-white transition-all duration-300 border border-purple-400/30 cursor-pointer shadow-lg active:scale-95"
    >
      {enabled ? (
        <Volume2 className="w-5 h-5 text-pink-400 animate-pulse" />
      ) : (
        <VolumeX className="w-5 h-5 text-gray-400" />
      )}
    </button>
  );
};
