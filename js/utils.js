const ESC_KEY = 'Escape';

//Function to generate random integer inclusive
export const getRandomNumberFromRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomElementFromArray = (array) => array[getRandomNumberFromRange(0, array.length-1)];

export const getManyRandomElementsFromArray = (array, quantity) => {
  const randomElements = [];
  for(let i = 0; i < quantity; i++) {
    randomElements[i] = getRandomElementFromArray(array);
  }
  return randomElements;
};

export const checkIsEscPressed = (evt) => evt.key === ESC_KEY;
