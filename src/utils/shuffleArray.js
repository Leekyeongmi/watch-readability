export const shuffleArray = () => {
  const array = [0, 1, 2, 3, 4, 5, 6];
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
};
