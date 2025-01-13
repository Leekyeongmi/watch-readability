import React, { useEffect, useState } from "react";

const InteractiveTimeArt = () => {
  const [time, setTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "TIME IS AN ILLUSION.",
    "EVERY SECOND CHANGES EVERYTHING.",
    "THE PRESENT IS ALL WE HAVE.",
    "TIME FLOWS LIKE A RIVER.",
    "WHAT IS LOST CANNOT BE FOUND.",
  ];

  useEffect(() => {
    // Update the time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cycle through messages every 5 seconds
    const messageTimer = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, [messages.length]);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const formatTime = (unit) => (unit < 10 ? `0${unit}` : unit);

  const hours = formatTime(time.getHours());
  const minutes = formatTime(time.getMinutes());
  const seconds = formatTime(time.getSeconds());

  const createLetterEffect = (text) => {
    return text.split("").map((char, index) => {
      const offsetX = (mousePosition.x / window.innerWidth - 0.5) * 100;
      const offsetY = (mousePosition.y / window.innerHeight - 0.5) * 100;

      const transformStyle = `translate(${offsetX + index * 2}px, ${
        offsetY + index * 1.5
      }px) rotate(${(offsetX - offsetY) * 0.1}deg)`;

      return (
        <span
          key={index}
          style={{
            display: "inline-block",
            transition: "transform 0.3s ease, opacity 0.3s ease",
            transform: transformStyle,
            opacity: Math.random() > 0.2 ? 1 : 0.5,
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#000",
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
        backgroundColor: "#f4f4f4",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Time Display */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          fontSize: "6rem",
          fontWeight: "bold",
          textAlign: "center",
          letterSpacing: "5px",
          zIndex: 1,
        }}
      >
        {hours}:{minutes}:{seconds}
      </div>

      {/* Dynamic Message Display */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
      >
        {createLetterEffect(messages[messageIndex])}
      </div>

      {/* Subtle Background Animation */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0) 20%, rgba(0,0,0,0.1) 80%)",
          opacity: 0.5,
          animation: "pulse 5s infinite",
        }}
      />
    </div>
  );
};

export default InteractiveTimeArt;
