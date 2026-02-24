import React, { useEffect, useState } from 'react';
import './Sparkles.css';

const sparkleColors = ['#fff', '#fffa00', '#00ffe7', '#ff00a2'];

const Sparkles = () => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSparkle = {
        id: Date.now() + Math.random(),
        left: Math.random() * 98,
        top: Math.random() * 98,
        color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
        duration: 0.8 + Math.random() * 1.2
      };

      setSparkles(prev => [...prev, newSparkle]);

      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
      }, 1400);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="sparkle-container">
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="pixel-sparkle"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            background: sparkle.color,
            animationDuration: `${sparkle.duration}s`
          }}
        />
      ))}
    </div>
  );
};

export default Sparkles;
