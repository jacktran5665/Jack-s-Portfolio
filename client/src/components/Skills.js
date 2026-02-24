import React from 'react';

const Skills = () => {
  const skills = [
    { name: "Python", color: "#306998" },
    { name: "JavaScript", color: "#f7df1e" },
    { name: "React", color: "#61dafb" },
    { name: "Node.js", color: "#339933" },
    { name: "HTML", color: "#e44d26" },
    { name: "CSS", color: "#264de4" },
    { name: "Java", color: "#5382a1" },
    { name: "Assembly", color: "#6e5494" },
    { name: "NLP", color: "#ff6b6b" },
    { name: "LLM", color: "#4ecdc4" },
    { name: "APIs", color: "#95a5a6" }
  ];

  return (
    <div className="section section-skills pixel-border" id="skills">
      <h2>Skills</h2>
      <div className="skills-badges">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="pixel-badge"
            style={{ background: skill.color }}
          >
            {skill.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
