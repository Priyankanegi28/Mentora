import React, { useState } from 'react';
import { auth } from '../firebase/firebase'; // Adjust the path as needed
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import backgroundImage from '../assets/loginBackground.jpg'; // Ensure the correct path for your image

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [username, setUsername] = useState(''); // State for username
  const [error, setError] = useState(''); // State for error messages
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const toggleForm = () => {
    setIsLogin(!isLogin); // Switch between login and signup forms
    setError(''); // Clear error message when toggling forms
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Handle login
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/chat'); // Redirect to ChatInterface.js after successful login
      } else {
        // Handle signup
        await createUserWithEmailAndPassword(auth, email, password);
        navigate('/chat'); // Redirect to ChatInterface.js after successful signup
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error.message); // Set error message to state
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100%',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
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
      width: '100%',
      maxWidth: '450px',
    },
    dialogBox: {
      width: '100%',
      padding: 'clamp(20px, 5vw, 30px)',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(15px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    toggleButton: {
      display: 'block',
      margin: '20px auto 0',
      padding: 'clamp(8px, 2vw, 10px) clamp(15px, 3vw, 20px)',
      backgroundColor: 'transparent',
      color: '#264653',
      textDecoration: 'underline',
      border: 'none',
      cursor: 'pointer',
      fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
      transition: 'color 0.3s ease',
    },
    formTitle: {
      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
      color: '#264653',
    },
    input: {
      width: '100%',
      padding: 'clamp(10px, 2.5vw, 12px)',
      margin: '8px 0',
      borderRadius: '8px',
      border: '2px solid #e0e0e0',
      fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      boxSizing: 'border-box',
    },
    submitButton: {
      width: '100%',
      padding: 'clamp(12px, 3vw, 15px)',
      backgroundColor: '#264653',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      marginTop: '20px',
      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
      fontWeight: '600',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      opacity: isLoading ? 0.7 : 1,
      pointerEvents: isLoading ? 'none' : 'auto',
    },
    googleButton: {
      width: '100%',
      padding: 'clamp(12px, 3vw, 15px)',
      backgroundColor: '#DB4437',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      marginTop: '10px',
      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
      fontWeight: '600',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
    },
    orText: {
      textAlign: 'center',
      margin: '15px 0',
      color: '#666',
      fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
      fontWeight: '500',
    },
    errorText: {
      color: '#d32f2f',
      textAlign: 'center',
      margin: '10px 0',
      fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
      backgroundColor: 'rgba(211, 47, 47, 0.1)',
      padding: '8px',
      borderRadius: '5px',
      border: '1px solid rgba(211, 47, 47, 0.2)',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    loadingText: {
      textAlign: 'center',
      color: '#666',
      fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <div style={styles.dialogBox}>
          <h2 style={styles.formTitle}>{isLogin ? 'Login' : 'Sign Up'}</h2>

          {/* Display error message if any */}
          {error && <div style={styles.errorText}>{error}</div>}

          {/* Form */}
          <form style={styles.form} onSubmit={handleSubmit}>
            {/* Form inputs */}
            <input
              type="text"
              placeholder={isLogin ? 'Enter your email' : 'Create a username'}
              style={styles.input}
              value={isLogin ? email : username}
              onChange={(e) => isLogin ? setEmail(e.target.value) : setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
            <input
              type="password"
              placeholder="Enter your password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
            {!isLogin && (
              <input
                type="email"
                placeholder="Enter your email"
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            )}
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm your password"
                style={styles.input}
                required
                disabled={isLoading}
              />
            )}
            <button 
              type="submit"
              style={styles.submitButton}
              onMouseOver={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = '#1a2f38';
                  e.target.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = '#264653';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>

          {/* Loading indicator */}
          {isLoading && <div style={styles.loadingText}>Please wait...</div>}

          {/* OR separator */}
          <div style={styles.orText}>OR</div>

          {/* Google login button */}
          <button 
            style={styles.googleButton}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = '#c62828';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = '#DB4437';
                e.target.style.transform = 'translateY(0)';
              }
            }}
            disabled={isLoading}
          >
            Login with Google
          </button>

          {/* Toggle between login and sign up */}
          <button 
            onClick={toggleForm} 
            style={styles.toggleButton}
            onMouseOver={(e) => e.target.style.color = '#1a2f38'}
            onMouseOut={(e) => e.target.style.color = '#264653'}
            disabled={isLoading}
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
          </button>
        </div>
      </div>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .container {
            padding: 15px;
          }
          
          .dialogBox {
            padding: 20px;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 10px;
          }
          
          .dialogBox {
            padding: 15px;
          }
          
          .formTitle {
            margin-bottom: 15px;
          }
        }

        @media (max-width: 360px) {
          .container {
            padding: 8px;
          }
          
          .dialogBox {
            padding: 12px;
          }
        }

        /* Handle landscape orientation */
        @media (orientation: landscape) and (max-height: 500px) {
          .container {
            padding: 10px;
          }
          
          .dialogBox {
            padding: 15px;
          }
          
          .formTitle {
            margin-bottom: 10px;
          }
        }

        /* Input focus styles */
        .input:focus {
          outline: none;
          border-color: #264653;
          box-shadow: 0 0 0 3px rgba(38, 70, 83, 0.1);
        }

        /* Button active states */
        .submitButton:active,
        .googleButton:active {
          transform: translateY(0) !important;
        }

        /* Disabled state styles */
        .input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .submitButton:disabled,
        .googleButton:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
