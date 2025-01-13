import React, { useEffect, useState } from "react";

const SwissTypographyClock = () => {
  const [time, setTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentMessage, setCurrentMessage] = useState("TIME IS NOW.");
  const [messageLetters, setMessageLetters] = useState([]);

  const messages = [
    "TIME IS NOW.",
    "ORDER AND CHAOS.",
    "EVERY SECOND COUNTS.",
    "THE FUTURE IS HERE.",
    "TIME MOVES RELENTLESSLY.",
    "DESIGNING THE PRESENT.",
    "THE PULSE OF NOW.",
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
      // Calculate small movement based on mouse position
      const offsetX = (mousePosition.x / window.innerWidth - 0.5) * 20;
      const offsetY = (mousePosition.y / window.innerHeight - 0.5) * 20;

      return (
        <span
          key={index}
          style={{
            position: "relative",
            display: "inline-block",
            fontSize: "3rem",
            fontWeight: "bold",
            margin: "0 5px",
            color: "#222",
            transform: `translate(${offsetX}px, ${offsetY}px)`,
            transition: "transform 0.3s ease",
          }}
        >
          {char}
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
        background: "linear-gradient(0deg, #fff, #ddd)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        overflow: "hidden",
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
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gridTemplateRows: "repeat(10, 1fr)",
          gap: "1px",
          backgroundColor: "#fff",
        }}
      >
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            style={{
              backgroundColor: i % 2 === 0 ? "#ddd" : "#fff",
              transition: "background-color 0.3s ease",
            }}
          ></div>
        ))}
      </div>

      {/* Time Display */}
      <div
        style={{
          zIndex: 10,
          fontSize: "6rem",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#000",
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

export default SwissTypographyClock;
