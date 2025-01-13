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
    'THE PRESENT IS A GIFT.',
    'TIME WAITS FOR NO ONE.',
    'THE END IS ONLY A BEGINNING.',
    'MAKE EVERY SECOND COUNT.',
    'TIME IS THE MOST PRECIOUS RESOURCE.',
    'IT’S NEVER TOO LATE TO START.',
    'THE MOMENT IS NOW.',
    'TIME IS A WAVE; RIDE IT.',
    'TIME CAN BE A FRIEND OR A Foe.',
    'IN EVERY MOMENT, TIME PASSES.',
    'TIME IS THE KEY TO EVERYTHING.',
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

  // Only allow change when cursor moves beyond a certain threshold
  const isCursorInChangeRange = (pos, threshold = 100) => {
    return Math.abs(pos.x - window.innerWidth / 2) > threshold || Math.abs(pos.y - window.innerHeight / 2) > threshold;
  };

  const renderLetters = () => {
    return messageLetters.map((char, index) => {
      if (!isCursorInChangeRange(mousePosition)) return null; // Only render if the mouse position exceeds threshold

      const offsetX = (mousePosition.x / window.innerWidth - 0.5) * 150 + Math.random() * 20 - 10;
      const offsetY = (mousePosition.y / window.innerHeight - 0.5) * 150 + Math.random() * 20 - 10;
      const scale = 1 + (Math.sin(mousePosition.x / window.innerWidth * Math.PI) * 0.2);
      const rotation = [0, 45, 90, 180][Math.floor(Math.random() * 4)];

      const isRed = Math.random() < 0.15; // 15% chance of being red

      return (
        <span
          key={index}
          style={{
            display: 'inline-block',
            fontSize: `${Math.random() * 4 + 2}rem`,
            fontWeight: 'bold',
            color: isRed ? '#FF0000' : '#fff', // Bright red accent color
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
        textAlign: 'left', // Now using left-aligned text for background typography
        padding: 0,
        margin: 0,
        zIndex: 0,
      }}
    >
      {/* Background with grid and flowing typography */}
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
        {/* Creating a grid system in the background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 1fr)',
            gridTemplateRows: 'repeat(10, 1fr)',
            gap: '5px',
            zIndex: 0,
          }}
        >
          {renderLetters()}
        </div>
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
        {time
          .toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
          .replace(/^0+/, '')} {/* Remove leading zeros */}
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
