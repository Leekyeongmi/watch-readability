import React, { useEffect, useState } from "react";

const ExperimentalTimeTypography = () => {
  const [time, setTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentMessage, setCurrentMessage] = useState("TIME WAITS FOR NO ONE.");
  const [messageLetters, setMessageLetters] = useState([]);

  const messages = [
    "TIME IS A FRAGMENT OF OUR MIND.",
    "EVERY SECOND IS UNIQUE.",
    "THE CLOCK NEVER STOPS.",
    "WHAT TIME IS IT REALLY?",
    "WE ARE ALL PRISONERS OF TIME.",
    "CAN YOU ESCAPE THE PRESENT?",
    "TICK, TOCK, LIFE MOVES ON.",
    "TIME WAITS FOR NO ONE.",
    "THE FUTURE IS NOW.",
    "MEMORIES ARE SHAPED BY TIME.",
  ];

  useEffect(() => {
    // Set the current time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cycle messages every 4 seconds
    const messageTimer = setInterval(() => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setCurrentMessage(randomMessage);
      setMessageLetters(randomMessage.split(""));
    }, 4000);

    // Initialize message letters
    setMessageLetters(currentMessage.split(""));

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, [messages, currentMessage]);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const renderLetters = () => {
    return messageLetters.map((char, index) => {
      // Calculate random offset based on mouse position
      const offsetX = (mousePosition.x / window.innerWidth - 0.5) * 200 + Math.random() * 50 - 25;
      const offsetY = (mousePosition.y / window.innerHeight - 0.5) * 200 + Math.random() * 50 - 25;
      const scale = Math.random() * 1.5 + 0.5;
      const rotate = Math.random() * 360;

      return (
        <span
          key={index}
          style={{
            position: "absolute",
            top: `${50 + offsetY}%`,
            left: `${50 + offsetX}%`,
            fontSize: `${Math.random() * 2 + 1.5}rem`,
            fontWeight: "bold",
            color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random()})`,
            transform: `rotate(${rotate}deg) scale(${scale})`,
            transition: "transform 1s ease, opacity 1s ease",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Time Display */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "6rem",
          fontWeight: "bold",
          textAlign: "center",
          letterSpacing: "5px",
        }}
      >
        {time.toLocaleTimeString()}
      </div>

      {/* Interactive Letters */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {renderLetters()}
      </div>
    </div>
  );
};

export default ExperimentalTimeTypography;
