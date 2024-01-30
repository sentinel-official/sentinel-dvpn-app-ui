function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const getRandomNode = (nodes = []) => {
  const randomNumber = getRandomInt([...nodes].length);
  return nodes[randomNumber];
};
