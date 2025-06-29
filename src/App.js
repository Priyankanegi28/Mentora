import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import ChatInterface from './Components/ChatInterface';
import MoodTracker from './Components/MoodTracker';
import SelfCareResources from './Components/SelfCareResources';
import Storyteller from './Components/Storyteller';
import QuestionAns from './Components/QuestionAns'; // Import the QuestionAns component
import Sleeptool from './Components/Sleeptool';
import Creative from './Components/Creative';

// Import icons from react-icons/fa for web
import { FaCommentAlt, FaHeartbeat, FaLeaf, FaRainbow } from 'react-icons/fa';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setIsGuestMode(false);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGuestMode = () => {
    setIsGuestMode(true);
    setIsAuthenticated(false);
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setIsAuthenticated(false);
      setIsGuestMode(false);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Routes for HomePage and LoginPage */}
        <Route path="/" element={<HomePage onGuestMode={handleGuestMode} />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ChatInterface includes the bottom navigation */}
        <Route path="/chat/*" element={
          <ChatInterfaceWithTabs 
            isAuthenticated={isAuthenticated}
            isGuestMode={isGuestMode}
            user={user}
            onSignOut={handleSignOut}
          />
        } />

        {/* Route for QuestionAns component */}
        <Route path="/question-ans" element={<QuestionAns />} />

        <Route path="/sleeptool" element={<Sleeptool />} />

        <Route path="/creative" element={<Creative />} />
        
      </Routes>
    </Router>
  );
}

// Bottom navigation tabs for Chatbot, Mood Tracker, Self-Care, and Settings
const ChatInterfaceWithTabs = ({ isAuthenticated, isGuestMode, user, onSignOut }) => (
  <div className="app-container">
    {/* Main content for the selected tab */}
    <div className="main-content">
      <Routes>
        <Route path="chatbot" element={
          <ChatInterface 
            isAuthenticated={isAuthenticated}
            isGuestMode={isGuestMode}
            user={user}
            onSignOut={onSignOut}
          />
        } />
        <Route path="mood-tracker" element={<MoodTracker />} />
        <Route path="self-care" element={<SelfCareResources />} />
        <Route path="story" element={<Storyteller />} />
        {/* Default route if none of the paths match */}
        <Route path="*" element={
          <ChatInterface 
            isAuthenticated={isAuthenticated}
            isGuestMode={isGuestMode}
            user={user}
            onSignOut={onSignOut}
          />
        } />
      </Routes>
    </div>

    {/* Bottom navigation */}
    <div className="bottom-nav">
      <Link to="chatbot" className="nav-link">
        <FaCommentAlt />
        <span>Chatbot</span>
      </Link>
      <Link to="mood-tracker" className="nav-link">
        <FaHeartbeat />
        <span>Mood Tracker</span>
      </Link>
      <Link to="self-care" className="nav-link">
        <FaLeaf />
        <span>Self-Care</span>
      </Link>
      <Link to="story" className="nav-link">
        <FaRainbow />
        <span>Storyteller</span>
      </Link>
    </div>

    {/* Responsive styles */}
    <style jsx>{`
      .app-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        position: relative;
        background-color: #141414;
      }

      .main-content {
        flex: 1;
        padding-bottom: 80px; /* Space for bottom navigation */
        overflow-y: auto;
        overflow-x: hidden;
        background-color: #141414;
      }

      .bottom-nav {
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        background-color: #1a1a1a;
        border-top: 1px solid #333;
        padding: 10px 0;
        z-index: 1000;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
        margin: 0;
      }

      .nav-link {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        color: #888;
        text-decoration: none;
        padding: 8px 12px;
        border-radius: 8px;
        transition: all 0.3s ease;
        min-width: 60px;
      }

      .nav-link:hover {
        color: #00AEEF;
        background-color: rgba(0, 174, 239, 0.1);
      }

      .nav-link svg {
        font-size: 1.2rem;
        margin-bottom: 4px;
      }

      .nav-link span {
        display: block;
        font-size: 0.75rem;
        font-weight: 500;
        line-height: 1;
      }

      /* Responsive breakpoints */
      @media (max-width: 768px) {
        .main-content {
          padding-bottom: 70px;
        }

        .bottom-nav {
          padding: 8px 0;
        }

        .nav-link {
          padding: 6px 8px;
          min-width: 50px;
        }

        .nav-link svg {
          font-size: 1rem;
        }

        .nav-link span {
          font-size: 0.7rem;
        }
      }

      @media (max-width: 480px) {
        .main-content {
          padding-bottom: 65px;
        }

        .bottom-nav {
          padding: 6px 0;
        }

        .nav-link {
          padding: 4px 6px;
          min-width: 45px;
        }

        .nav-link svg {
          font-size: 0.9rem;
        }

        .nav-link span {
          font-size: 0.65rem;
        }
      }

      /* Ensure content doesn't overflow */
      @media (max-height: 600px) {
        .main-content {
          padding-bottom: 60px;
        }
      }

      /* Fix for white line at bottom */
      body {
        margin: 0;
        padding: 0;
        background-color: #141414;
        overflow-x: hidden;
      }

      html {
        background-color: #141414;
      }

      #root {
        background-color: #141414;
        min-height: 100vh;
      }
    `}</style>
  </div>
);

export default App;
