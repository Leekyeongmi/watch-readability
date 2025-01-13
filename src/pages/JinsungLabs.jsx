import React, { useState, useEffect } from 'react';

const InteractiveTypography = () => {
  const [time, setTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentMessage, setCurrentMessage] = useState('TIME IS RELENTLESS.');
  const [messageLetters, setMessageLetters] = useState([]);
  const [randomMessages] = useState([
    'TIME IS RELENTLESS.',
    'SEIZE THE MOMENT.',
    'EVERY SECOND COUNTS.',
    'DESIGN IS ABOUT TIMING.',
    'LIFE MOVES FORWARD.',
    'THE CLOCK NEVER STOPS.',
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Change the message randomly every 5 seconds
    const messageTimer = setInterval(() => {
      const randomMessage =
        randomMessages[Math.floor(Math.random() * randomMessages.length)];
      setCurrentMessage(randomMessage);
      setMessageLetters(randomMessage.split(''));
    }, 5000);

    // Set initial letters
    setMessageLetters(currentMessage.split(''));

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, [randomMessages, currentMessage]);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const renderLetters = () => {
    return messageLetters.map((char, index) => {
      const offsetX = (mousePosition.x / window.innerWidth - 0.5) * 100 + Math.random() * 20 - 10;
      const offsetY = (mousePosition.y / window.innerHeight - 0.5) * 100 + Math.random() * 20 - 10;
      const rotation = Math.random() * 10 - 5;

      return (
        <span
          key={index}
          style={{
            display: 'inline-block',
            fontSize: '4rem',
            fontWeight: 'bold',
            color: '#222',
            transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg)`,
            transition: 'transform 0.4s ease, opacity 0.4s ease',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f8f8f8',
        color: '#000',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background Image with Text Interaction */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url('https://source.unsplash.com/random/1920x1080')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(50%)',
        }}
      />

      {/* Display Time */}
      <div
        style={{
          zIndex: 10,
          fontSize: '6rem',
          fontWeight: 'bold',
          marginBottom: '40px',
          letterSpacing: '5px',
          color: '#fff',
        }}
      >
        {time.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}
      </div>

      {/* Interactive Typography */}
      <div
        style={{
          zIndex: 10,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        {renderLetters()}
      </div>
    </div>
  );
};

export default InteractiveTypography;
