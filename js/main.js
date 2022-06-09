//Function to generate random integer inclusive
//Random algorithm from there:
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomNumberFromRange = (min, max) => {
  if(min < 0 || max < 0 || min === max) {
    throw new Error('Min/max values is incorrect.');
  }
  if(min > max) {
    [min, max] = [max, min]; // if min > max => mixing values
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Function to check text for max length
const checkCommentMaxLength = (text, maxLength) => text.length <= maxLength;

getRandomNumberFromRange(0,100);
checkCommentMaxLength('Hello', 4);
