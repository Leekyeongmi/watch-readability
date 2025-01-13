import React, { useEffect, useState } from "react";

const InteractiveAnalogClock = () => {
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

  const calculateHandStyle = (angle, length, thickness) => ({
    position: "absolute",
    width: `${thickness}px`,
    height: `${length}px`,
    backgroundColor: "white",
    transformOrigin: "center bottom",
    transform: `rotate(${angle}deg)`,
    top: "50%",
    left: "50%",
    marginLeft: `-${thickness / 2}px`,
    marginTop: `-${length}px`,
  });

  // Calculate angles for clock hands
  const secondAngle = time.getSeconds() * 6; // 360° / 60s
  const minuteAngle = time.getMinutes() * 6 + time.getSeconds() * 0.1; // Smooth minute movement
  const hourAngle = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5; // Smooth hour movement

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: `rgb(
          ${150 + Math.abs(mousePosition.x % 105)},
          ${100 + Math.abs(mousePosition.y % 155)},
          ${200}
        )`,
        overflow: "hidden",
        transition: "background-color 0.3s ease",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          border: "5px solid white",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Hour hand */}
        <div
          style={calculateHandStyle(hourAngle, 50, 6)} // Length 50px, thickness 6px
        ></div>
        {/* Minute hand */}
        <div
          style={calculateHandStyle(minuteAngle, 70, 4)} // Length 70px, thickness 4px
        ></div>
        {/* Second hand */}
        <div
          style={{
            ...calculateHandStyle(secondAngle, 90, 2), // Length 90px, thickness 2px
            backgroundColor: "red", // Red for the second hand
          }}
        ></div>

        {/* Clock center */}
        <div
          style={{
            position: "absolute",
            width: "10px",
            height: "10px",
            backgroundColor: "white",
            borderRadius: "50%",
          }}
        ></div>
      </div>
    </div>
  );
};

export default InteractiveAnalogClock;
