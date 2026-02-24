import React from 'react';

const Projects = () => {
  const projects = [
    {
      name: "PixelBob - Empathetic chatbot",
      url: "https://pixelbobai.up.railway.app/",
      color: "#fffa00",
      description: "Built a pixel inspired style chatbot that detects user emotions using NLP to replies empathetically. Developed skills in natural language processing, sentiment analysis, empathetic design, and human-centered AI.",
      align: "right"
    },
    {
      name: "Perlith - Contour planet randomizer",
      url: "https://perlith.up.railway.app/",
      color: "#00ffe7",
      description: "Built Perlith, a web app that procedurally generates alien topographic maps using mathematical functions, contour mapping, and randomization.",
      align: "left"
    },
    {
      name: "SpeechReg - Realtime Speech-to-Text subtitle",
      url: "#",
      color: "#ff00a2",
      description: "Built SpeechReg, a real-time speech-to-text overlay that displays transcribed speech in a transparent window on top of other applications.",
      align: "right"
    }
  ];

  return (
    <div className="section section-projects pixel-border" id="projects">
      <h2>Current Projects</h2>
      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: project.align === 'right' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '90%', textAlign: project.align }}>
              <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color: project.color }}>
                {project.name}
              </a>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
