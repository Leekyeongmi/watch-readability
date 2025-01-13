import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [randomMessages, setRandomMessages] = useState([]);
  const [messageColor, setMessageColor] = useState('');

  // 시간과 관련된 단어 리스트
  const timeRelatedWords = [
    'hour', 'minute', 'second', 'time', 'clock', 'tick', 'count', 'countdown',
    'duration', 'day', 'night', 'second', 'moment', 'now', 'past', 'future',
    'alarm', 'watch', 'clockwise', 'timeline', 'stopwatch', 'interval', 'timing',
    'elapsed', 'scheduled', 'timeless', 'sundial', 'temporal', 'momentum', 'chronicle', 'measure', 'timeline', 'period', 'calendar', 'date'
  ];

  // 메시지 생성 함수
  const generateRandomMessage = () => {
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
      "Time has a way of catching up with you.",
      "Time flies when you’re making memories.",
      "The best time to start was yesterday. The second best time is now.",
      "The more things change, the more they stay the same.",
      "Only time can heal wounds.",
      "Live in the moment, for the future is uncertain.",
      "What you do today can improve all your tomorrows.",
      "Time changes everything, but nothing will change time.",
      "We are bound by time, yet we strive to escape it.",
      "Time is a great teacher, but unfortunately, it kills all its pupils.",
      "A watched clock never ticks.",
      "Time is a river that sweeps me along, but I am the river.",
      "Time is the most powerful force in the universe.",
      "It’s not about having time, it’s about making time.",
      "There’s no time like the present.",
      "Time is a great healer, but a poor beautician.",
      "The clock is a cruel reminder of our limitations.",
      "In time, everything falls into place.",
      "Make every second count.",
      "Time is a great equalizer.",
      "The greatest gift you can give is your time.",
      "Time is the longest distance between two places.",
      "Life is short, time is fast, no replay, no rewind.",
      "Time is a canvas, and you are the artist.",
      "Time is the most precious thing we have, yet we often squander it.",
      "Time waits for no one, but it can teach us valuable lessons.",
      "Time, once lost, is never found.",
      "Our relationship with time defines the quality of our lives."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  // 시간을 업데이트하는 함수
  const updateTime = () => {
    setCurrentTime(new Date());
  };

  // 랜덤 메시지 생성 및 색상 설정
  const generateMessageColor = (message) => {
    const regex = new RegExp(`\\b(${timeRelatedWords.join('|')})\\b`, 'gi');
    return message.replace(regex, (match) => `<span style="color: red">${match}</span>`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomMessages((prev) => {
        const newMessage = generateRandomMessage();
        return [...prev, newMessage];
      });
    }, 3000); // 메시지 업데이트 간격은 3초
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updateTime();
    }, 1000); // 1초마다 현재 시간 업데이트
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 클릭 인터랙션 구현
    const handleClick = () => {
      setMessageColor(generateMessageColor(generateRandomMessage())); // 클릭 시 메시지에 색상 적용
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="App">
      <div
        className="current-time"
        style={{ fontFamily: 'monospace' }} // 고정폭 폰트 적용
      >
        {currentTime.toLocaleTimeString()}
      </div>

      <div className="random-messages">
        {randomMessages.map((message, index) => (
          <div
            key={index}
            className="random-message"
            dangerouslySetInnerHTML={{
              __html: messageColor || generateMessageColor(message), // 색상 적용된 메시지 표시
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
