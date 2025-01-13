import React, { useEffect, useState } from "react";

const InteractiveClockTypography = () => {
  const [time, setTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentMessage, setCurrentMessage] = useState("TIME IS RELENTLESS.");
  const [messageLetters, setMessageLetters] = useState([]);

  const messages = [
    "TIME IS RELENTLESS.",
    "SEIZE THE MOMENT.",
    "EVERY SECOND COUNTS.",
    "DESIGN IS ABOUT TIMING.",
    "LIFE MOVES FORWARD.",
    "THE CLOCK NEVER STOPS.",
  ];

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cycle messages every 5 seconds
    const messageTimer = setInterval(() => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setCurrentMessage(randomMessage);
      setMessageLetters(randomMessage.split(""));
    }, 5000);

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
      // Movement range and randomness
      const offsetX = (mousePosition.x / window.innerWidth - 0.5) * 50 + Math.random() * 10 - 5;
      const offsetY = (mousePosition.y / window.innerHeight - 0.5) * 50 + Math.random() * 10 - 5;
      const rotation = Math.random() * 10 - 5;

      return (
        <span
          key={index}
          style={{
            display: "inline-block",
            fontSize: "4rem",
            fontWeight: "bold",
            margin: "0 5px",
            color: "#222",
            transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg)`,
            transition: "transform 0.4s ease, opacity 0.4s ease",
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
        backgroundColor: "#f8f8f8",
        color: "#000",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background Grid */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle, #e0e0e0 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Time Display */}
      <div
        style={{
          zIndex: 10,
          fontSize: "6rem",
          fontWeight: "bold",
          marginBottom: "40px",
          letterSpacing: "5px",
        }}
      >
        {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
      </div>

      {/* Interactive Letters */}
      <div
        style={{
          zIndex: 10,
          textAlign: "center",
        }}
      >
        {renderLetters()}
      </div>
    </div>
  );
};

export default InteractiveClockTypography;
