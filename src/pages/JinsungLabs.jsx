import React, { useEffect, useState } from "react";

const ExperimentalTimeTypography = () => {
  const [time, setTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageLetters, setMessageLetters] = useState([]);

  // 시간 관련 메시지 리스트 (외부 JSON 대신 로컬 데이터 시뮬레이션)
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
    // 시간 업데이트
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // 메시지 업데이트
    const messageTimer = setInterval(() => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setCurrentMessage(randomMessage);
      setMessageLetters(randomMessage.split(""));
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, [messages]);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const formatTime = (unit) => (unit < 10 ? `0${unit}` : unit);

  const hours = formatTime(time.getHours());
  const minutes = formatTime(time.getMinutes());
  const seconds = formatTime(time.getSeconds());

  const renderLetters = () => {
    return messageLetters.map((char, index) => {
      const offsetX = (Math.random() - 0.5) * 100 + (mousePosition.x / window.innerWidth) * 100;
      const offsetY = (Math.random() - 0.5) * 100 + (mousePosition.y / window.innerHeight) * 100;
      const scale = Math.random() * 1.5 + 0.5;
      const rotate = Math.random() * 360;

      return (
        <span
          key={index}
          style={{
            position: "absolute",
            top: `${50 + offsetY}px`,
            left: `${50 + offsetX}px`,
            fontSize: `${Math.random() * 2 + 1.5}rem`,
            fontWeight: "bold",
            color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random()})`,
            transform: `rotate(${rotate}deg) scale(${scale})`,
            transition: "all 1s ease",
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
      {/* 시간 디스플레이 */}
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
        {hours}:{minutes}:{seconds}
      </div>

      {/* 강력한 인터랙티브 메시지 */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {renderLetters()}
      </div>

      {/* 배경 시각 효과 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.8) 100%)",
          opacity: 0.7,
          animation: "pulse 8s infinite",
        }}
      />
    </div>
  );
};

export default ExperimentalTimeTypography;
