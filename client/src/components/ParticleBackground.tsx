import { useEffect, useRef } from 'react';

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Array<{
      x: number;
      y: number;
      size: number;
      alpha: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }> = [];

    let shootingStars: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      alpha: number;
      angle: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    const createStars = () => {
      const count = Math.min((canvas.width * canvas.height) / 3000, 400);
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const createShootingStar = () => {
      if (Math.random() > 0.995 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height / 3),
          length: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 5,
          alpha: 1,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        });
      }
    };

    let time = 0;
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;
      
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinklePhase) * 0.3 + 0.7;
        const currentAlpha = star.alpha * twinkle;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.fill();
        
        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 2);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha * 0.3})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      createShootingStar();
      
      shootingStars = shootingStars.filter((ss) => {
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha -= 0.015;
        
        if (ss.alpha <= 0) return false;
        
        const gradient = ctx.createLinearGradient(
          ss.x, ss.y,
          ss.x - Math.cos(ss.angle) * ss.length,
          ss.y - Math.sin(ss.angle) * ss.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${ss.alpha})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(
          ss.x - Math.cos(ss.angle) * ss.length,
          ss.y - Math.sin(ss.angle) * ss.length
        );
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        return true;
      });

      requestAnimationFrame(animate);
    };

    resize();
    createStars();
    animate();

    window.addEventListener('resize', () => {
      resize();
      createStars();
    });

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
