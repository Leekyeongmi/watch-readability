export const generateRandomTime = () => {
  const randomHour = Math.floor(Math.random() * 12);
  const randomMinute = Math.floor(Math.random() * 60);
  const randomSecond = Math.floor(Math.random() * 60);

  console.log(randomHour, randomMinute, randomSecond, '정답=====');

  return {
    hourRotation: (randomHour % 12) * 30 + randomMinute * 0.5,
    minuteRotation: randomMinute * 6,
    secondRotation: randomSecond * 6
  };
};

export const getTimeFromRotation = (rotation) => {
  const { hourRotation, minuteRotation, secondRotation } = rotation;

  const randomHour = Math.floor(hourRotation / 30);
  const remainingMinuteFromHourRotation = (hourRotation % 30) / 0.5;
  const randomMinute = Math.floor(remainingMinuteFromHourRotation);

  const calculatedMinute = Math.floor(minuteRotation / 6);
  const finalMinute = randomMinute || calculatedMinute;

  const randomSecond = Math.floor(secondRotation / 6);

  return {
    randomHour,
    randomMinute: finalMinute,
    randomSecond
  };
};
