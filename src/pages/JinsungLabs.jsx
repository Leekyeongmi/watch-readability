import React, { useEffect, useState } from 'react';

const messages = [
  'Time', 'Clock', 'Now', 'Second', 'Minute', 'Hour', 'Countdown', 'Tick', 'Tock', 'Past', 'Future', 'Wait', 
  'Duration', 'Interval', 'Moment', 'Cycle', 'Time flies', 'Countdown', 'Minutes', 'Seconds', 'Clockwork', 
  'Timing', 'Timekeeper', 'Endless', 'Eternal', 'Forever', 'Never', 'Decade', 'Epoch', 'Era', 'Past, Present, Future'
];

const getRandomMessage = () => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [randomMessages, setRandomMessages] = useState([]);
  const [highlightedMessage, setHighlightedMessage] = useState('');
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const generateRandomMessages = () => {
      const newMessages = [];
      for (let i = 0; i < 10; i++) {
        newMessages.push(getRandomMessage());
      }
      setRandomMessages(newMessages);
    };

    generateRandomMessages();
    const messageInterval = setInterval(generateRandomMessages, 3000);
    return () => clearInterval(messageInterval);
  }, []);

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * randomMessages.length);
    setHighlightedMessage(randomMessages[randomIndex]);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.timeDisplay}>
        <p style={styles.timeText}>{formatTime(currentTime)}</p>
      </div>

      <div style={styles.messagesContainer}>
        {randomMessages.map((message, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              ...(message === highlightedMessage ? styles.highlighted : {}),
            }}
            onClick={handleClick}
          >
            {message}
          </div>
        ))}
      </div>
      
      <div style={styles.overlay}></div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Courier New, monospace',
  },
  timeDisplay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    zIndex: 10,
  },
  timeText: {
    fontSize: '48px',
    color: '#333',
    fontWeight: 'bold',
  },
  messagesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    pointerEvents: 'none',
    fontSize: '20px',
    lineHeight: '30px',
  },
  message: {
    fontSize: '20px',
    color: '#333',
    transition: 'all 0.5s ease',
    pointerEvents: 'auto',
  },
  highlighted: {
    color: 'red',
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.2)',
    pointerEvents: 'none',
    zIndex: -1,
  },
};

export default TimeDisplay;
