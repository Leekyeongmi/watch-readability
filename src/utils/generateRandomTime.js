export const generateRandomTime = () => {
  const randomHour = Math.floor(Math.random() * 12);
  const randomMinute = Math.floor(Math.random() * 60);
  const randomSecond = Math.floor(Math.random() * 60);
  // const randomSecond = Math.floor(55);

  console.log(randomHour, randomMinute, randomSecond, '정답시간===');
  return getRotationFromTime(randomHour, randomMinute, randomSecond);
};

export const getRotationFromTime = (randomHour, randomMinute, randomSecond) => {
  const secondRotation = randomSecond * 6;
  const minuteRotation = randomMinute * 6 + (secondRotation / 360) * 6; // 초침에 따른 보정값 추가
  const hourRotation =
    (randomHour % 12) * 30 + randomMinute * 0.5 + (secondRotation / 360) * 0.5; // 초침에 따른 시간 보정값 추가
  return {
    hourRotation,
    minuteRotation,
    secondRotation
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
