import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from "../Components/chat";

const ChatInterface = ({ isAuthenticated, isGuestMode, user, onSignOut }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleProfileAction = (action) => {
    console.log(action);
    setShowProfileMenu(false);
    
    if (action === 'Logout') {
      onSignOut();
    }
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const styles = {
    chatContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#141414',
      color: '#fff',
      overflow: 'hidden',
      textAlign: 'center',
      boxSizing: 'border-box',
      padding: '0',
      paddingTop: '0', // Remove top padding since header is now relative
      paddingBottom: '100px', // Space for bottom navigation
    },
    headerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1200px',
      padding: '15px 20px',
      position: 'relative', // Changed from fixed to relative
      backgroundColor: 'rgba(20, 20, 20, 0.95)',
      backdropFilter: 'blur(10px)',
      boxSizing: 'border-box',
      zIndex: 100,
      borderBottom: '1px solid #333',
      marginBottom: '20px', // Add margin to separate from content
    },
    headerContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
    },
    heading: {
      fontSize: 'clamp(16px, 4vw, 24px)',
      fontWeight: 'bold',
      marginBottom: '5px',
      opacity: 0,
      animation: 'slideIn 1s ease-in-out forwards',
    },
    subheading: {
      fontSize: 'clamp(24px, 6vw, 40px)',
      fontWeight: 'bold',
      color: '#00AEEF',
      opacity: 0,
      animation: 'slideIn 1.5s ease-in-out forwards',
    },
    profileIcon: {
      cursor: 'pointer',
      position: 'relative',
      fontSize: 'clamp(14px, 3vw, 18px)',
      fontWeight: 'bold',
      backgroundColor: '#00AEEF',
      color: '#fff',
      padding: 'clamp(6px, 2vw, 8px) clamp(8px, 2.5vw, 12px)',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
    },
    signInButton: {
      cursor: 'pointer',
      position: 'relative',
      fontSize: 'clamp(12px, 2.5vw, 14px)',
      fontWeight: 'bold',
      backgroundColor: '#4CAF50',
      color: '#fff',
      padding: 'clamp(8px, 2vw, 10px) clamp(12px, 2.5vw, 16px)',
      borderRadius: '20px',
      border: 'none',
      transition: 'all 0.3s ease',
    },
    profileMenu: {
      position: 'absolute',
      right: 0,
      top: '35px',
      backgroundColor: '#222',
      color: '#fff',
      borderRadius: '8px',
      boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
      zIndex: 10,
      minWidth: '120px',
    },
    profileMenuItem: {
      padding: '12px 15px',
      cursor: 'pointer',
      borderBottom: '1px solid #444',
      transition: 'background-color 0.3s ease',
    },
    chatWrapper: {
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      height: 'calc(100vh - 200px)', // Adjusted for relative header
      display: 'flex',
      flexDirection: 'column',
    },
  };

  return (
    <div style={styles.chatContainer}>
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateY(-20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          /* Responsive breakpoints */
          @media (max-width: 768px) {
            .chatContainer {
              padding-bottom: 90px;
            }

            .headerContainer {
              padding: 10px 15px;
              margin-bottom: 15px;
            }

            .chatWrapper {
              height: calc(100vh - 180px);
            }
          }

          @media (max-width: 480px) {
            .chatContainer {
              padding-bottom: 85px;
            }

            .headerContainer {
              padding: 8px 10px;
              margin-bottom: 10px;
            }

            .chatWrapper {
              height: calc(100vh - 160px);
            }
          }

          @media (max-height: 600px) {
            .chatContainer {
              padding-bottom: 80px;
            }

            .headerContainer {
              margin-bottom: 10px;
            }

            .chatWrapper {
              height: calc(100vh - 150px);
            }
          }

          /* Ensure proper spacing on very small screens */
          @media (max-width: 360px) {
            .chatContainer {
              padding-bottom: 80px;
            }

            .headerContainer {
              margin-bottom: 8px;
            }

            .chatWrapper {
              height: calc(100vh - 140px);
            }
          }

          /* Fix for chat container */
          .chat-container {
            height: 100% !important;
            min-height: 400px;
          }

          /* Ensure mentor images are visible */
          .mentor-selection {
            position: relative;
            z-index: 1;
          }

          .mentor-image {
            display: block !important;
            visibility: visible !important;
          }
        `}
      </style>

      <div style={styles.headerContainer}>
        {/* Show Sign In button for guest mode, Profile button for authenticated users */}
        {isAuthenticated ? (
          <div style={styles.profileIcon} onClick={toggleProfileMenu}>
            {user?.email ? user.email.charAt(0).toUpperCase() : 'P'}
            {showProfileMenu && (
              <div style={styles.profileMenu}>
                <div 
                  style={styles.profileMenuItem} 
                  onClick={() => handleProfileAction('Profile')}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Profile
                </div>
                <div 
                  style={styles.profileMenuItem} 
                  onClick={() => handleProfileAction('Settings')}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Settings
                </div>
                <div 
                  style={styles.profileMenuItem} 
                  onClick={() => handleProfileAction('Logout')}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <button 
            style={styles.signInButton}
            onClick={handleSignIn}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#45a049';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#4CAF50';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Sign In
          </button>
        )}
        
        <div style={styles.headerContent}>
          <div style={styles.heading}>Here is your perfect Chat partner</div>
          <div style={styles.subheading}>Mentora</div>
        </div>
        
        <div style={{ width: '40px' }}></div> {/* Spacer for balance */}
      </div>

      <div style={styles.chatWrapper}>
        <Chat />
      </div>
    </div>
  );
};

export default ChatInterface;
