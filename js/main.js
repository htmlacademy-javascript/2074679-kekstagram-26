//Function to generate random integer inclusive
//Random algorithm from there:
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomNumber = (min, max) => {
  if(min < 0 || max < 0 || min === max) {
    throw new Error('Min/max values is incorrect.');
  }
  if(min > max) {
    [min, max] = [max, min]; // if min > max => mixing values
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  const randNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randNumber;
};

//Function to check text for max length
const checkMaxLength = (text, maxLength) => {
  if(text.toString().length <= maxLength) {
    return true;
  } else {
    return false;
  }
};

getRandomNumber(0,100);
checkMaxLength('Hello', 4);
