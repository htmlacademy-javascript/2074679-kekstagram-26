///Task 4.15 - more details
const COMMENTATOR_NAMES = ['Михаил', 'Владимир', 'Мария', 'Константин', 'Татьяна', 'Наталья', 'Анастасия', 'Виктория', 'Алексей', 'Степан'];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const PHOTO_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet.',
  'Lorem, ipsum.',
  'Lorem ipsum dolor sit.',
  'Lorem ipsum dolor sit amet, consectetur adipisicing.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  'Lorem.',
  'Lorem ipsum dolor sit amet consectetur.',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores.'
];

const COMMENTS_COUNT = 100;
const POSTS_COUNT = 25;

//Function to generate random integer inclusive
const getRandomNumberFromRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

//Function to check text for max length
//const checkCommentMaxLength = (text, maxLength) => text.length <= maxLength;

const getRandomElementFromArray = (array) => array[getRandomNumberFromRange(0, array.length-1)];

const getManyRandomElementsFromArray = (array, quantity) => {
  const randomElements = [];
  for(let i = 0; i < quantity; i++) {
    randomElements[i] = getRandomElementFromArray(array);
  }
  return randomElements;
};

const generateRandomComments = (commentsQuantity = COMMENTS_COUNT) => {
  const result = [];
  for(let i = 1; i < commentsQuantity+1; i++) {
    const randomCommentator = getRandomElementFromArray(COMMENTATOR_NAMES);
    const randomComment = getRandomElementFromArray(COMMENTS);
    result.push({
      id: i,
      avatar: `img/avatar-${getRandomNumberFromRange(1, 6)}.svg`,
      message: randomComment,
      name: randomCommentator
    });
  }
  return result;
};

const generateRandomPosts = (photosQuantity = POSTS_COUNT) => {
  const result = [];
  const commentsArray = generateRandomComments();
  for(let i = 1; i <= photosQuantity; i++) {
    const commentsForPost = getRandomNumberFromRange(1, 7); // quntity of comment for 1 post photo
    result.push({
      id: i,
      url: `photos/{{${i}}}.jpg`,
      description: getRandomElementFromArray(PHOTO_DESCRIPTIONS),
      likes: getRandomNumberFromRange(15,200),
      comments: getManyRandomElementsFromArray(commentsArray, commentsForPost)
    });
  }
  return result;
};

generateRandomPosts(25);
generateRandomComments();
