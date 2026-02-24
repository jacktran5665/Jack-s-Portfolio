import React from 'react';

const Contact = () => {
  const contacts = [
    [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/jacktran04", color: "#00ffe7" },
      { name: "GitHub", url: "https://github.com/jacktran5665", color: "#fff" }
    ],
    [
      { name: "Instagram", url: "https://www.instagram.com/lxz_rus1412", color: "#ff00a2" },
      { name: "Email", url: "mailto:ntran.dec14@gmail.com", color: "#fffa00" }
    ]
  ];

  return (
    <div className="section section-contact pixel-border" id="contact">
      <h2>Contact me</h2>
      <div className="contact-grid">
        {contacts.map((column, columnIndex) => (
          <ul key={columnIndex}>
            {column.map((contact, index) => (
              <li key={index} style={index === 0 ? { marginBottom: '18px' } : {}}>
                <a href={contact.url} target="_blank" rel="noopener noreferrer" style={{ color: contact.color }}>
                  {contact.name}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Contact;
