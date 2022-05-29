/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
export const shuffle = (array) => {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// returns a random integer from 0 to n - 1
export const randomInteger = (n) => Math.floor(Math.random() * n);

export const getShuffledArray = (n) => {
  const cardIndex = Array(n).fill().map((x, i) => i);
  return shuffle(cardIndex);
};

export const getCorrectAnswer = (card1, card2) => {
  const intersection = card1.filter((x) => card2.includes(x));
  // This should always have exactly one item
  if (intersection.length !== 1) {
    // eslint-disable-next-line no-console
    console.error('Serious error, no match');
    return [null, null];
  }
  const match = intersection[0];
  const card1Index = card1.findIndex((x) => x === match);
  const card2Index = card2.findIndex((x) => x === match);
  return [card1Index, card2Index];
};

export const roundToOneDecimal = (number) => Math.round(number * 10) / 10;

export default shuffle;
