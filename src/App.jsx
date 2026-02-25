import { useEffect, useMemo, useRef, useState } from 'react';

const typewriterText = "Hello there! I’m a Georgia Tech CS student passionate about building intelligent, human-centered AI that genuinely improves lives. I work with Python, Java, and ML to create technology that’s both smart and practical. When I’m not coding, I’m usually gaming, hanging out with friends, or exploring new tech trends. Feel free to check out my projects and get in touch!";
const sparkleColors = ['#fff', '#fffa00', '#00ffe7', '#ff00a2'];

function aiResponse(rawInput) {
  const input = rawInput.trim().toLowerCase();
  if (!input) return 'Type something!';
  if (input.includes('hello') || input.includes('hi')) return "Helloooo there! My owner is a bit busy right now, but I'm here to help! How may I assist you? :>";
  if (input.includes('name')) return "I'm Bob your pixel AI terminal created to assist you! ^^";
  if (input.includes('skills')) return 'Jack is skilled in Python, HTML, CSS, Assembly, Java, and more!';
  if (input.includes('project')) return 'Check out his project section above!';
  if (input.includes('contact')) return 'His contact info is in the Contact section. Check out below~';
  if (input.includes('joke')) return "Error, I wasn't programmed with a sense of humor";
  if (input.includes('help')) return "Try typing hello/name/skills/project/contact/help/joke(don't)";
  if (input.includes('ai')) return "hey I have a name! I'm Bob!";
  return "Sorry, I don't understand. Try 'help' for ideas.";
}

