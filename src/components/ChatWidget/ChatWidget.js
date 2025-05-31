"use client";
import './ChatWidget.css'
import { useState } from 'react';
import { FaRobot } from "react-icons/fa";
import { GrSend } from "react-icons/gr";
import { LuRefreshCw } from "react-icons/lu";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  const predefinedResponses = {
    'hi':'what services do you need help with?' ,
    'what is visa consultation': 'Visa Consultation provides expert guidance on visa applications.',
    'what is documentation support': 'Documentation Support helps you prepare and verify required documents.',
    'what is travel insurance': 'Travel Insurance covers unexpected events during your travel.',
    'what is priority processing': 'Priority Processing speeds up your visa application.',
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages([...messages, { user: userMessage, bot: null }]);
    setInput('');
    setIsBotTyping(true);

    // Simulate bot typing delay (e.g., 1.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 1500));

    const response = predefinedResponses[userMessage.toLowerCase()] || 'Sorry, I can only answer questions about our services.';
    setMessages(prev => {
      const updated = [...prev];
      updated[updated.length - 1].bot = response;
      return updated;
    });
    setIsBotTyping(false);
  };

    const handleBotOpen = () => {
    setIsOpen((prev) => {
      // If opening the chat, send the initial bot message
      if (!prev) {
        setMessages([{ user: '', bot: "Hi, I'm nora" }]);
      }
      return !prev;
    });
    setInput('');
    setIsBotTyping(false);
  };

  return (
    <div className="chat-widget">
      <button onClick={handleBotOpen} className="chat-button">
        <FaRobot fontSize="27px"/>
      </button>
      {isOpen && (
        <div className="chat-box">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index}>
                {msg.user && <p className="user-message"><strong>You:</strong> {msg.user}</p>}
                {msg.bot && <p><strong>Bot:</strong> {msg.bot}</p>}
              </div>
            ))}
            {isBotTyping && (
              <p style={{color:"grey"}} className="typing-indicator"><strong>Bot</strong> is typing...</p>
            )}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about our services..."
            />
            <button onClick={handleSend} className="send-chat-button" style={{marginLeft: "8px"}}>
              <GrSend />
            </button>
            <button onClick={() => setMessages([])} className="clear-chat-button" style={{marginLeft: "8px"}}>
              <LuRefreshCw />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}