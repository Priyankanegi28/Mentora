import React, { useState, useEffect } from "react";
import moodAvtar from '../assets/moodAvtar.png';
import dreamAvtar from '../assets/dreamAvtar.png';
import relationshipAvtar from '../assets/relationshipAvtar.png';
import stressAvtar from '../assets/stressAvtar.png';
import anxityAvtar from '../assets/anxityAvtar.png';

const mentors = [
  { name: "Mood Mentor", image: moodAvtar },
  { name: "Stress Buster", image: stressAvtar },
  { name: "Dream Weaver", image: dreamAvtar },
  { name: "Anxiety Ally", image: anxityAvtar },
  { name: "Relationship Rescuer", image: relationshipAvtar }
];

const Chat = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [mentorOptions, setMentorOptions] = useState([]);

  useEffect(() => {
    if (selectedMentor) {
      fetchMentorGreeting(selectedMentor);
    }
  }, [selectedMentor]);

  const fetchMentorGreeting = async (mentorName) => {
    try {
      const response = await fetch("/chatresponse.json");
      const data = await response.json();
      if (!data[mentorName]) return;

      const mentorData = data[mentorName];
      setChatHistory([
        { sender: "bot", text: mentorData.greeting },
        { sender: "bot", text: mentorData.question }
      ]);
      setMentorOptions(mentorData.options || []);
    } catch (error) {
      console.error("Error fetching mentor data:", error);
    }
  };

  const fetchChatbotData = async (mentorName, userMessage) => {
    try {
      const response = await fetch("/chatresponse.json");
      const data = await response.json();
      if (!data[mentorName]) return;

      const mentorData = data[mentorName];
      const userMessageLower = userMessage.trim().toLowerCase();

      const matchedOption = mentorData.options.find(
        (option) => option.toLowerCase() === userMessageLower
      );

      if (matchedOption) {
        const responseMessage = mentorData.responses?.[matchedOption];
        return responseMessage
          ? { reply: responseMessage.message, options: responseMessage.followUp || [] }
          : { reply: "I don't have an answer for that. Can you try something else?" };
      }

      return { reply: "I don't have an answer for that. Can you try something else?" };
    } catch (error) {
      console.error("Error fetching chatbot data:", error);
      return { reply: "Something went wrong. Please try again." };
    }
  };

  const handleOptionClick = async (option) => {
    if (!selectedMentor) return;
    setChatHistory((prev) => [...prev, { sender: "user", text: option }]);
    const response = await fetchChatbotData(selectedMentor, option);
    setChatHistory((prev) => [...prev, { sender: "bot", text: response.reply }]);
    setMentorOptions(response.options || []);
  };

  const handleUserInput = async () => {
    if (!userInput.trim() || !selectedMentor) return;
    setChatHistory((prev) => [...prev, { sender: "user", text: userInput }]);
    const response = await fetchChatbotData(selectedMentor, userInput);
    setChatHistory((prev) => [...prev, { sender: "bot", text: response.reply }]);
    setMentorOptions(response.options || []);
    setUserInput("");
  };

  return (
    <div className="chat-container">
      {/* Mentor Selection */}
      <div className="mentor-selection">
        {mentors.map((mentor) => (
          <button
            key={mentor.name}
            className={`mentor-button ${selectedMentor === mentor.name ? "selected" : ""}`}
            onClick={() => setSelectedMentor(mentor.name)}
          >
            <img src={mentor.image} alt={mentor.name} className="mentor-image" />
            <span>{mentor.name}</span>
          </button>
        ))}
      </div>

      {/* Chat Box */}
      <div className="chat-box">
        {chatHistory.map((msg, index) => (
          <div key={index} className={msg.sender === "bot" ? "bot-msg" : "user-msg"}>
            {msg.text}
          </div>
        ))}

        {/* Auto-Suggested Options */}
        {mentorOptions.length > 0 && (
          <div className="options">
            {mentorOptions.map((option, index) => (
              <button key={index} className="option-button" onClick={() => handleOptionClick(option)}>
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* User Input (Fixed at Bottom) */}
      <div className="input-area">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleUserInput()}
        />
        <button onClick={handleUserInput}>Send</button>
      </div>

      {/* Responsive Styling */}
      <style jsx>{`
        .chat-container {
          width: 100%;
          max-width: 800px;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background: #1e1e2e;
          color: white;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          height: 100%;
          min-height: 400px;
        }

        .mentor-selection {
          display: flex;
          justify-content: space-around;
          padding: 12px;
          background: #2a2a3a;
          border-bottom: 1px solid #444;
          flex-wrap: wrap;
          gap: 8px;
          flex-shrink: 0;
          position: relative;
          z-index: 10;
        }

        .mentor-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          transition: 0.3s;
          padding: 8px;
          border-radius: 8px;
          min-width: 80px;
          position: relative;
          z-index: 1;
        }

        .mentor-button:hover {
          transform: scale(1.05);
          background: rgba(255, 255, 255, 0.1);
        }

        .mentor-button.selected {
          background: rgba(0, 174, 239, 0.2);
          border: 1px solid #00AEEF;
        }

        .mentor-image {
          width: clamp(40px, 8vw, 55px);
          height: clamp(40px, 8vw, 55px);
          border-radius: 50%;
          margin-bottom: 5px;
          object-fit: cover;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative;
          z-index: 2;
        }

        .mentor-button span {
          font-size: clamp(10px, 2vw, 12px);
          text-align: center;
          line-height: 1.2;
          display: block;
          visibility: visible !important;
        }

        .chat-box {
          padding: 12px;
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          background: #1e1e2e;
          min-height: 200px;
        }

        .bot-msg {
          color: #b0c7ff;
          background: #2a2a3a;
          padding: 10px;
          border-radius: 8px;
          margin: 5px 0;
          align-self: flex-start;
          max-width: 80%;
          word-wrap: break-word;
        }

        .user-msg {
          color: #e3e3e3;
          background: #4a4f6a;
          padding: 10px;
          border-radius: 8px;
          margin: 5px 0;
          align-self: flex-end;
          max-width: 80%;
          word-wrap: break-word;
        }

        .options {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }

        .option-button {
          padding: 8px 12px;
          background: #3a3f54;
          color: white;
          border: 1px solid #555;
          cursor: pointer;
          border-radius: 6px;
          transition: 0.3s;
          font-size: clamp(12px, 2.5vw, 14px);
          white-space: nowrap;
        }

        .option-button:hover {
          background: #50577a;
          transform: translateY(-1px);
        }

        .input-area {
          display: flex;
          padding: 12px;
          background: #2a2a3a;
          border-top: 1px solid #444;
          gap: 10px;
          flex-shrink: 0;
        }

        .input-area input {
          flex: 1;
          padding: 10px;
          border: none;
          background: #3a3f54;
          color: white;
          border-radius: 6px;
          font-size: clamp(12px, 2.5vw, 14px);
        }

        .input-area input::placeholder {
          color: #888;
        }

        .input-area button {
          padding: 10px 15px;
          background: #6b82f7;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 6px;
          transition: 0.3s;
          font-size: clamp(12px, 2.5vw, 14px);
          white-space: nowrap;
        }

        .input-area button:hover {
          background: #8499ff;
          transform: translateY(-1px);
        }

        /* Responsive breakpoints */
        @media (max-width: 768px) {
          .chat-container {
            border-radius: 8px;
          }

          .mentor-selection {
            padding: 8px;
            gap: 6px;
          }

          .mentor-button {
            padding: 6px;
            min-width: 70px;
          }

          .chat-box {
            padding: 10px;
          }

          .input-area {
            padding: 10px;
            gap: 8px;
          }
        }

        @media (max-width: 480px) {
          .chat-container {
            border-radius: 6px;
          }

          .mentor-selection {
            padding: 6px;
            gap: 4px;
          }

          .mentor-button {
            padding: 4px;
            min-width: 60px;
          }

          .chat-box {
            padding: 8px;
          }

          .bot-msg, .user-msg {
            padding: 8px;
            max-width: 85%;
          }

          .input-area {
            padding: 8px;
            gap: 6px;
          }

          .input-area input {
            padding: 8px;
          }

          .input-area button {
            padding: 8px 12px;
          }
        }

        @media (max-width: 360px) {
          .mentor-selection {
            padding: 4px;
          }

          .mentor-button {
            min-width: 50px;
          }

          .options {
            gap: 6px;
          }

          .option-button {
            padding: 6px 10px;
          }
        }

        /* Handle very small heights */
        @media (max-height: 500px) {
          .mentor-selection {
            padding: 6px;
          }

          .chat-box {
            padding: 8px;
          }
        }

        /* Ensure proper scrolling */
        .chat-box::-webkit-scrollbar {
          width: 6px;
        }

        .chat-box::-webkit-scrollbar-track {
          background: #1e1e2e;
        }

        .chat-box::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 3px;
        }

        .chat-box::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        /* Force mentor images to be visible */
        .mentor-image {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          z-index: 5 !important;
        }

        .mentor-button {
          position: relative !important;
          z-index: 5 !important;
        }

        .mentor-selection {
          position: relative !important;
          z-index: 10 !important;
        }
      `}</style>
    </div>
  );
};

export default Chat;
