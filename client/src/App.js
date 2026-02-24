import React from 'react';
import './App.css';
import Starfield from './components/Starfield';
import MiniTerminal from './components/MiniTerminal';
import Sparkles from './components/Sparkles';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <Starfield />
      <MiniTerminal />
      <div className="container">
        <Sparkles />
        <h1>Jack's Portfolio</h1>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <a
            id="resume-btn"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-badge resume-btn"
          >
            View Resume
          </a>
        </div>
        <About />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </div>
  );
}

export default App;
