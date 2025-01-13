import React, { useEffect, useState } from 'react';

const App = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [bgClass, setBgClass] = useState('');

  const randomMessages = [
    "Time flies when you're having fun.",
    "The clock is ticking.",
    "Every second counts.",
    "What is time?",
    "Time waits for no one.",
    "The present is a gift.",
    "Time and tide wait for none.",
    "Time is money.",
    "We are prisoners of time."
  ];

  // Update current time in 12-hour format without AM/PM
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      setCurrentTime(`${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
    };

    const updateBackgroundColor = () => {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= 6 && hours < 12) {
        setBgClass('morning');
      } else if (hours >= 12 && hours < 18) {
        setBgClass('afternoon');
      } else if (hours >= 18 && hours < 21) {
        setBgClass('evening');
      } else {
        setBgClass('night');
      }
    };

    const intervalId = setInterval(updateTime, 1000);
    const colorIntervalId = setInterval(updateBackgroundColor, 60000);
    updateTime(); // Initial call
    updateBackgroundColor(); // Initial call to set background

    return () => {
      clearInterval(intervalId);
      clearInterval(colorIntervalId);
    };
  }, []);

  const randomizeText = () => {
    const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    const messageElement = document.createElement('div');
    messageElement.classList.add('random-message');
    messageElement.textContent = randomMessage;

    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    messageElement.style.transform = `translate(${randomX}px, ${randomY}px)`;

    document.getElementById('text-background').appendChild(messageElement);

    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  };

  useEffect(() => {
    const mouseMovementTimer = setTimeout(randomizeText, 150);
    return () => clearTimeout(mouseMovementTimer);
  }, [randomizeText]);

  return (
    <div className={`App ${bgClass}`} style={{ cursor: 'pointer', height: '100vh', position: 'relative' }}>
      <div className="time" id="current-time" style={{ fontSize: '6rem', fontWeight: 'bold', position: 'absolute', zIndex: 10 }}>
        {currentTime}
      </div>
      <div id="text-background"></div>
    </div>
  );
};

export default App;
