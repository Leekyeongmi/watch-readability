import React, { useState, useEffect } from 'react';
import './App.css';

const timeRelatedWords = [
  'hour', 'minute', 'second', 'time', 'clock', 'tick', 'countdown', 'day', 'night', 'second', 'moment',
  'past', 'future', 'alarm', 'watch', 'clockwise', 'timeline', 'stopwatch', 'interval', 'timing',
  'elapsed', 'scheduled', 'timeless', 'sundial', 'temporal', 'momentum', 'chronicle', 'measure', 'period',
  'calendar', 'date', 'clockwork', 'deadline', 'schedule', 'timepiece', 'secondhand', 'sunrise', 'sunset',
  'timer', 'timestamp', 'chronometer', 'timeframe', 'count', 'duration'
];

const messages = [
  "Time flies when you're having fun.",
  "The clock is ticking.",
  "Every second counts.",
  "What is time?",
  "Time waits for no one.",
  "The present is a gift.",
  "Time and tide wait for none.",
  "Time is money.",
  "What is the meaning of time?",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Time is an illusion, lunchtime doubly so.",
  "Time does not wait for anyone.",
  "Make time for what makes your soul happy.",
  "Lost time is never found again.",
  "Time is the most valuable thing a man can spend.",
  "Each moment is a new beginning.",
  "Past, present, future - all are part of one continuum.",
  "Time is the most valuable resource.",
  "We are all slaves to time.",
  "The moment is always now.",
  "Time will pass, but memories will remain.",
  "Our perception of time is shaped by the events we experience.",
  "The longer you wait, the more time you lose.",
  "Time flies when you’re making memories.",
  "The best time to start was yesterday. The second best time is now.",
  "The more things change, the more they stay the same.",
  "Only time can heal wounds.",
  "Live in the moment, for the future is uncertain.",
  "What you do today can improve all your tomorrows.",
  "Time changes everything, but nothing will change time."
];

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [randomMessages, setRandomMessages] = useState([]);
  const [messageColor, setMessageColor] = useState('');

  // 시간 업데이트 함수
  const updateTime = () => {
    setCurrentTime(new Date());
  };

  // 랜덤 메시지 색상 변경 함수 (시간 관련 단어만 강조)
  const generateMessageColor = (message) => {
    const regex = new RegExp(`\\b(${timeRelatedWords.join('|')})\\b`, 'gi');
    return message.replace(regex, (match) => `<span style="color: red">${match}</span>`);
  };

  // 랜덤 메시지 생성
  const generateRandomMessage = () => {
    const newMessage = messages[Math.floor(Math.random() * messages.length)];
    return generateMessageColor(newMessage);
  };

  // 랜덤 메시지 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setRandomMessages((prev) => {
        const newMessage = generateRandomMessage();
        return [...prev, newMessage];
      });
    }, 3000); // 3초마다 새로운 메시지 추가
    return () => clearInterval(interval);
  }, []);

  // 1초마다 현재 시간 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      updateTime();
    }, 1000); // 1초마다 현재 시간 업데이트
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      {/* 현재 시간 */}
      <div
        className="current-time"
        style={{
          fontFamily: 'monospace', // 고정폭 폰트 적용
          fontSize: '48px', // 크기 설정
        }}
      >
        {currentTime.toLocaleTimeString()}
      </div>

      {/* 랜덤 메시지들 */}
      <div className="random-messages">
        {randomMessages.map((message, index) => (
          <div
            key={index}
            className="random-message"
            dangerouslySetInnerHTML={{
              __html: message, // 색상 적용된 메시지 표시
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
