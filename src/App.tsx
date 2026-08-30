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
import { Scene8 } from './components/scenes/Scene8';
import { Scene9 } from './components/scenes/Scene9';
import { Scene10 } from './components/scenes/Scene10';
import { Scene11 } from './components/scenes/Scene11';
import { Scene12 } from './components/scenes/Scene12';
import { Scene13 } from './components/scenes/Scene13';

export function App() {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [isWarping, setIsWarping] = useState<boolean>(false);

  const goToScene = (sceneNum: number) => {
    setCurrentScene(sceneNum);
  };

  const handleWarpStateChange = (warping: boolean) => {
    setIsWarping(warping);
  };

  const handleReplay = () => {
    setIsWarping(false);
    goToScene(1);
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
        glowIntensity={currentScene === 4 ? 2.5 : currentScene === 7 || currentScene === 13 ? 2 : 1}
        isWarping={isWarping}
        isFinalScene={currentScene === 13}
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
              onContinue={() => goToScene(8)}
              onReplay={handleReplay}
            />
          )}

          {currentScene === 8 && (
            <Scene8
              key="scene8"
              onContinue={() => goToScene(9)}
            />
          )}

          {currentScene === 9 && (
            <Scene9
              key="scene9"
              onContinue={() => goToScene(10)}
            />
          )}

          {currentScene === 10 && (
            <Scene10
              key="scene10"
              onContinue={() => goToScene(11)}
            />
          )}

          {currentScene === 11 && (
            <Scene11
              key="scene11"
              onContinue={() => goToScene(12)}
            />
          )}

          {currentScene === 12 && (
            <Scene12
              key="scene12"
              onContinue={() => goToScene(13)}
            />
          )}

          {currentScene === 13 && (
            <Scene13
              key="scene13"
              onReplay={handleReplay}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
