import React, { useState, useEffect, useRef } from 'react';
import './MiniTerminal.css';

const MiniTerminal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello friend! I'm Bob the Pixel AI! How can I assist ya? :>", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const terminalOutputRef = useRef(null);

  useEffect(() => {
    if (terminalOutputRef.current) {
      terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight;
    }
  }, [messages]);

  const aiResponse = (userInput) => {
    const input = userInput.trim().toLowerCase();
    if (!input) return "Type something!";
    if (input.includes('hello') || input.includes('hi')) 
      return "Helloooo there! My owner is a bit busy right now, but I'm here to help! How may I assist you? :>";
    if (input.includes('name')) 
      return "I'm Bob your pixel AI terminal created to assist you! ^^";
    if (input.includes('skills')) 
      return "Jack is skilled in Python, HTML, CSS, Assembly, Java, and more!";
    if (input.includes('project')) 
      return "Check out his project section above!";
    if (input.includes('contact')) 
      return "His contact info is in the Contact section. Check out below~";
    if (input.includes('joke')) 
      return "Error, I wasn't programmed with a sense of humor";
    if (input.includes('help')) 
      return "Try typing hello/name/skills/project/contact/help/joke(don't)";
    if (input.includes('ai')) 
      return "hey I have a name! I'm Bob!";
    return "Sorry, I don't understand. Try 'help' for ideas.";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    const response = aiResponse(input);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 400);
    setInput('');
  };

  const handleClose = () => {
    setIsMinimizing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsMinimizing(false);
    }, 480);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      {!isOpen && (
        <button id="open-terminal-btn" onClick={handleOpen}>
          Open Bob?
        </button>
      )}
      
      {isOpen && (
        <div id="mini-terminal" className={isMinimizing ? 'minimized' : ''}>
          <div className="terminal-header">
            <span>Mini Bob :&gt;</span>
            <button id="close-terminal" onClick={handleClose}>×</button>
          </div>
          <div id="terminal-output" ref={terminalOutputRef}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ margin: '4px 0', whiteSpace: 'pre-wrap' }}>
                <span style={{ color: msg.isUser ? '#00ffe7' : '#fffa00' }}>
                  {msg.isUser ? 'You:' : 'AI:'}
                </span> {msg.text}
              </div>
            ))}
          </div>
          <form id="terminal-form" onSubmit={handleSubmit}>
            <span className="terminal-prompt">&gt;</span>
            <input
              id="terminal-input"
              type="text"
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
            />
          </form>
        </div>
      )}
    </>
  );
};

export default MiniTerminal;
