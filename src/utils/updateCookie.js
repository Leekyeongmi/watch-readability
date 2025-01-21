import Cookies from 'js-cookie';

export const updateUserData = (newEntry) => {
  const {
    clockId,
    elapsedTime,
    hourErrorAngle,
    minuteErrorAngle,
    secondErrorAngle
  } = newEntry;

  const userDataCookie = Cookies.get('userData');
  let userData = userDataCookie ? JSON.parse(userDataCookie) : [];

  const existingEntryIndex = userData.findIndex(
    (entry) => entry.clockId === clockId
  );

  if (existingEntryIndex !== -1) {
    userData[existingEntryIndex] = {
      ...userData[existingEntryIndex],
      elapsedTime: userData[existingEntryIndex].elapsedTime + elapsedTime,
      hourErrorAngle:
        userData[existingEntryIndex].hourErrorAngle + hourErrorAngle,
      minuteErrorAngle:
        userData[existingEntryIndex].minuteErrorAngle + minuteErrorAngle,
      secondErrorAngle:
        userData[existingEntryIndex].secondErrorAngle + secondErrorAngle,
      count: userData[existingEntryIndex].count + 1
    };
  } else {
    userData.push({
      clockId,
      elapsedTime,
      hourErrorAngle,
      minuteErrorAngle,
      secondErrorAngle,
      count: 1
    });
  }

  Cookies.set('userData', JSON.stringify(userData), {
    expires: 365,
    domain: window.location.hostname,
    sameSite: 'Strict'
  });
};

export const processUserData = () => {
  const userDataCookie = Cookies.get('userData');
  const userData = userDataCookie ? JSON.parse(userDataCookie) : [];

  const result = userData.map((entry) => {
    const {
      clockId,
      elapsedTime,
      hourErrorAngle,
      minuteErrorAngle,
      secondErrorAngle,
      count
    } = entry;

    const averageElapsedTime = Math.floor((elapsedTime / count) * 100) / 100;
    const averageHourError = Math.floor((hourErrorAngle / count) * 100) / 100;
    const averageMinuteError =
      Math.floor((minuteErrorAngle / count) * 100) / 100;
    const averageSecondError =
      Math.floor((secondErrorAngle / count) * 100) / 100;

    const epsilon = 0.01;
    const adjustedLog = (value, maxValue) => {
      if (value === 0) {
        return 100;
      }

      const logValue = Math.log(value + epsilon);
      const logMaxValue = Math.log(maxValue + epsilon);
      const normalizedScore = Math.max(0, 100 - (logValue / logMaxValue) * 100);

      return normalizedScore;
    };

    const calculateErrorScore = (
      averageHourError,
      averageMinuteError,
      averageSecondError
    ) => {
      const hourScore = adjustedLog(averageHourError, 90) * 0.6;
      const minuteScore = adjustedLog(averageMinuteError, 90) * 0.35;
      const secondScore = adjustedLog(averageSecondError, 120) * 0.05;

      return hourScore + minuteScore + secondScore;
    };

    const errorScore = calculateErrorScore(
      averageHourError,
      averageMinuteError,
      averageSecondError
    );

    return {
      clockId,
      averageElapsedTime,
      averageHourError,
      averageMinuteError,
      averageSecondError,
      errorScore: errorScore.toFixed(2),
      userCount: count
    };
  });

  return result;
};
