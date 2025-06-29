import React, { useState, useEffect } from "react";

const MoodTracker = () => {
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [mood, setMood] = useState("");
  const [showTips, setShowTips] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");
  const [isMoodBoostModalOpen, setIsMoodBoostModalOpen] = useState(false);
  const [isTicTacToeOpen, setIsTicTacToeOpen] = useState(false);
  const [ticTacToeBoard, setTicTacToeBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // New state variables for enhanced features
  const [currentMood, setCurrentMood] = useState(5);
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [showMoodJournal, setShowMoodJournal] = useState(false);
  const [journalEntry, setJournalEntry] = useState('');
  const [showDailyChallenges, setShowDailyChallenges] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [streak, setStreak] = useState(0);
  const [moodHistory, setMoodHistory] = useState({});
  const [showMoodInsights, setShowMoodInsights] = useState(false);
  const [showJournalHistory, setShowJournalHistory] = useState(false);
  const [journalHistory, setJournalHistory] = useState([]);
  const [expandedJournalId, setExpandedJournalId] = useState(null);
  
  // Enhanced Mood Insights States
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [selectedMoodDetail, setSelectedMoodDetail] = useState(null);

  // New game states
  const [isRockPaperScissorsOpen, setIsRockPaperScissorsOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [rpsResult, setRpsResult] = useState('');
  const [rpsScore, setRpsScore] = useState({ player: 0, computer: 0 });
  const [rpsCountdown, setRpsCountdown] = useState('');
  const [isRpsPlaying, setIsRpsPlaying] = useState(false);
  const [rpsComputerChoice, setRpsComputerChoice] = useState('');
  const [rpsPlayerChoice, setRpsPlayerChoice] = useState('');
  const [rpsRound, setRpsRound] = useState(1);
  const [rpsGameOver, setRpsGameOver] = useState(false);
  
  const [isMemoryGameOpen, setIsMemoryGameOpen] = useState(false);
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [memoryScore, setMemoryScore] = useState(0);
  
  // New games states
  // eslint-disable-next-line no-unused-vars
  const [isWordScrambleOpen, setIsWordScrambleOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [scrambleWord, setScrambleWord] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [scrambledWord, setScrambledWord] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [userGuess, setUserGuess] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [scrambleResult, setScrambleResult] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [scrambleScore, setScrambleScore] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [scrambleLevel, setScrambleLevel] = useState(1);
  
  // eslint-disable-next-line no-unused-vars
  const [isNumberGuessOpen, setIsNumberGuessOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [targetNumber, setTargetNumber] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [userNumber, setUserNumber] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [guessResult, setGuessResult] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [guessAttempts, setGuessAttempts] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [guessScore, setGuessScore] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [maxAttempts, setMaxAttempts] = useState(5);

  // Enhanced mood cards with gradients and animations
  const enhancedFeatures = [
    {
      title: "Mood Tracker",
      icon: "😊",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      animation: "bounce",
      onClick: () => setShowQuizModal(true),
      description: "Track your daily mood"
    },
    {
      title: "Mood Insights",
      icon: "📊",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      animation: "pulse",
      onClick: () => setShowMoodInsights(true),
      description: "View your mood patterns"
    },
    {
      title: "Breathing Exercise",
      icon: "🫁",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      animation: "float",
      onClick: () => setShowBreathingExercise(true),
      description: "Calm your mind"
    },
    {
      title: "Daily Challenges",
      icon: "🎯",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      animation: "shake",
      onClick: () => setShowDailyChallenges(true),
      description: "Complete daily tasks"
    },
    {
      title: "Mood Journal",
      icon: "📝",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      animation: "wiggle",
      onClick: () => setShowMoodJournal(true),
      description: "Write your thoughts"
    },
    {
      title: "Boost Your Mood",
      icon: "🌈",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      animation: "glow",
      onClick: () => setIsMoodBoostModalOpen(true),
      description: "Play fun games"
    },
    {
      title: "Daily Quote",
      icon: "🌟",
      gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      animation: "rotate",
      onClick: () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setCurrentQuote(quotes[randomIndex]);
        setIsQuoteModalOpen(true);
      },
      description: "Get inspired"
    },
    {
      title: "Mood Streak",
      icon: "🔥",
      gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      animation: "pulse",
      onClick: () => alert(`Your current streak: ${streak} days! Keep it up! 🔥`),
      description: `${streak} day streak`
    }
  ];

  const dailyChallenges = [
    { id: 1, text: "Take 3 deep breaths every hour", completed: false },
    { id: 2, text: "Write down 3 things you're grateful for", completed: false },
    { id: 3, text: "Do 10 minutes of stretching", completed: false },
    { id: 4, text: "Call a friend or family member", completed: false },
    { id: 5, text: "Try a new hobby for 15 minutes", completed: false },
    { id: 6, text: "Listen to your favorite music", completed: false },
    { id: 7, text: "Go for a 10-minute walk", completed: false },
    { id: 8, text: "Practice positive self-talk", completed: false }
  ];

  const moodTips = {
    Bad: [
      "Take a deep breath and try a short mindfulness exercise.",
      "Consider taking a walk outside to clear your mind.",
      "Talk to someone you trust about how you're feeling.",
      "Try listening to calming music or nature sounds.",
      "Write down your feelings in a journal."
    ],
    Neutral: [
      "Try some light stretching or yoga to relieve tension.",
      "Take a few minutes to focus on your breathing.",
      "Do something creative like drawing or coloring.",
      "Connect with a friend or family member.",
      "Try a new hobby or activity."
    ],
    Good: [
      "You're doing amazing! Keep up the positive vibes!",
      "Share your good mood with others - it's contagious!",
      "Take time to appreciate this moment.",
      "Use this energy to help someone else feel good too.",
      "Document what made today special."
    ],
  };

  const quizQuestions = [
    {
      question: "Over the last two weeks, have you been feeling down, depressed, irritable, or hopeless?",
      options: [
        { text: "Not at all", score: 3 },
        { text: "Sometimes", score: 2 },
        { text: "Frequently", score: 1 },
      ],
    },
    {
      question: "Over the last two weeks, have you had little interest or pleasure in doing things?",
      options: [
        { text: "Not at all", score: 3 },
        { text: "Sometimes", score: 2 },
        { text: "Frequently", score: 1 },
      ],
    },
    {
      question: "Have you had poor appetite, weight loss, or have you been overeating?",
      options: [
        { text: "Not at all", score: 3 },
        { text: "Sometimes", score: 2 },
        { text: "Frequently", score: 1 },
      ],
    },
    {
      question: "How have you been feeling recently?",
      options: [
        { text: "Great", score: 3 },
        { text: "Okay", score: 2 },
        { text: "Not great", score: 1 },
      ],
    },
    {
      question: "Are you feeling low in energy?",
      options: [
        { text: "Not at all", score: 3 },
        { text: "Sometimes", score: 2 },
        { text: "Frequently", score: 1 },
      ],
    },
    {
      question: "How well did you sleep last night?",
      options: [
        { text: "Great! I feel rested", score: 3 },
        { text: "It was alright", score: 2 },
        { text: "Not good at all", score: 1 },
      ],
    },
    {
      question: "Are you able to focus on tasks?",
      options: [
        { text: "Yes, I'm very focused", score: 3 },
        { text: "Sometimes, but I get distracted", score: 2 },
        { text: "No, I can't focus", score: 1 },
      ],
    },
  ];

const quotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Life is what happens when you're busy making other plans. - John Lennon",
  "Get busy living or get busy dying. - Stephen King",
  "You have within you right now, everything you need to deal with whatever the world can throw at you. - Brian Tracy",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "It does not matter how slowly you go as long as you do not stop. - Confucius",
  "Act as if what you do makes a difference. It does. - William James",
    "Happiness is not something ready-made. It comes from your own actions. - Dalai Lama",
    "The mind is everything. What you think you become. - Buddha",
  ];

  // Breathing exercise effect
  useEffect(() => {
    if (showBreathingExercise) {
      const interval = setInterval(() => {
        setBreathPhase(prev => prev === 'inhale' ? 'exhale' : 'inhale');
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [showBreathingExercise]);

  // Save mood to history
  const saveMoodToHistory = (moodValue) => {
    const today = new Date().toISOString().split('T')[0];
    setMoodHistory(prev => ({
      ...prev,
      [today]: moodValue
    }));
    localStorage.setItem('moodHistory', JSON.stringify({
      ...moodHistory,
      [today]: moodValue
    }));
  };

  // Load mood history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('moodHistory');
    if (saved) {
      setMoodHistory(JSON.parse(saved));
    }
  }, []);

  const handleQuizOptionClick = (score) => {
    setQuizScore(quizScore + score);
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const calculatedMood = calculateMood(quizScore + score);
      setMood(calculatedMood);
      setShowTips(true);
      saveMoodToHistory(calculatedMood);
    }
  };

  const calculateMood = (score) => {
    if (score >= 13) return "Good";
    if (score >= 9) return "Neutral";
    return "Bad";
  };

  const restartQuiz = () => {
    setQuizScore(0);
    setQuizStep(0);
    setMood("");
    setShowTips(false);
  };

  const closeModal = () => {
    setShowQuizModal(false);
    restartQuiz();
  };

const handleSquareClick = (index) => {
    // Prevent clicking if square is already occupied or game is won
  if (ticTacToeBoard[index] || winner) {
      return;
    }

    // Only allow player X to click (human player)
    if (!isXNext) {
      return;
  }

  const newBoard = ticTacToeBoard.slice();
    newBoard[index] = "X"; // Player always plays X
    setTicTacToeBoard(newBoard);
    
  const currentWinner = calculateWinner(newBoard);
    setWinner(currentWinner);
    
    // If no winner and game isn't a draw, let computer play
    if (!currentWinner && newBoard.some(square => square === null)) {
      setIsXNext(false); // Computer's turn
      setTimeout(() => cPUPlay(newBoard), 500);
    }
  };

  const cPUPlay = (currentBoard) => {
    // Find all empty squares
    const emptyIndexes = currentBoard
      .map((value, index) => value === null ? index : null)
      .filter(index => index !== null);
    
    if (emptyIndexes.length === 0) return;
    
    // Computer chooses a random empty square
  const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

    const newBoard = currentBoard.slice();
    newBoard[randomIndex] = "O"; // Computer plays O
  setTicTacToeBoard(newBoard);
    
  const currentWinner = calculateWinner(newBoard);
    setWinner(currentWinner);
    setIsXNext(true); // Back to player's turn
};

const calculateWinner = (squares) => {
  const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
      [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
    }
  }
    return null;
};

const renderSquare = (index) => {
  return (
    <button
      style={styles.square}
      onClick={() => handleSquareClick(index)}
    >
      {ticTacToeBoard[index]}
    </button>
  );
};

  const handleChallengeComplete = (challengeId) => {
    setCompletedChallenges(prev => [...prev, challengeId]);
    setStreak(prev => prev + 1);
  };

  // Rock Paper Scissors Game Logic
  const startRpsGame = () => {
    setIsRpsPlaying(true);
    setRpsCountdown('Rock...');
    setRpsResult('');
    setRpsPlayerChoice('');
    setRpsComputerChoice('');
    setRpsGameOver(false);
    
    setTimeout(() => {
      setRpsCountdown('Paper...');
    }, 1000);
    
    setTimeout(() => {
      setRpsCountdown('Scissors...');
    }, 2000);
    
    setTimeout(() => {
      setRpsCountdown('Shoot!');
    }, 3000);
    
    setTimeout(() => {
      setIsRpsPlaying(false);
      setRpsCountdown('');
    }, 3500);
  };

  const playRockPaperScissors = (playerChoice) => {
    if (isRpsPlaying) return; // Prevent clicking during countdown
    
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    
    setRpsPlayerChoice(playerChoice);
    setRpsComputerChoice(computerChoice);
    
    let result = '';
    let newScore = { ...rpsScore };
    
    if (playerChoice === computerChoice) {
      result = "It's a tie! 🤝";
    } else if (
      (playerChoice === 'rock' && computerChoice === 'scissors') ||
      (playerChoice === 'paper' && computerChoice === 'rock') ||
      (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
      result = `You win! 🎉`;
      newScore.player += 1;
    } else {
      result = `You lose! 😅`;
      newScore.computer += 1;
    }
    
    setRpsResult(result);
    setRpsScore(newScore);
    
    // Check if game is over (5 rounds completed)
    if (rpsRound >= 5) {
      setRpsGameOver(true);
      return;
    }
    
    // Continue to next round
    setRpsRound(prev => prev + 1);
    
    // Auto-start next round after 2 seconds
    setTimeout(() => {
      startRpsGame();
    }, 2000);
  };

  const resetRpsGame = () => {
    setRpsScore({ player: 0, computer: 0 });
    setRpsRound(1);
    setRpsGameOver(false);
    setRpsResult('');
    setRpsCountdown('');
    setIsRpsPlaying(false);
    setRpsPlayerChoice('');
    setRpsComputerChoice('');
  };

  const getRpsFinalResult = () => {
    if (rpsScore.player > rpsScore.computer) {
      return "🎉 Congratulations! You won the game! 🎉";
    } else if (rpsScore.computer > rpsScore.player) {
      return "😅 Game Over! Computer won the game! 😅";
    } else {
      return "🤝 It's a tie! Great game! 🤝";
    }
  };

  // Memory Game Logic
  const initializeMemoryGame = () => {
    const emojis = ['😀', '😍', '🎮', '🌟', '🎵', '🌈', '🍕', '🎨'];
    const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    setMemoryCards(cards.map((emoji, index) => ({ id: index, emoji, isFlipped: false, isMatched: false })));
    setFlippedCards([]);
    setMatchedPairs([]);
    setMemoryScore(0);
  };

  const handleMemoryCardClick = (cardId) => {
    if (flippedCards.length === 2 || flippedCards.includes(cardId) || matchedPairs.includes(cardId)) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMemoryMoves(prev => prev + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = memoryCards.find(card => card.id === firstId);
      const secondCard = memoryCards.find(card => card.id === secondId);

      if (firstCard.emoji === secondCard.emoji) {
        setMatchedPairs(prev => [...prev, firstId, secondId]);
        setMemoryScore(prev => prev + 10);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const getMoodEmoji = (moodValue) => {
    if (moodValue <= 2) return "😢";
    if (moodValue <= 4) return "😕";
    if (moodValue <= 6) return "😐";
    if (moodValue <= 8) return "😊";
    return "😄";
  };

  // eslint-disable-next-line no-unused-vars
  const getMoodColor = (moodValue) => {
    if (moodValue <= 2) return "#ff6b6b";
    if (moodValue <= 4) return "#ffa726";
    if (moodValue <= 6) return "#ffd54f";
    if (moodValue <= 8) return "#81c784";
    return "#4caf50";
  };

  // Word Scramble Game Logic
  // eslint-disable-next-line no-unused-vars
  const initializeWordScramble = () => {
    const words = ['HAPPY', 'SMILE', 'JOY', 'PEACE', 'LOVE', 'DREAM', 'HOPE', 'FUN'];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setScrambleWord(randomWord);
    setScrambledWord(scrambleWordFunction(randomWord));
    setUserGuess('');
    setScrambleResult('');
    setScrambleLevel(1);
    setScrambleScore(0);
  };

  // eslint-disable-next-line no-unused-vars
  const scrambleWordFunction = (word) => {
    return word.split('').sort(() => Math.random() - 0.5).join('');
  };

  // eslint-disable-next-line no-unused-vars
  const checkScrambleGuess = () => {
    if (userGuess.toUpperCase() === scrambleWord) {
      setScrambleResult('Correct! 🎉');
      setScrambleScore(prev => prev + scrambleLevel * 10);
      setScrambleLevel(prev => prev + 1);
      setTimeout(() => {
        initializeWordScramble();
      }, 1500);
    } else {
      setScrambleResult('Try again! 💪');
    }
  };

  // Number Guessing Game Logic
  // eslint-disable-next-line no-unused-vars
  const initializeNumberGuess = () => {
    const newTarget = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(newTarget);
    setUserNumber('');
    setGuessResult('');
    setGuessAttempts(0);
    setGuessScore(0);
    setMaxAttempts(5);
  };

  // eslint-disable-next-line no-unused-vars
  const checkNumberGuess = () => {
    const guess = parseInt(userNumber);
    if (isNaN(guess) || guess < 1 || guess > 100) {
      setGuessResult('Please enter a number between 1 and 100');
      return;
    }

    setGuessAttempts(prev => prev + 1);
    
    if (guess === targetNumber) {
      setGuessResult(`🎉 Correct! You found it in ${guessAttempts + 1} attempts!`);
      setGuessScore(prev => prev + (maxAttempts - guessAttempts) * 10);
      setTimeout(() => {
        initializeNumberGuess();
      }, 2000);
    } else if (guessAttempts + 1 >= maxAttempts) {
      setGuessResult(`Game Over! The number was ${targetNumber}`);
      setTimeout(() => {
        initializeNumberGuess();
      }, 2000);
    } else {
      const hint = guess < targetNumber ? 'Too low! 📈' : 'Too high! 📉';
      setGuessResult(`${hint} Try again!`);
    }
  };

  // Enhanced Mood Analytics Functions
  // eslint-disable-next-line no-unused-vars
  const getMoodDataForTimeframe = (timeframe) => {
    const entries = Object.entries(moodHistory);
    const now = new Date();
    
    switch(timeframe) {
      case 'week':
        return entries.filter(([date]) => {
          const entryDate = new Date(date);
          return (now - entryDate) <= 7 * 24 * 60 * 60 * 1000;
        });
      case 'month':
        return entries.filter(([date]) => {
          const entryDate = new Date(date);
          return (now - entryDate) <= 30 * 24 * 60 * 60 * 1000;
        });
      case 'all':
        return entries;
      default:
        return entries.slice(-7);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const calculateMoodStats = (data) => {
    const moodCounts = data.reduce((acc, [date, mood]) => {
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {});

    const total = data.length;
    const percentages = {};
    Object.keys(moodCounts).forEach(mood => {
      percentages[mood] = Math.round((moodCounts[mood] / total) * 100);
    });

    return { moodCounts, percentages, total };
  };

  // eslint-disable-next-line no-unused-vars
  const getMoodTrend = (data) => {
    if (data.length < 2) return 'Not enough data';
    
    const recentMoods = data.slice(-3).map(([date, mood]) => mood);
    const goodCount = recentMoods.filter(mood => mood === 'Good').length;
    const badCount = recentMoods.filter(mood => mood === 'Bad').length;
    
    if (goodCount > badCount) return 'Improving 📈';
    if (badCount > goodCount) return 'Declining 📉';
    return 'Stable ➡️';
  };

  // eslint-disable-next-line no-unused-vars
  const getPersonalizedInsights = (data) => {
    const stats = calculateMoodStats(data);
    const insights = [];
    
    if (stats.percentages.Good > 60) {
      insights.push('🌟 You\'ve been feeling great lately! Keep up the positive energy!');
    }
    if (stats.percentages.Bad > 40) {
      insights.push('💪 Consider trying some mood-boosting activities or talking to someone.');
    }
    if (data.length >= 7) {
      insights.push('📊 You\'re building a great habit of tracking your mood regularly!');
    }
    if (stats.total === 0) {
      insights.push('📝 Start tracking your mood to get personalized insights!');
    }
    
    return insights.length > 0 ? insights : ['Keep tracking your mood for more insights! 📈'];
  };

  // eslint-disable-next-line no-unused-vars
  const getMoodPatterns = (data) => {
    const patterns = [];
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayMoods = {};
    
    data.forEach(([date, mood]) => {
      const day = weekdays[new Date(date).getDay()];
      if (!dayMoods[day]) dayMoods[day] = [];
      dayMoods[day].push(mood);
    });
    
    Object.entries(dayMoods).forEach(([day, moods]) => {
      const goodCount = moods.filter(m => m === 'Good').length;
      const total = moods.length;
      if (total >= 2) {
        const percentage = Math.round((goodCount / total) * 100);
        if (percentage >= 70) {
          patterns.push(`🎉 You tend to feel great on ${day}s!`);
        } else if (percentage <= 30) {
          patterns.push(`💭 ${day}s might be challenging for you.`);
        }
      }
    });
    
    return patterns.length > 0 ? patterns : ['Track more moods to discover patterns! 📊'];
  };

  // Load journal history from localStorage on component mount
  useEffect(() => {
    const savedJournalHistory = localStorage.getItem('journalHistory');
    if (savedJournalHistory) {
      setJournalHistory(JSON.parse(savedJournalHistory));
    }
  }, []);

  // Save journal history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('journalHistory', JSON.stringify(journalHistory));
  }, [journalHistory]);

  // Load mood history from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('moodHistory');
    if (saved) {
      setMoodHistory(JSON.parse(saved));
    }
  }, []);

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.particleBackground}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={styles.particle} />
        ))}
      </div>

      <h1 style={styles.title}>Mood Tracker</h1>
      
      {/* Quick Mood Slider */}
      <div style={styles.moodSliderContainer}>
        <h3 style={styles.moodSliderTitle}>How are you feeling right now?</h3>
        <div style={styles.moodSlider}>
          <span style={styles.moodEmoji}>😢</span>
          <input
            type="range"
            min="1"
            max="10"
            value={currentMood}
            onChange={(e) => setCurrentMood(parseInt(e.target.value))}
            style={styles.slider}
          />
          <span style={styles.moodEmoji}>😄</span>
        </div>
        <div style={styles.moodDisplay}>
          <span style={styles.currentMoodEmoji}>{getMoodEmoji(currentMood)}</span>
          <span style={styles.moodText}>Mood: {currentMood}/10</span>
        </div>
      </div>

      {/* Enhanced Feature Cards */}
      <div style={styles.cardContainer}>
        {enhancedFeatures.map((feature, index) => (
          <div
            key={index}
            style={{
              ...styles.enhancedCard,
              background: feature.gradient,
              animation: `${feature.animation} 2s infinite`
            }}
            onClick={feature.onClick}
            className="enhanced-card"
          >
            <div style={styles.cardIcon}>{feature.icon}</div>
            <h3 style={styles.cardTitle}>{feature.title}</h3>
            <p style={styles.cardDescription}>{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Breathing Exercise Modal */}
      {showBreathingExercise && (
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Breathing Exercise</h2>
            <div style={styles.breathingContainer}>
              <div 
                style={{
                  ...styles.breathingCircle,
                  transform: breathPhase === 'inhale' ? 'scale(1.2)' : 'scale(1)',
                  backgroundColor: breathPhase === 'inhale' ? '#4CAF50' : '#2196F3'
                }}
              >
                <span style={styles.breathingText}>
                  {breathPhase === 'inhale' ? 'Breathe In' : 'Breathe Out'}
                </span>
              </div>
              <p style={styles.breathingInstructions}>
                Follow the circle - expand when it grows, contract when it shrinks
              </p>
            </div>
            <button 
              onClick={() => setShowBreathingExercise(false)} 
              style={styles.closeButton}
            >
            Close
          </button>
        </div>
      </div>
    )}

      {/* Mood Journal Modal */}
      {showMoodJournal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Mood Journal</h2>
            <textarea
              style={styles.journalTextarea}
              placeholder="How are you feeling today? Write your thoughts..."
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
            />
            <div style={styles.journalButtons}>
              <button 
                onClick={() => {
                  if (journalEntry.trim()) {
                    const newEntry = {
                      id: Date.now(),
                      content: journalEntry,
                      date: new Date().toLocaleDateString(),
                      time: new Date().toLocaleTimeString()
                    };
                    setJournalHistory(prev => [newEntry, ...prev]);
                    alert('Journal entry saved! 📝');
                    setJournalEntry('');
                    setShowMoodJournal(false);
                  }
                }} 
                style={styles.saveButton}
              >
                Save Entry
              </button>
              <button 
                onClick={() => setShowJournalHistory(true)} 
                style={styles.viewHistoryButton}
              >
                See Your Previous Journals
              </button>
              <button 
                onClick={() => setShowMoodJournal(false)} 
                style={styles.closeButton}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Journal History Modal */}
      {showJournalHistory && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Your Journal History</h2>
            {journalHistory.length === 0 ? (
              <div style={styles.noJournalsMessage}>
                <p>No journal entries yet. Start writing to see your history here! 📝</p>
              </div>
            ) : (
              <div style={styles.journalHistoryContainer}>
                {journalHistory.map((entry) => (
                  <div key={entry.id} style={styles.journalEntry}>
                    <div style={styles.journalEntryHeader}>
                      <span style={styles.journalDate}>{entry.date}</span>
                      <span style={styles.journalTime}>{entry.time}</span>
                    </div>
                    <div 
                      style={styles.journalContent}
                      onClick={() => setExpandedJournalId(expandedJournalId === entry.id ? null : entry.id)}
                    >
                      {expandedJournalId === entry.id ? (
                        entry.content
                      ) : (
                        <div style={styles.journalPreview}>
                          {entry.content.split('\n')[0]}
                          {entry.content.split('\n').length > 1 && (
                            <span style={styles.expandIndicator}>... (Click to expand)</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={styles.modalButtons}>
              <button 
                onClick={() => {
                  setShowJournalHistory(false);
                  setExpandedJournalId(null);
                }} 
                style={styles.closeButton}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Daily Challenges Modal */}
      {showDailyChallenges && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Daily Challenges</h2>
            <div style={styles.challengesContainer}>
              {dailyChallenges.map((challenge) => (
                <div 
                  key={challenge.id} 
                  style={styles.challengeItem}
                >
                  <input
                    type="checkbox"
                    checked={completedChallenges.includes(challenge.id)}
                    onChange={() => handleChallengeComplete(challenge.id)}
                    style={styles.challengeCheckbox}
                  />
                  <span style={styles.challengeText}>{challenge.text}</span>
                </div>
              ))}
            </div>
            <div style={styles.streakDisplay}>
              <span style={styles.streakText}>🔥 {streak} Day Streak!</span>
            </div>
            <button 
              onClick={() => setShowDailyChallenges(false)} 
              style={styles.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Mood Insights Modal */}
      {showMoodInsights && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Your Mood Insights 📊</h2>
            
            {/* Timeframe Selector */}
            <div style={styles.timeframeSelector}>
              <button 
                style={{
                  ...styles.timeframeButton,
                  backgroundColor: selectedTimeframe === 'week' ? '#4CAF50' : '#333'
                }}
                onClick={() => setSelectedTimeframe('week')}
              >
                This Week
              </button>
              <button 
                style={{
                  ...styles.timeframeButton,
                  backgroundColor: selectedTimeframe === 'month' ? '#4CAF50' : '#333'
                }}
                onClick={() => setSelectedTimeframe('month')}
              >
                This Month
              </button>
              <button 
                style={{
                  ...styles.timeframeButton,
                  backgroundColor: selectedTimeframe === 'all' ? '#4CAF50' : '#333'
                }}
                onClick={() => setSelectedTimeframe('all')}
              >
                All Time
              </button>
            </div>

            {/* Main Insights Content */}
            <div style={styles.enhancedInsightsContainer}>
              {/* Quick Stats Cards */}
              <div style={styles.statsGrid}>
                {(() => {
                  const data = getMoodDataForTimeframe(selectedTimeframe);
                  const stats = calculateMoodStats(data);
                  const trend = getMoodTrend(data);
                  
                  return (
                    <>
                      <div style={styles.statCard}>
                        <div style={styles.statIcon}>📈</div>
                        <div style={styles.statValue}>{stats.total}</div>
                        <div style={styles.statLabel}>Total Entries</div>
                      </div>
                      <div style={styles.statCard}>
                        <div style={styles.statIcon}>🔥</div>
                        <div style={styles.statValue}>{streak}</div>
                        <div style={styles.statLabel}>Day Streak</div>
                      </div>
                      <div style={styles.statCard}>
                        <div style={styles.statIcon}>📊</div>
                        <div style={styles.statValue}>{trend}</div>
                        <div style={styles.statLabel}>Mood Trend</div>
                      </div>
                      <div style={styles.statCard}>
                        <div style={styles.statIcon}>⭐</div>
                        <div style={styles.statValue}>{stats.percentages.Good || 0}%</div>
                        <div style={styles.statLabel}>Good Days</div>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Interactive Mood Chart */}
              <div style={styles.chartSection}>
                <h3 style={styles.sectionTitle}>📊 Mood Visualization</h3>
                <div style={styles.enhancedMoodChart}>
                  {(() => {
                    const data = getMoodDataForTimeframe(selectedTimeframe);
                    return data.slice(-7).map(([date, mood], index) => (
                      <div key={date} style={styles.enhancedMoodBar}>
                        <div 
                          style={{
                            ...styles.enhancedMoodBarFill,
                            height: `${(mood === 'Good' ? 100 : mood === 'Neutral' ? 60 : 30)}%`,
                            backgroundColor: mood === 'Good' ? '#4CAF50' : mood === 'Neutral' ? '#FFC107' : '#F44336',
                            cursor: 'pointer'
                          }}
                          onClick={() => setSelectedMoodDetail({ date, mood })}
                          title={`${date}: ${mood}`}
                        />
                        <span style={styles.enhancedMoodBarLabel}>
                          {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              {/* Personalized Insights */}
              <div style={styles.insightsSection}>
                <h3 style={styles.sectionTitle}>💡 Personalized Insights</h3>
                <div style={styles.insightsList}>
                  {(() => {
                    const data = getMoodDataForTimeframe(selectedTimeframe);
                    const insights = getPersonalizedInsights(data);
                    return insights.map((insight, index) => (
                      <div key={index} style={styles.insightItem}>
                        <span style={styles.insightIcon}>💭</span>
                        <span style={styles.insightText}>{insight}</span>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              {/* Mood Patterns */}
              <div style={styles.patternsSection}>
                <h3 style={styles.sectionTitle}>🔄 Mood Patterns</h3>
                <div style={styles.patternsList}>
                  {(() => {
                    const data = getMoodDataForTimeframe(selectedTimeframe);
                    const patterns = getMoodPatterns(data);
                    return patterns.map((pattern, index) => (
                      <div key={index} style={styles.patternItem}>
                        <span style={styles.patternIcon}>📅</span>
                        <span style={styles.patternText}>{pattern}</span>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>

            {/* Selected Mood Detail */}
            {selectedMoodDetail && (
              <div style={styles.moodDetailOverlay}>
                <div style={styles.moodDetailCard}>
                  <h4>Mood Details</h4>
                  <p><strong>Date:</strong> {selectedMoodDetail.date}</p>
                  <p><strong>Mood:</strong> {selectedMoodDetail.mood}</p>
                  <button 
                    style={styles.closeDetailButton}
                    onClick={() => setSelectedMoodDetail(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            <div style={styles.modalButtons}>
              <button 
                onClick={() => {
                  setShowMoodInsights(false);
                  setSelectedMoodDetail(null);
                }} 
                style={styles.closeButton}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Modals */}
     {isQuoteModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Daily Quote</h2>
            <p style={styles.quoteText}>{currentQuote}</p>
            <button onClick={() => setIsQuoteModalOpen(false)} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}

      {showQuizModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            {showTips ? (
              <div style={styles.resultsContainer}>
                <h2 style={styles.moodResult}>Your Mood: {mood}</h2>
                {mood === "Good" ? (
                  <h3 style={styles.tipHeader}>Keep it up! You're doing great! 🌟</h3>
                ) : (
                  <>
                    <h3 style={styles.tipHeader}>Tips to Improve Your Mood:</h3>
                    <ul style={styles.tipList}>
                      {moodTips[mood].map((tip, index) => (
                        <li key={index} style={styles.tipItem}>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <button style={styles.closeButton} onClick={closeModal}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 style={styles.quizQuestion}>
                  {quizQuestions[quizStep].question}
                </h2>
                <div style={styles.quizOptions}>
                  {quizQuestions[quizStep].options.map((option, index) => (
                    <button
                      key={index}
                      style={styles.quizButton}
                      onClick={() => handleQuizOptionClick(option.score)}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
                <div style={styles.navigationButtons}>
                  {quizStep > 0 && (
                    <button
                      style={styles.navigationButton}
                      onClick={() => setQuizStep(quizStep - 1)}
                    >
                      Previous
                    </button>
                  )}
                  <button
                    style={styles.navigationButton}
                    onClick={() => setQuizStep(quizStep + 1)}
                    disabled={quizStep === quizQuestions.length - 1}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isMoodBoostModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>How do you want to boost your mood?</h2>
            <div style={styles.gameButtons}>
              <button 
                style={styles.gameButton} 
                onClick={() => {
                  setIsTicTacToeOpen(true);
                  setIsMoodBoostModalOpen(false);
                  setTicTacToeBoard(Array(9).fill(null));
                  setWinner(null);
                  setIsXNext(true);
                }}
              >
                🎯 Tic Tac Toe
              </button>
              <button 
                style={styles.gameButton} 
                onClick={() => {
                  setIsRockPaperScissorsOpen(true);
                  setIsMoodBoostModalOpen(false);
                  setRpsScore({ player: 0, computer: 0 });
                  setRpsResult('');
                }}
              >
                ✂️ Rock Paper Scissors
              </button>
              <button 
                style={styles.gameButton} 
                onClick={() => {
                  setIsMemoryGameOpen(true);
                  setIsMoodBoostModalOpen(false);
                  initializeMemoryGame();
                }}
              >
                🧠 Memory Game
              </button>
              <button 
                style={styles.gameButton} 
                onClick={() => {
                  setIsWordScrambleOpen(true);
                  setIsMoodBoostModalOpen(false);
                  initializeWordScramble();
                }}
              >
                🔤 Word Scramble
              </button>
              <button 
                style={styles.gameButton} 
                onClick={() => {
                  setIsNumberGuessOpen(true);
                  setIsMoodBoostModalOpen(false);
                  initializeNumberGuess();
                }}
              >
                🔢 Number Guessing
              </button>
            </div>
            <button onClick={() => setIsMoodBoostModalOpen(false)} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}

      {isTicTacToeOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Tic Tac Toe</h2>
            <div style={styles.gameStatus}>
              {winner ? (
                <p style={styles.winnerText}>Winner: {winner} 🎉</p>
              ) : ticTacToeBoard.every(square => square !== null) ? (
                <p style={styles.drawText}>It's a draw! 🤝</p>
              ) : (
                <p style={styles.turnText}>
                  {isXNext ? "Your turn (X)" : "Computer's turn (O)"}
                </p>
              )}
            </div>
            <div style={styles.ticTacToeBoard}>
              {ticTacToeBoard.map((square, index) => renderSquare(index))}
            </div>
            <div style={styles.gameButtons}>
              <button 
                onClick={() => {
                  setTicTacToeBoard(Array(9).fill(null));
                  setWinner(null);
                  setIsXNext(true);
                }} 
                style={styles.newGameButton}
              >
                New Game
              </button>
              <button 
                onClick={() => {
                  setIsTicTacToeOpen(false);
                  setTicTacToeBoard(Array(9).fill(null));
                  setWinner(null);
                  setIsXNext(true);
                }} 
                style={styles.closeButton}
              >
              Close
            </button>
            </div>
          </div>
        </div>
      )}

      {/* Rock Paper Scissors Modal */}
      {isRockPaperScissorsOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Rock Paper Scissors</h2>
            
            {/* Round Information */}
            <div style={styles.rpsRoundInfo}>
              <p style={styles.roundText}>Round {rpsRound}/5</p>
    </div>
            
            {/* Countdown Display */}
            {rpsCountdown && (
              <div style={styles.rpsCountdown}>
                <h3 style={styles.countdownText}>{rpsCountdown}</h3>
              </div>
            )}
            
            {/* Game Over Result */}
            {rpsGameOver && (
              <div style={styles.rpsGameOver}>
                <h3 style={styles.finalResultText}>{getRpsFinalResult()}</h3>
                <p style={styles.finalScoreText}>
                  Final Score: You {rpsScore.player} - {rpsScore.computer} Computer
                </p>
              </div>
            )}
            
            {/* Choices Display */}
            {(rpsPlayerChoice || rpsComputerChoice) && !rpsGameOver && (
              <div style={styles.rpsChoicesDisplay}>
                <div style={styles.choiceContainer}>
                  <p style={styles.choiceLabel}>You chose:</p>
                  <div style={styles.choiceEmoji}>
                    {rpsPlayerChoice === 'rock' && '🪨'}
                    {rpsPlayerChoice === 'paper' && '📄'}
                    {rpsPlayerChoice === 'scissors' && '✂️'}
                  </div>
                </div>
                <div style={styles.choiceContainer}>
                  <p style={styles.choiceLabel}>Computer chose:</p>
                  <div style={styles.choiceEmoji}>
                    {rpsComputerChoice === 'rock' && '🪨'}
                    {rpsComputerChoice === 'paper' && '📄'}
                    {rpsComputerChoice === 'scissors' && '✂️'}
                  </div>
                </div>
              </div>
            )}
            
            {/* Result Display */}
            {rpsResult && !rpsGameOver && (
              <div style={styles.rpsResult}>
                <p style={styles.rpsResultText}>{rpsResult}</p>
              </div>
            )}
            
            {/* Game Controls */}
            <div style={styles.rpsContainer}>
              <div style={styles.rpsChoices}>
                <button 
                  onClick={() => playRockPaperScissors('rock')} 
                  style={{
                    ...styles.rpsButton,
                    opacity: isRpsPlaying || rpsGameOver ? 0.5 : 1,
                    cursor: isRpsPlaying || rpsGameOver ? 'not-allowed' : 'pointer'
                  }}
                  disabled={isRpsPlaying || rpsGameOver}
                >
                  🪨 Rock
                </button>
                <button 
                  onClick={() => playRockPaperScissors('paper')} 
                  style={{
                    ...styles.rpsButton,
                    opacity: isRpsPlaying || rpsGameOver ? 0.5 : 1,
                    cursor: isRpsPlaying || rpsGameOver ? 'not-allowed' : 'pointer'
                  }}
                  disabled={isRpsPlaying || rpsGameOver}
                >
                  📄 Paper
                </button>
                <button 
                  onClick={() => playRockPaperScissors('scissors')} 
                  style={{
                    ...styles.rpsButton,
                    opacity: isRpsPlaying || rpsGameOver ? 0.5 : 1,
                    cursor: isRpsPlaying || rpsGameOver ? 'not-allowed' : 'pointer'
                  }}
                  disabled={isRpsPlaying || rpsGameOver}
                >
                  ✂️ Scissors
                </button>
              </div>
              
              <div style={styles.rpsScore}>
                <p>You: {rpsScore.player} | Computer: {rpsScore.computer}</p>
              </div>
              
              {/* Start Game Button */}
              {!isRpsPlaying && !rpsCountdown && !rpsGameOver && (
                <button 
                  onClick={startRpsGame}
                  style={styles.startRpsButton}
                >
                  Start New Round
                </button>
              )}
              
              {/* Reset Game Button */}
              {rpsGameOver && (
                <button 
                  onClick={resetRpsGame}
                  style={styles.resetRpsButton}
                >
                  Play Again
                </button>
              )}
            </div>
            
            <button 
              onClick={() => {
                setIsRockPaperScissorsOpen(false);
                resetRpsGame();
              }} 
              style={styles.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Memory Game Modal */}
      {isMemoryGameOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Memory Game</h2>
            <p style={styles.gameInstructions}>Find matching pairs! Score: {memoryScore}</p>
            <div style={styles.memoryGrid}>
              {memoryCards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleMemoryCardClick(card.id)}
                  style={{
                    ...styles.memoryCard,
                    backgroundColor: flippedCards.includes(card.id) || matchedPairs.includes(card.id) 
                      ? '#4CAF50' 
                      : '#333',
                    transform: flippedCards.includes(card.id) || matchedPairs.includes(card.id) 
                      ? 'rotateY(180deg)' 
                      : 'rotateY(0deg)',
                  }}
                  disabled={flippedCards.includes(card.id) || matchedPairs.includes(card.id)}
                >
                  {(flippedCards.includes(card.id) || matchedPairs.includes(card.id)) && card.emoji}
                </button>
              ))}
            </div>
            <div style={styles.gameButtons}>
              <button 
                onClick={() => {
                  initializeMemoryGame();
                }} 
                style={styles.newGameButton}
              >
                Start Again
              </button>
              <button 
                onClick={() => {
                  setIsMemoryGameOpen(false);
                  setMemoryCards([]);
                  setFlippedCards([]);
                  setMatchedPairs([]);
                  setMemoryScore(0);
                }} 
                style={styles.closeButton}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Word Scramble Game Modal */}
      {isWordScrambleOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>🔤 Word Scramble</h2>
            <p style={styles.modalSubtitle}>
              Unscramble the word! Level: {scrambleLevel} | Score: {scrambleScore}
            </p>
            
            <div style={styles.scrambleContainer}>
              <div style={styles.scrambledWord}>{scrambledWord}</div>
              <input
                type="text"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                placeholder="Enter your guess..."
                style={styles.scrambleInput}
                onKeyPress={(e) => e.key === 'Enter' && checkScrambleGuess()}
              />
              <button 
                style={styles.scrambleButton}
                onClick={checkScrambleGuess}
              >
                Check Answer
              </button>
              {scrambleResult && (
                <div style={styles.scrambleResult}>{scrambleResult}</div>
              )}
            </div>
            
            <div style={styles.modalButtons}>
              <button 
                style={{...styles.smallButton, backgroundColor: "#ff4444"}} 
                onClick={() => setIsWordScrambleOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Number Guessing Game Modal */}
      {isNumberGuessOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>🔢 Number Guessing</h2>
            <p style={styles.modalSubtitle}>
              Guess the number between 1-100! Score: {guessScore}
            </p>
            <p style={styles.modalSubtitle}>
              Attempts: {guessAttempts}/{maxAttempts}
            </p>
            
            <div style={styles.guessContainer}>
              <input
                type="number"
                value={userNumber}
                onChange={(e) => setUserNumber(e.target.value)}
                placeholder="Enter a number (1-100)"
                style={styles.guessInput}
                min="1"
                max="100"
                onKeyPress={(e) => e.key === 'Enter' && checkNumberGuess()}
              />
              <button 
                style={styles.guessButton}
                onClick={checkNumberGuess}
                disabled={guessAttempts >= maxAttempts}
              >
                Make Guess
              </button>
              {guessResult && (
                <div style={styles.guessResult}>{guessResult}</div>
              )}
            </div>
            
            <div style={styles.modalButtons}>
              <button 
                style={{...styles.smallButton, backgroundColor: "#ff4444"}} 
                onClick={() => setIsNumberGuessOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Styles */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        @keyframes wiggle {
          0%, 7% { transform: rotateZ(0); }
          15% { transform: rotateZ(-15deg); }
          20% { transform: rotateZ(10deg); }
          25% { transform: rotateZ(-10deg); }
          30% { transform: rotateZ(6deg); }
          35% { transform: rotateZ(-4deg); }
          40%, 100% { transform: rotateZ(0); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
          50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.8); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .enhanced-card:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        /* Responsive breakpoints */
        @media (max-width: 768px) {
          .cardContainer {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }

          .enhanced-card {
            padding: 15px;
          }

          .moodSliderContainer {
            margin-bottom: 20px;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 15px;
          }

          .title {
            font-size: 1.5rem;
            margin-bottom: 15px;
          }

          .cardContainer {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .enhanced-card {
            padding: 12px;
          }

          .modalContent {
            width: 98%;
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#0a0a0a",
    color: "#ffffff",
    minHeight: "100vh",
    padding: "20px",
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
  },
  particleBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 0,
  },
  particle: {
    position: "absolute",
    width: "4px",
    height: "4px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
    animation: "float 6s infinite",
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 6}s`,
  },
  title: {
    marginBottom: "30px",
    fontSize: "clamp(2rem, 5vw, 3rem)",
    letterSpacing: "2px",
    fontWeight: "bold",
    background: "linear-gradient(45deg, #667eea, #764ba2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    position: "relative",
    zIndex: 1,
  },
  moodSliderContainer: {
    marginBottom: "30px",
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: "15px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    position: "relative",
    zIndex: 1,
  },
  moodSliderTitle: {
    fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
    marginBottom: "15px",
    color: "#ffffff",
  },
  moodSlider: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "15px",
  },
  moodEmoji: {
    fontSize: "2rem",
  },
  slider: {
    flex: 1,
    height: "8px",
    borderRadius: "4px",
    background: "linear-gradient(90deg, #ff6b6b, #ffa726, #ffd54f, #81c784, #4caf50)",
    outline: "none",
    WebkitAppearance: "none",
  },
  moodDisplay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  currentMoodEmoji: {
    fontSize: "2.5rem",
  },
  moodText: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  enhancedCard: {
    borderRadius: "20px",
    padding: "25px",
    cursor: "pointer",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    position: "relative",
    overflow: "hidden",
  },
  cardIcon: {
    fontSize: "clamp(2.5rem, 6vw, 3rem)",
    marginBottom: "15px",
    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
  },
  cardTitle: {
    fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
    fontWeight: "bold",
    margin: "0 0 10px 0",
    color: "#ffffff",
  },
  cardDescription: {
    fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
    margin: 0,
    opacity: 0.9,
    color: "#ffffff",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(5px)",
  },
  modalContent: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    padding: "30px",
    borderRadius: "20px",
    width: "90%",
    maxWidth: "600px",
    textAlign: "center",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  modalTitle: {
    fontSize: "clamp(1.5rem, 4vw, 2rem)",
    marginBottom: "20px",
    color: "#ffffff",
  },
  breathingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  breathingCircle: {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 2s ease",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
  },
  breathingText: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#ffffff",
  },
  breathingInstructions: {
    fontSize: "1rem",
    color: "#cccccc",
    textAlign: "center",
  },
  journalTextarea: {
    width: "100%",
    minHeight: "200px",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #444",
    backgroundColor: "#2a2a2a",
    color: "#ffffff",
    fontSize: "1rem",
    resize: "vertical",
    marginBottom: "20px",
  },
  journalButtons: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  },
  challengesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "20px",
  },
  challengeItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px",
    backgroundColor: "#2a2a2a",
    borderRadius: "10px",
    border: "1px solid #444",
  },
  challengeCheckbox: {
    width: "20px",
    height: "20px",
    accentColor: "#4CAF50",
  },
  challengeText: {
    fontSize: "1rem",
    color: "#ffffff",
  },
  streakDisplay: {
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "linear-gradient(45deg, #ff6b6b, #ffa726)",
    borderRadius: "10px",
  },
  streakText: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#ffffff",
  },
  insightsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "20px",
  },
  insightCard: {
    padding: "20px",
    backgroundColor: "#2a2a2a",
    borderRadius: "10px",
    border: "1px solid #444",
  },
  moodChart: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "end",
    height: "150px",
    marginTop: "15px",
  },
  moodBar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
  },
  moodBarFill: {
    width: "30px",
    borderRadius: "5px 5px 0 0",
    transition: "height 0.3s ease",
  },
  moodBarLabel: {
    fontSize: "0.8rem",
    color: "#cccccc",
  },
  quoteText: {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    marginBottom: "20px",
    fontStyle: "italic",
    color: "#cccccc",
  },
  closeButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background-color 0.3s",
  },
  quizButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "clamp(10px, 2.5vw, 12px) clamp(15px, 3vw, 20px)",
    border: "none",
    borderRadius: "8px",
    fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
    width: "100%",
    marginBottom: "8px",
  },
  quizQuestion: {
    fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
    marginBottom: "20px",
    lineHeight: "1.4",
  },
  quizOptions: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  navigationButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    gap: "10px",
  },
  navigationButton: {
    backgroundColor: "#888888",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    flex: 1,
  },
  resultsContainer: {
    textAlign: "center",
  },
  moodBoostOptions: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "15px",
    marginBottom: "20px",
  },
  moodBoostButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    flexDirection: "column",
    gap: "8px",
  },
  ticTacToeBoard: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginTop: "20px",
    justifyContent: "center",
  },
  moodResult: {
    fontSize: "clamp(1.5rem, 4vw, 2rem)",
    fontWeight: "bold",
  },
  tipHeader: {
    fontSize: "clamp(1rem, 3vw, 1.2rem)",
    marginTop: "20px",
  },
  tipList: {
    listStyle: "none",
    padding: 0,
    textAlign: "left",
  },
  tipItem: {
    marginBottom: "10px",
    padding: "12px",
    backgroundColor: "#333",
    borderRadius: "8px",
    borderLeft: "4px solid #4CAF50",
  },
  square: {
    width: "clamp(60px, 15vw, 80px)",
    height: "clamp(60px, 15vw, 80px)",
    fontSize: "clamp(1.5rem, 4vw, 2rem)",
    backgroundColor: "#fff",
    color: "#000",
    border: "2px solid #4CAF50",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
  },
  winnerText: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: "15px",
  },
  icon: {
    fontSize: "2rem",
  },
  rpsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  rpsChoices: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  },
  rpsButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  rpsResult: {
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "#2a2a2a",
    borderRadius: "10px",
    border: "1px solid #444",
  },
  rpsResultText: {
    fontSize: "1.2rem",
    color: "#ffffff",
  },
  rpsScore: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: "15px",
  },
  gameInstructions: {
    fontSize: "1.2rem",
    color: "#cccccc",
    marginBottom: "20px",
  },
  memoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    marginBottom: "20px",
  },
  memoryCard: {
    width: "100%",
    padding: "30px",
    borderRadius: "10px",
    border: "1px solid #444",
    cursor: "pointer",
    transition: "transform 0.3s",
    fontSize: "2.5rem",
    minHeight: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  colorGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    marginBottom: "20px",
  },
  colorButton: {
    width: "100%",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #444",
    cursor: "pointer",
    transition: "opacity 0.3s",
  },
  gameStatus: {
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "#2a2a2a",
    borderRadius: "10px",
    border: "1px solid #444",
  },
  turnText: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#ffffff",
  },
  drawText: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#ffffff",
  },
  newGameButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background-color 0.3s",
    marginRight: "10px",
  },
  gameButtons: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginTop: "20px",
  },
  gameButton: {
    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    padding: "15px 20px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
    },
  },
  rpsCountdown: {
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "#2a2a2a",
    borderRadius: "10px",
    border: "1px solid #444",
  },
  countdownText: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#ffffff",
  },
  rpsChoicesDisplay: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  },
  choiceContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  choiceLabel: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#ffffff",
  },
  choiceEmoji: {
    fontSize: "2rem",
  },
  startRpsButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginBottom: "15px",
  },
  rpsRoundInfo: {
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "#2a2a2a",
    borderRadius: "10px",
    border: "1px solid #444",
  },
  roundText: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#ffffff",
  },
  rpsGameOver: {
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "#2a2a2a",
    borderRadius: "10px",
    border: "1px solid #444",
  },
  finalResultText: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: "10px",
  },
  finalScoreText: {
    fontSize: "1.2rem",
    color: "#ffffff",
  },
  resetRpsButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background-color 0.3s",
    marginBottom: "15px",
  },
  scrambleContainer: {
    marginBottom: "35px",
    padding: "15px",
    backgroundColor: "#2a2a2a",
    borderRadius: "10px",
    border: "1px solid #444",
  },
  scrambledWord: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: "10px",
  },
  scrambleInput: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #444",
    backgroundColor: "#333",
    color: "#ffffff",
    marginBottom: "10px",
  },
  scrambleButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  scrambleResult: {
    fontSize: "1.2rem",
    color: "#ffffff",
    marginBottom: "10px",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  },
  smallButton: {
    backgroundColor: "#888888",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background-color 0.3s",
  },
  guessContainer: {
    marginBottom: "35px",
    padding: "15px",
    backgroundColor: "#2a2a2a",
    borderRadius: "10px",
    border: "1px solid #444",
  },
  guessInput: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #444",
    backgroundColor: "#333",
    color: "#ffffff",
    marginBottom: "10px",
  },
  guessButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  guessResult: {
    fontSize: "1.2rem",
    color: "#ffffff",
    marginBottom: "10px",
  },
  viewHistoryButton: {
    backgroundColor: "#888888",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background-color 0.3s",
  },
  noJournalsMessage: {
    padding: "20px",
    backgroundColor: "#2a2a2a",
    borderRadius: "10px",
    border: "1px solid #444",
  },
  journalHistoryContainer: {
    maxHeight: "300px",
    overflowY: "auto",
  },
  journalEntry: {
    padding: "15px",
    backgroundColor: "#2a2a2a",
    borderRadius: "10px",
    border: "1px solid #444",
    marginBottom: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#333333",
      borderColor: "#666",
    },
  },
  journalEntryHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  journalDate: {
    fontSize: "0.9rem",
    fontWeight: "bold",
    color: "#ffffff",
  },
  journalTime: {
    fontSize: "0.9rem",
    color: "#cccccc",
  },
  journalContent: {
    fontSize: "1rem",
    color: "#ffffff",
    cursor: "pointer",
    lineHeight: "1.5",
  },
  journalPreview: {
    color: "#cccccc",
    fontStyle: "italic",
  },
  expandIndicator: {
    color: "#888888",
    fontSize: "0.8rem",
    fontStyle: "normal",
    marginLeft: "5px",
  },
  timeframeSelector: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  timeframeButton: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
    marginBottom: "20px",
  },
  statCard: {
    backgroundColor: "#2a2a2a",
    borderRadius: "10px",
    border: "1px solid #444",
    padding: "15px",
    textAlign: "center",
  },
  statIcon: {
    fontSize: "2rem",
    marginBottom: "10px",
  },
  statValue: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#ffffff",
  },
  statLabel: {
    fontSize: "1rem",
    color: "#cccccc",
  },
  chartSection: {
    marginBottom: "30px",
  },
  enhancedMoodChart: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "end",
    height: "150px",
  },
  enhancedMoodBar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
  },
  enhancedMoodBarFill: {
    width: "30px",
    borderRadius: "5px 5px 0 0",
    transition: "height 0.3s ease",
  },
  enhancedMoodBarLabel: {
    fontSize: "0.8rem",
    color: "#cccccc",
  },
  insightsSection: {
    marginBottom: "30px",
  },
  insightsList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  insightItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  insightIcon: {
    fontSize: "1.5rem",
  },
  insightText: {
    fontSize: "1rem",
    color: "#ffffff",
  },
  patternsSection: {
    marginBottom: "30px",
  },
  patternsList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  patternItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  patternIcon: {
    fontSize: "1.5rem",
  },
  patternText: {
    fontSize: "1rem",
    color: "#ffffff",
  },
  moodDetailOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(5px)",
  },
  moodDetailCard: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    padding: "30px",
    borderRadius: "20px",
    width: "90%",
    maxWidth: "600px",
    textAlign: "center",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  closeDetailButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background-color 0.3s",
    marginTop: "20px",
  },
  enhancedInsightsContainer: {
    maxHeight: "60vh",
    overflowY: "auto",
    padding: "20px",
    backgroundColor: "#1a1a1a",
    borderRadius: "10px",
    border: "1px solid #444",
  },
  sectionTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: "15px",
    textAlign: "center",
  },
};

export default MoodTracker;
