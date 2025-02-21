const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

export const getRandomFromList = (list = []) => {
  const length = [...list].length;
  if (length > 0) {
    const randomNumber = getRandomInt(length);
    return list[randomNumber];
  }
  return {};
};

export default getRandomFromList;
