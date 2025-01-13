import React, { useEffect, useState } from "react";

const InteractiveSwissClock = () => {
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

  const formatTime = (unit) => (unit < 10 ? `0${unit}` : unit);

  const hours = formatTime(time.getHours());
  const minutes = formatTime(time.getMinutes());
  const seconds = formatTime(time.getSeconds());

  const calculateDynamicStyle = (baseValue, maxOffset) => {
    const offsetX = (mousePosition.x / window.innerWidth) * maxOffset - maxOffset / 2;
    const offsetY = (mousePosition.y / window.innerHeight) * maxOffset - maxOffset / 2;
    return {
      transform: `translate(${baseValue + offsetX}px, ${baseValue + offsetY}px)`,
    };
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
      }}
    >
      <div
        style={{
          position: "relative",
          width: "80%",
          height: "80%",
          maxWidth: "1200px",
          maxHeight: "800px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr auto",
        }}
      >
        {/* Time Display Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "12vw",
              fontWeight: "bold",
              color: "#000",
              ...calculateDynamicStyle(0, 20),
              transition: "transform 0.1s ease",
            }}
          >
            {hours}:{minutes}
          </div>
          <div
            style={{
              fontSize: "3vw",
              color: "#555",
              ...calculateDynamicStyle(0, 10),
              transition: "transform 0.1s ease",
            }}
          >
            {seconds} seconds
          </div>
        </div>

        {/* Philosophical Message Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "20px",
            textAlign: "right",
          }}
        >
          <p
            style={{
              fontSize: "2.5vw",
              fontWeight: "bold",
              lineHeight: "1.5",
              letterSpacing: "1px",
              color: "#000",
              ...calculateDynamicStyle(0, 30),
              transition: "transform 0.1s ease",
            }}
          >
            TIME IS AN ILLUSION.
          </p>
          <p
            style={{
              fontSize: "1.5vw",
              fontWeight: "lighter",
              lineHeight: "1.8",
              color: "#333",
            }}
          >
            As we chase moments, the present slips through our grasp. Yet, in
            every passing second lies the eternity we seek.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveSwissClock;
