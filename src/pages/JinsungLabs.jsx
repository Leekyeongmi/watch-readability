import React, { useEffect, useState } from 'react';

const App = () => {
  const [time, setTime] = useState('');
  const [messages, setMessages] = useState([]);
  const [angle, setAngle] = useState(0);  // 텍스트 회전 각도

  const randomMessages = [
    "Time flies when you're having fun.",
    "The clock is ticking.",
    "Every second counts.",
    "What is time?",
    "Time waits for no one.",
    "The present is a gift.",
    "Time and tide wait for none.",
    "Time is money.",
    "We are prisoners of time.",
    "Time changes everything.",
    "Time is a great teacher, but unfortunately it kills all its pupils.",
    "Time is what we want most, but what we use worst.",
    "They always say time changes things, but you actually have to change them yourself.",
    "The two most powerful warriors are patience and time.",
    "Time is the most precious thing you can spend.",
    "Time flies over us, but leaves its shadow behind.",
    "Time stands still for no one.",
    "We live in the present, we dream of the future, but we learn from the past.",
    "The key to time management is to focus on the present.",
    "Time is what we make of it.",
    "Time is the longest distance between two places.",
    "The past, the present, and the future are really one: they are today.",
    "Time will pass, and seasons will change.",
    "Time is a thief that steals your moments.",
    "Nothing is more precious than time.",
    "Time is an illusion.",
    "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    "The best way to predict your future is to create it.",
    "The only time you should ever look back is to see how far you've come.",
    "The clock is ticking, but it's never too late to start something new.",
    "Time is not measured by the passing of years, but by what we do with them.",
    "What time is it? It's now.",
    "The only time you can be sure of is the present.",
    "With time, everything changes.",
    "Time reveals the truth.",
    "Time heals almost everything.",
    "Every second is a chance to change something in your life.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Time waits for no one, but you can make the most of it.",
    "Time is what we want most, but what we use worst.",
    "Time is a constant, but how we use it is not.",
    "Don't count the days, make the days count.",
    "The clock doesn't have a pause button, but you can press reset anytime.",
    "Time is the one thing you can't get back, use it wisely."
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12; // 12-hour format without AM/PM
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const timeString = `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
      setTime(timeString);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const messageIntervalId = setInterval(() => {
      const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      setMessages(prevMessages => [...prevMessages, randomMessage]);
    }, 4000);

    return () => clearInterval(messageIntervalId);
  }, []);

  // 화면 내에서만 위치가 랜덤하게 생성되도록 제한
  const getRandomPosition = () => {
    const maxX = window.innerWidth - 300; // 텍스트 크기를 고려한 최대 X값
    const maxY = window.innerHeight - 100; // 텍스트 크기를 고려한 최대 Y값
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    return { x: randomX, y: randomY };
  };

  // 텍스트가 회전하도록 처리 (시계와 연관된 효과)
  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setAngle(prevAngle => (prevAngle + 5) % 360); // 5도씩 회전
    }, 100);

    return () => clearInterval(rotateInterval);
  }, []);

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        height: '100vh',
        overflow: 'hidden',
        fontFamily: "'Helvetica Neue', sans-serif",
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      {/* 현재 시간 표시 */}
      <div
        style={{
          fontSize: '6rem',
          fontWeight: 'bold',
          position: 'absolute',
          zIndex: 10,
        }}
      >
        {time}
      </div>

      {/* 랜덤 텍스트 표시 */}
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          fontSize: '2rem',
          color: 'red',
        }}
      >
        {messages.map((message, index) => {
          const { x, y } = getRandomPosition();
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
                whiteSpace: 'nowrap',
                color: 'white',
              }}
            >
              {message}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
