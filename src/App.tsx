import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ParticleBackground } from './components/ParticleBackground';
import { SoundToggle } from './components/SoundToggle';
import { Scene1 } from './components/scenes/Scene1';
import { Scene2 } from './components/scenes/Scene2';
import { Scene3 } from './components/scenes/Scene3';
import { Scene4 } from './components/scenes/Scene4';
import { Scene5 } from './components/scenes/Scene5';
import { Scene6 } from './components/scenes/Scene6';
import { Scene7 } from './components/scenes/Scene7';

export function App() {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [isWarping, setIsWarping] = useState<boolean>(false);

  const goToScene = (sceneNum: number) => {
    setCurrentScene(sceneNum);
  };

  const handleWarpStateChange = (warping: boolean) => {
    setIsWarping(warping);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0B0716] text-white selection:bg-purple-500 selection:text-white">
      {/* Sound Toggle (Top-Right) */}
      <SoundToggle />

      {/* Starfield & Particle Background */}
      <ParticleBackground
        speedMultiplier={
          isWarping ? 6 : currentScene === 4 ? 3 : currentScene >= 5 ? 1.5 : 1
        }
        glowIntensity={currentScene === 4 ? 2.5 : currentScene === 7 ? 2 : 1}
        isWarping={isWarping}
        isFinalScene={currentScene === 7}
      />

      {/* Main Full-Screen Scene Container */}
      <main className="relative z-10 min-h-screen w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentScene === 1 && (
            <Scene1
              key="scene1"
              onOpen={() => goToScene(4)}
              onReject={() => goToScene(2)}
            />
          )}

          {currentScene === 2 && (
            <Scene2
              key="scene2"
              onOpen={() => goToScene(4)}
              onReject={() => goToScene(3)}
            />
          )}

          {currentScene === 3 && (
            <Scene3
              key="scene3"
              onOpen={() => goToScene(4)}
            />
          )}

          {currentScene === 4 && (
            <Scene4
              key="scene4"
              onContinue={() => goToScene(5)}
              onWarpStateChange={handleWarpStateChange}
            />
          )}

          {currentScene === 5 && (
            <Scene5
              key="scene5"
              onContinue={() => goToScene(6)}
            />
          )}

          {currentScene === 6 && (
            <Scene6
              key="scene6"
              onContinue={() => goToScene(7)}
            />
          )}

          {currentScene === 7 && (
            <Scene7
              key="scene7"
              onReplay={() => {
                setIsWarping(false);
                goToScene(1);
              }}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
