export const generateRandomTime = () => {
  const randomHour = Math.floor(Math.random() * 12);
  const randomMinute = Math.floor(Math.random() * 60);
  // const randomSecond = Math.floor(Math.random() * 60);
  const randomSecond = Math.floor(59);

  console.log(randomHour, randomMinute, randomSecond, '정답시간===');
  return getRotationFromTime(randomHour, randomMinute, randomSecond);
};

export const getRotationFromTime = (randomHour, randomMinute, randomSecond) => {
  const secondRotation = randomSecond * 6;
  const minuteRotation = randomMinute * 6 + (secondRotation / 360) * 6;
  const hourRotation =
    (randomHour % 12) * 30 + randomMinute * 0.5 + (secondRotation / 360) * 0.5;
  return {
    hourRotation,
    minuteRotation,
    secondRotation
  };
};
