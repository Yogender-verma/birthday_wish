import React, { useEffect, useRef } from 'react';

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  trail: { x: number; y: number; alpha: number }[];
  exploded: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  decay: number;
  size: number;
}

export const FireworkRockets: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = ['#EC4899', '#A855F7', '#F59E0B', '#3B82F6', '#10B981', '#F472B6', '#FBBF24', '#FFFFFF'];
    const rockets: Rocket[] = [];
    const particles: Particle[] = [];

    const createRocket = () => {
      const startX = Math.random() * (width - 100) + 50;
      const targetY = Math.random() * (height * 0.4) + height * 0.15;
      const color = colors[Math.floor(Math.random() * colors.length)];

      rockets.push({
        x: startX,
        y: height,
        targetY,
        vx: (Math.random() - 0.5) * 2,
        vy: -(Math.random() * 4 + 9),
        color,
        trail: [],
        exploded: false,
      });
    };

    const explode = (x: number, y: number, color: string) => {
      const particleCount = 45;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.3;
        const speed = Math.random() * 5 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: Math.random() > 0.3 ? color : colors[Math.floor(Math.random() * colors.length)],
          decay: Math.random() * 0.02 + 0.015,
          size: Math.random() * 2.5 + 1.5,
        });
      }
    };

    // Initial rocket launches
    createRocket();
    const interval = setInterval(createRocket, 1800);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        if (!r.exploded) {
          r.x += r.vx;
          r.y += r.vy;

          r.trail.push({ x: r.x, y: r.y, alpha: 1 });
          if (r.trail.length > 12) r.trail.shift();

          // Draw trail
          r.trail.forEach((t, idx) => {
            ctx.beginPath();
            ctx.arc(t.x, t.y, (idx / r.trail.length) * 2.5 + 1, 0, Math.PI * 2);
            ctx.fillStyle = r.color;
            ctx.globalAlpha = (idx / r.trail.length) * 0.8;
            ctx.fill();
          });

          // Draw rocket tip glow
          ctx.beginPath();
          ctx.arc(r.x, r.y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowBlur = 15;
          ctx.shadowColor = r.color;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;

          if (r.y <= r.targetY) {
            r.exploded = true;
            explode(r.x, r.y, r.color);
            rockets.splice(i, 1);
          }
        }
      }

      // Render firework explosion particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity effect
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.shadowBlur = p.size * 4;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-15"
    />
  );
};
