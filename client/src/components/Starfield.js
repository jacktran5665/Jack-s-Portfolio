import React, { useEffect, useRef } from 'react';

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star properties
    const STAR_COUNT = 120;
    const stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.6,
        twinkle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.2 + 0.05
      });
    }

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const star of stars) {
        const tw = 0.5 + 0.5 * Math.sin(Date.now() * 0.002 * star.speed + star.twinkle);
        ctx.save();
        ctx.globalAlpha = 0.7 * tw;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r * (1.1 + 0.3 * tw), 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 8 * tw;
        ctx.fill();
        ctx.restore();
      }
    };

    const animateStars = () => {
      drawStars();
      animationId = requestAnimationFrame(animateStars);
    };

    animateStars();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="starfield"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default Starfield;
