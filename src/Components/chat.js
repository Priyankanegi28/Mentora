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

const mentorFallbacks = {
  'Mood Mentor': [
    "Remember, every emotion is valid. You're doing your best, and that's enough!",
    "Even on tough days, small joys can be found. What's one thing you're grateful for today?",
    "You have the strength to get through this. I believe in you!",
    "Taking care of your mood is self-care. Try a deep breath or a favorite song!",
    "If you want to talk, I'm here to listen. Sometimes sharing helps lighten the load.",
    "Would you like a tip for feeling a little better right now?",
    "It's okay to have ups and downs. What helps you feel a bit better when things are tough?",
    "You matter, and your feelings matter. Is there something kind you can do for yourself today?",
    "Sometimes, a small act of self-care can make a big difference. Want a suggestion?",
    "I'm here for you, no matter what. Would you like to try a calming exercise together?"
  ],
  'Stress Buster': [
    "Stress is a sign you care. Take a moment to pause and breathe—you've got this!",
    "You're stronger than your stress. Try breaking tasks into small steps.",
    "Remember, it's okay to ask for help. You're not alone!",
    "A little self-kindness goes a long way. What's one thing you can do for yourself right now?"
  ],
  'Dream Weaver': [
    "Dreams can reveal so much about us. Keep exploring your inner world!",
    "Rest is important. If you're struggling with sleep, try a calming bedtime routine.",
    "Your dreams are unique to you. Trust your intuition as you reflect on them.",
    "Even a short nap can refresh your mind. Take care of yourself!"
  ],
  'Anxiety Ally': [
    "Anxiety is tough, but so are you. Try grounding yourself in the present moment.",
    "You're not alone in this. Deep breaths can help calm your mind.",
    "Remember, thoughts are not facts. You have the power to choose your response.",
    "Confidence grows with practice. Celebrate your small wins!"
  ],
  'Relationship Rescuer': [
    "Healthy relationships start with self-respect. You deserve kindness and understanding.",
    "Communication is key. Express your feelings honestly and listen with empathy.",
    "Every relationship has ups and downs. Be patient with yourself and others.",
    "You are worthy of love and support. Don't hesitate to reach out to those you trust."
  ]
};

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

  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const fetchChatbotData = async (mentorName, userMessage) => {
    try {
      const response = await fetch("/chatresponse.json");
      const data = await response.json();
      if (!data[mentorName]) return { reply: "Sorry, I couldn't find that mentor." };

      const mentorData = data[mentorName];
      const userMessageLower = userMessage.trim().toLowerCase();

      // Try to match an option at the current level
      const matchedOption = mentorData.options.find(
        (option) => option.toLowerCase() === userMessageLower
      );

      if (matchedOption) {
        const responseMessage = mentorData.responses?.[matchedOption];
        if (responseMessage) {
          // If there are followUp options, show them
          if (responseMessage.followUp) {
            return {
              reply: responseMessage.message,
              options: responseMessage.followUp
            };
          }
          // If there are responseMessages, pick one randomly
          if (responseMessage.responseMessages) {
            const keys = Object.keys(responseMessage.responseMessages);
            if (keys.length > 0) {
              return {
                reply: responseMessage.message + '\n' + getRandom(responseMessage.responseMessages[keys[0]]),
                options: responseMessage.options || []
              };
            }
          }
          // Otherwise, just return the message
          return {
            reply: responseMessage.message,
            options: responseMessage.options || []
          };
        }
      }

      // Try to match a follow-up option in deeper levels
      for (const key in mentorData.responses) {
        const resp = mentorData.responses[key];
        if (resp.responseMessages && resp.responseMessages[userMessage]) {
          const possibleReplies = resp.responseMessages[userMessage];
          return {
            reply: getRandom(Array.isArray(possibleReplies) ? possibleReplies : [possibleReplies]),
            options: resp.options || []
          };
        }
      }

      // Fallback: supportive, mentor-specific message
      return { reply: getRandom(mentorFallbacks[mentorName] || ["I'm here to support you!"]) };
    } catch (error) {
      console.error("Error fetching chatbot data:", error);
      return { reply: "Something went wrong. Please try again." };
    }
  };

  // Update handleOptionClick and handleUserInput to only show options if the reply is an object with options AND the next response is also an object (not just advice)
  const handleOptionClick = async (option) => {
    if (!selectedMentor) return;
    setChatHistory((prev) => [...prev, { sender: "user", text: option }]);
    const response = await fetchChatbotData(selectedMentor, option);
    if (response.reply && typeof response.reply === 'object') {
      // Only show options if the next response is also an object (not just advice)
      const hasOptions = Array.isArray(response.reply.options) && response.reply.options.length > 0;
      // Check if the next response for each option is an object or just advice
      let showOptions = false;
      if (hasOptions && response.reply.responseMessages) {
        // If any responseMessage for an option is an object, show options
        showOptions = response.reply.options.some(opt => {
          const resp = response.reply.responseMessages[opt];
          return typeof resp === 'object' && !Array.isArray(resp);
        });
      }
      setChatHistory((prev) => [...prev, { sender: "bot", text: response.reply }]);
      setMentorOptions(showOptions ? response.reply.options : []);
    } else {
      setChatHistory((prev) => [...prev, { sender: "bot", text: response.reply }]);
      setMentorOptions(response.options || []);
    }
  };

  const handleUserInput = async () => {
    if (!userInput.trim() || !selectedMentor) return;
    setChatHistory((prev) => [...prev, { sender: "user", text: userInput }]);
    const response = await fetchChatbotData(selectedMentor, userInput);
    if (response.reply && typeof response.reply === 'object') {
      const hasOptions = Array.isArray(response.reply.options) && response.reply.options.length > 0;
      let showOptions = false;
      if (hasOptions && response.reply.responseMessages) {
        showOptions = response.reply.options.some(opt => {
          const resp = response.reply.responseMessages[opt];
          return typeof resp === 'object' && !Array.isArray(resp);
        });
      }
      setChatHistory((prev) => [...prev, { sender: "bot", text: response.reply }]);
      setMentorOptions(showOptions ? response.reply.options : []);
    } else {
      setChatHistory((prev) => [...prev, { sender: "bot", text: response.reply }]);
      setMentorOptions(response.options || []);
    }
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
            {typeof msg.text === 'object' && msg.text !== null ? msg.text.message : msg.text}
          </div>
        ))}

        {/* Auto-Suggested Options */}
        {mentorOptions.length > 0 && (
          <div className="options">
            {mentorOptions.map((option, index) => (
              <button key={index} className="option-button" onClick={() => handleOptionClick(option)}>
                {typeof option === 'object' && option !== null ? option.message || JSON.stringify(option) : option}
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
