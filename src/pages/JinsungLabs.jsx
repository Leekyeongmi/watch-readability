import React, { useState, useEffect } from 'react';

const InteractiveTypography = () => {
  const [time, setTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentMessage, setCurrentMessage] = useState('TIME IS RELENTLESS.');
  const [messageLetters, setMessageLetters] = useState([]);
  const [randomMessages, setRandomMessages] = useState([
    'TIME IS RELENTLESS.',
    'SEIZE THE MOMENT.',
    'EVERY SECOND COUNTS.',
    'DESIGN IS ABOUT TIMING.',
    'LIFE MOVES FORWARD.',
    'THE CLOCK NEVER STOPS.',
    'TIME FLIES.',
    'THE FUTURE AWAITS.',
    'MOMENTS MAKE LIFE.',
    'WE CANNOT ESCAPE TIME.',
    'TIME IS A CONSTRUCT.',
    'NOW IS ALL WE HAVE.',
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Change the message randomly every 2 seconds
    const messageTimer = setInterval(() => {
      const randomMessage =
        randomMessages[Math.floor(Math.random() * randomMessages.length)];
      setCurrentMessage(randomMessage);
      setMessageLetters(randomMessage.split(''));
    }, 2000);

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
      const offsetX = (mousePosition.x / window.innerWidth - 0.5) * 200 + Math.random() * 30 - 15;
      const offsetY = (mousePosition.y / window.innerHeight - 0.5) * 200 + Math.random() * 30 - 15;
      const scale = 1 + (Math.sin(mousePosition.x / window.innerWidth * Math.PI) * 0.2);
      const rotation = Math.random() * 15 - 7.5;

      return (
        <span
          key={index}
          style={{
            display: 'inline-block',
            fontSize: `${Math.random() * 4 + 2}rem`,
            fontWeight: 'bold',
            color: '#fff',
            transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale}) rotate(${rotation}deg)`,
            transition: 'transform 0.4s ease, opacity 0.4s ease',
            position: 'absolute',
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            pointerEvents: 'none',
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
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 0,
        margin: 0,
        zIndex: 0,
      }}
    >
      {/* Background with flowing typography */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {renderLetters()}
      </div>

      {/* Display Time */}
      <div
        style={{
          zIndex: 10,
          fontSize: '6rem',
          fontWeight: 'bold',
          letterSpacing: '5px',
          color: '#fff',
          position: 'relative',
          transition: 'transform 0.4s ease',
        }}
      >
        {time.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}
      </div>

      {/* Central message */}
      <div
        style={{
          zIndex: 10,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '4rem',
          fontWeight: 'bold',
          color: '#fff',
        }}
      >
        {currentMessage}
      </div>
    </div>
  );
};

export default InteractiveTypography;
