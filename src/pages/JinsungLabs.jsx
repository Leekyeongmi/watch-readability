import React, { useState, useEffect } from "react";

const InteractiveClockNoWebcam = () => {
  const [time, setTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Update the time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        backgroundColor: "#1a1a1a",
        color: "white",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Clock Display */}
      <div
        style={{
          position: "absolute",
          top: `${mousePosition.y - 50}px`,
          left: `${mousePosition.x - 50}px`,
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid white",
          transition: "background-color 0.3s ease",
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: "bold" }}>
          {time.toLocaleTimeString()}
        </span>
      </div>

      {/* Animated Lines */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x = Math.cos(angle) * 200 + window.innerWidth / 2;
        const y = Math.sin(angle) * 200 + window.innerHeight / 2;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${y}px`,
              left: `${x}px`,
              width: "2px",
              height: "50px",
              backgroundColor: "white",
              transform: `rotate(${i * 30}deg)`,
              transformOrigin: "center top",
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default InteractiveClockNoWebcam;
