import React, { useEffect, useState } from 'react';

const Typewriter = ({ text, speed = 28 }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return <p>{displayText}</p>;
};

const About = () => {
  const aboutText = "Hello there! I'm a Georgia Tech CS student passionate about building intelligent, human-centered AI that genuinely improves lives. I work with Python, Java, and ML to create technology that's both smart and practical. When I'm not coding, I'm usually gaming, hanging out with friends, or exploring new tech trends. Feel free to check out my projects and get in touch!";

  return (
    <div className="section section-about pixel-border" id="about">
      <h2>About me</h2>
      <Typewriter text={aboutText} />
    </div>
  );
};

export default About;
