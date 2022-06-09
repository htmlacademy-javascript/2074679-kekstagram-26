//Function to generate random integer inclusive
//Random algorithm from there:
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomNumber = (min, max) => {
  if(min < 0 || max < 0) {
    throw new Error('Input value of min or max < 0');
  }
  if(min > max) {
    [min, max] = [max, min]; // if min > max => mixing values
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  const randNumber = Math.random() * (max - min + 1) + min;
  return Math.round(randNumber);
};

//Function to check text for max length
const checkMaxLength = (text, maxLength) => {
  if(text.length <= maxLength) {
    return true;
  } else {
    return false;
  }
};

getRandomNumber(0,100);
checkMaxLength('Hello', 4);