export default function App() {
  const canvasRef = useRef(null);
  const sparkleId = useRef(0);

  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalMessages, setTerminalMessages] = useState([
    { isUser: false, text: "Hello friend! I'm Bob the Pixel AI! How can I assist ya? :>" }
  ]);
  const [typedText, setTypedText] = useState('');
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      index += 1;
      setTypedText(typewriterText.slice(0, index));
      if (index >= typewriterText.length) {
        clearInterval(timer);
      }
    }, 28);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = sparkleId.current + 1;
      sparkleId.current = id;

      const sparkle = {
        id,
        left: Math.floor(Math.random() * 99),
        top: Math.floor(Math.random() * 99),
        color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
        duration: 0.8 + Math.random() * 1.2
      };

      setSparkles((prev) => [...prev, sparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((item) => item.id !== id));
      }, 1400);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener('resize', resize);

    const starCount = 120;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.6,
      twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.2 + 0.05
    }));

    let animationFrame;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        const tw = 0.5 + 0.5 * Math.sin(Date.now() * 0.002 * star.speed + star.twinkle);
        ctx.save();
        ctx.globalAlpha = 0.7 * tw;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r * (1.1 + 0.3 * tw), 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 8 * tw;
        ctx.fill();
        ctx.restore();
      }
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    fetch('/.netlify/functions/status')
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === 'ok') {
          setTerminalMessages((prev) => [
            ...prev,
            { isUser: false, text: 'Node.js function online ✅' }
          ]);
        }
      })
      .catch(() => {
        setTerminalMessages((prev) => [
          ...prev,
          { isUser: false, text: 'Node.js function unavailable in local preview (normal).' }
        ]);
      });
  }, []);

  const sparkleElements = useMemo(
    () =>
      sparkles.map((sparkle) => (
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
      )),
    [sparkles]
  );

  const handleTerminalSubmit = (event) => {
    event.preventDefault();
    const userInput = terminalInput;
    if (!userInput.trim()) return;

    setTerminalMessages((prev) => [...prev, { isUser: true, text: userInput }]);
    setTerminalInput('');

    setTimeout(() => {
      setTerminalMessages((prev) => [...prev, { isUser: false, text: aiResponse(userInput) }]);
    }, 400);
  };

  const closeTerminal = () => {
    setIsMinimizing(true);
    setTimeout(() => {
      setIsTerminalOpen(false);
      setIsMinimizing(false);
    }, 480);
  };

  return (
    <>
      {!isTerminalOpen && (
        <button id="open-terminal-btn" onClick={() => setIsTerminalOpen(true)}>
          Open Bob?
        </button>
      )}

      {isTerminalOpen && (
        <div id="mini-terminal" className={isMinimizing ? 'minimized' : ''}>
          <div className="mini-terminal-header">
            <span>Mini Bob :&gt;</span>
            <button id="close-terminal" type="button" onClick={closeTerminal}>
              ×
            </button>
          </div>

          <div id="terminal-output">
            {terminalMessages.map((message, index) => (
              <div key={`${message.text}-${index}`} className="terminal-line">
                <span className={message.isUser ? 'terminal-user' : 'terminal-ai'}>
                  {message.isUser ? 'You:' : 'AI:'}
                </span>{' '}
                {message.text}
              </div>
            ))}
          </div>

          <form id="terminal-form" onSubmit={handleTerminalSubmit}>
            <span className="terminal-input-prefix">&gt;</span>
            <input
              id="terminal-input"
              type="text"
              autoComplete="off"
              placeholder="Ask me anything..."
              value={terminalInput}
              onChange={(event) => setTerminalInput(event.target.value)}
            />
          </form>
        </div>
      )}

      <canvas id="starfield" ref={canvasRef} />

      <div className="container">
        <div id="sparkle-container">{sparkleElements}</div>

        <h1>Jack&apos;s Portfolio</h1>

        <div className="resume-wrap">
          <a id="resume-btn" href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="pixel-badge">
            View Resume
          </a>
        </div>

        <div className="section section-about pixel-border" id="about">
          <h2>About me</h2>
          <p id="typewriter-text">{typedText}</p>
        </div>

        <div className="section section-projects pixel-border" id="projects">
          <h2>Current Projects</h2>
          <div className="projects-list">
            <div className="project-right">
              <div className="project-content right">
                <a href="https://pixelbobai.netlify.app/" target="_blank" rel="noopener noreferrer" className="project-yellow">
                  PixelBob - Empathetic chatbot
                </a>
                <p>
                  Built a pixel inspired style chatbot that detects user emotions using NLP to replies empathetically.
                  Developed skills in natural language processing, sentiment analysis, empathetic design, and human-centered AI.
                </p>
              </div>
            </div>
            <div className="project-left">
              <div className="project-content left">
                <a href="#" className="project-cyan">
                  Perlith - Contour Planet Generator
                </a>
                <p>
                  Created a procedural planet generator that uses contour generation algorithms to create unique, cartoon-style planets. 
                  I learned about procedural generation, noise functions, and creative coding techniques.
                  </p>
              </div>
            </div>
            <div className="project-right">
              <div className="project-content right">
                <a href="#" className="project-pink">
                  Personalized learning assistant
                </a>
                <p>
                  Makes a helper that suggests learning content based on how someone learns best. I’ll track user preferences and use
                  recommendation algorithms.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section section-skills pixel-border" id="skills">
          <h2>Skills</h2>
          <div className="skills-badges">
            <div className="pixel-badge skill-python">Python</div>
            <div className="pixel-badge skill-html">HTML</div>
            <div className="pixel-badge skill-css">CSS</div>
            <div className="pixel-badge skill-assembly">Assembly</div>
            <div className="pixel-badge skill-java">Java</div>
            <div className="pixel-badge skill-js">JavaScript</div>
            <div className="pixel-badge skill-react">React.js</div>
            <div className="pixel-badge skill-node">Node.js</div>
            <div className="pixel-badge skill-llm">LLM</div>
            <div className="pixel-badge skill-apis">APIs</div>
            <div className="pixel-badge skill-nlp">NLP</div>
          </div>
        </div>

        <div className="section section-contact pixel-border" id="contact">
          <h2>Contact me</h2>
          <div className="contact-grid">
            <ul>
              <li>
                <a href="https://www.linkedin.com/in/jacktran04" target="_blank" rel="noopener noreferrer" className="project-cyan">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/jacktran5665" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="https://www.instagram.com/lxz_rus1412" target="_blank" rel="noopener noreferrer" className="project-pink">
                  Instagram
                </a>
              </li>
              <li>
                <a href="mailto:ntran.dec14@gmail.com" className="project-yellow">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
