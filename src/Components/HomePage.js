import React from 'react';
import { useNavigate } from 'react-router-dom'; // Updated from useHistory
import backgroundImage from '../assets/Background.jpg';

const HomePage = ({ onGuestMode }) => {
  const navigate = useNavigate(); // Updated from useHistory

  const handleStartChat = () => {
    if (onGuestMode) {
      onGuestMode(); // Set guest mode
    }
    navigate('/chat'); // Updated from history.push
  };

  const handleLogin = () => {
    navigate('/login'); // Navigate to the login page
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      textAlign: 'center',
      backgroundImage: `url(${backgroundImage})`, // Use backticks for template string
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      color: '#ffffff', // Text color to stand out against the background
      padding: '20px',
      boxSizing: 'border-box',
      position: 'relative',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      zIndex: 1,
    },
    content: {
      position: 'relative',
      zIndex: 2,
      maxWidth: '600px',
      width: '100%',
    },
    title: {
      fontSize: 'clamp(2rem, 5vw, 3rem)', // Responsive font size
      marginBottom: '20px',
      fontWeight: 'bold',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    },
    subtitle: {
      fontSize: 'clamp(1rem, 3vw, 1.5rem)', // Responsive font size
      marginBottom: '40px',
      lineHeight: '1.4',
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
    },
    buttonContainer: {
      display: 'flex',
      gap: '20px',
      flexDirection: 'column', // Stacked buttons
      width: '100%',
      maxWidth: '300px',
      margin: '0 auto',
    },
    button: {
      padding: 'clamp(12px, 3vw, 15px) clamp(20px, 4vw, 30px)',
      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', // Responsive font size
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    },
    startChatBtn: {
      backgroundColor: '#2a9d8f',
    },
    startChatBtnHover: {
      backgroundColor: '#264653',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
    },
    loginBtn: {
      backgroundColor: '#f4a261',
    },
    loginBtnHover: {
      backgroundColor: '#e76f51',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <h1 style={styles.title}>Mentora.Ai</h1>
        <p style={styles.subtitle}>
          Your personal support for mental well-being. Let's talk, or explore self-care resources!
        </p>

        <div style={styles.buttonContainer}>
          <button
            style={{ ...styles.button, ...styles.startChatBtn }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = styles.startChatBtnHover.backgroundColor;
              e.target.style.transform = styles.startChatBtnHover.transform;
              e.target.style.boxShadow = styles.startChatBtnHover.boxShadow;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = styles.startChatBtn.backgroundColor;
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = styles.button.boxShadow;
            }}
            onClick={handleStartChat}
          >
            Start Chat as Guest
          </button>

          <button
            style={{ ...styles.button, ...styles.loginBtn }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = styles.loginBtnHover.backgroundColor;
              e.target.style.transform = styles.loginBtnHover.transform;
              e.target.style.boxShadow = styles.loginBtnHover.boxShadow;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = styles.loginBtn.backgroundColor;
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = styles.button.boxShadow;
            }}
            onClick={handleLogin} // Updated to navigate to login page
          >
            Login
          </button>
        </div>
      </div>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .container {
            padding: 15px;
          }
          
          .buttonContainer {
            gap: 15px;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 10px;
          }
          
          .buttonContainer {
            gap: 12px;
          }
        }

        @media (max-height: 600px) {
          .container {
            min-height: 100vh;
            padding: 10px;
          }
          
          .title {
            margin-bottom: 15px;
          }
          
          .subtitle {
            margin-bottom: 25px;
          }
        }

        @media (orientation: landscape) and (max-height: 500px) {
          .container {
            padding: 10px;
          }
          
          .title {
            margin-bottom: 10px;
          }
          
          .subtitle {
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
