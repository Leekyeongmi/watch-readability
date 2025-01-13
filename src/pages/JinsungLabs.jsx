import React, { useEffect, useState } from "react";

const SwissTypographyClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update the time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time for display
  const formatTime = (unit) => (unit < 10 ? `0${unit}` : unit);

  const hours = formatTime(time.getHours());
  const minutes = formatTime(time.getMinutes());
  const seconds = formatTime(time.getSeconds());

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr auto",
          width: "80%",
          height: "80%",
          maxWidth: "1200px",
          maxHeight: "800px",
          border: "2px solid #000",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {/* Left Section: Typographic Time */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "2px solid #000",
            paddingRight: "20px",
          }}
        >
          <div
            style={{
              fontSize: "10vw",
              fontWeight: "bold",
              lineHeight: "1",
              color: "#000",
            }}
          >
            {hours}:{minutes}
          </div>
          <div
            style={{
              fontSize: "3vw",
              fontWeight: "lighter",
              marginTop: "10px",
              color: "#555",
            }}
          >
            {seconds} seconds
          </div>
        </div>

        {/* Right Section: Philosophical Message */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "20px",
          }}
        >
          <p
            style={{
              fontSize: "2vw",
              fontWeight: "bold",
              lineHeight: "1.5",
              marginBottom: "20px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#000",
            }}
          >
            TIME DOES NOT WAIT.
          </p>
          <p
            style={{
              fontSize: "1.5vw",
              fontWeight: "lighter",
              lineHeight: "1.8",
              color: "#333",
            }}
          >
            Every second that passes is lost forever, yet it shapes the eternity
            we strive to understand. Embrace the present, for it is the only
            time we truly possess.
          </p>
        </div>

        {/* Footer Section: Minimal Detail */}
        <div
          style={{
            gridColumn: "span 2",
            borderTop: "2px solid #000",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "10px",
            fontSize: "1vw",
            color: "#555",
          }}
        >
          <span>Designed in the spirit of Swiss Typography</span>
          <span>© 2025 Your Name</span>
        </div>
      </div>
    </div>
  );
};

export default SwissTypographyClock;
