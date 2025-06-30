import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import creativeImage from '../assets/creative.jpg';
import exerciseImage from '../assets/exercise.jpg';
import meditationImage from '../assets/meditation.jpg';
import playImage from '../assets/Play.jpg';
import readingImage from '../assets/reading.jpg';
import sleepImage from '../assets/sleep.jpg';

const SelfCareResources = () => {
  const [activeActivity, setActiveActivity] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [inputText, setInputText] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const navigate = useNavigate();
  const audioRef = useRef(null);

  // Initialize audio with a calm meditation sound
  useEffect(() => {
    // Create a simple meditation sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Set up a calm meditation tone (432 Hz - known as the "healing frequency")
    oscillator.frequency.setValueAtTime(432, audioContext.currentTime);
    oscillator.type = 'sine';
    
    // Start with volume at 0 (silent)
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    
    // Store the audio context and nodes for control
    audioRef.current = {
      context: audioContext,
      oscillator: oscillator,
      gainNode: gainNode,
      isStarted: false // Track if oscillator has been started
    };
    
    return () => {
      if (audioRef.current) {
        try {
          // Only stop if it has been started
          if (audioRef.current.isStarted && audioRef.current.oscillator.state === 'running') {
            audioRef.current.oscillator.stop();
          }
          audioRef.current.context.close();
        } catch (error) {
          console.log('Audio cleanup error:', error);
        }
      }
    };
  }, []);

  const handleCardClick = (activity) => {
    setActiveActivity(activity);
    setTimeLeft(300);
    setIsTimerRunning(false);
    setIsAudioPlaying(false);
  };

  const closeModal = () => {
    setActiveActivity(null);
    setTimeLeft(300);
    setInputText('');
    setIsTimerRunning(false);
    stopAudio();
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    playAudio();
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
    pauseAudio();
  };

  const resetTimer = () => {
    setTimeLeft(300);
    setIsTimerRunning(false);
    stopAudio();
  };

  const playAudio = () => {
    if (audioRef.current && !isAudioPlaying) {
      try {
        // Resume audio context if it's suspended
        if (audioRef.current.context.state === 'suspended') {
          audioRef.current.context.resume();
        }
        
        // Start the oscillator if it's not already running
        if (!audioRef.current.isStarted) {
          audioRef.current.oscillator.start();
          audioRef.current.isStarted = true;
        }
        
        // Fade in the audio
        audioRef.current.gainNode.gain.setValueAtTime(0, audioRef.current.context.currentTime);
        audioRef.current.gainNode.gain.linearRampToValueAtTime(0.1, audioRef.current.context.currentTime + 2);
        
        setIsAudioPlaying(true);
      } catch (error) {
        console.log('Audio play failed:', error);
      }
    }
  };

  const pauseAudio = () => {
    if (audioRef.current && isAudioPlaying) {
      try {
        // Fade out the audio
        audioRef.current.gainNode.gain.setValueAtTime(0.1, audioRef.current.context.currentTime);
        audioRef.current.gainNode.gain.linearRampToValueAtTime(0, audioRef.current.context.currentTime + 1);
        
        setIsAudioPlaying(false);
      } catch (error) {
        console.log('Audio pause failed:', error);
      }
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      try {
        // Fade out the audio quickly
        audioRef.current.gainNode.gain.setValueAtTime(audioRef.current.gainNode.gain.value, audioRef.current.context.currentTime);
        audioRef.current.gainNode.gain.linearRampToValueAtTime(0, audioRef.current.context.currentTime + 0.5);
        
        // Note: We don't stop the oscillator here, just mute it
        // The oscillator will be stopped during cleanup if needed
        
        setIsAudioPlaying(false);
      } catch (error) {
        console.log('Audio stop failed:', error);
      }
    }
  };

  // Timer effect
  useEffect(() => {
    if (!activeActivity || !isTimerRunning || timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          stopAudio();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [activeActivity, isTimerRunning, timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Enhanced styles
  const styles = {
    container: {
      backgroundColor: '#000',
      padding: '20px',
      minHeight: '100vh',
      position: 'relative',
    },
    title: {
      marginBottom: '30px',
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      letterSpacing: '2px',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center',
      position: 'relative',
      zIndex: 1,
    },
    mainCardsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '15px',
      marginBottom: '40px',
    },
    mainCard: {
    backgroundColor: '#1c1c1e',
    color: '#fff',
      borderRadius: '15px',
      padding: '25px',
    textAlign: 'center',
      flex: '1',
      minWidth: '200px',
    cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
      position: 'relative',
      overflow: 'hidden',
    },
    mainCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    cardIcon: {
      fontSize: '3em',
      marginBottom: '15px',
      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
    },
    cardTitle: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      margin: '0',
      color: '#ffffff',
    },
    sectionTitle: {
      color: '#fff',
      textAlign: 'center',
      marginTop: '40px',
      marginBottom: '30px',
      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #f093fb, #f5576c)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    freeTimeContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'nowrap',
      gap: '15px',
      maxWidth: '100%',
      margin: '0 auto',
      overflowX: 'auto',
      padding: '10px 0',
    },
    freeTimeCard: {
      backgroundColor: '#2a2a2a',
    color: '#fff',
      borderRadius: '15px',
      width: '180px',
      minWidth: '180px',
    height: '280px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
      padding: '15px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0,
    },
    freeTimeCardHover: {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    cardImage: {
      width: '85%',
      height: '130px',
      borderRadius: '12px',
      objectFit: 'cover',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    },
    cardHeading: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      margin: '10px 0',
      color: '#ffffff',
    },
    cardQuote: {
    fontStyle: 'italic',
    fontSize: '0.9em',
    color: '#ccc',
      margin: '0',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)',
    },
    modal: {
      backgroundColor: '#1c1c1e',
      color: '#fff',
      padding: '35px',
      borderRadius: '20px',
      maxWidth: '400px',
      width: '90%',
      textAlign: 'center',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'relative',
      animation: 'modalSlideIn 0.3s ease-out',
    },
    modalTitle: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#ffffff',
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    modalContent: {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      marginBottom: '25px',
      color: '#cccccc',
    },
    timerContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
      margin: '25px 0',
    },
    timerCircle: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      border: '3px solid rgba(255, 255, 255, 0.1)',
    },
    timerText: {
      fontSize: '1.8em',
      fontWeight: 'bold',
      color: '#fff',
    },
    timerControls: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
    },
    timerButton: {
      backgroundColor: '#4caf50',
      color: '#fff',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      transition: 'background-color 0.3s',
    },
    timerButtonPause: {
      backgroundColor: '#ff9800',
    },
    timerButtonReset: {
      backgroundColor: '#f44336',
    },
    musicIcon: {
      fontSize: '2.5em',
      cursor: 'pointer',
      margin: '15px 0',
      transition: 'transform 0.3s',
    },
    musicIconHover: {
      transform: 'scale(1.1)',
    },
    inputField: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#fff',
      fontSize: '1rem',
      marginTop: '15px',
    },
    inputFieldFocus: {
      outline: 'none',
      border: '1px solid #667eea',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    actionButton: {
      backgroundColor: '#4caf50',
      color: '#fff',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 'bold',
      marginTop: '15px',
      transition: 'all 0.3s ease',
    },
    actionButtonHover: {
      backgroundColor: '#45a049',
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(76, 175, 80, 0.3)',
    },
    arrowButton: {
      backgroundColor: '#4caf50',
      color: '#fff',
      padding: '20px',
      borderRadius: '50%',
      fontSize: '1.5em',
      cursor: 'pointer',
      border: 'none',
      marginTop: '20px',
      transition: 'all 0.3s ease',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    },
    arrowButtonHover: {
      transform: 'scale(1.1)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
    },
    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#fff',
      fontSize: '1.5rem',
      cursor: 'pointer',
      padding: '5px',
      borderRadius: '50%',
      width: '35px',
      height: '35px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.3s',
    },
    closeButtonHover: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    audioStatus: {
      fontSize: '0.9rem',
      color: '#ccc',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={{ textAlign: 'center', marginBottom: 18, fontSize: '2.2rem', letterSpacing: 1, background: 'linear-gradient(45deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Self-Care Resources</h1>
      
      <div style={styles.mainCardsContainer}>
        <div 
          style={styles.mainCard}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          onClick={() => handleCardClick('Guided Meditation')}
        >
          <div style={styles.cardIcon}>🧘</div>
          <h2 style={styles.cardTitle}>Guided Meditation</h2>
        </div>

        <div 
          style={styles.mainCard}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          onClick={() => handleCardClick('Grounding Techniques')}
        >
          <div style={styles.cardIcon}>🌱</div>
          <h2 style={styles.cardTitle}>Grounding Techniques</h2>
        </div>

        <div 
          style={styles.mainCard}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          onClick={() => handleCardClick('Sleep Support Tools')}
        >
          <div style={styles.cardIcon}>💤</div>
          <h2 style={styles.cardTitle}>Sleep Support Tools</h2>
        </div>

        <div 
          style={styles.mainCard}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          onClick={() => handleCardClick('Creative Expression')}
        >
          <div style={styles.cardIcon}>🎨</div>
          <h2 style={styles.cardTitle}>Creative Expression</h2>
        </div>
      </div>

      <h2 style={styles.sectionTitle}>What You Prefer To Do In Free Time</h2>

      <div style={styles.freeTimeContainer}>
        <div 
          style={styles.freeTimeCard}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-8px) scale(1.02)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
        >
          <img src={sleepImage} alt="Sleep" style={styles.cardImage} />
          <h3 style={styles.cardHeading}>SLEEP</h3>
          <p style={styles.cardQuote}>"Rest and recharge."</p>
        </div>
        <div 
          style={styles.freeTimeCard}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-8px) scale(1.02)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
        >
          <img src={playImage} alt="Play" style={styles.cardImage} />
          <h3 style={styles.cardHeading}>PLAY</h3>
          <p style={styles.cardQuote}>"Find joy in the little things."</p>
        </div>
        <div 
          style={styles.freeTimeCard}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-8px) scale(1.02)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
        >
          <img src={creativeImage} alt="Creative Activities" style={styles.cardImage} />
          <h3 style={styles.cardHeading}>Creative Activities</h3>
          <p style={styles.cardQuote}>"Express your inner artist."</p>
        </div>
        <div 
          style={styles.freeTimeCard}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-8px) scale(1.02)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
        >
          <img src={meditationImage} alt="Meditation" style={styles.cardImage} />
          <h3 style={styles.cardHeading}>Meditation</h3>
          <p style={styles.cardQuote}>"Find peace within."</p>
        </div>
        <div 
          style={styles.freeTimeCard}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-8px) scale(1.02)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
        >
          <img src={exerciseImage} alt="Exercise" style={styles.cardImage} />
          <h3 style={styles.cardHeading}>Exercise</h3>
          <p style={styles.cardQuote}>"Stay strong, stay healthy."</p>
        </div>
        <div 
          style={styles.freeTimeCard}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-8px) scale(1.02)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
        >
          <img src={readingImage} alt="Reading" style={styles.cardImage} />
          <h3 style={styles.cardHeading}>Reading</h3>
          <p style={styles.cardQuote}>"Explore new worlds in words."</p>
        </div>
      </div>

      {/* Enhanced Modal */}
      {activeActivity && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button 
              style={styles.closeButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              onClick={closeModal}
            >
              ×
            </button>
            
            <h2 style={styles.modalTitle}>{activeActivity}</h2>
            
            {activeActivity === 'Guided Meditation' && (
              <>
                <p style={styles.modalContent}>
                  Take a 5-minute break to meditate with soothing music. 
                  Focus on your breath and let your mind find peace.
                </p>
                <div style={styles.timerContainer}>
                  <div style={styles.timerCircle}>
                    <span style={styles.timerText}>{formatTime(timeLeft)}</span>
                  </div>
                  <div style={styles.timerControls}>
                    {!isTimerRunning ? (
                      <button 
                        style={styles.timerButton}
                        onClick={startTimer}
                      >
                        Start
                      </button>
                    ) : (
                      <button 
                        style={{...styles.timerButton, ...styles.timerButtonPause}}
                        onClick={pauseTimer}
                      >
                        Pause
                      </button>
                    )}
                    <button 
                      style={{...styles.timerButton, ...styles.timerButtonReset}}
                      onClick={resetTimer}
                    >
                      Reset
                    </button>
                  </div>
                </div>
                <div 
                  style={styles.musicIcon}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  {isAudioPlaying ? '🔊' : '🔇'}
                </div>
                <div style={styles.audioStatus}>
                  {isAudioPlaying ? 'Calm meditation sound playing...' : 'Click Start to begin meditation with calming tones'}
                </div>
                <input
                  type="text"
                  placeholder="Share your meditation experience..."
                  style={styles.inputField}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </>
            )}
            
            {activeActivity === 'Grounding Techniques' && (
              <>
                <p style={styles.modalContent}>
                  "Calmness is a superpower. The ability to not overreact or take things personally keeps your mind clear and your heart at peace."
                </p>
                <button 
                  onClick={() => navigate('/question-ans')} 
                  style={styles.actionButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#4caf50'}
                >
                  Start Quiz
                </button>
              </>
            )}
            
            {activeActivity === 'Sleep Support Tools' && (
              <>
                <h3 style={styles.modalTitle}>Track Your Everyday Sleep With Us</h3>
                <p style={styles.modalContent}>Don't give up on your dreams so soon, sleep longer</p>
                <button 
                  onClick={() => navigate('/sleeptool')} 
                  style={styles.arrowButton}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  →
                </button>
              </>
            )}
            
            {activeActivity === 'Creative Expression' && (
              <>
                <h3 style={styles.modalTitle}>Let's Create Something</h3>
                <p style={styles.modalContent}>Let's see what you're up to!</p>
                <button 
                  onClick={() => navigate('/creative')} 
                  style={styles.actionButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#4caf50'}
                >
                  Let's Go
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Enhanced CSS Animations */}
      <style>
        {`
          @keyframes modalSlideIn {
            0% {
              transform: scale(0.8) translateY(-50px);
              opacity: 0;
            }
            100% {
              transform: scale(1) translateY(0);
              opacity: 1;
            }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          @keyframes glow {
            0%, 100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.3); }
            50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.6); }
          }
        `}
      </style>
    </div>
  );
};

export default SelfCareResources;
