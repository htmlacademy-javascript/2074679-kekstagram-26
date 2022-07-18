//Function to generate random integer inclusive
const getRandomNumberFromRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

//Function to check text for max length
const checkCommentMaxLength = (text, maxLength) => text.length <= maxLength;

const getRandomElementFromArray = (array) => array[getRandomNumberFromRange(0, array.length-1)];

const getManyRandomElementsFromArray = (array, quantity) => {
  const randomElements = [];
  for(let i = 0; i < quantity; i++) {
    randomElements[i] = getRandomElementFromArray(array);
  }
  return randomElements;
};

export {getRandomNumberFromRange, getRandomElementFromArray, getManyRandomElementsFromArray, checkCommentMaxLength};
