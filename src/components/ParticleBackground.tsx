import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  speedMultiplier?: number;
  glowIntensity?: number;
  isWarping?: boolean;
  isFinalScene?: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  baseSize: number;
  vx: number;
  vy: number;
  alpha: number;
  targetAlpha: number;
  color: string;
  twinkleSpeed: number;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  speedMultiplier = 1,
  glowIntensity = 1,
  isWarping = false,
  isFinalScene = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = ['#A855F7', '#EC4899', '#C084FC', '#F472B6', '#E879F9', '#FFFFFF'];
    const count = Math.min(Math.floor((width * height) / 8000), 150);

    const particles: Particle[] = Array.from({ length: count }, () => {
      const size = Math.random() * 2 + 0.8;
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        baseSize: size,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.7 + 0.3,
        targetAlpha: Math.random() * 0.8 + 0.2,
        color,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render background radial glow
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.max(width, height) * 0.7;

      const bgGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        radius
      );

      if (isWarping) {
        bgGradient.addColorStop(0, 'rgba(236, 72, 153, 0.45)');
        bgGradient.addColorStop(0.4, 'rgba(168, 85, 247, 0.35)');
        bgGradient.addColorStop(1, 'rgba(11, 7, 22, 0.98)');
      } else if (isFinalScene) {
        bgGradient.addColorStop(0, 'rgba(147, 51, 234, 0.28)');
        bgGradient.addColorStop(0.5, 'rgba(88, 28, 135, 0.18)');
        bgGradient.addColorStop(1, 'rgba(11, 7, 22, 1)');
      } else {
        bgGradient.addColorStop(0, `rgba(147, 51, 234, ${0.12 * glowIntensity})`);
        bgGradient.addColorStop(0.6, `rgba(30, 15, 55, ${0.4 * glowIntensity})`);
        bgGradient.addColorStop(1, 'rgba(11, 7, 22, 1)');
      }

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw particles
      particles.forEach((p) => {
        // Twinkle logic
        if (Math.abs(p.alpha - p.targetAlpha) < 0.01) {
          p.targetAlpha = Math.random() * 0.8 + 0.2;
        } else {
          p.alpha += (p.targetAlpha - p.alpha) * p.twinkleSpeed;
        }

        if (isWarping) {
          // Warp effect: streak outwards from center
          const dx = p.x - centerX;
          const dy = p.y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const speed = 12 * speedMultiplier;
          
          p.x += (dx / dist) * speed;
          p.y += (dy / dist) * speed;

          if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
            p.x = centerX + (Math.random() - 0.5) * 40;
            p.y = centerY + (Math.random() - 0.5) * 40;
          }

          // Streak line
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - (dx / dist) * 20, p.y - (dy / dist) * 20);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.lineWidth = p.size;
          ctx.stroke();
          ctx.globalAlpha = 1;

        } else {
          // Standard / Final Floating movement
          const currentSpeed = speedMultiplier;
          p.x += p.vx * currentSpeed;
          p.y += (isFinalScene ? p.vy + 0.15 : p.vy) * currentSpeed;

          // Wrap screen bounds
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (isFinalScene ? 1.2 : 1), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.shadowBlur = p.size * 6;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speedMultiplier, glowIntensity, isWarping, isFinalScene]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
};
