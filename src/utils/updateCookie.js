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

    const adjustedReciprocal = (value, max = 1000, epsilon = 0.01) => {
      return max / (value + epsilon);
    };

    const calculateErrorScore = (
      averageHourError,
      averageMinuteError,
      averageSecondError
    ) => {
      const hourWeight = 0.5;
      const minuteWeight = 0.35;
      const secondWeight = 0.15;

      const hourScore = adjustedReciprocal(averageHourError) * hourWeight;
      const minuteScore = adjustedReciprocal(averageMinuteError) * minuteWeight;
      const secondScore = adjustedReciprocal(averageSecondError) * secondWeight;

      return hourScore + minuteScore + secondScore;
    };

    const errorScore = calculateErrorScore(
      averageHourError,
      averageMinuteError,
      averageSecondError
    );

    const normalizeErrorScore = (errorScore, min = 10.27, max = 100000) => {
      return ((errorScore - min) / (max - min)) * 100;
    };

    return {
      clockId,
      averageElapsedTime,
      averageHourError,
      averageMinuteError,
      averageSecondError,
      errorScore: normalizeErrorScore(errorScore).toFixed(2),
      userCount: count
    };
  });

  return result;
};
