import React, { useState, useEffect } from 'react';

const App = () => {
  const [time, setTime] = useState('');
  const [messages, setMessages] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);

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

  // 시간 업데이트
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

  // 랜덤 메시지와 시간 관련 단어
  const timeRelatedWords = [
    'time', 'clock', 'second', 'minute', 'hour', 'past', 'future', 'now', 'today', 'tomorrow', 
    'yesterday', 'duration', 'moment', 'tick', 'tock', 'alarm', 'sunrise', 'sunset', 'calendar', 
    'epoch', 'timeless', 'timepiece', 'lifetime', 'timing', 'chronology', 'age', 'decade', 'century',
    'count', 'days', 'history', 'interval', 'past', 'present', 'future'
  ];

  // 시간 관련 단어만 빨간색 강조
  const applyRedHighlight = (message) => {
    const words = message.split(" ");
    const highlightedWords = words.map(word => {
      if (timeRelatedWords.some(keyword => word.toLowerCase().includes(keyword))) {
        return `<span style="color: red">${word}</span>`;
      }
      return word;
    });
    return highlightedWords.join(" ");
  };

  // 클릭 시 텍스트 누적 효과와 사라짐
  const handleClick = () => {
    setClickCount(prevCount => prevCount + 1);
    setMessages(prevMessages => [
      ...prevMessages,
      randomMessages[Math.floor(Math.random() * randomMessages.length)]
    ]);
    setIsClicked(true);

    // 텍스트가 사라지도록 일정 시간이 지난 후
    setTimeout(() => {
      setMessages(prevMessages => prevMessages.slice(1));
      setIsClicked(false);
    }, 3000); // 3초 후 텍스트 사라짐
  };

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        height: '100vh',
        overflow: 'hidden',
        fontFamily: 'monospace', // 고정폭 폰트 적용
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer',
      }}
      onClick={handleClick} // 클릭 이벤트 추가
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

      {/* 랜덤 메시지 표시 */}
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          fontSize: '2rem',
          color: 'white',
        }}
      >
        {messages.map((message, index) => {
          const highlightedMessage = applyRedHighlight(message);

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                transform: `translate(-50%, -50%)`,
                whiteSpace: 'nowrap',
                fontFamily: 'monospace',
                fontSize: '1.5rem',
                lineHeight: 1.5,
                textAlign: 'center',
                color: 'white',
                opacity: isClicked ? 1 : 0.7, // 클릭 시 가시성 변화
                transition: 'opacity 0.5s ease', // 애니메이션을 통한 부드러운 변환
                marginTop: 50 * index + 'px', // 누적 효과
              }}
              dangerouslySetInnerHTML={{ __html: highlightedMessage }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
